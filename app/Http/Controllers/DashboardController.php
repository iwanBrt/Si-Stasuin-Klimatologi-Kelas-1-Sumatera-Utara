<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Handle the dashboard redirect based on user role and application status.
     */
    public function index(Request $request)
    {
        // 1. Ambil user yang sedang login
        $user = $request->user();

        // 2. Cek Role
        if ($user->role === 'admin') {
            // Jika 'admin' -> redirect ke Admin Dashboard
            return redirect()->route('admin.dashboard');
        }

        if ($user->role === 'user') {
            // Get user's applications statistics
            $userApplications = \App\Models\Application::where('user_id', $user->id)->get();
            
            $stats = [
                'total' => $userApplications->count(),
                'approved' => $userApplications->where('status', 'approved')->count(),
                'pending' => $userApplications->whereIn('status', ['pending', 'submitted', 'reviewing'])->count(),
                'rejected' => $userApplications->where('status', 'rejected')->count(),
            ];

            // Get all applications with details
            $applications = \App\Models\Application::where('user_id', $user->id)
                ->latest()
                ->get()
                ->map(function ($app) {
                    return [
                        'id' => $app->id,
                        'title' => $app->title,
                        'application_type' => $app->application_type,
                        'applicant_type' => $app->applicant_type,
                        'status' => $app->status,
                        'created_at' => $app->created_at->format('d M Y'),
                        'updated_at' => $app->updated_at->format('d M Y'),
                        'start_date' => $app->start_date ? $app->start_date->format('d M Y') : null,
                        'end_date' => $app->end_date ? $app->end_date->format('d M Y') : null,
                    ];
                });

            return Inertia::render('Dashboard', [
                'stats' => $stats,
                'applications' => $applications,
            ]);
        }

        // Fallback jika role tidak dikenali
        abort(403, 'Unauthorized access');
    }

    /**
     * Show the application creation form.
     */
    public function create()
    {
        // TODO: Implement registration form view
        return Inertia::render('Applicant/RegistrationForm');
    }

    /**
     * Store the application data.
     */
    public function store(Request $request)
    {
        // TODO: Implement application storage logic
    }
}
