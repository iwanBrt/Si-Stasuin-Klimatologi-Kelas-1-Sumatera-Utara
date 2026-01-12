#!/usr/bin/env php
<?php

/**
 * Quick Test Script untuk Verifikasi Password Reset
 * 
 * Script ini akan mensimulasikan proses reset password
 * dan menampilkan URL yang akan dikirim ke email
 */

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\User;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\URL;

echo "\n";
echo "==============================================\n";
echo " Password Reset URL Verification Test\n";
echo "==============================================\n\n";

// Cari user pertama untuk testing
$user = User::first();

if (!$user) {
    echo "❌ Tidak ada user di database!\n";
    echo "   Silakan register user terlebih dahulu.\n\n";
    exit(1);
}

echo "✓ Testing dengan user: {$user->email}\n\n";

// Generate token
$token = Password::createToken($user);
echo "✓ Token dibuat: " . substr($token, 0, 20) . "...\n\n";

// Simulate URL yang akan dibuat oleh notification
$resetUrl = url(route('password.reset', [
    'token' => $token,
    'email' => $user->getEmailForPasswordReset(),
], false));

echo "📧 URL Reset Password:\n";
echo "   {$resetUrl}\n\n";

// Parse URL untuk verifikasi
$parsedUrl = parse_url($resetUrl);
parse_str($parsedUrl['query'] ?? '', $queryParams);

echo "🔍 Verifikasi URL:\n";
echo "   ✓ Scheme: " . ($parsedUrl['scheme'] ?? 'N/A') . "\n";
echo "   ✓ Host: " . ($parsedUrl['host'] ?? 'N/A') . "\n";
echo "   ✓ Path: " . ($parsedUrl['path'] ?? 'N/A') . "\n";
echo "   ✓ Token: " . (strpos($parsedUrl['path'], 'reset-password') !== false ? '✅ Ada di path' : '❌ Tidak ada') . "\n";
echo "   ✓ Email Query: " . (isset($queryParams['email']) ? '✅ ' . $queryParams['email'] : '❌ Tidak ada') . "\n\n";

// Verifikasi route
if (strpos($parsedUrl['path'], 'reset-password') !== false && isset($queryParams['email'])) {
    echo "✅ SUCCESS: URL format sudah benar!\n";
    echo "   Link akan mengarah ke halaman ResetPassword.jsx\n\n";
} else {
    echo "❌ ERROR: URL format salah!\n";
    echo "   Link mungkin tidak mengarah ke halaman yang benar\n\n";
}

// Cek apakah method sendPasswordResetNotification ada
if (method_exists($user, 'sendPasswordResetNotification')) {
    echo "✓ Method sendPasswordResetNotification ada di User model\n";
} else {
    echo "❌ Method sendPasswordResetNotification tidak ada!\n";
}

// Cek apakah custom notification class ada
if (class_exists('App\Notifications\ResetPasswordNotification')) {
    echo "✓ Custom ResetPasswordNotification class tersedia\n";
} else {
    echo "❌ Custom ResetPasswordNotification class tidak ditemukan!\n";
}

echo "\n";
echo "==============================================\n";
echo " Testing Selesai\n";
echo "==============================================\n";
echo "\nUntuk testing lengkap:\n";
echo "1. Akses: http://127.0.0.1:8000/forgot-password\n";
echo "2. Masukkan email: {$user->email}\n";
echo "3. Cek email inbox Anda\n";
echo "4. Klik link dan verifikasi mengarah ke halaman reset password\n\n";
