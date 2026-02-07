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
        $contents = \App\Models\Content::where('section', 'tim-kami')
            ->orderBy('sort_order', 'asc')
            ->get();
            
        $teams = [];
        
        if ($contents->isNotEmpty()) {
            $teams = $contents->groupBy('category')->map(function ($items, $category) {
                return [
                    'division' => $category,
                    'members' => $items->map(function ($item) {
                        return [
                            'name' => $item->title,
                            'role' => $item->subtitle,
                            'image' => $item->file_path ? \Illuminate\Support\Facades\Storage::url($item->file_path) : null,
                        ];
                    })->values()
                ];
            })->values();
        }

        return Inertia::render('Profile/TimKami', [
            'dbTeams' => $teams // Pass as dbTeams to distinguish from hardcoded
        ]);
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
