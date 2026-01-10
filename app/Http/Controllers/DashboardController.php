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
            // a. Cek relasi application user tersebut
            $application = $user->application;

            // b. Jika BELUM ada aplikasi -> return Applicant Onboarding
            if (!$application) {
                return Inertia::render('Applicant/Onboarding');
            }

            // c. Jika ada tapi status 'draft'/'rejected' -> return Registration Form
            if (in_array($application->status, ['draft', 'rejected'])) {
                return Inertia::render('Applicant/RegistrationForm', [
                    'application' => $application
                ]);
            }

            // d. Jika status 'submitted'/'reviewing' -> return Status Page
            if (in_array($application->status, ['submitted', 'reviewing'])) {
                return Inertia::render('Applicant/Status', [
                    'application' => $application
                ]);
            }

            // e. Jika status 'approved' -> return Participant Dashboard
            if ($application->status === 'approved') {
                return Inertia::render('Participant/Dashboard');
            }
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
