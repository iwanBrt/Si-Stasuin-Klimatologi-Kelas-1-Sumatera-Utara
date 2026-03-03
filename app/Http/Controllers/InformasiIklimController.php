<?php

namespace App\Http\Controllers;

use App\Models\Content;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class InformasiIklimController extends Controller
{
    /**
     * Helper to get content by section and render the appropriate view.
     */
    private function getContentBySection(string $section)
    {
        return Content::where('section', $section)
            ->where('is_active', true)
            ->orderBy('sort_order', 'desc')
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

    public function curahHujanHarian()
    {
        return Inertia::render('InformasiIklim/CurahHujanHarian', [
            'contents' => $this->getContentBySection('curah-hujan-harian'),
        ]);
    }

    // --- DASARIAN ---

    public function prospekIklimDasarian()
    {
        return Inertia::render('InformasiIklim/ClimateInfoContent', [
            'contents' => $this->getContentBySection('prospek-iklim-dasarian'),
            'section' => 'prospek-iklim-dasarian',
            'title' => 'Prospek Iklim Dasarian',
            'subtitle' => 'Prospek kondisi iklim wilayah Sumatera Utara untuk periode 10 hari ke depan.',
            'infoType' => 'Dasarian',
        ]);
    }

    public function analisisHariTanpaHujan()
    {
        return Inertia::render('InformasiIklim/ClimateInfoContent', [
            'contents' => $this->getContentBySection('analisis-hari-tanpa-hujan'),
            'section' => 'analisis-hari-tanpa-hujan',
            'title' => 'Analisis Hari Tanpa Hujan',
            'subtitle' => 'Peta monitoring dan analisis hari tanpa hujan berturut-turut di wilayah Sumatera Utara.',
            'infoType' => 'Dasarian',
        ]);
    }

    public function analisisCurahHujanDasarian()
    {
        return Inertia::render('InformasiIklim/ClimateInfoContent', [
            'contents' => $this->getContentBySection('analisis-curah-hujan-dasarian'),
            'section' => 'analisis-curah-hujan-dasarian',
            'title' => 'Analisis Curah Hujan Dasarian',
            'subtitle' => 'Analisis jumlah curah hujan dan sifat hujan yang terjadi pada dasarian sebelumnya.',
            'infoType' => 'Dasarian',
        ]);
    }

    public function prakiraanCurahHujanDasarian()
    {
        return Inertia::render('InformasiIklim/ClimateInfoContent', [
            'contents' => $this->getContentBySection('prakiraan-curah-hujan-dasarian'),
            'section' => 'prakiraan-curah-hujan-dasarian',
            'title' => 'Prakiraan Curah Hujan Dasarian',
            'subtitle' => 'Prakiraan jumlah curah hujan untuk periode dasarian mendatang.',
            'infoType' => 'Dasarian',
        ]);
    }

    public function probabilitasCurahHujanDasarian()
    {
        return Inertia::render('InformasiIklim/ClimateInfoContent', [
            'contents' => $this->getContentBySection('probabilitas-curah-hujan-dasarian'),
            'section' => 'probabilitas-curah-hujan-dasarian',
            'title' => 'Probabilitas Curah Hujan Dasarian',
            'subtitle' => 'Peluang atau probabilitas terjadinya curah hujan dengan ambang batas tertentu.',
            'infoType' => 'Dasarian',
        ]);
    }

    public function prakiraanRawanBanjirDasarian()
    {
        return Inertia::render('InformasiIklim/ClimateInfoContent', [
            'contents' => $this->getContentBySection('prakiraan-rawan-banjir-dasarian'),
            'section' => 'prakiraan-rawan-banjir-dasarian',
            'title' => 'Prakiraan Daerah Potensi Rawan Banjir',
            'subtitle' => 'Potensi kerawanan banjir di wilayah Sumatera Utara berdasarkan prakiraan curah hujan dasarian.',
            'infoType' => 'Dasarian',
        ]);
    }

    // --- BULANAN ---

    public function analisisHujanBulanan()
    {
        return Inertia::render('InformasiIklim/ClimateInfoContent', [
            'contents' => $this->getContentBySection('analisis-hujan-bulanan'),
            'section' => 'analisis-hujan-bulanan',
            'title' => 'Analisis Hujan Bulanan',
            'subtitle' => 'Analisis data curah hujan bulanan wilayah Sumatera Utara berdasarkan pengamatan Stasiun Klimatologi BMKG.',
            'infoType' => 'Bulanan',
        ]);
    }

    public function prakiraanHujanBulanan()
    {
        return Inertia::render('InformasiIklim/ClimateInfoContent', [
            'contents' => $this->getContentBySection('prakiraan-hujan-bulanan'),
            'section' => 'prakiraan-hujan-bulanan',
            'title' => 'Prakiraan Hujan Bulanan',
            'subtitle' => 'Prakiraan curah hujan bulanan wilayah Sumatera Utara untuk mendukung perencanaan dan antisipasi cuaca.',
            'infoType' => 'Bulanan',
        ]);
    }

    public function prakiraanKetersediaanAir()
    {
        return Inertia::render('InformasiIklim/ClimateInfoContent', [
            'contents' => $this->getContentBySection('prakiraan-ketersediaan-air'),
            'section' => 'prakiraan-ketersediaan-air',
            'title' => 'Ketersediaan Air Bagi Tanaman',
            'subtitle' => 'Ketersediaan air bagi tanaman berdasarkan kondisi curah hujan dan iklim wilayah Sumatera Utara.',
            'infoType' => 'Bulanan',
        ]);
    }

    public function spi()
    {
        return Inertia::render('InformasiIklim/ClimateInfoContent', [
            'contents' => $this->getContentBySection('spi'),
            'section' => 'spi',
            'title' => 'SPI (Standardized Precipitation Index)',
            'subtitle' => 'Indeks standar curah hujan untuk mengukur kondisi kekeringan dan surplus curah hujan wilayah Sumatera Utara.',
            'infoType' => 'Bulanan',
        ]);
    }
}
