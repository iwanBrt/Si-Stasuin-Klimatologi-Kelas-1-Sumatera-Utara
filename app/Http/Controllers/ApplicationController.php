<?php

namespace App\Http\Controllers;

use App\Models\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ApplicationController extends Controller
{
    public function index()
    {
        $applications = auth()->user()
            ->applications()
            ->latest()
            ->get()
            ->map(function ($app) {
                return [
                    'id' => $app->id,
                    'title' => $app->title,
                    'position' => $app->application_type,
                    'submittedDate' => $app->created_at->format('Y-m-d'),
                    'startDate' => $app->start_date->format('Y-m-d'),
                    'endDate' => $app->end_date->format('Y-m-d'),
                    'status' => $app->status,
                    'reviewDate' => $app->reviewed_at?->format('Y-m-d'),
                    'notes' => $app->admin_notes,
                ];
            });

        return Inertia::render('Applicant/MyApplications', [
            'applications' => $applications
        ]);
    }

    public function create()
    {
        return Inertia::render('Applicant/CreateApplication');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'application_type' => 'required|string|in:magang,penelitian,pkl,observasi,kerja_praktek,tugas_akhir',
            'title' => 'required|string|max:255',
            'institution_name' => 'required|string|max:255',
            'institution_address' => 'nullable|string',
            'department' => 'required|string|max:255',
            'study_program' => 'required|string|max:255',
            'student_id' => 'required|string|max:50',
            'phone' => 'required|string|max:20',
            'start_date' => 'required|date|after_or_equal:today',
            'end_date' => 'required|date|after:start_date',
            'research_field' => 'nullable|string|max:255',
            'research_objective' => 'nullable|string',
            'supervisor_name' => 'nullable|string|max:255',
            'supervisor_contact' => 'nullable|string|max:255',
            'additional_notes' => 'nullable|string',
            
            // File uploads
            'proposal' => 'nullable|file|mimes:pdf,doc,docx|max:5120',
            'recommendation_letter' => 'required|file|mimes:pdf|max:5120',
            'cv' => 'nullable|file|mimes:pdf|max:5120',
            'transcript' => 'nullable|file|mimes:pdf|max:5120',
            'identity_card' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:5120',
        ], [
            'start_date.after_or_equal' => 'Tanggal mulai tidak boleh kurang dari hari ini.',
            'end_date.after' => 'Tanggal selesai harus setelah tanggal mulai.',
            'recommendation_letter.required' => 'Surat pengantar wajib diunggah.',
            '*.max' => 'Ukuran file maksimal 5MB.',
        ]);

        // Handle file uploads
        $fileFields = [
            'proposal' => 'proposal_file',
            'recommendation_letter' => 'recommendation_letter',
            'cv' => 'cv_file',
            'transcript' => 'transcript_file',
            'identity_card' => 'identity_card_file',
        ];

        foreach ($fileFields as $requestField => $dbField) {
            if ($request->hasFile($requestField)) {
                $file = $request->file($requestField);
                $filename = time() . '_' . $requestField . '_' . $file->getClientOriginalName();
                $path = $file->storeAs('applications', $filename, 'public');
                $validated[$dbField] = $path;
            }
        }

        // Create application
        $application = auth()->user()->applications()->create($validated);

        return redirect()->route('applicant.applications')
            ->with('success', 'Permohonan berhasil diajukan! Tim kami akan meninjau dalam 3-5 hari kerja.');
    }

    public function show(Application $application)
    {
        // Make sure user can only see their own applications
        if ($application->user_id !== auth()->id()) {
            abort(403);
        }

        return Inertia::render('Applicant/ApplicationDetail', [
            'application' => $application
        ]);
    }
}
