#!/usr/bin/env php
<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\User;
use App\Notifications\ResetPasswordNotification;
use Illuminate\Support\Facades\Notification;

$user = User::first();

if (!$user) {
    echo "No user found\n";
    exit(1);
}

$token = 'test-token-abc123';

// Create notification instance
$notification = new ResetPasswordNotification($token);

// Get the mail message
$mailMessage = $notification->toMail($user);

// Get action URL
$actionData = $mailMessage->toArray();

// Extract URL from action button
if (isset($actionData['actionUrl'])) {
    echo "URL dari Email:\n";
    echo $actionData['actionUrl'] . "\n\n";
    
    // Parse URL
    $parsed = parse_url($actionData['actionUrl']);
    echo "Path: " . $parsed['path'] . "\n";
    echo "Query: " . ($parsed['query'] ?? 'No query') . "\n\n";
    
    if (strpos($parsed['path'], 'reset-password') !== false) {
        echo "✅ URL BENAR - Mengarah ke /reset-password\n";
    } else {
        echo "❌ URL SALAH - Tidak mengarah ke /reset-password\n";
    }
}
