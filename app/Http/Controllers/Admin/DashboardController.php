<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Application;
use App\Models\User;
use App\Models\News;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        // Statistics
        $stats = [
            'total_applications' => Application::count(),
            'pending_applications' => Application::where('status', 'pending')->count(),
            'approved_applications' => Application::where('status', 'approved')->count(),
            'rejected_applications' => Application::where('status', 'rejected')->count(),
            'total_users' => User::where('role', 'user')->count(),
            'total_news' => News::count(),
        ];

        // Recent applications (last 5)
        $recentApplications = Application::with('user')
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($app) {
                return [
                    'id' => $app->id,
                    'user_name' => $app->user->name,
                    'title' => $app->title,
                    'application_type' => $app->application_type,
                    'status' => $app->status,
                    'created_at' => $app->created_at->format('d M Y'),
                ];
            });

        // Applications by type
        $applicationsByType = Application::select('application_type', DB::raw('count(*) as total'))
            ->groupBy('application_type')
            ->get()
            ->map(function ($item) {
                return [
                    'type' => $item->application_type,
                    'total' => $item->total,
                ];
            });

        // Applications by month (last 6 months)
        $applicationsByMonth = Application::select(
                DB::raw('DATE_FORMAT(created_at, "%Y-%m") as month'),
                DB::raw('count(*) as total')
            )
            ->where('created_at', '>=', now()->subMonths(6))
            ->groupBy('month')
            ->orderBy('month')
            ->get()
            ->map(function ($item) {
                return [
                    'month' => $item->month,
                    'total' => $item->total,
                ];
            });

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recentApplications' => $recentApplications,
            'applicationsByType' => $applicationsByType,
            'applicationsByMonth' => $applicationsByMonth,
        ]);
    }
}
