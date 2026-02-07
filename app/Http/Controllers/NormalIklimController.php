<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use ZipArchive;
use Illuminate\Support\Str;

class NormalIklimController extends Controller
{
    public function normalHujanBulanan()
    {
        $petaFiles = $this->getFiles('normal-iklim/normal-hujan-bulanan/peta-normal');
        $grafikFiles = $this->getFiles('normal-iklim/normal-hujan-bulanan/grafik-normal');

        return Inertia::render('NormalIklim/NormalHujanBulanan', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'petaFiles' => $petaFiles,
            'grafikFiles' => $grafikFiles,
        ]);
    }

    private function getFiles($directory)
    {
        $files = Storage::disk('public')->files($directory);
        return collect($files)->filter(function ($file) {
            // Hanya ambil file gambar (jpg, jpeg, png) dan abaikan file txt
            $extension = strtolower(pathinfo($file, PATHINFO_EXTENSION));
            return in_array($extension, ['jpg', 'jpeg', 'png']);
        })->map(function ($file) {
            return [
                'name' => basename($file),
                'url' => Storage::url($file), // This automatically handles the /storage prefix if configured correctly
                'path' => $file,
            ];
        })->sort(function ($a, $b) {
            return $this->sortFiles($a['name'], $b['name']);
        })->values()->all();
    }

    private function sortFiles($nameA, $nameB)
    {
        // Ekstrak angka dari nama file untuk sorting
        // Format peta: 1_JAN.jpg, 2_FEB.jpg, dst
        // Format grafik: SUMUT 1.jpg, SUMUT 2.jpg, dst
        
        // Cek apakah file peta bulanan (format: angka_BULAN)
        if (preg_match('/^(\d+)_/', $nameA, $matchA) && preg_match('/^(\d+)_/', $nameB, $matchB)) {
            return (int)$matchA[1] <=> (int)$matchB[1];
        }
        
        // Cek apakah file grafik ZOM (format: SUMUT angka atau text angka)
        if (preg_match('/(\d+)/', $nameA, $matchA) && preg_match('/(\d+)/', $nameB, $matchB)) {
            return (int)$matchA[1] <=> (int)$matchB[1];
        }
        
        // Default: sorting alfabetis
        return strcasecmp($nameA, $nameB);
    }

    public function downloadFolder(Request $request)
    {
        $type = $request->input('type'); // 'peta' or 'grafik'
        if (!in_array($type, ['peta', 'grafik'])) {
            abort(404);
        }

        $folderName = $type === 'peta' ? 'peta-normal' : 'grafik-normal';
        $directory = "normal-iklim/normal-hujan-bulanan/{$folderName}";
        
        $files = Storage::disk('public')->files($directory);

        // Filter hanya file gambar
        $files = collect($files)->filter(function ($file) {
            $extension = strtolower(pathinfo($file, PATHINFO_EXTENSION));
            return in_array($extension, ['jpg', 'jpeg', 'png']);
        })->all();

        if (empty($files)) {
            return back()->with('error', 'Tidak ada file untuk diunduh.');
        }

        $zipFileName = "normal-hujan-bulanan-{$type}.zip";
        // Ensure the temp directory exists within public disk path
        $tempPath = storage_path('app/public/temp');
        if (!file_exists($tempPath)) {
            mkdir($tempPath, 0755, true);
        }
        
        $zipFilePath = "{$tempPath}/{$zipFileName}";

        $zip = new ZipArchive;
        if ($zip->open($zipFilePath, ZipArchive::CREATE | ZipArchive::OVERWRITE) === TRUE) {
            foreach ($files as $file) {
                $fullPath = Storage::disk('public')->path($file);
                if (file_exists($fullPath)) {
                    $relativeName = basename($file);
                    $zip->addFile($fullPath, $relativeName);
                }
            }
            $zip->close();
        } else {
             return back()->with('error', 'Gagal membuat file zip.');
        }

        if (file_exists($zipFilePath)) {
            return response()->download($zipFilePath)->deleteFileAfterSend(true);
        }

        return back()->with('error', 'File zip tidak ditemukan.');
    }
}
