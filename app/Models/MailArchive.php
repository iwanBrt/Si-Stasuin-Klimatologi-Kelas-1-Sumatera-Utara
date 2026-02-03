<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MailArchive extends Model
{
    use HasFactory;

    protected $fillable = [
        'category',
        'reference_number',
        'date',
        'sender',
        'recipient',
        'subject',
        'description',
        'file_path',
    ];

    protected $casts = [
        'date' => 'date',
    ];
}
