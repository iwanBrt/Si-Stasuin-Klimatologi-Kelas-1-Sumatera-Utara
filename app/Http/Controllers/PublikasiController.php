<?php

namespace App\Http\Controllers;

use App\Models\Content;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PublikasiController extends Controller
{
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

    public function buletinMusim()
    {
        return Inertia::render('Publikasi/PublikasiContent', [
            'contents' => $this->getContentBySection('publikasi-buletin-musim'),
            'title' => 'Buletin Prakiraan Musim',
            'subtitle' => 'Publikasi resmi mengenai prakiraan awal musim kemarau dan hujan wilayah Sumatera Utara.',
            'section' => 'buletin-musim'
        ]);
    }

    public function buletinBulanan()
    {
        return Inertia::render('Publikasi/PublikasiContent', [
            'contents' => $this->getContentBySection('publikasi-buletin-bulanan'),
            'title' => 'Buletin Info Iklim Bulanan',
            'subtitle' => 'Informasi perkembangan iklim dan kualitas udara bulanan di wilayah Sumatera Utara.',
            'section' => 'buletin-bulanan'
        ]);
    }

    public function bukuSaku()
    {
        return Inertia::render('Publikasi/PublikasiContent', [
            'contents' => $this->getContentBySection('publikasi-buku-saku'),
            'title' => 'Buku Saku MKKuG',
            'subtitle' => 'Pedoman ringkas mengenai Meteorologi, Klimatologi, Kualitas Udara, dan Geofisika.',
            'section' => 'buku-saku'
        ]);
    }
}
