<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class KarhutlaController extends Controller
{
    /**
     * Get the latest FFMC map from BMKG.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getLatestMap($type = 'ffmc')
    {
        // Validate type
        if (!in_array($type, ['ffmc', 'fwi'])) {
            $type = 'ffmc';
        }

        $cacheKey = "karhutla_maps_{$type}_v2";
        
        // Try to get from cache
        $maps = Cache::get($cacheKey);

        if (!$maps) {
            try {
                // 1. Get the base URL from the page source
                // The page ID is usually different: 2 for FFMC. FWI is at /cuaca/karhutla/fwi/2 ? Let's check.
                // Actually the URL scraping is robust enough if we just target the right pattern.
                // Wait, sumut is ID 02. Let's try to scrape the FWI page if type is FWI.
                $pageUrl = $type === 'fwi' 
                    ? 'https://www.bmkg.go.id/cuaca/karhutla/fwi/2' 
                    : 'https://www.bmkg.go.id/cuaca/karhutla/ffmc/2';
                
                $response = Http::timeout(10)->get($pageUrl);

                if ($response->successful()) {
                    $html = $response->body();
                    
                    // Regex to find the specific image prefix for Sumatera Utara (ID 02)
                    // Pattern: "https://dataweb.bmkg.go.id/cuaca/spartan/02_sumut_ffmc_" or "..._fwi_"
                    $pattern = "/\"https:[^\"]*02_sumut_{$type}_\"/";
                    preg_match($pattern, $html, $matches);
                    
                    if (isset($matches[0])) {
                        $baseUrl = trim($matches[0], '"');
                    } else {
                        // Fallback hardcoded URL
                        $baseUrl = "https://dataweb.bmkg.go.id/cuaca/spartan/02_sumut_{$type}_";
                    }

                    // 2. Generate the list of maps (00 to 07)
                    $generatedMaps = [];
                    $labels = [
                        '00' => 'Observasi',
                        '01' => 'Prediksi H+1',
                        '02' => 'Prediksi H+2',
                        '03' => 'Prediksi H+3',
                        '04' => 'Prediksi H+4',
                        '05' => 'Prediksi H+5',
                        '06' => 'Prediksi H+6',
                        '07' => 'Prediksi H+7',
                    ];

                    foreach ($labels as $suffix => $label) {
                        $generatedMaps[] = [
                            'label' => $label,
                            'url' => $baseUrl . $suffix . '.png',
                            'code' => $suffix
                        ];
                    }
                    
                    $maps = $generatedMaps;
                    Cache::put($cacheKey, $maps, 43200); // Cache for 12 hours
                } else {
                    Log::warning("Failed to fetch {$type} page: " . $response->status());
                }

            } catch (\Exception $e) {
                Log::error("Error scraping {$type} map: " . $e->getMessage());
            }
        }

        if ($maps) {
            return response()->json([
                'status' => 'success',
                'data' => $maps
            ]);
        }

        return response()->json([
            'status' => 'error',
            'message' => 'Gagal mengambil data peta Karhutla.',
            'fallback_image' => 'https://placehold.co/600x400?text=Data+BMKG+Tidak+Tersedia'
        ], 500);
    }

    /**
     * Get hotspot satellite image for Sumatera Utara
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getHotspotMap()
    {
        $cacheKey = 'hotspot_map_sumut_v1';
        
        // Try to get from cache
        $mapData = Cache::get($cacheKey);

        if (!$mapData) {
            try {
                // Try multiple possible URL patterns for Sumatera Utara hotspot
                $possibleUrls = [
                    'https://dataweb.bmkg.go.id/cuaca/satelit/hotspot/Hotspot_Sumut.png',
                    'https://dataweb.bmkg.go.id/Satelit/IMAGE/HIMA/hotspot/HotSpot_Sumut.png',
                    'https://dataweb.bmkg.go.id/Satelit/IMAGE/HIMA/hotspot/Hotspot_Sumut.png',
                    'https://dataweb.bmkg.go.id/cuaca/satelit/hotspot/HKB_hotspot_HIMA_Sumatera-Utara-terbaru.png',
                    'https://datacapa.bmkg.go.id/cuaca/satelit/hotspot/Hotspot_Sumut.png',
                ];

                $imageUrl = null;

                // Test each URL to find one that works
                foreach ($possibleUrls as $testUrl) {
                    try {
                        $response = Http::timeout(5)->head($testUrl);
                        if ($response->successful()) {
                            $imageUrl = $testUrl;
                            Log::info("Found working hotspot URL: $imageUrl");
                            break;
                        }
                    } catch (\Exception $e) {
                        // Continue to next URL
                        continue;
                    }
                }

                // If none of the URLs work, try scraping the page
                if (!$imageUrl) {
                    $pageUrl = 'https://www.bmkg.go.id/cuaca/satelit/polar-hotspot/3';
                    $response = Http::timeout(10)->get($pageUrl);

                    if ($response->successful()) {
                        $html = $response->body();
                        
                        // Try to find image URL in various formats
                        $patterns = [
                            '/https:\/\/[^"\']*hotspot[^"\']*Sumut[^"\']*\.png/i',
                            '/https:\/\/[^"\']*Sumatera[^"\']*hotspot[^"\']*\.png/i',
                            '/https:\/\/dataweb\.bmkg\.go\.id\/[^"\']*hotspot[^"\']*\.png/i',
                            '/https:\/\/datacapa\.bmkg\.go\.id\/[^"\']*hotspot[^"\']*\.png/i',
                        ];

                        $found = false;
                        foreach ($patterns as $pattern) {
                            if ($found) break;
                            
                            if (preg_match($pattern, $html, $matches)) {
                                // Verify the URL works
                                try {
                                    $testResponse = Http::timeout(5)->head($matches[0]);
                                    if ($testResponse->successful()) {
                                        $imageUrl = $matches[0];
                                        Log::info("Found hotspot URL via scraping: $imageUrl");
                                        $found = true;
                                    }
                                } catch (\Exception $e) {
                                    continue;
                                }
                            }
                        }
                    }
                }

                if ($imageUrl) {
                    $mapData = [
                        'url' => $imageUrl,
                        'label' => 'Sebaran Titik Panas - Sumatera Utara',
                        'region' => 'Sumatera Utara'
                    ];

                    Cache::put($cacheKey, $mapData, 3600); // Cache for 1 hour
                } else {
                    Log::warning('No working hotspot URL found');
                }

            } catch (\Exception $e) {
                Log::error('Error fetching hotspot map: ' . $e->getMessage());
            }
        }

        if ($mapData) {
            return response()->json([
                'status' => 'success',
                'data' => $mapData
            ]);
        }

        return response()->json([
            'status' => 'error',
            'message' => 'Gagal mengambil data peta hotspot. Data mungkin sedang tidak tersedia dari BMKG.',
            'fallback_image' => 'https://placehold.co/600x400?text=Data+Hotspot+BMKG+Tidak+Tersedia'
        ], 500);
    }
}
