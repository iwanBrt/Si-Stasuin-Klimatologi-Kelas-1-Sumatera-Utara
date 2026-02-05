<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

class EarthquakeController extends Controller
{
    public function getLatestEarthquake()
    {
        return Cache::remember('latest_earthquake_v1', 300, function () { // Cache 5 mins
            try {
                $response = Http::withoutVerifying()
                    ->timeout(10)
                    ->get('https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json');

                if ($response->successful()) {
                    $data = $response->json();
                    if (isset($data['Infogempa']['gempa'])) {
                        $gempa = $data['Infogempa']['gempa'];
                        
                        // Construct full image URL
                        $gempa['Shakemap'] = 'https://data.bmkg.go.id/DataMKG/TEWS/' . $gempa['Shakemap'];
                        
                        return response()->json([
                            'status' => 'success',
                            'data' => $gempa
                        ]);
                    }
                }
                
                return response()->json([
                    'status' => 'error',
                    'message' => 'Data format invalid'
                ], 500);

            } catch (\Exception $e) {
                return response()->json([
                    'status' => 'error',
                    'message' => $e->getMessage()
                ], 500);
            }
        });
    }
}
