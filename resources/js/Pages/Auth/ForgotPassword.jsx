import { Head, Link, useForm } from '@inertiajs/react';
import { Mail, ArrowLeft, Send, AlertCircle } from 'lucide-react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <>
            <Head title="Lupa Password" />

            {/* Background Image Full Screen */}
            <div className="flex min-h-screen w-full items-center justify-center bg-slate-900 bg-cover bg-center"
                 style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?q=80&w=2565&auto=format&fit=crop')" }}>
                
                {/* Overlay Gelap */}
                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]"></div>

                {/* Glassy Container */}
                <div className="relative z-10 w-full max-w-md p-8 mx-4 overflow-hidden rounded-2xl border border-white/10 bg-white/10 shadow-2xl backdrop-blur-md sm:px-10 text-center">
                    
                    {/* Header Icon */}
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/20 ring-1 ring-blue-400/30 backdrop-blur-sm shadow-lg shadow-blue-900/20">
                        <Mail className="h-8 w-8 text-blue-400" />
                    </div>

                    <div className="mb-8">
                        <h2 className="text-2xl font-bold tracking-tight text-white drop-shadow-md">
                            Lupa Password?
                        </h2>
                        <p className="mt-3 text-sm text-slate-200 leading-relaxed">
                            Jangan khawatir! Masukkan email yang terdaftar dan kami akan mengirimkan link untuk mereset password Anda.
                        </p>
                    </div>

                    {/* Success Message */}
                    {status && (
                        <div className="mb-6 rounded-xl border border-green-400/30 bg-green-500/20 p-4 text-sm font-medium text-green-300 backdrop-blur-sm flex items-start gap-3 text-left">
                            <Send className="h-5 w-5 mt-0.5 flex-shrink-0" />
                            <span>{status}</span>
                        </div>
                    )}

                    <form onSubmit={submit}>
                        <div className="space-y-4">
                            {/* Email Input */}
                            <div className="text-left space-y-1">
                                <label className="text-sm font-medium text-slate-200 ml-1">Alamat Email</label>
                                <div className="relative">
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 pl-11 text-white placeholder-white/30 backdrop-blur-sm focus:border-blue-400 focus:bg-black/40 focus:ring-0 transition-all"
                                        placeholder="nama@email.com"
                                        onChange={(e) => setData('email', e.target.value)}
                                        autoFocus
                                    />
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 h-5 w-5" />
                                </div>
                                {errors.email && (
                                    <p className="text-sm text-red-300 font-medium flex items-center gap-1 mt-1.5 ml-1">
                                        <AlertCircle className="h-4 w-4" /> {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Submit Button */}
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
                                        Mengirim...
                                    </>
                                ) : (
                                    <>
                                        <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                        Kirim Link Reset
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Footer Actions */}
                    <div className="mt-8 pt-6 border-t border-white/10">
                        <Link
                            href={route('login')}
                            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors group"
                        >
                            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                            Kembali ke Login
                        </Link>
                    </div>

                </div>

                {/* Footer Copyright */}
                <div className="absolute bottom-6 text-xs text-white/40">
                    &copy; {new Date().getFullYear()} UPT Stasiun Klimatologi Sumatera Utara.
                </div>
            </div>
        </>
    );
}