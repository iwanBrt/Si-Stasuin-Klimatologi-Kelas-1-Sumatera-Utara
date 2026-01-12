#!/usr/bin/env php
<?php

/**
 * Test Email Reset Password URL
 * Script ini akan mengirim test email reset password
 */

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\User;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Mail;

echo "\n";
echo "==============================================\n";
echo " Test Kirim Email Reset Password\n";
echo "==============================================\n\n";

// Gunakan log driver untuk test tanpa kirim email asli
config(['mail.default' => 'log']);

echo "Email mode: LOG (akan ditulis ke storage/logs/laravel.log)\n\n";

// Ambil user pertama
$user = User::first();

if (!$user) {
    echo "❌ Tidak ada user di database!\n\n";
    exit(1);
}

echo "✓ User: {$user->email}\n\n";

// Kirim reset password notification
$status = Password::sendResetLink(['email' => $user->email]);

echo "Status: {$status}\n\n";

if ($status === Password::RESET_LINK_SENT) {
    echo "✅ Email berhasil dikirim!\n";
    echo "\nCek file: storage/logs/laravel.log\n";
    echo "Cari baris 'Reset Password' untuk melihat URL yang digenerate\n";
} else {
    echo "❌ Gagal mengirim email\n";
    echo "Error: " . trans($status) . "\n";
}

echo "\n";
echo "==============================================\n\n";
