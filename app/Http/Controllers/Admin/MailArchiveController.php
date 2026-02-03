<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MailArchive;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class MailArchiveController extends Controller
{
    public function index(Request $request)
    {
        $query = MailArchive::query();

        // Filter by category (incoming/outgoing)
        if ($request->has('category')) {
            $query->where('category', $request->category);
        } else {
            // Default to incoming if not specified, or just show all. 
            // The prompt asks for tabs, so usually we filter by one active tab.
            // Let's check provided requirement: "Filter by category (tab)".
            // I'll assume if no category param, we might default to 'incoming' in frontend, 
            // but backend returns what is asked. 
            // Let's return all if not specified, frontend can filter or pass param.
            // Actually better to respect the 'category' param or default to 'incoming' if that is the UX.
            // I will make it optional filter.
        }

        // Search
        if ($request->search) {
            $query->where(function($q) use ($request) {
                $q->where('reference_number', 'like', '%' . $request->search . '%')
                  ->orWhere('subject', 'like', '%' . $request->search . '%')
                  ->orWhere('sender', 'like', '%' . $request->search . '%')
                  ->orWhere('recipient', 'like', '%' . $request->search . '%');
            });
        }

        $archives = $query->latest('date')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Archives/Index', [
            'archives' => $archives,
            'filters' => $request->only(['search', 'category']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category' => 'required|in:incoming,outgoing',
            'reference_number' => 'required|string|max:255',
            'date' => 'required|date',
            'sender' => 'required|string|max:255',
            'recipient' => 'required|string|max:255',
            'subject' => 'required|string|max:255',
            'description' => 'nullable|string',
            'file' => 'required|file|mimes:pdf,jpg,jpeg,png|max:5120', // Max 5MB
        ]);

        if ($request->hasFile('file')) {
            $path = $request->file('file')->store('archives', 'public');
            $validated['file_path'] = $path;
        }

        MailArchive::create($validated);

        return redirect()->back()->with('success', 'Arsip surat berhasil ditambahkan.');
    }

    public function destroy(MailArchive $archive)
    {
        // Delete file from storage
        if ($archive->file_path && Storage::disk('public')->exists($archive->file_path)) {
            Storage::disk('public')->delete($archive->file_path);
        }

        $archive->delete();

        return redirect()->back()->with('success', 'Arsip surat berhasil dihapus.');
    }
}
