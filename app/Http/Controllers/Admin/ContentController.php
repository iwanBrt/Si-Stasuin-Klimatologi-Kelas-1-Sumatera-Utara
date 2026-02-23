<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Content;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ContentController extends Controller
{
    public function index(Request $request)
    {
        $section = $request->query('section', 'normal-hujan-bulanan');
        
        $contents = Content::where('section', $section)
            ->orderBy('sort_order', 'asc')
            ->get()
            ->map(function ($content) {
                // Ensure file_path is a full URL for frontend display if not already
                if ($content->file_path && !str_starts_with($content->file_path, 'http') && !str_starts_with($content->file_path, '/storage')) {
                    $content->file_url = Storage::url($content->file_path);
                } else {
                    $content->file_url = $content->file_path;
                }
                return $content;
            });
            
        return Inertia::render('Admin/Content/Index', [
            'section' => $section,
            'contents' => $contents,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'section' => 'required|string',
            'category' => 'nullable|string',
            'title' => 'required|string',
            'subtitle' => 'nullable|string',
            'description' => 'nullable|string',
            'file' => 'nullable|file|mimes:jpeg,png,jpg,gif,pdf|max:102400', // 100MB max, allow images and PDF
            'sort_order' => 'integer',
        ]);
        
        $content = new Content($data);
        
        if ($request->hasFile('file')) {
            // Store relative path
            $path = $request->file('file')->store('content-uploads', 'public');
            $content->file_path = $path;
        }
        
        $content->save();
        
        return redirect()->back()->with('success', 'Content added successfully.');
    }
    
    public function update(Request $request, Content $content)
    {
        $data = $request->validate([
            'category' => 'nullable|string',
            'title' => 'required|string',
            'subtitle' => 'nullable|string',
            'description' => 'nullable|string',
            'file' => 'nullable|file|mimes:jpeg,png,jpg,gif,pdf|max:102400',
            'sort_order' => 'integer',
            'is_active' => 'boolean',
        ]);
        
        if ($request->hasFile('file')) {
             // Delete old file if exists
            if ($content->file_path) {
                Storage::disk('public')->delete($content->file_path);
            }
            
            $path = $request->file('file')->store('content-uploads', 'public');
            $content->file_path = $path;
        }
        
        $content->update($request->except('file')); // Update other fields
        
        return redirect()->back()->with('success', 'Content updated successfully.');
    }
    
    public function destroy(Content $content)
    {
        if ($content->file_path) {
            Storage::disk('public')->delete($content->file_path);
        }
        
        $content->delete();
        
        return redirect()->back()->with('success', 'Content deleted successfully.');
    }
}
