<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class EmailVerification extends Model
{
    protected $fillable = [
        'email',
        'otp',
        'type',
        'expires_at',
        'verified'
    ];

    protected $casts = [
        'expires_at' => 'datetime',
        'verified' => 'boolean'
    ];

    /**
     * Generate a random 6-digit OTP
     */
    public static function generateOTP(): string
    {
        return str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);
    }

    /**
     * Check if OTP is expired
     */
    public function isExpired(): bool
    {
        return $this->expires_at->isPast();
    }

    /**
     * Check if OTP is valid (not expired and not verified yet)
     */
    public function isValid(): bool
    {
        return !$this->isExpired() && !$this->verified;
    }

    /**
     * Mark OTP as verified
     */
    public function markAsVerified(): void
    {
        $this->update(['verified' => true]);
    }

    /**
     * Create a new OTP for registration
     */
    public static function createForRegistration(string $email): self
    {
        // Delete old OTPs for this email
        self::where('email', $email)
            ->where('type', 'registration')
            ->delete();

        return self::create([
            'email' => $email,
            'otp' => self::generateOTP(),
            'type' => 'registration',
            'expires_at' => Carbon::now()->addMinutes(10), // Valid for 10 minutes
            'verified' => false
        ]);
    }

    /**
     * Create a new OTP for password reset
     */
    public static function createForPasswordReset(string $email): self
    {
        // Delete old OTPs for this email
        self::where('email', $email)
            ->where('type', 'password_reset')
            ->delete();

        return self::create([
            'email' => $email,
            'otp' => self::generateOTP(),
            'type' => 'password_reset',
            'expires_at' => Carbon::now()->addMinutes(10),
            'verified' => false
        ]);
    }

    /**
     * Verify OTP
     */
    public static function verify(string $email, string $otp, string $type): bool
    {
        $verification = self::where('email', $email)
            ->where('otp', $otp)
            ->where('type', $type)
            ->first();

        if (!$verification || !$verification->isValid()) {
            return false;
        }

        $verification->markAsVerified();
        return true;
    }
}
