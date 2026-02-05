<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function tentangKami()
    {
        return Inertia::render('Profile/TentangKami');
    }

    public function sejarahVisiMisi()
    {
        return Inertia::render('Profile/SejarahVisiMisi');
    }

    public function staklimSumut()
    {
        return Inertia::render('Profile/StaklimSumut');
    }

    public function timKami()
    {
        return Inertia::render('Profile/TimKami');
    }

    public function layanan()
    {
        return Inertia::render('Layanan');
    }

    public function permintaanData()
    {
        return Inertia::render('Layanan/PermintaanData');
    }
}
