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

        // Chart Data: Last 6 months, grouped by type
        $monthlyStats = Application::selectRaw('DATE_FORMAT(created_at, "%Y-%m") as month, application_type, count(*) as total')
            ->where('created_at', '>=', now()->subMonths(6))
            ->groupBy('month', 'application_type')
            ->orderBy('month')
            ->get();

        $chartData = [];
        // Initialize last 6 months to ensure continuity
        for ($i = 5; $i >= 0; $i--) {
            $date = now()->subMonths($i);
            $key = $date->format('M Y');
            $chartData[$key] = [
                'name' => $key,
                'pkl' => 0,
                'magang' => 0,
                'penelitian' => 0,
                'data' => 0
            ];
        }

        foreach ($monthlyStats as $stat) {
            $month = \Carbon\Carbon::createFromFormat('Y-m', $stat->month)->format('M Y');
            if (isset($chartData[$month])) {
                // Normalize keys
                $typeKey = match(strtolower($stat->application_type)) {
                    'pkl' => 'pkl',
                    'magang' => 'magang',
                    'penelitian' => 'penelitian',
                    default => 'data'
                };
                $chartData[$month][$typeKey] += $stat->total;
            }
        }

        // Calendar Data
        $calendarEvents = Application::select('id', 'title', 'start_date', 'end_date', 'status', 'application_type', 'user_id')
            ->with('user:id,name')
            ->whereNotNull('start_date')
            ->get()
            ->map(function($app) {
                return [
                    'id' => $app->id,
                    'title' => $app->user->name ?? 'Permohonan',
                    'desc' => $app->title,
                    'date' => $app->start_date->format('Y-m-d'), // Use start date for calendar marker
                    'type' => $app->application_type,
                    'status' => $app->status,
                ];
            });

        // Mail Archive Stats
        $mailStats = [
            'incoming' => \App\Models\MailArchive::where('category', 'incoming')->count(),
            'outgoing' => \App\Models\MailArchive::where('category', 'outgoing')->count(),
            'total' => \App\Models\MailArchive::count(),
        ];

        // Mail Archive Chart Data (last 6 months)
        $mailChartData = [];
        for ($i = 5; $i >= 0; $i--) {
            $month = now()->subMonths($i);
            $monthName = $month->locale('id')->translatedFormat('M Y');
            
            $incoming = \App\Models\MailArchive::where('category', 'incoming')
                ->whereYear('date', $month->year)
                ->whereMonth('date', $month->month)
                ->count();
                
            $outgoing = \App\Models\MailArchive::where('category', 'outgoing')
                ->whereYear('date', $month->year)
                ->whereMonth('date', $month->month)
                ->count();
            
            $mailChartData[] = [
                'month' => $monthName,
                'incoming' => $incoming,
                'outgoing' => $outgoing,
                'total' => $incoming + $outgoing,
            ];
        }

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recentApplications' => $recentApplications,
            'chartData' => array_values($chartData),
            'calendarEvents' => $calendarEvents,
            'mailStats' => $mailStats,
            'mailChartData' => $mailChartData,
        ]);
    }
}
