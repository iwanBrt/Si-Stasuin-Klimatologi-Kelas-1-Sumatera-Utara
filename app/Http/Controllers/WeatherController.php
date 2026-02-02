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
        // Clear cache for debugging (Production: remove this line)
        Cache::forget('weather_medan_xml_v5');

        return Cache::remember('weather_medan_xml_v5', 3600, function () {
            try {
                $url = 'https://data.bmkg.go.id/DataMKG/MEWS/DigitalForecast/DigitalForecast-SumateraUtara.xml';
                
                // Fetch XML with SSL Bypass
                $response = Http::withoutVerifying()
                    ->withHeaders([
                        'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                    ])
                    ->timeout(30)
                    ->get($url);

                \Illuminate\Support\Facades\Log::info('BMKG XML Status: ' . $response->status());
                
                if ($response->failed()) {
                    throw new \Exception("Gagal mengambil XML BMKG");
                }

                $xmlContent = $response->body();
                
                // Parse XML
                // Suppress errors and use libxml to handle malformed XML if any
                libxml_use_internal_errors(true);
                $xml = simplexml_load_string($xmlContent);
                
                if (!$xml) {
                     $errors = libxml_get_errors();
                     \Illuminate\Support\Facades\Log::error('XML Parse Error', $errors);
                     throw new \Exception("Gagal parsing XML");
                }

                // Convert to array
                $json = json_encode($xml);
                $data = json_decode($json, true);

                $areas = $data['forecast']['area'] ?? [];
                if (isset($areas['@attributes'])) $areas = [$areas]; // Handle single item

                $targetArea = null;

                // Search for Medan
                foreach ($areas as $area) {
                    $desc = $area['@attributes']['description'] ?? '';
                    // Check for "Medan" (case insensitive) AND ensure it is the city (Kota), not a regency like "Medan Selayang" if possible, 
                    // though BMKG usually lists "Kota Medan" or "Medan". 
                    if (stripos($desc, 'Medan') !== false) {
                        $targetArea = $area;
                        break; // Stop at first match (usually the main city station)
                    }
                }

                if (!$targetArea) {
                     throw new \Exception("Kota Medan tidak ditemukan dalam XML");
                }

                // Extract Parameters
                $params = $targetArea['parameter'] ?? [];
                if (isset($params['@attributes'])) $params = [$params];

                $temp = 0;
                $humidity = 0;
                $weatherCode = 0;
                $windSpeed = 0;

                foreach ($params as $p) {
                    $id = $p['@attributes']['id'] ?? '';
                    $ranges = $p['timerange'] ?? [];
                    if (isset($ranges['@attributes'])) $ranges = [$ranges];

                    // Get value from index 0 (current/closest)
                    $val = $ranges[0]['value'] ?? 0;
                    
                    // Handle value array (e.g. C/F)
                    if (is_array($val)) $val = $val[0]; 

                    if ($id === 't') $temp = $val;
                    if ($id === 'hu') $humidity = $val;
                    if ($id === 'weather') $weatherCode = $val;
                    if ($id === 'ws') $windSpeed = $val;
                }

                return [
                    [
                        'id' => $targetArea['@attributes']['id'] ?? 'medan',
                        'name' => 'Medan',
                        'type' => 'Kota',
                        'temp' => $temp,
                        'humidity' => $humidity,
                        // Icon mapping can be done in Frontend or simple map here
                        'weather_code' => $weatherCode,
                        'weather_name' => $this->getWeatherName($weatherCode),
                        'weather_desc' => $this->getWeatherName($weatherCode),
                        'wind_speed' => $windSpeed,
                        'updated_at' => now()->format('H:i'),
                        'weather_icon_url' => ''
                    ]
                ];

            } catch (\Exception $e) {
                \Illuminate\Support\Facades\Log::error('Weather Error: ' . $e->getMessage());
                return [
                    [
                        'id' => 'default',
                        'name' => 'Medan',
                        'type' => 'Kota',
                        'temp' => '-',
                        'humidity' => '-',
                        'weather_code' => 0,
                        'weather_name' => 'Offline',
                        'weather_desc' => 'Data tidak tersedia',
                        'wind_speed' => '-',
                        'updated_at' => now()->format('H:i'),
                        'weather_icon_url' => ''
                    ]
                ];
            }
        });
    }

    private function getWeatherName($code) {
        $codes = [
            0 => 'Cerah', 1 => 'Cerah Berawan', 2 => 'Cerah Berawan', 3 => 'Berawan', 4 => 'Berawan Tebal',
            5 => 'Udara Kabur', 10 => 'Asap', 45 => 'Kabut', 60 => 'Hujan Ringan', 61 => 'Hujan Sedang',
            63 => 'Hujan Lebat', 80 => 'Hujan Petir', 95 => 'Hujan Petir', 97 => 'Hujan Petir'
        ];
        return $codes[$code] ?? 'Berawan';
    }

}
