<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Content extends Model
{
    protected $fillable = [
        'section',
        'category',
        'title',
        'subtitle',
        'description',
        'file_path',
        'sort_order',
        'metadata',
        'is_active',
    ];

    protected $casts = [
        'metadata' => 'array',
        'is_active' => 'boolean',
    ];

    public function scopeSection($query, $section)
    {
        return $query->where('section', $section);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}
