<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Carbon\Carbon;

class WeatherController extends Controller
{
    /**
     * Get Current Weather from BMKG Digital Forecast XML (Single Source, Fast)
     */
    public function getCurrentWeather()
    {
        // Cache data for 30 minutes to avoid hitting BMKG server repeatedly
        return Cache::remember('weather_sumut_xml_v1', 1800, function () {
            try {
                // Official BMKG Open Data XML implementation
                $url = 'https://data.bmkg.go.id/DataMKG/MEWS/DigitalForecast/DigitalForecast-SumateraUtara.xml';
                
                // Fetch XML content with a reasonable timeout
                $response = Http::withoutVerifying()
                    ->timeout(30)
                    ->get($url);

                if (!$response->successful()) {
                    \Log::error('BMKG XML Fetch Failed: ' . $response->status());
                    return [];
                }

                $xmlContent = $response->body();
                
                // Parse XML safely
                libxml_use_internal_errors(true);
                $xml = simplexml_load_string($xmlContent);
                
                if ($xml === false) {
                    \Log::error('BMKG XML Parse Failed');
                    return [];
                }

                $results = [];
                $now = Carbon::now();

                // Process areas
                if (isset($xml->forecast->area)) {
                    foreach ($xml->forecast->area as $area) {
                        $attributes = $area->attributes();
                        $desc = (string)$attributes['description']; // City Name
                        $id = (string)$attributes['id'];
                        
                        // Filter out empty descriptions
                        if (empty($desc)) continue;

                        // Initialize weather parameters
                        $temp = 0;
                        $humidity = 0;
                        $weatherCode = 0;
                        $windSpeed = 0;
                        $closestTime = null;
                        
                        // Find closest forecast time
                        // We iterate through 'weather' parameter first as it's the main indicator
                        foreach ($area->parameter as $param) {
                            $paramId = (string)$param->attributes()['id'];
                            
                            if ($paramId === 'weather') {
                                $minDiff = PHP_INT_MAX;
                                
                                foreach ($param->timerange as $timerange) {
                                    try {
                                        $datetimeStr = (string)$timerange->attributes()['datetime']; // Format: YmdHi
                                        $forecastTime = Carbon::createFromFormat('YmdHi', $datetimeStr);
                                        $diff = abs($now->timestamp - $forecastTime->timestamp);

                                        if ($diff < $minDiff) {
                                            $minDiff = $diff;
                                            $closestTime = $forecastTime;
                                            $weatherCode = (int)$timerange->value;
                                            $formatTimeStr = $datetimeStr; // Keep format consistent for other params
                                        }
                                    } catch (\Exception $e) { continue; }
                                }
                            }
                        }

                        // If we found a valid time, fetch other parameters matching that time
                        if ($closestTime && isset($formatTimeStr)) {
                            foreach ($area->parameter as $param) {
                                $paramId = (string)$param->attributes()['id'];
                                
                                foreach ($param->timerange as $timerange) {
                                    $dt = (string)$timerange->attributes()['datetime'];
                                    // Some parameters use h="0", h="6" attributes, but datetime is safest to match
                                    if ($dt === $formatTimeStr) {
                                        $val = (string)$timerange->value;
                                        
                                        if ($paramId === 't') $temp = (int)$val;
                                        if ($paramId === 'hu') $humidity = (int)$val;
                                        if ($paramId === 'ws') $windSpeed = (float)$val; // Knot
                                    }
                                }
                            }
                            
                            // Convert Wind Speed from Knot to Km/h (approx)
                            $windSpeed = round($windSpeed * 1.852);

                            // Determine Type (Kota/Kab)
                            $type = (stripos($desc, 'Kota') !== false) ? 'Kota' : 'Kab';
                            $cleanName = trim(str_ireplace(['Kota ', 'Kab. '], '', $desc));

                            $results[] = [
                                'id' => $id,
                                'name' => $cleanName,
                                'type' => $type,
                                'temp' => $temp,
                                'humidity' => $humidity,
                                'weather_code' => $weatherCode,
                                'weather_name' => $this->getWeatherNameCode($weatherCode),
                                'wind_speed' => $windSpeed,
                                'updated_at' => $closestTime->format('H:i')
                            ];
                        }
                    }
                }

                // Sort Alphabetically
                usort($results, function($a, $b) {
                    return strcasecmp($a['name'], $b['name']);
                });

                return $results;

            } catch (\Exception $e) {
                \Log::error('Weather Controller Error: ' . $e->getMessage());
                return [];
            }
        });
    }

    /**
     * Get Early Warning based on Weather Codes
     */
    public function getEarlyWarning()
    {
        // Cache result for 20 minutes
        $data = Cache::remember('weather_warning_sumut_hybrid_v3', 1200, function () {
            // 1. Fetch Text from BMKG Website (Source of Truth for Text)
            $warningText = "";
            $hasInfo = false;
            
            try {
                $url = 'https://www.bmkg.go.id/cuaca/peringatan-dini-cuaca/12';
                $response = Http::withoutVerifying()->timeout(15)->get($url);
                
                if ($response->successful()) {
                    $html = $response->body();
                    
                    // The warning text is typically the first substantial paragraph containing "Peringatan Dini"
                    // It often starts with "UPDATE Peringatan Dini..." or just "Peringatan Dini..."
                    // And ends with the forecaster signature like "Prakirawan BMKG - Sumatera Utara"
                    // We use the 's' modifier for dot matches newline
                    if (preg_match('/((?:UPDATE\s+)?Peringatan\s+Dini\s+Cuaca\s+Wilayah\s+Sumatera\s+Utara.*?Prakirawan\s+BMKG.*?(?:Sumatera\s+Utara)?)/is', $html, $matches)) {
                        $cleaned = strip_tags($matches[1]);
                        // Normalize whitespace
                        $warningText = trim(preg_replace('/\s+/', ' ', $cleaned));
                        if (!empty($warningText)) $hasInfo = true;
                    } 
                    
                    // 1.b Scrape Image URL
                    // Look for an image that is likely the warning map. 
                    // Usually it's inside the same container or has 'peringatan' or region name in src.
                    // We look for .png, .jpg, .jpeg
                    if (preg_match('/<img[^>]+src="([^"]*(?:SumateraUtara|Peringatan|Warn)[^"]*\.(?:png|jpg|jpeg))"[^>]*>/i', $html, $imgMatches)) {
                        $imgSrc = $imgMatches[1];
                        // Handle relative URLs
                        if (!filter_var($imgSrc, FILTER_VALIDATE_URL)) {
                            // If it starts with /, append to domain
                            if (strpos($imgSrc, '/') === 0) {
                                $warningImage = 'https://www.bmkg.go.id' . $imgSrc;
                            } else {
                                // relative to current path? assume root for safety or try adaptable base
                                $warningImage = 'https://www.bmkg.go.id/' . $imgSrc;
                            }
                        } else {
                            $warningImage = $imgSrc;
                        }
                    } else {
                        // Fallback to the known static URL if scrape fails but we have text
                         $warningImage = 'https://data.bmkg.go.id/DataMKG/MEWS/LEWS/SumateraUtara.png';
                    }
                }
            } catch (\Exception $e) {
                \Log::error('Warning Scraper Error: ' . $e->getMessage());
            }

            // 2. Get Affected Cities from XML (Source of Truth for Locations/Map)
            $weatherData = $this->getCurrentWeather(); 
            $regions = [];
            
            if (is_array($weatherData)) {
                foreach ($weatherData as $city) {
                    $code = $city['weather_code'];
                    if (in_array($code, [61, 63, 80, 95, 97])) {
                        $regions[] = [
                            'region' => $city['name'],
                            'condition' => $city['weather_name'],
                            'code' => $code,
                            'severity' => ($code >= 95 || $code == 63) ? 'high' : 'medium'
                        ];
                    }
                }
            }
            
            return [
                'warning_text' => $warningText,
                'warning_image' => $warningImage ?? 'https://data.bmkg.go.id/DataMKG/MEWS/LEWS/SumateraUtara.png', // Ensure fallback
                'has_warning' => $hasInfo || count($regions) > 0,
                'regions_count' => count($regions),
                'regions' => $regions,
                'source' => 'BMKG Pusat'
            ];
        });

        return response()->json($data);
    }

    /**
     * Helper: Translate Weather Code to Name
     */
    private function getWeatherNameCode($code) {
        $codes = [
            0 => 'Cerah', 
            1 => 'Cerah Berawan', 
            2 => 'Cerah Berawan', 
            3 => 'Berawan', 
            4 => 'Berawan Tebal', 
            5 => 'Udara Kabur', 
            10 => 'Asap', 
            45 => 'Kabut', 
            60 => 'Hujan Ringan', 
            61 => 'Hujan Sedang', 
            63 => 'Hujan Lebat', 
            80 => 'Hujan Lokal', 
            95 => 'Hujan Petir', 
            97 => 'Hujan Petir'
        ];
        return $codes[$code] ?? 'Berawan';
    }
}
