<?php

namespace App\Http\Controllers;

use App\Models\Content;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class NormalIklimController extends Controller
{
    /**
     * Helper to get content by section and render the appropriate view.
     */
    private function getContentBySection(string $section)
    {
        return Content::where('section', $section)
            ->where('is_active', true)
            ->orderBy('sort_order', 'asc')
            ->get()
            ->map(function ($content) {
                if ($content->file_path && !str_starts_with($content->file_path, 'http') && !str_starts_with($content->file_path, '/storage')) {
                    $content->file_url = Storage::url($content->file_path);
                } else {
                    $content->file_url = $content->file_path;
                }
                return $content;
            });
    }

    public function normalHujanBulanan()
    {
        return Inertia::render('NormalIklim/NormalIklimContent', [
            'contents' => $this->getContentBySection('normal-hujan-bulanan'),
            'section' => 'normal-hujan-bulanan',
            'title' => 'Normal Hujan Bulanan',
            'subtitle' => 'Data rata-rata curah hujan bulanan wilayah Sumatera Utara periode standar BMKG.',
        ]);
    }

    public function petaZonaMusim()
    {
        return Inertia::render('NormalIklim/NormalIklimContent', [
            'contents' => $this->getContentBySection('normal-peta-zom'),
            'section' => 'normal-peta-zom',
            'title' => 'Peta Zona Musim (ZOM)',
            'subtitle' => 'Pembagian wilayah berdasarkan pola curah hujan yang memiliki perbedaan jelas antara periode musim kemarau dan musim hujan.',
        ]);
    }

    public function schmidtFergusson()
    {
        return Inertia::render('NormalIklim/NormalIklimContent', [
            'contents' => $this->getContentBySection('normal-schmidt-fergusson'),
            'section' => 'normal-schmidt-fergusson',
            'title' => 'Peta Iklim Schmidt Fergusson',
            'subtitle' => 'Klasifikasi tipe iklim berdasarkan perbandingan rata-rata bulan kering dan bulan basah.',
        ]);
    }

    public function oldeman()
    {
        return Inertia::render('NormalIklim/NormalIklimContent', [
            'contents' => $this->getContentBySection('normal-oldeman'),
            'section' => 'normal-oldeman',
            'title' => 'Peta Iklim Oldeman',
            'subtitle' => 'Klasifikasi iklim yang dikhususkan untuk kebutuhan sektor pertanian tanaman pangan.',
        ]);
    }

    public function suhuMaksimum()
    {
        return Inertia::render('NormalIklim/NormalIklimContent', [
            'contents' => $this->getContentBySection('normal-suhu-maksimum'),
            'section' => 'normal-suhu-maksimum',
            'title' => 'Normal Suhu Maksimum',
            'subtitle' => 'Rata-rata suhu tertinggi yang tercatat di wilayah Sumatera Utara dalam periode standar.',
        ]);
    }

    public function suhuMinimum()
    {
        return Inertia::render('NormalIklim/NormalIklimContent', [
            'contents' => $this->getContentBySection('normal-suhu-minimum'),
            'section' => 'normal-suhu-minimum',
            'title' => 'Normal Suhu Minimum',
            'subtitle' => 'Rata-rata suhu terendah yang tercatat di wilayah Sumatera Utara dalam periode standar.',
        ]);
    }
}
