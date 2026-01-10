<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Application;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ApplicationManagementController extends Controller
{
    public function index(Request $request)
    {
        $query = Application::with('user')->latest();

        // Filter by status
        if ($request->has('filter') && in_array($request->filter, ['pending', 'approved', 'rejected'])) {
            $query->where('status', $request->filter);
        }

        // Search by user name or title
        if ($request->has('search') && !empty($request->search)) {
            $query->where(function($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhereHas('user', function($userQuery) use ($request) {
                      $userQuery->where('name', 'like', '%' . $request->search . '%');
                  });
            });
        }

        $applications = $query->paginate(10)->through(function ($app) {
            return [
                'id' => $app->id,
                'user_name' => $app->user->name,
                'user_email' => $app->user->email,
                'title' => $app->title,
                'application_type' => $app->application_type,
                'institution_name' => $app->institution_name,
                'department' => $app->department,
                'status' => $app->status,
                'start_date' => $app->start_date->format('d M Y'),
                'end_date' => $app->end_date->format('d M Y'),
                'created_at' => $app->created_at->format('d M Y H:i'),
                'reviewed_at' => $app->reviewed_at?->format('d M Y H:i'),
            ];
        });

        $stats = [
            'total' => Application::count(),
            'pending' => Application::where('status', 'pending')->count(),
            'approved' => Application::where('status', 'approved')->count(),
            'rejected' => Application::where('status', 'rejected')->count(),
        ];

        return Inertia::render('Admin/Applications/Index', [
            'applications' => $applications,
            'stats' => $stats,
            'filters' => [
                'search' => $request->search ?? '',
                'filter' => $request->filter ?? 'all',
            ],
        ]);
    }

    public function show(Application $application)
    {
        $application->load('user', 'reviewer');

        return Inertia::render('Admin/Applications/Show', [
            'application' => [
                'id' => $application->id,
                'user' => [
                    'name' => $application->user->name,
                    'email' => $application->user->email,
                ],
                'title' => $application->title,
                'application_type' => $application->application_type,
                'status' => $application->status,
                'institution_name' => $application->institution_name,
                'institution_address' => $application->institution_address,
                'department' => $application->department,
                'study_program' => $application->study_program,
                'student_id' => $application->student_id,
                'phone' => $application->phone,
                'start_date' => $application->start_date->format('d M Y'),
                'end_date' => $application->end_date->format('d M Y'),
                'research_field' => $application->research_field,
                'research_objective' => $application->research_objective,
                'supervisor_name' => $application->supervisor_name,
                'supervisor_contact' => $application->supervisor_contact,
                'additional_notes' => $application->additional_notes,
                'admin_notes' => $application->admin_notes,
                'reviewed_at' => $application->reviewed_at?->format('d M Y H:i'),
                'reviewed_by_name' => $application->reviewer?->name,
                'files' => [
                    'proposal' => $application->proposal_file,
                    'recommendation_letter' => $application->recommendation_letter,
                    'cv' => $application->cv_file,
                    'transcript' => $application->transcript_file,
                    'identity_card' => $application->identity_card_file,
                ],
                'created_at' => $application->created_at->format('d M Y H:i'),
            ],
        ]);
    }

    public function approve(Request $request, Application $application)
    {
        $validated = $request->validate([
            'notes' => 'nullable|string|max:1000',
        ]);

        $application->update([
            'status' => 'approved',
            'admin_notes' => $validated['notes'] ?? null,
            'reviewed_at' => now(),
            'reviewed_by' => auth()->id(),
        ]);

        // TODO: Send email notification to user

        return redirect()->back()->with('success', 'Permohonan berhasil disetujui!');
    }

    public function reject(Request $request, Application $application)
    {
        $validated = $request->validate([
            'notes' => 'required|string|max:1000',
        ], [
            'notes.required' => 'Catatan penolakan wajib diisi.',
        ]);

        $application->update([
            'status' => 'rejected',
            'admin_notes' => $validated['notes'],
            'reviewed_at' => now(),
            'reviewed_by' => auth()->id(),
        ]);

        // TODO: Send email notification to user

        return redirect()->back()->with('success', 'Permohonan berhasil ditolak.');
    }
}
