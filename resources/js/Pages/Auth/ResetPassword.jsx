import { Head, useForm } from '@inertiajs/react';
import { Lock, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function ResetPassword({ token, email }) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        token: token || '',
        email: email || '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.store'));
    };

    const passwordStrength = (password) => {
        if (password.length === 0) return { strength: 0, label: '', color: '' };
        if (password.length < 6) return { strength: 1, label: 'Lemah', color: 'bg-red-500' };
        if (password.length < 10) return { strength: 2, label: 'Sedang', color: 'bg-yellow-500' };
        return { strength: 3, label: 'Kuat', color: 'bg-green-500' };
    };

    const strength = passwordStrength(data.password);

    return (
        <>
            <Head title="Reset Password" />

            {/* Background Image Full Screen */}
            <div className="flex min-h-screen w-full items-center justify-center bg-slate-900 bg-cover bg-center"
                style={{ backgroundImage: "url('/bgSI.jpg')" }}>

                {/* Overlay Gelap */}
                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]"></div>

                {/* Glassy Container */}
                <div className="relative z-10 w-full max-w-md p-8 mx-4 overflow-hidden rounded-2xl border border-white/10 bg-white/10 shadow-2xl backdrop-blur-md sm:px-10">

                    {/* Header Icon */}
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/20 ring-1 ring-blue-400/30 backdrop-blur-sm shadow-lg shadow-blue-900/20">
                        <Lock className="h-8 w-8 text-blue-400" />
                    </div>

                    <div className="mb-8 text-center">
                        <h2 className="text-2xl font-bold tracking-tight text-white drop-shadow-md">
                            Reset Password
                        </h2>
                        <p className="mt-3 text-sm text-slate-200 leading-relaxed">
                            Buat password baru untuk akun Anda
                        </p>
                    </div>

                    <form onSubmit={submit}>
                        {/* Email Address (Readonly) */}
                        <div className="mb-6 space-y-1">
                            <label className="text-sm font-medium text-slate-200 ml-1">Email</label>
                            <input
                                type="email"
                                value={data.email}
                                disabled
                                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-slate-400 backdrop-blur-sm cursor-not-allowed"
                            />
                            {errors.email && (
                                <p className="text-sm text-red-300 font-medium ml-1">{errors.email}</p>
                            )}
                            {errors.token && (
                                <p className="text-sm text-red-300 font-medium ml-1">{errors.token}</p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div className="mb-6 space-y-1">
                            <label className="text-sm font-medium text-slate-200 ml-1">Password Baru</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 pr-12 text-white placeholder-white/30 backdrop-blur-sm focus:border-blue-400 focus:bg-black/40 focus:ring-0 transition-all"
                                    placeholder="Minimal 8 karakter"
                                    autoFocus
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {data.password && (
                                <div className="mt-2 px-1">
                                    <div className="flex items-center justify-between text-xs mb-1">
                                        <span className="text-slate-300">Kekuatan Password: {strength.label}</span>
                                    </div>
                                    <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                                        <div
                                            className={`h-full rounded-full transition-all ${strength.color}`}
                                            style={{ width: `${(strength.strength / 3) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            )}
                            {errors.password && (
                                <p className="text-sm text-red-300 font-medium ml-1">{errors.password}</p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className="mb-8 space-y-1">
                            <label className="text-sm font-medium text-slate-200 ml-1">Konfirmasi Password</label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 pr-12 text-white placeholder-white/30 backdrop-blur-sm focus:border-blue-400 focus:bg-black/40 focus:ring-0 transition-all"
                                    placeholder="Ulangi password baru"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                                >
                                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="group w-full rounded-xl bg-blue-600/90 py-3.5 font-bold text-white shadow-lg shadow-blue-900/50 backdrop-blur-sm hover:bg-blue-500 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-blue-400/20 flex items-center justify-center gap-2"
                        >
                            {processing ? (
                                <>
                                    <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Menyimpan...
                                </>
                            ) : (
                                <>
                                    <CheckCircle className="h-5 w-5 group-hover:scale-110 transition-transform" />
                                    Reset Password
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Footer Copyright */}
                <div className="absolute bottom-6 text-xs text-white/40">
                    &copy; {new Date().getFullYear()} UPT Stasiun Klimatologi Sumatera Utara.
                </div>
            </div>
        </>
    );
}
