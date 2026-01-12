import { Head, Link, useForm } from '@inertiajs/react';
import { Mail, Send, LogOut } from 'lucide-react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <>
            <Head title="Verifikasi Email" />

            {/* Background Image Full Screen */}
            <div className="flex min-h-screen w-full items-center justify-center bg-slate-900 bg-cover bg-center"
                style={{ backgroundImage: "url('/bgSI.jpg')" }}>

                {/* Overlay Gelap */}
                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]"></div>

                {/* Glassy Container */}
                <div className="relative z-10 w-full max-w-md p-8 mx-4 overflow-hidden rounded-2xl border border-white/10 bg-white/10 shadow-2xl backdrop-blur-md sm:px-10 text-center">

                    {/* Header Icon */}
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/20 ring-1 ring-purple-400/30 backdrop-blur-sm shadow-lg shadow-purple-900/20">
                        <Mail className="h-8 w-8 text-purple-400" />
                    </div>

                    <div className="mb-8">
                        <h2 className="text-2xl font-bold tracking-tight text-white drop-shadow-md">
                            Verifikasi Email Anda
                        </h2>
                        <p className="mt-3 text-sm text-slate-200 leading-relaxed">
                            Terima kasih telah mendaftar! Sebelum memulai, verifikasi alamat email Anda dengan mengklik tautan yang baru saja kami kirimkan. Jika Anda tidak menerima email, kami akan dengan senang hati mengirimkan yang lain.
                        </p>
                    </div>

                    {status === 'verification-link-sent' && (
                        <div className="mb-6 rounded-xl border border-green-400/30 bg-green-500/20 p-4 text-sm font-medium text-green-300 backdrop-blur-sm flex items-start gap-3">
                            <Send className="h-5 w-5 mt-0.5 flex-shrink-0" />
                            <span>Link verifikasi baru telah dikirim ke alamat email yang Anda berikan saat pendaftaran.</span>
                        </div>
                    )}

                    <form onSubmit={submit}>
                        <div className="flex flex-col gap-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="group w-full rounded-xl bg-purple-600/90 py-3.5 font-bold text-white shadow-lg shadow-purple-900/50 backdrop-blur-sm hover:bg-purple-500 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-purple-400/20 flex items-center justify-center gap-2"
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
                                        Kirim Ulang Email Verifikasi
                                    </>
                                )}
                            </button>

                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm font-semibold text-slate-300 backdrop-blur-sm hover:bg-black/40 hover:text-white transition-all"
                            >
                                <LogOut className="h-4 w-4" />
                                Keluar
                            </Link>
                        </div>
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
