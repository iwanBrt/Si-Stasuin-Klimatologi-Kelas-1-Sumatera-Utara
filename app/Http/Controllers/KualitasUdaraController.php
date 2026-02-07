<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class KualitasUdaraController extends Controller
{
    public function pm25()
    {
        $weatherData = null;
        $error = null;

        try {
            $apiKey = env('IQAIR_API_KEY');
            $apiUrl = env('IQAIR_API_URL', 'http://api.airvisual.com/v2');
            
            $response = Http::get("{$apiUrl}/city", [
                'city' => 'Medan',
                'state' => 'North Sumatra',
                'country' => 'Indonesia',
                'key' => $apiKey,
            ]);

            if ($response->successful()) {
                $weatherData = $response->json()['data'];
            } else {
                Log::error('IQAir API Error: ' . $response->body());
                $error = 'Gagal mengambil data kualitas udara.';
            }
        } catch (\Exception $e) {
            Log::error('IQAir Connection Error: ' . $e->getMessage());
            $error = 'Terjadi kesalahan koneksi.';
        }

        return Inertia::render('KualitasUdara/PM25', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'airQualityData' => $weatherData,
            'error' => $error,
        ]);
    }

    public function kimiaAirHujan()
    {
        return Inertia::render('KualitasUdara/KimiaAirHujan', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
        ]);
    }
}
