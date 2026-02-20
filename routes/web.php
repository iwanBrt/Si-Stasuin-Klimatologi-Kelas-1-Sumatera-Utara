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
Route::get('/api/weather', [App\Http\Controllers\WeatherController::class, 'getWeatherForSection'])->name('api.weather');
Route::get('/api/weather/warning', [App\Http\Controllers\WeatherController::class, 'getEarlyWarning'])->name('api.weather.warning');
Route::get('/api/prakiraan-cuaca/sumut', [App\Http\Controllers\WeatherController::class, 'getSumutWeatherJSON'])->name('api.weather.sumut.json');
Route::get('/api/earthquake', [App\Http\Controllers\EarthquakeController::class, 'getLatestEarthquake'])->name('api.earthquake');
Route::get('/api/proxy/karhutla-map/{type?}', [App\Http\Controllers\Admin\KarhutlaController::class, 'getLatestMap'])->name('api.karhutla-map');
Route::get('/api/proxy/hotspot-map', [App\Http\Controllers\Admin\KarhutlaController::class, 'getHotspotMap'])->name('api.hotspot-map');

// Profile & Layanan Routes
Route::get('/profil/tentang-kami', [App\Http\Controllers\ProfileController::class, 'tentangKami'])->name('profile.tentang-kami');
Route::get('/profil/sejarah-visi-misi', [App\Http\Controllers\ProfileController::class, 'sejarahVisiMisi'])->name('profile.sejarah-visi-misi');
Route::get('/profil/staklim-sumut', [App\Http\Controllers\ProfileController::class, 'staklimSumut'])->name('profile.staklim-sumut');
Route::get('/profil/tim-kami', [App\Http\Controllers\ProfileController::class, 'timKami'])->name('profile.tim-kami');
Route::get('/layanan', [App\Http\Controllers\ProfileController::class, 'layanan'])->name('layanan');
Route::get('/layanan/permintaan-data', [App\Http\Controllers\ProfileController::class, 'permintaanData'])->name('layanan.permintaan-data');
Route::get('/kualitas-udara/pm25', [App\Http\Controllers\KualitasUdaraController::class, 'pm25'])->name('kualitas-udara.pm25');
Route::get('/kualitas-udara/kimia-air-hujan', [App\Http\Controllers\KualitasUdaraController::class, 'kimiaAirHujan'])->name('kualitas-udara.kimia-air-hujan');
Route::get('/normal-iklim/normal-hujan-bulanan', [App\Http\Controllers\NormalIklimController::class, 'normalHujanBulanan'])->name('normal-iklim.normal-hujan-bulanan');
Route::get('/normal-iklim/peta-zona-musim', [App\Http\Controllers\NormalIklimController::class, 'petaZonaMusim'])->name('normal-iklim.peta-zona-musim');
Route::get('/normal-iklim/download-folder', [App\Http\Controllers\NormalIklimController::class, 'downloadFolder'])->name('normal-iklim.download-folder');
Route::get('/kebakaran-hutan/ffmc', [App\Http\Controllers\KebakaranHutanController::class, 'ffmc'])->name('kebakaran-hutan.ffmc');
Route::get('/kebakaran-hutan/fwi', [App\Http\Controllers\KebakaranHutanController::class, 'fwi'])->name('kebakaran-hutan.fwi');
Route::get('/kebakaran-hutan/hotspot', [App\Http\Controllers\KebakaranHutanController::class, 'hotspot'])->name('kebakaran-hutan.hotspot');

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
    Route::get('/application/create', [App\Http\Controllers\ApplicationController::class, 'create'])->name('applicant.create');
    Route::post('/application', [App\Http\Controllers\ApplicationController::class, 'store'])->name('application.store');
    Route::get('/application/{application}', [App\Http\Controllers\ApplicationController::class, 'show'])->name('applicant.applications.show');
    Route::get('/application/{application}/download-letter', [App\Http\Controllers\ApplicationController::class, 'downloadLetter'])->name('applicant.download-letter');
});

// Admin Routes (Admin-only access)
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('dashboard');
    
    // Application Management
    Route::get('/applications', [App\Http\Controllers\Admin\ApplicationManagementController::class, 'index'])->name('applications.index');
    Route::get('/applications/{application}', [App\Http\Controllers\Admin\ApplicationManagementController::class, 'show'])->name('applications.show');
    Route::post('/applications/{application}/approve', [App\Http\Controllers\Admin\ApplicationManagementController::class, 'approve'])->name('applications.approve');
    Route::post('/applications/{application}/reject', [App\Http\Controllers\Admin\ApplicationManagementController::class, 'reject'])->name('applications.reject');

    // User Management
    Route::get('/users', [App\Http\Controllers\Admin\UserManagementController::class, 'index'])->name('users.index');

    // Mail Archives
    Route::resource('archives', App\Http\Controllers\Admin\MailArchiveController::class);
    Route::post('/archives/export', [App\Http\Controllers\Admin\MailArchiveController::class, 'export'])->name('archives.export');
});

// Media Panel Routes (Accessible by both 'admin' and 'media' roles)
Route::middleware(['auth', 'media'])->prefix('admin')->name('admin.')->group(function () {
    // Media Dashboard
    Route::get('/media/dashboard', [App\Http\Controllers\Media\DashboardController::class, 'index'])->name('media.dashboard');

    // News Management
    Route::resource('news', App\Http\Controllers\Admin\NewsController::class);

    // Content Management
    Route::resource('contents', App\Http\Controllers\Admin\ContentController::class);
});

// Email Verification Routes (OTP for registration)
Route::get('/email/verify', [EmailVerificationController::class, 'showVerifyForm'])
    ->name('verification.notice');
Route::post('/email/verify', [EmailVerificationController::class, 'verifyRegistration'])
    ->name('verification.verify');
Route::post('/email/resend', [EmailVerificationController::class, 'resendOtp'])
    ->name('verification.resend');

// Password Reset Routes (Link-based via Email)
Route::get('/forgot-password', [App\Http\Controllers\Auth\PasswordResetLinkController::class, 'create'])
    ->name('password.request');
Route::post('/forgot-password', [App\Http\Controllers\Auth\PasswordResetLinkController::class, 'store'])
    ->name('password.email');
Route::get('/reset-password/{token}', [App\Http\Controllers\Auth\NewPasswordController::class, 'create'])
    ->name('password.reset');
Route::post('/reset-password', [App\Http\Controllers\Auth\NewPasswordController::class, 'store'])
    ->name('password.store');


require __DIR__.'/auth.php';
