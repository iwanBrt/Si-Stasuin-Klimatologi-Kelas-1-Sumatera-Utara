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
                    'startDate' => $app->start_date?->format('Y-m-d') ?? $app->data_period_start?->format('Y-m-d'),
                    'endDate' => $app->end_date?->format('Y-m-d') ?? $app->data_period_end?->format('Y-m-d'),
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
            // Basic fields
            'applicant_type' => 'required|string|in:student,employee',
            'application_type' => 'required|string|in:magang,penelitian,pkl,observasi,kerja_praktek,tugas_akhir,permohonan_data',
            'title' => 'required|string|max:255',
            'institution_name' => 'required|string|max:255',
            'institution_address' => 'nullable|string',
            'phone' => 'required|string|max:20',
            
            // Student-specific fields
            'department' => 'required_if:applicant_type,student|nullable|string|max:255',
            'study_program' => 'required_if:applicant_type,student|nullable|string|max:255',
            'student_id' => 'required_if:applicant_type,student|nullable|string|max:50',
            'supervisor_name' => 'nullable|string|max:255',
            'supervisor_contact' => 'nullable|string|max:255',
            
            // Employee-specific fields
            'position' => 'required_if:applicant_type,employee|nullable|string|max:255',
            
            // Period fields (not required for permohonan_data)
            'start_date' => 'required_unless:application_type,permohonan_data|nullable|date|after_or_equal:today',
            'end_date' => 'required_unless:application_type,permohonan_data|nullable|date|after:start_date',
            
            // Research-specific fields
            'research_field' => 'nullable|string|max:255',
            'research_objective' => 'nullable|string',
            
            // Data request specific fields
            'data_type' => 'required_if:application_type,permohonan_data|nullable|string|in:00,01',
            'data_category' => 'required_if:application_type,permohonan_data|nullable|string',
            'data_period_start' => 'required_if:application_type,permohonan_data|nullable|date',
            'data_period_end' => 'required_if:application_type,permohonan_data|nullable|date|after:data_period_start',
            
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
            'data_period_end.after' => 'Tanggal akhir periode data harus setelah tanggal awal.',
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

        // Kirim notifikasi email ke Admin
        try {
            \Illuminate\Support\Facades\Mail::to(env('ADMIN_EMAIL', 'admin@siklimatologi.com'))
                ->send(new \App\Mail\NewApplicationAdminMail($application));
        } catch (\Exception $e) {
            // Optional: Log error, tapi jangan gagalkan proses permohonan
             \Illuminate\Support\Facades\Log::error('Email Error: ' . $e->getMessage());
        }

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

    public function downloadLetter(Application $application)
    {
        // Make sure user can only see their own applications
        if ($application->user_id !== auth()->id()) {
            abort(403);
        }

        // Ensure application is approved
        if ($application->status !== 'approved') {
            abort(403, 'Permohonan belum disetujui.');
        }

        if (!$application->confirmation_letter) {
            abort(404, 'Surat konfirmasi belum tersedia.');
        }

        // Return the stored file
        $extension = pathinfo($application->confirmation_letter, PATHINFO_EXTENSION);
        $filename = 'Surat_Penerimaan_' . str_replace(' ', '_', $application->title) . '.' . $extension;
        
        return Storage::disk('public')->download($application->confirmation_letter, $filename);
    }
}
