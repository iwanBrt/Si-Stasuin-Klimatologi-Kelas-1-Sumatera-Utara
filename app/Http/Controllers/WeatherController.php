<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Carbon\Carbon;

class WeatherController extends Controller
{
    /**
     * Get current weather for Medan from BMKG
     */
    /**
     * Get weather forecast for all cities in North Sumatra
     */
    /**
     * Get weather forecast for all cities in North Sumatra
     */
    public function getCurrentWeather()
    {
        // Cache for 60 minutes
        return Cache::remember('weather_sumut_final_v1', 3600, function () {
            // Verified ADM4 Codes for Capitals/Centers
            $regions = [
                // Cities (Kota)
                '12.71' => ['name' => 'Medan', 'adm4' => '12.71.01.1001'],
                '12.72' => ['name' => 'Pematang Siantar', 'adm4' => '12.72.02.1001'], 
                '12.73' => ['name' => 'Sibolga', 'adm4' => '12.73.01.1001'],
                '12.74' => ['name' => 'Tanjung Balai', 'adm4' => '12.74.05.1001'], 
                '12.75' => ['name' => 'Binjai', 'adm4' => '12.75.01.1001'],
                '12.76' => ['name' => 'Tebing Tinggi', 'adm4' => '12.76.01.1001'],
                '12.77' => ['name' => 'Padangsidimpuan', 'adm4' => '12.77.01.1001'],
                '12.78' => ['name' => 'Gunungsitoli', 'adm4' => '12.78.01.1001'],

                // Regencies (Kabupaten) - Using known working districts
                '12.01' => ['name' => 'Tapanuli Tengah', 'adm4' => '12.01.01.1001'], 
                '12.02' => ['name' => 'Tapanuli Utara', 'adm4' => '12.02.01.1001'], 
                '12.03' => ['name' => 'Tapanuli Selatan', 'adm4' => '12.03.01.1001'], 
                '12.04' => ['name' => 'Nias', 'adm4' => '12.04.07.1001'], // Gido? Check if valid. If offline, use scanned logic.
                '12.05' => ['name' => 'Langkat', 'adm4' => '12.05.07.1001'], 
                '12.06' => ['name' => 'Karo', 'adm4' => '12.06.01.2001'], // Verified
                '12.07' => ['name' => 'Deli Serdang', 'adm4' => '12.07.13.1001'], 
                '12.08' => ['name' => 'Simalungun', 'adm4' => '12.08.30.1001'], 
                '12.09' => ['name' => 'Asahan', 'adm4' => '12.09.07.1001'], 
                '12.10' => ['name' => 'Labuhanbatu', 'adm4' => '12.10.08.1001'], 
                '12.11' => ['name' => 'Dairi', 'adm4' => '12.11.01.1001'], 
                '12.12' => ['name' => 'Toba', 'adm4' => '12.12.01.1001'], 
                '12.13' => ['name' => 'Mandailing Natal', 'adm4' => '12.13.01.1001'], 
                '12.14' => ['name' => 'Nias Selatan', 'adm4' => '12.14.01.1001'], 
                '12.15' => ['name' => 'Pakpak Bharat', 'adm4' => '12.15.01.2001'], // Verified
                '12.16' => ['name' => 'Humbang Hasundutan', 'adm4' => '12.16.01.2002'], // Verified
                '12.17' => ['name' => 'Samosir', 'adm4' => '12.17.01.2001'], // Verified
                '12.18' => ['name' => 'Serdang Bedagai', 'adm4' => '12.18.01.2001'], // Verified
                '12.19' => ['name' => 'Batu Bara', 'adm4' => '12.19.01.1001'], // Verified
                '12.20' => ['name' => 'Padang Lawas Utara', 'adm4' => '12.20.01.2001'], // Verified
                '12.21' => ['name' => 'Padang Lawas', 'adm4' => '12.21.01.2001'], // Verified
                '12.22' => ['name' => 'Labuhanbatu Selatan', 'adm4' => '12.22.01.1001'], // Verified
                '12.23' => ['name' => 'Labuhanbatu Utara', 'adm4' => '12.23.01.1001'], // Verified
                '12.24' => ['name' => 'Nias Utara', 'adm4' => '12.24.01.2001'], // Verified
                '12.25' => ['name' => 'Nias Barat', 'adm4' => '12.25.01.2001'], // Verified
            ];

            // Build requests
            $urls = [];
            foreach ($regions as $code => $info) {
                $urls[$code] = "https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4={$info['adm4']}";
            }

            // Execute in pool
            // Reduced timeout to fail fast, but pool handles concurrency
            $responses = Http::pool(function ($pool) use ($urls) {
                $pools = [];
                foreach ($urls as $code => $url) {
                    $pools[] = $pool->as($code)->withoutVerifying()->timeout(8)->get($url);
                }
                return $pools;
            });

            $results = [];

            foreach ($responses as $code => $response) {
                $name = $regions[$code]['name'];
                $dataVal = null;
                $updatedAt = '-';

                if ($response->successful()) {
                    $json = $response->json();
                    
                    if (isset($json['data'][0]['cuaca'])) {
                        $weatherData = $json['data'][0]['cuaca'];
                        $forecasts = [];
                        // Flatten
                        foreach ($weatherData as $day) {
                            foreach ($day as $f) {
                                $forecasts[] = $f;
                            }
                        }
                        
                        // Find closest
                        $now = Carbon::now();
                        $minDiff = PHP_INT_MAX;
                        $closest = null;
                        foreach ($forecasts as $f) {
                            if (isset($f['local_datetime'])) {
                                $time = Carbon::parse($f['local_datetime']);
                                $diff = abs($now->timestamp - $time->timestamp);
                                if ($diff < $minDiff) {
                                    $minDiff = $diff;
                                    $closest = $f;
                                }
                            }
                        }
                        $dataVal = $closest;
                        
                        // Set updated at to the forecast time or current time? 
                        // User wants "Update at" -> implied forecast validity time.
                        if ($closest && isset($closest['local_datetime'])) {
                            $updatedAt = Carbon::parse($closest['local_datetime'])->format('H:i');
                        }
                    }
                } 
                
                if (!$dataVal) {
                     \Illuminate\Support\Facades\Log::warning("Weather fail for $name ({$regions[$code]['adm4']})");
                }

                if ($dataVal) {
                    $results[] = [
                        'id' => $code,
                        'name' => $name,
                        'type' => intval(substr($code, 3, 2)) > 70 ? 'Kota' : 'Kab',
                        'temp' => $dataVal['t'] ?? '-',
                        'humidity' => $dataVal['hu'] ?? '-',
                        'weather_code' => $dataVal['weather'] ?? 0,
                        'weather_name' => $dataVal['weather_desc'] ?? $this->getWeatherName($dataVal['weather'] ?? 0),
                        'wind_speed' => $dataVal['ws'] ?? '-',
                        'updated_at' => $updatedAt,
                    ];
                } else {
                     // Default Offline
                     $results[] = [
                        'id' => $code,
                        'name' => $name,
                        'type' => intval(substr($code, 3, 2)) > 70 ? 'Kota' : 'Kab',
                        'temp' => '-',
                        'humidity' => '-',
                        'weather_code' => 0,
                        'weather_name' => 'Offline',
                        'wind_speed' => '-',
                        'updated_at' => '-',
                    ];
                }
            }

            usort($results, function($a, $b) {
                return strcmp($a['name'], $b['name']);
            });

            return $results;
        });
    }

    public function getEarlyWarning()
    {
        return Cache::remember('weather_warning_sumut_v1', 3600, function () {
            // Re-use the existing logic to grab data (or call internal method if filtered)
            // For efficiency, we'll fetch the same cache key as getCurrentWeather
            // But we can't easily call a controller method from another without instantiation.
            // Better to rely on the shared cache 'weather_sumut_final_v1' if populated, 
            // or just trigger the fetch.
            
            // To ensure consistency, we'll force a fetch but rely on internal cache of getCurrentWeather
            $weatherData = $this->getCurrentWeather();
            
            $warnings = [];
            foreach ($weatherData as $city) {
                $code = $city['weather_code'];
                // Codes for heavy rain/thunderstorm (approximate BMKG standard)
                // 63: Heavy Rain, 95: Thunderstorm, 97: Thunderstorm
                // 61: Rain (Medium)? 
                if (in_array($code, [63, 80, 95, 97])) {
                    $warnings[] = [
                        'region' => $city['name'],
                        'condition' => $city['weather_name'],
                        'code' => $code
                    ];
                }
            }
            
            return response()->json([
                'count' => count($warnings),
                'regions' => $warnings,
                'source' => 'Analisis Data Prakiraan BMKG'
            ]);
        });
    }

    private function getWeatherName($code) {
        $codes = [
            0 => 'Cerah', 1 => 'Cerah Berawan', 2 => 'Cerah Berawan', 3 => 'Berawan', 4 => 'Berawan Tebal', 5 => 'Udara Kabur', 
            10 => 'Asap', 45 => 'Kabut', 60 => 'Hujan Ringan', 61 => 'Hujan Sedang', 63 => 'Hujan Lebat', 
            80 => 'Hujan Lokal', 95 => 'Hujan Petir', 97 => 'Hujan Petir'
        ];
        return $codes[$code] ?? 'Berawan';
    }
}
