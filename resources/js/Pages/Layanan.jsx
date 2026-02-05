import { Head, Link } from '@inertiajs/react';
import { ChevronDown, FileText, Database, GraduationCap, ArrowRight } from 'lucide-react';

export default function Layanan() {
    return (
        <div className="min-h-screen bg-white">
            <Head title="Layanan - BMKG" />

            <nav className="border-b border-blue-100 bg-white/80 backdrop-blur-md relative z-50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-20 items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Link href="/">
                                <img src="/assets/logo-bmkg.png" alt="Logo" className="h-12 w-12" />
                            </Link>
                            <div>
                                <h1 className="text-sm md:text-lg font-bold text-gray-900 uppercase tracking-wide">Stasiun Klimatologi Sumatera Utara</h1>
                                <p className="text-[10px] md:text-xs text-blue-600 font-medium">Badan Meteorologi Klimatologi dan Geofisika</p>
                            </div>
                        </div>
                        <div className="hidden md:flex items-center gap-8">
                            <div className="relative group">
                                <button className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 hover:text-blue-600">
                                    Profil BMKG
                                    <ChevronDown className="h-4 w-4" />
                                </button>
                                <div className="absolute top-full left-0 mt-1 w-64 rounded-xl bg-white shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                    <div className="p-2 flex flex-col gap-1">
                                        <Link href={route('profile.tentang-kami')} className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg">
                                            Tentang Kami
                                        </Link>
                                        <Link href={route('profile.sejarah-visi-misi')} className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg">
                                            Sejarah, Visi & Misi
                                        </Link>
                                        <Link href={route('profile.staklim-sumut')} className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg">
                                            Profil Staklim Sumut
                                        </Link>
                                        <Link href={route('profile.tim-kami')} className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg">
                                            Tim Kami
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <Link href={route('layanan')} className="text-sm font-semibold text-blue-600">Layanan</Link>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link href="/" className="text-sm font-bold text-gray-600 hover:text-blue-600">Kembali ke Beranda</Link>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-4">Pelayanan Publik</span>
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Layanan BMKG</h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Kami menyediakan berbagai layanan informasi dan jasa di bidang Meteorologi, Klimatologi, dan Geofisika.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Layanan 1 */}
                        <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl hover:border-blue-200 transition-all duration-300 group">
                            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                                <Database className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Permintaan Data</h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Layanan permintaan data iklim dan cuaca historis untuk keperluan penelitian, proyek, atau asuransi.
                            </p>
                            <Link href={route('layanan.permintaan-data')} className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800">
                                Lihat Selengkapnya <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </div>

                        {/* Layanan 2 */}
                        <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl hover:border-blue-200 transition-all duration-300 group">
                            <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform">
                                <GraduationCap className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Magang & PKL</h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Program praktik kerja lapangan bagi siswa dan mahasiswa untuk belajar langsung dari para ahli.
                            </p>
                            <Link href={route('register')} className="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-800">
                                Daftar Sekarang <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </div>

                        {/* Layanan 3 */}
                        <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl hover:border-blue-200 transition-all duration-300 group">
                            <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform">
                                <FileText className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Informasi Khusus</h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Layanan informasi cuaca dan iklim khusus untuk sektor penerbangan, maritim, dan konstruksi.
                            </p>
                            <a href="#" className="inline-flex items-center text-emerald-600 font-semibold hover:text-emerald-800">
                                Hubungi Kami <ArrowRight className="w-4 h-4 ml-2" />
                            </a>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
