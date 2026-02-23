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
        $contents = \App\Models\Content::where('section', 'kualitas-udara-pm25')
            ->where('is_active', true)
            ->orderBy('sort_order', 'desc')
            ->get()
            ->map(function ($content) {
                if ($content->file_path && !str_starts_with($content->file_path, 'http') && !str_starts_with($content->file_path, '/storage')) {
                    $content->file_url = \Illuminate\Support\Facades\Storage::url($content->file_path);
                } else {
                    $content->file_url = $content->file_path;
                }
                return $content;
            });

        return Inertia::render('KualitasUdara/PM25', [
            'contents' => $contents,
        ]);
    }

    public function kimiaAirHujan()
    {
        return Inertia::render('KualitasUdara/KimiaAirHujan', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
        ]);
    }

    public function gasRumahKaca()
    {
        $contents = \App\Models\Content::where('section', 'kualitas-udara-grk')
            ->where('is_active', true)
            ->orderBy('sort_order', 'asc')
            ->get()
            ->map(function ($content) {
                if ($content->file_path && !str_starts_with($content->file_path, 'http') && !str_starts_with($content->file_path, '/storage')) {
                    $content->file_url = \Illuminate\Support\Facades\Storage::url($content->file_path);
                } else {
                    $content->file_url = $content->file_path;
                }
                return $content;
            });

        return Inertia::render('KualitasUdara/GasRumahKaca', [
            'contents' => $contents,
        ]);
    }
}
