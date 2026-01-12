<?php

use App\Http\Controllers\Auth\EmailVerificationController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $latestNews = \App\Models\News::published()
        ->latest('published_at')
        ->take(3)
        ->get()
        ->map(function ($news) {
            return [
                'id' => $news->id,
                'title' => $news->title,
                'slug' => $news->slug,
                'excerpt' => $news->excerpt,
                'featured_image' => $news->featured_image,
                'published_at' => $news->published_at->format('d M Y'),
            ];
        });

    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'latestNews' => $latestNews,
    ]);
});

// Public News Detail Route
Route::get('/berita/{slug}', [App\Http\Controllers\NewsController::class, 'show'])->name('news.show');

// Dashboard route with auth & verified middleware
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    

    
    // Applicant routes
    Route::get('/my-applications', [App\Http\Controllers\ApplicationController::class, 'index'])->name('applicant.applications');
    Route::get('/application/new', [App\Http\Controllers\ApplicationController::class, 'create'])->name('applicant.create');
    Route::post('/application', [App\Http\Controllers\ApplicationController::class, 'store'])->name('application.store');
    Route::get('/application/{application}/download-letter', [App\Http\Controllers\ApplicationController::class, 'downloadLetter'])->name('applicant.download-letter');
});

// Admin Routes
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('dashboard');
    
    // Application Management
    Route::get('/applications', [App\Http\Controllers\Admin\ApplicationManagementController::class, 'index'])->name('applications.index');
    Route::get('/applications/{application}', [App\Http\Controllers\Admin\ApplicationManagementController::class, 'show'])->name('applications.show');
    Route::post('/applications/{application}/approve', [App\Http\Controllers\Admin\ApplicationManagementController::class, 'approve'])->name('applications.approve');
    Route::post('/applications/{application}/reject', [App\Http\Controllers\Admin\ApplicationManagementController::class, 'reject'])->name('applications.reject');
    
    // News Management
    Route::resource('news', App\Http\Controllers\Admin\NewsController::class);
});

// Email Verification Routes (OTP for registration)
Route::get('/email/verify', [EmailVerificationController::class, 'showVerifyForm'])
    ->name('verification.notice');
Route::post('/email/verify', [EmailVerificationController::class, 'verifyRegistration'])
    ->name('verification.verify');
Route::post('/email/resend', [EmailVerificationController::class, 'resendOtp'])
    ->name('verification.resend');

// Password Reset Routes (OTP)
Route::get('/forgot-password', [EmailVerificationController::class, 'showForgotPasswordForm'])
    ->name('password.request');
Route::post('/forgot-password', [EmailVerificationController::class, 'sendPasswordResetOtp'])
    ->name('password.email');
Route::get('/reset-password/verify', [EmailVerificationController::class, 'showPasswordResetVerifyForm'])
    ->name('password.verify');
Route::post('/reset-password/verify', [EmailVerificationController::class, 'verifyPasswordResetOtp'])
    ->name('password.verify.check');
Route::get('/reset-password', [EmailVerificationController::class, 'showResetPasswordForm'])
    ->name('password.reset');
Route::post('/reset-password', [EmailVerificationController::class, 'resetPassword'])
    ->name('password.update');

require __DIR__.'/auth.php';
