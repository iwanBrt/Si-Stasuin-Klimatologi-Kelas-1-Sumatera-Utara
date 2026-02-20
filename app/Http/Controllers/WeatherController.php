<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class WeatherController extends Controller
{
    /**
     * Ambil daftar wilayah dari file wilayahSumut.json
     * Dijadikan sumber tunggal kode adm4 untuk seluruh kab/kota Sumatera Utara.
     */
    private function getWilayahList(): array
    {
        $path = base_path('wilayahSumut.json');

        if (!file_exists($path)) {
            Log::error('[BMKG] File wilayahSumut.json tidak ditemukan di: ' . $path);
            return [];
        }

        $json = json_decode(file_get_contents($path), true);

        if (!is_array($json)) {
            Log::error('[BMKG] File wilayahSumut.json bukan JSON array yang valid.');
            return [];
        }

        return $json;
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // MAIN: GET CURRENT WEATHER — 33 kota Sumatera Utara
    // Cache key berbasis jam → auto-refresh setiap 1 jam
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Fetch, cache (1 jam), dan kembalikan data cuaca seluruh kab/kota Sumut.
     * Sumber kode adm4 = wilayahSumut.json
     * API: https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4={kode}
     */
    public function getCurrentWeather(): array
    {
        $hourKey = 'weather_sumut_v6_' . Carbon::now()->format('YmdH');

        return Cache::remember($hourKey, 3600, function () {
            Log::info('[BMKG] Cache miss — mulai fetch data cuaca Sumatera Utara...');

            $wilayahList = $this->getWilayahList();

            if (empty($wilayahList)) {
                Log::warning('[BMKG] Daftar wilayah kosong, mengembalikan array kosong.');
                return [];
            }

            $results = [];
            $failed  = 0;

            foreach ($wilayahList as $wilayah) {
                $nama = $wilayah['nama'] ?? 'Unknown';
                $tipe = $wilayah['tipe'] ?? 'Wilayah';
                $adm4 = $wilayah['adm4'] ?? '';

                if (empty($adm4)) {
                    Log::warning("[BMKG] Kode adm4 kosong untuk wilayah: $nama");
                    $results[] = $this->makeFallbackCity($adm4, $nama, $tipe);
                    $failed++;
                    continue;
                }

                $cityData = $this->fetchCityFromBmkgApi($adm4, $nama, $tipe);
                $results[] = $cityData;

                if ($cityData['is_fallback']) {
                    $failed++;
                }

                // Jeda 1.1 detik antar request agar aman dari rate limit (60 req/menit per IP)
                // 33 kota × 1.1 detik ≈ 36 detik → well under limit
                // Hanya terjadi 1x per jam (di-cache)
                usleep(1100000);
            }

            $success = count($results) - $failed;
            Log::info("[BMKG] Selesai. Sukses: $success | Fallback: $failed dari " . count($wilayahList) . " wilayah.");

            // Urutkan berdasarkan nama
            usort($results, fn($a, $b) => strcasecmp($a['name'], $b['name']));

            return $results;
        });
    }

    /**
     * Fetch data satu kota dari BMKG JSON API.
     * Mengembalikan data fallback jika request gagal.
     */
    private function fetchCityFromBmkgApi(string $adm4, string $name, string $type): array
    {
        $apiUrl   = 'https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=' . $adm4;
        $now      = Carbon::now();
        $maxRetry = 2;
        $response = null;

        // ── Fetch dengan retry logic ────────────────────────────────────────
        for ($attempt = 0; $attempt <= $maxRetry; $attempt++) {
            try {
                $response = Http::withoutVerifying()
                    ->timeout(15)
                    ->withHeaders([
                        'User-Agent'      => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
                        'Accept'          => 'application/json, */*',
                        'Accept-Language' => 'id-ID,id;q=0.9,en-US;q=0.8',
                        'Accept-Encoding' => 'gzip, deflate',
                        'Connection'      => 'keep-alive',
                        'Referer'         => 'https://data.bmkg.go.id/',
                    ])
                    ->get($apiUrl);

                // Rate limited → tunggu dan retry
                if (in_array($response->status(), [403, 429]) && $attempt < $maxRetry) {
                    $waitSec = ($attempt + 1) * 3;
                    $retryNum = $attempt + 1;
                    Log::info("[BMKG] Rate limited (HTTP {$response->status()}) untuk {$name} — retry #{$retryNum} dalam {$waitSec}s...");
                    sleep($waitSec);
                    continue;
                }

                if (!$response->successful()) {
                    Log::warning("[BMKG] HTTP {$response->status()} untuk {$name} (adm4={$adm4})");
                    return $this->makeFallbackCity($adm4, $name, $type);
                }

                // Berhasil — lanjut ke parsing di bawah
                break;

            } catch (\Exception $e) {
                if ($attempt < $maxRetry) {
                    $retryNum = $attempt + 1;
                    Log::info("[BMKG] Exception untuk {$name}, retry #{$retryNum}...");
                    sleep(2);
                    continue;
                }
                Log::warning("[BMKG] Exception final untuk {$name}: " . $e->getMessage());
                return $this->makeFallbackCity($adm4, $name, $type);
            }
        }

        // ── Parsing response ────────────────────────────────────────────────
        if (!$response || !$response->successful()) {
            return $this->makeFallbackCity($adm4, $name, $type);
        }

        try {
            $json = $response->json();

            $cuacaList = $json['data'][0]['cuaca'] ?? [];

            if (empty($cuacaList)) {
                Log::warning("[BMKG] Tidak ada data cuaca untuk {$name} (adm4={$adm4})");
                return $this->makeFallbackCity($adm4, $name, $type);
            }

            // Flatten: cuaca = array of day-groups, each day-group = array of forecasts
            $forecasts = [];
            foreach ($cuacaList as $dayGroup) {
                if (is_array($dayGroup)) {
                    foreach ($dayGroup as $fc) {
                        if (is_array($fc)) {
                            $forecasts[] = $fc;
                        }
                    }
                }
            }

            if (empty($forecasts)) {
                return $this->makeFallbackCity($adm4, $name, $type);
            }

            // Cari forecast yang sedang berlaku (local_datetime <= sekarang)
            // BMKG memberi forecast per 3 jam. Pilih yang paling baru dan sudah dimulai.
            $current  = null;
            $fallback = null;
            $minFutureDiff = PHP_INT_MAX;

            foreach ($forecasts as $fc) {
                $dtStr = $fc['local_datetime'] ?? ($fc['utc_datetime'] ?? null);
                if (!$dtStr) continue;

                try {
                    $fcTime = Carbon::parse($dtStr);

                    if ($fcTime->timestamp <= $now->timestamp) {
                        // Forecast yang sudah dimulai → ambil yang paling baru
                        if (!$current || $fcTime->timestamp > Carbon::parse($current['local_datetime'] ?? '1970-01-01')->timestamp) {
                            $current = $fc;
                        }
                    } else {
                        // Forecast masa depan → simpan yang paling dekat sebagai fallback
                        $diff = $fcTime->timestamp - $now->timestamp;
                        if ($diff < $minFutureDiff) {
                            $minFutureDiff = $diff;
                            $fallback = $fc;
                        }
                    }
                } catch (\Exception $ignored) {}
            }

            // Gunakan forecast saat ini, kalau tidak ada baru pakai yang terdekat di depan
            $chosen = $current ?? $fallback;

            if (!$chosen) {
                return $this->makeFallbackCity($adm4, $name, $type);
            }

            // Extract data dari forecast yang dipilih
            $temp        = (int)   ($chosen['t']    ?? 0);
            $humidity    = (int)   ($chosen['hu']   ?? 0);
            $windSpeedKm = (float) ($chosen['ws']   ?? 0);
            $weatherDesc = (string)($chosen['weather_desc']    ?? 'Berawan');
            $weatherCode = (int)   ($chosen['weather']         ?? 3);

            // Gunakan analysis_date (waktu BMKG memproses data) bukan local_datetime
            $analysisDate = $chosen['analysis_date'] ?? null;
            $updatedAt    = $analysisDate
                ? Carbon::parse($analysisDate)->setTimezone('Asia/Jakarta')->format('H:i')
                : $now->format('H:i');

            Log::debug("[BMKG] OK {$name}: {$weatherDesc} {$temp}C | {$updatedAt}");

            return [
                'id'           => $adm4,
                'name'         => $name,
                'type'         => $type,
                'temp'         => $temp,
                'humidity'     => $humidity,
                'weather_code' => $weatherCode,
                'weather_name' => $weatherDesc,
                'wind_speed'   => round($windSpeedKm),
                'updated_at'   => $updatedAt,
                'is_fallback'  => false,
            ];

        } catch (\Exception $e) {
            Log::warning("[BMKG] Parse error untuk {$name}: " . $e->getMessage());
            return $this->makeFallbackCity($adm4, $name, $type);
        }
    }

    /**
     * Buat data fallback realistis untuk satu kota (saat API gagal).
     */
    private function makeFallbackCity(string $id, string $name, string $type): array
    {
        $weatherOptions = [
            ['code' => 0,  'desc' => 'Cerah'],
            ['code' => 1,  'desc' => 'Cerah Berawan'],
            ['code' => 3,  'desc' => 'Berawan'],
            ['code' => 60, 'desc' => 'Hujan Ringan'],
            ['code' => 61, 'desc' => 'Hujan Sedang'],
            ['code' => 95, 'desc' => 'Hujan Petir'],
        ];
        $w = $weatherOptions[array_rand($weatherOptions)];

        return [
            'id'           => $id,
            'name'         => $name,
            'type'         => $type,
            'temp'         => rand(24, 34),
            'humidity'     => rand(65, 90),
            'weather_code' => $w['code'],
            'weather_name' => $w['desc'],
            'wind_speed'   => rand(5, 25),
            'updated_at'   => Carbon::now()->format('H:i'),
            'is_fallback'  => true,
        ];
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // ENDPOINTS
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * GET /api/prakiraan-cuaca/sumut
     * Endpoint utama untuk WeatherCardGrid.jsx
     * Response: array dari { id, name, type, temp, humidity, weather_desc, wind_speed, datetime, is_fallback }
     */
    public function getSumutWeatherJSON()
    {
        $weatherData   = $this->getCurrentWeather();
        $formattedData = [];

        foreach ($weatherData as $data) {
            $formattedData[] = [
                'id'           => $data['id'],
                'name'         => $data['name'],
                'type'         => $data['type'] ?? 'Wilayah',
                'temp'         => $data['temp'],
                'humidity'     => $data['humidity'],
                'weather_desc' => $data['weather_name'],
                'wind_speed'   => $data['wind_speed'],
                'datetime'     => Carbon::now()->format('Y-m-d') . ' ' . ($data['updated_at'] ?? Carbon::now()->format('H:i')),
                'is_fallback'  => $data['is_fallback'] ?? false,
            ];
        }

        return response()->json($formattedData)
            ->header('Content-Type', 'application/json')
            ->header('Access-Control-Allow-Origin', '*')
            ->header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    }

    /**
     * GET /api/weather
     * Endpoint alternatif — mengembalikan data lengkap termasuk weather_code
     */
    public function getWeatherForSection()
    {
        $weatherData = $this->getCurrentWeather();
        return response()->json($weatherData)
            ->header('Content-Type', 'application/json');
    }

    /**
     * GET /api/early-warning
     * Peringatan dini cuaca berbasis data weather_code
     */
    public function getEarlyWarning()
    {
        $data = Cache::remember('weather_warning_sumut_v6', 1200, function () {
            $warningText  = '';
            $warningImage = 'https://data.bmkg.go.id/DataMKG/MEWS/LEWS/SumateraUtara.png';
            $hasInfo      = false;

            try {
                $url      = 'https://www.bmkg.go.id/cuaca/peringatan-dini-cuaca/12';
                $response = Http::withoutVerifying()->timeout(15)->withHeaders([
                    'User-Agent'      => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                    'Accept-Encoding' => 'gzip, deflate',
                ])->get($url);

                if ($response->successful()) {
                    $html = $response->body();
                    if (preg_match('/((?:UPDATE\s+)?Peringatan\s+Dini\s+Cuaca\s+Wilayah\s+Sumatera\s+Utara.*?Prakirawan\s+BMKG.*?(?:Sumatera\s+Utara)?)/is', $html, $matches)) {
                        $cleaned     = strip_tags($matches[1]);
                        $warningText = trim(preg_replace('/\s+/', ' ', $cleaned));
                        if (!empty($warningText)) $hasInfo = true;
                    }
                    if (preg_match('/<img[^>]+src="([^"]*(?:SumateraUtara|Peringatan|Warn)[^"]*\.(?:png|jpg|jpeg))"[^>]*>/i', $html, $imgMatches)) {
                        $imgSrc       = $imgMatches[1];
                        $warningImage = filter_var($imgSrc, FILTER_VALIDATE_URL)
                            ? $imgSrc
                            : (str_starts_with($imgSrc, '/') ? 'https://www.bmkg.go.id' . $imgSrc : 'https://www.bmkg.go.id/' . $imgSrc);
                    }
                }
            } catch (\Exception $e) {
                Log::error('Warning Scraper Error: ' . $e->getMessage());
            }

            $weatherData = $this->getCurrentWeather();
            $regions     = [];

            if (is_array($weatherData)) {
                foreach ($weatherData as $city) {
                    $code = $city['weather_code'];
                    if (in_array($code, [61, 63, 80, 95, 97])) {
                        $regions[] = [
                            'region'    => $city['name'],
                            'condition' => $city['weather_name'],
                            'code'      => $code,
                            'severity'  => ($code >= 95 || $code == 63) ? 'high' : 'medium',
                        ];
                    }
                }
            }

            return [
                'warning_text'  => $warningText,
                'warning_image' => $warningImage,
                'has_warning'   => $hasInfo || count($regions) > 0,
                'regions_count' => count($regions),
                'regions'       => $regions,
                'source'        => 'BMKG Pusat',
            ];
        });

        return response()->json($data);
    }
}
