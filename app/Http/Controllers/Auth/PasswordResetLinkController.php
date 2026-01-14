<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class PasswordResetLinkController extends Controller
{
    /**
     * Display the password reset link request view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/ForgotPassword', [
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming password reset link request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'email' => ['required', 'email', 'exists:users,email'],
        ], [
            'email.exists' => 'Email ini tidak terdaftar dalam sistem kami.',
            'email.required' => 'Email wajib diisi.',
            'email.email' => 'Format email tidak valid.',
        ]);

        // FOR TESTING: Get the token and create URL manually
        if (config('app.debug')) {
            $user = \App\Models\User::where('email', $request->email)->first();
            $token = Password::createToken($user);
            $resetUrl = url(route('password.reset', [
                'token' => $token,
                'email' => $user->email,
            ]));
            
            // Tampilkan URL di session untuk testing
            session()->flash('reset_url', $resetUrl);
        }

        // Send reset link via email
        $status = Password::sendResetLink(
            $request->only('email')
        );

        // Handle success
        if ($status == Password::RESET_LINK_SENT) {
            return back()->with('status', 'Link reset password telah dikirim ke email Anda! Silakan cek inbox atau folder spam.');
        }

        // Handle any other errors
        throw ValidationException::withMessages([
            'email' => [trans($status)],
        ]);
    }
}
