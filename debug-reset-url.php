#!/usr/bin/env php
<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\User;
use Illuminate\Support\Facades\Password;

echo "\n========================================\n";
echo " DEBUG: Test Password Reset URL\n";
echo "========================================\n\n";

$user = User::first();

if (!$user) {
    echo "❌ Tidak ada user!\n\n";
    exit(1);
}

echo "User: {$user->email}\n\n";

// Create token
$token = Password::createToken($user);

echo "Token: " . substr($token, 0, 20) . "...\n\n";

// Simulate apa yang dilakukan notification
$resetUrl = url(route('password.reset', [
    'token' => $token,
    'email' => $user->getEmailForPasswordReset(),
], false));

echo "========================================\n";
echo "URL YANG AKAN DIGENERATE:\n";
echo "========================================\n";
echo $resetUrl . "\n";
echo "========================================\n\n";

// Parse URL
$parsed = parse_url($resetUrl);
parse_str($parsed['query'] ?? '', $query);

echo "Breakdown:\n";
echo "  - Path: " . $parsed['path'] . "\n";
echo "  - Token di path: " . (strpos($parsed['path'], $token) !== false ? 'YA ✅' : 'TIDAK ❌') . "\n";
echo "  - Email di query: " . ($query['email'] ?? 'TIDAK ADA ❌') . "\n\n";

if (strpos($parsed['path'], '/reset-password/') !== false && isset($query['email'])) {
    echo "✅ FORMAT URL BENAR!\n";
    echo "   Link ini akan membuka halaman ResetPassword.jsx\n\n";
} else {
    echo "❌ FORMAT URL SALAH!\n\n";
}

// Test apakah method sendPasswordResetNotification digunakan
$reflection = new ReflectionClass($user);
if ($reflection->hasMethod('sendPasswordResetNotification')) {
    echo "✅ User model punya method sendPasswordResetNotification\n";
    
    $method = $reflection->getMethod('sendPasswordResetNotification');
    $filename = $method->getFileName();
    $startLine = $method->getStartLine();
    
    echo "   Lokasi: " . basename($filename) . " line {$startLine}\n\n";
} else {
    echo "❌ User model TIDAK punya method sendPasswordResetNotification\n\n";
}

echo "========================================\n\n";
