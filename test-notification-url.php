#!/usr/bin/env php
<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\User;
use App\Notifications\ResetPasswordNotification;

// Send the email and show what URL was generated
$user = User::first();

if (!$user) {
    die("No user found\n");
}

// Use log mail driver to capture email
config(['mail.default' => 'log']);

// Create token
$token = \Illuminate\Support\Facades\Password::createToken($user);

echo "\n";
echo "==========================================\n";
echo " Testing Password Reset Email\n";
echo "==========================================\n\n";
echo "User: {$user->email}\n";
echo "Token: {$token}\n\n";

// Send notification
try {
    $user->sendPasswordResetNotification($token);
    echo "✅ Notification sent!\n\n";
    
    // Check if using custom notification
    $notification = new ResetPasswordNotification($token);
    $mailMessage = $notification->toMail($user);
    $mailData = $mailMessage->toArray();
    
    echo "==========================================\n";
    echo " Email Content:\n";
    echo "==========================================\n";
    echo "Subject: " . $mailData['subject'] . "\n";
    echo "Greeting: " . $mailData['greeting'] . "\n\n";
    
    echo "URL tombol 'Reset Password':\n";
    echo ">>> " . $mailData['actionUrl'] . " <<<\n\n";
    
    // Parse URL
    $url = $mailData['actionUrl'];
    $parsed = parse_url($url);
    
    echo "==========================================\n";
    echo " URL Analysis:\n";
    echo "==========================================\n";
    echo "Path: " . $parsed['path'] . "\n";
    
    if (isset($parsed['query'])) {
        parse_str($parsed['query'], $query);
        echo "Query params:\n";
        foreach ($query as $key => $value) {
            echo "  - {$key}: {$value}\n";
        }
    }
    
    echo "\n";
    
    // Check if URL is correct
    if (strpos($parsed['path'], '/reset-password/') !== false) {
        echo "✅ PATH BENAR - Mengarah ke /reset-password/{token}\n";
    } else {
        echo "❌ PATH SALAH - TIDAK mengarah ke /reset-password\n";
        echo "   Path actual: {$parsed['path']}\n";
    }
    
    if (isset($query['email']) && $query['email'] === $user->email) {
        echo "✅ EMAIL PARAMETER BENAR\n";
    } else {
        echo "❌ EMAIL PARAMETER SALAH atau TIDAK ADA\n";
    }
    
    echo "\n==========================================\n\n";
    
} catch (\Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
}
