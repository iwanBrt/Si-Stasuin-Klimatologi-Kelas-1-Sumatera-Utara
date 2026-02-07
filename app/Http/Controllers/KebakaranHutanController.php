<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class KebakaranHutanController extends Controller
{
    public function ffmc()
    {
        return Inertia::render('KebakaranHutan/Ffmc', [
            'title' => 'Fine Fuel Moisture Code (FFMC)',
            'description' => 'Peringatan Kebakaran Hutan dan Lahan - Fine Fuel Moisture Code - Sumatera Utara'
        ]);
    }

    public function fwi()
    {
        return Inertia::render('KebakaranHutan/Fwi', [
            'title' => 'Fire Weather Index (FWI)',
            'description' => 'Peringatan Kebakaran Hutan dan Lahan - Fire Weather Index - Sumatera Utara'
        ]);
    }

    public function hotspot()
    {
        return Inertia::render('KebakaranHutan/Hotspot', [
            'title' => 'Sebaran Titik Panas',
            'description' => 'Citra Satelit Polar - Sebaran Titik Panas Kebakaran Hutan dan Lahan - Sumatera Utara'
        ]);
    }
}
