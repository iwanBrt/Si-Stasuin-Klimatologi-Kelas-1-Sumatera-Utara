<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MailArchive;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use App\Exports\MailArchivesExport;
use Maatwebsite\Excel\Facades\Excel;
use Barryvdh\DomPDF\Facade\Pdf;

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

        // Calculate stats
        $stats = [
            'incoming' => \App\Models\MailArchive::where('category', 'incoming')->count(),
            'outgoing' => \App\Models\MailArchive::where('category', 'outgoing')->count(),
            'total' => \App\Models\MailArchive::count(),
        ];

        return Inertia::render('Admin/Archives/Index', [
            'archives' => $archives,
            'filters' => $request->only(['search', 'category']),
            'stats' => $stats,
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

    public function update(Request $request, MailArchive $archive)
    {
        $validated = $request->validate([
            'category' => 'required|in:incoming,outgoing',
            'reference_number' => 'required|string|max:255',
            'date' => 'required|date',
            'sender' => 'required|string|max:255',
            'recipient' => 'required|string|max:255',
            'subject' => 'required|string|max:255',
            'description' => 'nullable|string',
            'file' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:5120', // Optional for update
        ]);

        // If new file is uploaded, delete old file and store new one
        if ($request->hasFile('file')) {
            // Delete old file
            if ($archive->file_path && Storage::disk('public')->exists($archive->file_path)) {
                Storage::disk('public')->delete($archive->file_path);
            }
            
            // Store new file
            $path = $request->file('file')->store('archives', 'public');
            $validated['file_path'] = $path;
        }

        $archive->update($validated);

        return redirect()->back()->with('success', 'Arsip surat berhasil diperbarui.');
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

    public function export(Request $request)
    {
        $request->validate([
            'format' => 'required|in:excel,pdf',
            'category' => 'nullable|in:incoming,outgoing',
            'period' => 'required|in:all,month,year',
            'month' => 'nullable|integer|min:1|max:12',
            'year' => 'nullable|integer|min:2020',
        ]);

        $category = $request->category;
        $period = $request->period;
        $month = $request->month;
        $year = $request->year;

        // Build query
        $query = MailArchive::query();

        if ($category) {
            $query->where('category', $category);
        }

        if ($period === 'month' && $month && $year) {
            $query->whereYear('date', $year)->whereMonth('date', $month);
        } elseif ($period === 'year' && $year) {
            $query->whereYear('date', $year);
        }

        $archives = $query->orderBy('date', 'desc')->get();

        // Generate labels
        $categoryLabel = $category 
            ? ($category === 'incoming' ? 'Surat Masuk' : 'Surat Keluar') 
            : 'Semua Kategori';

        $monthNames = [
            1 => 'Januari', 2 => 'Februari', 3 => 'Maret', 4 => 'April',
            5 => 'Mei', 6 => 'Juni', 7 => 'Juli', 8 => 'Agustus',
            9 => 'September', 10 => 'Oktober', 11 => 'November', 12 => 'Desember'
        ];

        if ($period === 'month' && $month && $year) {
            $periodLabel = $monthNames[$month] . ' ' . $year;
        } elseif ($period === 'year' && $year) {
            $periodLabel = 'Tahun ' . $year;
        } else {
            $periodLabel = 'Semua Periode';
        }

        if ($request->format === 'excel') {
            return Excel::download(
                new MailArchivesExport($category, $period, $month, $year),
                'arsip-surat-' . now()->format('Y-m-d') . '.xlsx'
            );
        } else {
            $pdf = Pdf::loadView('admin.archives.pdf', [
                'archives' => $archives,
                'categoryLabel' => $categoryLabel,
                'periodLabel' => $periodLabel,
            ])->setPaper('a4', 'landscape');

            return $pdf->download('arsip-surat-' . now()->format('Y-m-d') . '.pdf');
        }
    }
}
