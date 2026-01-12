import { Head, useForm } from '@inertiajs/react';
import { Lock, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

export default function ConfirmPassword() {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Konfirmasi Password" />

            {/* Background Image Full Screen */}
            <div className="flex min-h-screen w-full items-center justify-center bg-slate-900 bg-cover bg-center"
                style={{ backgroundImage: "url('/bgSI.jpg')" }}>

                {/* Overlay Gelap */}
                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]"></div>

                {/* Glassy Container */}
                <div className="relative z-10 w-full max-w-md p-8 mx-4 overflow-hidden rounded-2xl border border-white/10 bg-white/10 shadow-2xl backdrop-blur-md sm:px-10">

                    {/* Header Icon */}
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/20 ring-1 ring-amber-400/30 backdrop-blur-sm shadow-lg shadow-amber-900/20">
                        <ShieldCheck className="h-8 w-8 text-amber-400" />
                    </div>

                    <div className="mb-8 text-center">
                        <h2 className="text-2xl font-bold tracking-tight text-white drop-shadow-md">
                            Area Aman
                        </h2>
                        <p className="mt-3 text-sm text-slate-200 leading-relaxed">
                            Konfirmasi password Anda sebelum melanjutkan.
                        </p>
                    </div>

                    <form onSubmit={submit}>
                        {/* Password Input */}
                        <div className="mb-8 space-y-1">
                            <label className="text-sm font-medium text-slate-200 ml-1">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 pr-12 text-white placeholder-white/30 backdrop-blur-sm focus:border-amber-400 focus:bg-black/40 focus:ring-0 transition-all"
                                    placeholder="Masukkan password"
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
                            {errors.password && (
                                <p className="text-sm text-red-300 font-medium ml-1">{errors.password}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="group w-full rounded-xl bg-amber-600/90 py-3.5 font-bold text-white shadow-lg shadow-amber-900/50 backdrop-blur-sm hover:bg-amber-500 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-amber-400/20 flex items-center justify-center gap-2"
                        >
                            {processing ? (
                                <>
                                    <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Memproses...
                                </>
                            ) : (
                                <>
                                    <Lock className="h-5 w-5 group-hover:scale-110 transition-transform" />
                                    Konfirmasi
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
