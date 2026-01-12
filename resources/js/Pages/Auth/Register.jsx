import { Head, Link, useForm } from '@inertiajs/react';
import { Eye, EyeOff, User, Mail } from 'lucide-react';
import { useState } from 'react';

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Daftar" />

            {/* Background Image Full Screen */}
            <div className="flex min-h-screen w-full items-center justify-center bg-slate-900 bg-cover bg-center"
                style={{ backgroundImage: "url('/bgSI.jpg')" }}>

                {/* Overlay Gelap */}
                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]"></div>

                {/* Glassy Container (Sedikit lebih lebar untuk register) */}
                <div className="relative z-10 w-full max-w-lg p-8 mx-4 overflow-hidden rounded-2xl border border-white/10 bg-white/10 shadow-2xl backdrop-blur-md sm:px-10">

                    {/* Header */}
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold tracking-tight text-white drop-shadow-md">
                            Buat Akun Baru
                        </h1>
                        <p className="mt-2 text-sm text-slate-200">
                            Bergabung bersama UPT Stasiun Klimatologi
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-5">

                        {/* Name Input */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-200">Nama Lengkap</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 pl-11 text-white placeholder-white/30 backdrop-blur-sm focus:border-blue-400 focus:bg-black/40 focus:ring-0 transition-all"
                                    placeholder="John Doe"
                                    required
                                    autoFocus
                                />
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 h-5 w-5" />
                            </div>
                            {errors.name && <p className="text-sm text-red-300 font-medium">{errors.name}</p>}
                        </div>

                        {/* Email Input */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-200">Email</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 pl-11 text-white placeholder-white/30 backdrop-blur-sm focus:border-blue-400 focus:bg-black/40 focus:ring-0 transition-all"
                                    placeholder="nama@email.com"
                                    required
                                />
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 h-5 w-5" />
                            </div>
                            {errors.email && <p className="text-sm text-red-300 font-medium">{errors.email}</p>}
                        </div>

                        {/* Password Input */}
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-200">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 pr-10 text-white placeholder-white/30 backdrop-blur-sm focus:border-blue-400 focus:bg-black/40 focus:ring-0 transition-all"
                                        placeholder="Minimal 8 karakter"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                {errors.password && <p className="text-sm text-red-300 font-medium">{errors.password}</p>}
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-200">Konfirmasi Password</label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 pr-10 text-white placeholder-white/30 backdrop-blur-sm focus:border-blue-400 focus:bg-black/40 focus:ring-0 transition-all"
                                        placeholder="Ulangi password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                                    >
                                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                {errors.password_confirmation && <p className="text-sm text-red-300 font-medium">{errors.password_confirmation}</p>}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full rounded-xl bg-blue-600/90 py-3.5 font-bold text-white shadow-lg shadow-blue-900/50 backdrop-blur-sm hover:bg-blue-500 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-blue-400/20"
                            >
                                {processing ? 'Mendaftar...' : 'Daftar Sekarang'}
                            </button>
                        </div>

                        {/* Login Link */}
                        <p className="text-center text-slate-300 text-sm">
                            Sudah punya akun?{' '}
                            <Link href={route('login')} className="font-semibold text-white hover:text-blue-300 transition-colors">
                                Masuk di sini
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