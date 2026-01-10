<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Mail\SendOtpMail;
use App\Models\EmailVerification;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class EmailVerificationController extends Controller
{
    /**
     * Show the OTP verification form for registration
     */
    public function showVerifyForm(Request $request)
    {
        $email = $request->session()->get('registration_email');
        
        if (!$email) {
            return redirect()->route('register')
                ->with('error', 'Session expired. Please register again.');
        }

        return Inertia::render('Auth/VerifyOtp', [
            'email' => $email,
            'type' => 'registration'
        ]);
    }

    /**
     * Verify OTP for registration
     */
    public function verifyRegistration(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'otp' => 'required|string|size:6',
        ]);

        $verified = EmailVerification::verify(
            $request->email,
            $request->otp,
            'registration'
        );

        if (!$verified) {
            return back()->withErrors([
                'otp' => 'Kode OTP tidak valid atau sudah kadaluarsa.'
            ]);
        }

        // Get user data from session
        $userData = $request->session()->get('registration_data');
        
        if (!$userData) {
            return redirect()->route('register')
                ->with('error', 'Session expired. Please register again.');
        }

        // Create the user
        $user = User::create([
            'name' => $userData['name'],
            'email' => $userData['email'],
            'password' => Hash::make($userData['password']),
            'role' => 'user',
        ]);

        // Clear session data
        $request->session()->forget(['registration_data', 'registration_email']);

        // Login the user
        auth()->login($user);

        return redirect()->route('dashboard')
            ->with('success', 'Registrasi berhasil! Selamat datang di Sistem Magang UPT Klimatologi.');
    }

    /**
     * Resend OTP for registration
     */
    public function resendOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'type' => 'required|in:registration,password_reset',
        ]);

        // Create new OTP
        if ($request->type === 'registration') {
            $verification = EmailVerification::createForRegistration($request->email);
        } else {
            $verification = EmailVerification::createForPasswordReset($request->email);
        }

        // Send OTP email
        try {
            Mail::to($request->email)->send(new SendOtpMail($verification->otp, $request->type));
            
            return back()->with('success', 'Kode OTP baru telah dikirim ke email Anda.');
        } catch (\Exception $e) {
            return back()->withErrors([
                'email' => 'Gagal mengirim email. Silakan coba lagi.'
            ]);
        }
    }

    /**
     * Show forgot password form
     */
    public function showForgotPasswordForm()
    {
        return Inertia::render('Auth/ForgotPassword');
    }

    /**
     * Send password reset OTP
     */
    public function sendPasswordResetOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
        ]);

        // Create OTP for password reset
        $verification = EmailVerification::createForPasswordReset($request->email);

        // Send OTP email
        try {
            Mail::to($request->email)->send(new SendOtpMail($verification->otp, 'password_reset'));
            
            // Store email in session
            $request->session()->put('reset_email', $request->email);
            
            return redirect()->route('password.verify')
                ->with('success', 'Kode OTP telah dikirim ke email Anda.');
        } catch (\Exception $e) {
            return back()->withErrors([
                'email' => 'Gagal mengirim email. Silakan coba lagi.'
            ]);
        }
    }

    /**
     * Show OTP verification form for password reset
     */
    public function showPasswordResetVerifyForm(Request $request)
    {
        $email = $request->session()->get('reset_email');
        
        if (!$email) {
            return redirect()->route('password.request')
                ->with('error', 'Session expired. Please try again.');
        }

        return Inertia::render('Auth/VerifyOtp', [
            'email' => $email,
            'type' => 'password_reset'
        ]);
    }

    /**
     * Verify OTP for password reset
     */
    public function verifyPasswordResetOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'otp' => 'required|string|size:6',
        ]);

        $verified = EmailVerification::verify(
            $request->email,
            $request->otp,
            'password_reset'
        );

        if (!$verified) {
            return back()->withErrors([
                'otp' => 'Kode OTP tidak valid atau sudah kadaluarsa.'
            ]);
        }

        // Store verification in session
        $request->session()->put('otp_verified', true);
        
        return redirect()->route('password.reset')
            ->with('success', 'Verifikasi berhasil. Silakan buat password baru.');
    }

    /**
     * Show reset password form
     */
    public function showResetPasswordForm(Request $request)
    {
        $email = $request->session()->get('reset_email');
        $verified = $request->session()->get('otp_verified');
        
        if (!$email || !$verified) {
            return redirect()->route('password.request')
                ->with('error', 'Session expired or not verified. Please try again.');
        }

        return Inertia::render('Auth/ResetPassword', [
            'email' => $email
        ]);
    }

    /**
     * Reset password
     */
    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $email = $request->session()->get('reset_email');
        $verified = $request->session()->get('otp_verified');
        
        if (!$email || !$verified || $email !== $request->email) {
            return back()->withErrors([
                'email' => 'Invalid session. Please start over.'
            ]);
        }

        // Update user password
        $user = User::where('email', $email)->first();
        $user->update([
            'password' => Hash::make($request->password)
        ]);

        // Clear session
        $request->session()->forget(['reset_email', 'otp_verified']);

        return redirect()->route('login')
            ->with('success', 'Password berhasil diubah. Silakan login dengan password baru Anda.');
    }
}
