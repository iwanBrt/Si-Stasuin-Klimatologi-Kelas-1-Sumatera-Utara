<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\EmailVerification;
use App\Mail\SendOtpMail;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => ['required', 'string', 'lowercase', 'email:dns', 'max:255', 'unique:'.User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ], [
            'email.email' => 'Format email tidak valid.',
            'email.dns' => 'Domain email tidak valid atau tidak ditemukan. Periksa kembali penulisan email Anda.',
            'email.unique' => 'Email ini sudah terdaftar dalam sistem.',
        ]);

        // Store registration data in session
        $request->session()->put('registration_data', [
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
        ]);
        
        $request->session()->put('registration_email', $request->email);

        // Create OTP
        $verification = EmailVerification::createForRegistration($request->email);

        // Send OTP email
        try {
            Mail::to($request->email)->send(new SendOtpMail($verification->otp, 'registration'));
            
            return redirect()->route('verification.notice')
                ->with('success', 'Kode OTP telah dikirim ke email Anda. Silakan cek inbox atau folder spam.');
        } catch (\Exception $e) {
            return back()->withErrors([
                'email' => 'Gagal mengirim email verifikasi. Silakan coba lagi.'
            ])->withInput();
        }
    }
}

