import { Head } from '@inertiajs/react';
import { FileText, Download, Calendar, ArrowRight, Share2, Search, BookOpen, Clock } from 'lucide-react';
import Navbar from '@/Components/Navbar';
import { useState } from 'react';

export default function PublikasiContent({ auth, contents = [], title, subtitle, section }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredContents = contents.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const getThemeColors = () => {
        switch (section) {
            case 'buletin-musim': return 'from-blue-700 to-indigo-800';
            case 'buletin-bulanan': return 'from-emerald-700 to-teal-800';
            case 'buku-saku': return 'from-amber-600 to-orange-700';
            default: return 'from-blue-600 to-blue-800';
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Head title={`${title} - Stasiun Klimatologi Sumatera Utara`} />

            <Navbar auth={auth} />

            {/* Hero Section */}
            <section className="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32">
                <div className={`absolute inset-0 bg-gradient-to-br ${getThemeColors()}`} />
                <div className="absolute inset-0 bg-grid-white/5 bg-[size:30px_30px]" />

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 backdrop-blur-sm border border-white/10">
                            <BookOpen className="h-4 w-4 text-white" />
                            <span className="text-xs font-bold uppercase tracking-wider text-white">Publikasi Resmi BMKG</span>
                        </div>
                        <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl leading-tight">
                            {title}
                        </h1>
                        <p className="text-xl text-blue-50/80 leading-relaxed font-medium">
                            {subtitle}
                        </p>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-0 right-0 hidden lg:block p-20 opacity-20">
                    <FileText className="w-96 h-96 text-white" />
                </div>
            </section>

            {/* Search and Navigation */}
            <div className="relative -mt-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
                <div className="bg-white rounded-2xl shadow-xl p-4 border border-slate-100 flex flex-col md:flex-row gap-4 items-center">
                    <div className="relative flex-grow w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Cari buletin atau dokumen..."
                            className="w-full pl-12 pr-4 py-3 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500 transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 px-4 whitespace-nowrap">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm font-medium">Total: {filteredContents.length} Dokumen</span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="py-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {filteredContents.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
                        <div className="mx-auto w-24 h-24 rounded-full bg-slate-50 flex items-center justify-center mb-6">
                            <Search className="h-10 w-10 text-slate-300" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Dokumen Tidak Ditemukan</h3>
                        <p className="text-slate-500">
                            Maaf, kami tidak menemukan dokumen yang Anda cari. Silakan coba kata kunci lain.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {filteredContents.map((item) => (
                            <div
                                key={item.id}
                                className="group relative bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col"
                            >
                                <div className="mb-4 flex items-start justify-between">
                                    <div className="p-3 rounded-xl bg-blue-50 text-blue-600 group-hover:scale-110 transition-transform duration-300">
                                        <FileText className="h-8 w-8" />
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                                            <Share2 className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex-grow mb-6">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2 py-0.5 rounded">PDF</span>
                                        {item.subtitle && (
                                            <div className="flex items-center gap-1 text-slate-400 text-xs font-medium">
                                                <Calendar className="h-3 w-3" />
                                                <span>{item.subtitle}</span>
                                            </div>
                                        )}
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 line-clamp-2 leading-snug group-hover:text-blue-700 transition-colors mb-3">
                                        {item.title}
                                    </h3>
                                    {item.description && (
                                        <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
                                            {item.description}
                                        </p>
                                    )}
                                </div>

                                <div className="mt-auto space-y-3">
                                    {item.file_url ? (
                                        <a
                                            href={item.file_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-200 transition-all duration-300"
                                        >
                                            <Download className="h-4 w-4" />
                                            Download Dokumen
                                        </a>
                                    ) : (
                                        <div className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-100 text-slate-400 font-bold text-sm cursor-not-allowed">
                                            File Tidak Tersedia
                                        </div>
                                    )}

                                    <a
                                        href={item.file_url}
                                        target="_blank"
                                        className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-slate-500 font-semibold text-[13px] hover:text-blue-600 hover:bg-slate-50 transition-all"
                                    >
                                        Pratinjau Dokumen
                                        <ArrowRight className="h-3.5 w-3.5" />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* Info Panel */}
            <section className="pb-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <Download className="w-32 h-32" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 relative z-10 text-white">Dokumen Masih Banyak?</h2>
                    <p className="text-slate-300 mb-8 max-w-2xl mx-auto relative z-10">
                        Semua publikasi kami diperbarui secara berkala sesuai dengan jadwal rilis BMKG Pusat dan hasil pengamatan stasiun klimatologi.
                    </p>
                    <div className="relative z-10">
                        <a href="https://www.bmkg.go.id" target="_blank" className="inline-flex items-center gap-2 text-white bg-blue-600 px-8 py-4 rounded-2xl font-bold hover:bg-blue-500 transition-all shadow-xl shadow-blue-900/40">
                            Lihat di BMKG Pusat
                            <ArrowRight className="h-5 w-5" />
                        </a>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white border-t border-slate-200 py-12">
                <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                    <p className="text-slate-500 font-medium">
                        © 2026 UPT Stasiun Klimatologi BMKG Sumatera Utara. Hak Cipta Dilindungi.
                    </p>
                </div>
            </footer>
        </div>
    );
}
