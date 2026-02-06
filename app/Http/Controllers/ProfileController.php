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

    // User Profile Management
    public function edit(Request $request)
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => false,
            'status' => session('status'),
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,' . $request->user()->id,
        ]);

        $request->user()->update($validated);

        return redirect()->route('profile.edit')->with('success', 'Profile updated successfully.');
    }

    public function destroy(Request $request)
    {
        $request->validate([
            'password' => 'required|current_password',
        ]);

        $user = $request->user();
        
        auth()->logout();
        $user->delete();

        return redirect('/')->with('success', 'Account deleted successfully.');
    }
}
