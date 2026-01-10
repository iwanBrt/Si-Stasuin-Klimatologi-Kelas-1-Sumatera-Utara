<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NewsController extends Controller
{
    public function show($slug)
    {
        $news = News::where('slug', $slug)
            ->where('status', 'published')
            ->firstOrFail();

        // Increment views
        $news->increment('views_count');

        // Get related news (same category or latest)
        $relatedNews = News::published()
            ->where('id', '!=', $news->id)
            ->latest('published_at')
            ->take(3)
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'title' => $item->title,
                    'slug' => $item->slug,
                    'excerpt' => $item->excerpt,
                    'featured_image' => $item->featured_image,
                    'published_at' => $item->published_at->format('d M Y'),
                ];
            });

        return Inertia::render('News/Show', [
            'news' => [
                'id' => $news->id,
                'title' => $news->title,
                'slug' => $news->slug,
                'content' => $news->content,
                'excerpt' => $news->excerpt,
                'featured_image' => $news->featured_image,
                'published_at' => $news->published_at->format('d F Y, H:i'),
                'author_name' => $news->author->name,
                'views_count' => $news->views_count,
            ],
            'relatedNews' => $relatedNews,
        ]);
    }
}
