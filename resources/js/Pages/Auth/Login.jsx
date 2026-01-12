import { Head, Link, useForm } from '@inertiajs/react';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export default function Login({ status, canResetPassword }) {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Masuk" />

            {/* Background Image Full Screen */}
            <div className="flex min-h-screen w-full items-center justify-center bg-slate-900 bg-cover bg-center"
                style={{ backgroundImage: "url('/bgSI.jpg')" }}>

                {/* Overlay Gelap supaya tulisan terbaca */}
                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]"></div>

                {/* Glassy Container */}
                <div className="relative z-10 w-full max-w-md p-8 mx-4 overflow-hidden rounded-2xl border border-white/10 bg-white/10 shadow-2xl backdrop-blur-md sm:px-10">

                    {/* Header */}
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold tracking-tight text-white drop-shadow-md">
                            Selamat Datang
                        </h1>
                        <p className="mt-2 text-sm text-slate-200">
                            Masuk ke Sistem Informasi Klimatologi
                        </p>
                    </div>

                    {status && (
                        <div className="mb-6 rounded-lg border border-green-400/30 bg-green-500/20 p-3 text-sm font-medium text-green-300 backdrop-blur-sm">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-6">
                        {/* Email Input */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-200">Email</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder-white/30 backdrop-blur-sm focus:border-blue-400 focus:bg-black/40 focus:ring-0 transition-all"
                                placeholder="nama@email.com"
                                required
                            />
                            {errors.email && <p className="text-sm text-red-300 font-medium">{errors.email}</p>}
                        </div>

                        {/* Password Input */}
                        <div className="space-y-1">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium text-slate-200">Password</label>
                            </div>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 pr-12 text-white placeholder-white/30 backdrop-blur-sm focus:border-blue-400 focus:bg-black/40 focus:ring-0 transition-all"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {errors.password && <p className="text-sm text-red-300 font-medium">{errors.password}</p>}
                        </div>

                        {/* Options */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="h-4 w-4 rounded border-white/30 bg-white/10 text-blue-500 focus:ring-offset-0 focus:ring-blue-500/50"
                                />
                                <span className="text-sm text-slate-300 group-hover:text-white transition-colors">Ingat Saya</span>
                            </label>

                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-sm font-medium text-blue-300 hover:text-blue-200 transition-colors hover:underline"
                                >
                                    Lupa Password?
                                </Link>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full rounded-xl bg-blue-600/90 py-3.5 font-bold text-white shadow-lg shadow-blue-900/50 backdrop-blur-sm hover:bg-blue-500 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-blue-400/20"
                        >
                            {processing ? 'Memproses...' : 'Masuk'}
                        </button>

                        {/* Register Link */}
                        <p className="text-center text-slate-300 text-sm">
                            Belum punya akun?{' '}
                            <Link href={route('register')} className="font-semibold text-white hover:text-blue-300 transition-colors">
                                Daftar di sini
                            </Link>
                        </p>
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