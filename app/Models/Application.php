<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Application extends Model
{
    protected $fillable = [
        'user_id',
        'application_type',
        'status',
        'title',
        'institution_name',
        'institution_address',
        'department',
        'study_program',
        'student_id',
        'phone',
        'start_date',
        'end_date',
        'research_field',
        'research_objective',
        'supervisor_name',
        'supervisor_contact',
        'proposal_file',
        'recommendation_letter',
        'cv_file',
        'transcript_file',
        'identity_card_file',
        'additional_notes',
        'admin_notes',
        'reviewed_at',
        'reviewed_by',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'reviewed_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function reviewer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }

    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeApproved($query)
    {
        return $query->where('status', 'approved');
    }

    public function scopeRejected($query)
    {
        return $query->where('status', 'rejected');
    }
}
