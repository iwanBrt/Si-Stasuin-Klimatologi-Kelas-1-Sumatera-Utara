<?php

namespace App\Http\Controllers\Media;

use App\Http\Controllers\Controller;
use App\Models\News;
use App\Models\Content;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Statistics
        $stats = [
            'total_news' => News::count(),
            'published_news' => News::where('status', 'published')->count(),
            'draft_news' => News::where('status', 'draft')->count(),
            'total_contents' => Content::count(),
            'team_members' => Content::where('section', 'tim-kami')->count(),
            'monthly_maps' => Content::where('section', 'normal-hujan-bulanan')->count(),
        ];

        // Recent News (last 5)
        $recentNews = News::latest()
            ->take(5)
            ->get()
            ->map(function ($news) {
                return [
                    'id' => $news->id,
                    'title' => $news->title,
                    'status' => $news->status,
                    'published_at' => $news->published_at ? $news->published_at->format('d M Y') : 'Draft',
                    'author' => $news->author->name ?? 'Unknown',
                ];
            });

        return Inertia::render('Media/Dashboard', [
            'stats' => $stats,
            'recentNews' => $recentNews,
        ]);
    }
}
