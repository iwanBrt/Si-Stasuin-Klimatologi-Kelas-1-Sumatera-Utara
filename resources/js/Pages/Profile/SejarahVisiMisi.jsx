import { Head, Link } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';

export default function SejarahVisiMisi() {
    return (
        <div className="min-h-screen bg-white">
            <Head title="Sejarah, Visi & Misi - BMKG" />

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
                                <button className="flex items-center gap-1.5 text-sm font-semibold text-blue-600">
                                    Profil BMKG
                                    <ChevronDown className="h-4 w-4" />
                                </button>
                                <div className="absolute top-full left-0 mt-1 w-64 rounded-xl bg-white shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                    <div className="p-2 flex flex-col gap-1">
                                        <Link href={route('profile.tentang-kami')} className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg">
                                            Tentang Kami
                                        </Link>
                                        <Link href={route('profile.sejarah-visi-misi')} className="block px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg">
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
                            <Link href={route('layanan')} className="text-sm font-semibold text-gray-700 hover:text-blue-600">Layanan</Link>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link href="/" className="text-sm font-bold text-gray-600 hover:text-blue-600">Kembali ke Beranda</Link>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-screen">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    {/* Sejarah Section */}
                    <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-blue-100 mb-8">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Sejarah BMKG</h2>
                            <div className="h-1.5 w-24 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
                        </div>
                        <div className="prose prose-lg mx-auto text-gray-600 text-justify">
                            <p className="mb-4">
                                Pengamatan meteorologi dan geofisika di Indonesia dimulai pada tahun 1841 oleh Dr. Onnen, Kepala Rumah Sakit di Bogor. Tahun 1866, kegiatan pengamatan perorangan tersebut oleh Pemerintah Hindia Belanda diresmikan menjadi instansi pemerintah dengan nama Magnetisch en Meteorologisch Observatorium.
                            </p>
                            <p className="mb-4">
                                Pada masa pendudukan Jepang (1942-1945), nama instansi diubah menjadi Kisho Kauso Kusho. Setelah proklamasi kemerdekaan Indonesia pada tahun 1945, instansi tersebut dipecah menjadi dua: Di Yogyakarta bernama Biro Meteorologi (berada di lingkungan Markas Tertinggi Tentara Rakyat Indonesia khusus untuk melayani kepentingan Angkatan Udara) dan di Jakarta bernama Jawatan Meteorologi dan Geofisika (di bawah Kementerian Pekerjaan Umum dan Tenaga).
                            </p>
                            <p className="mb-4">
                                Pada tanggal 21 Juli 1947 Jawatan Meteorologi dan Geofisika diambil alih oleh Pemerintah Belanda dan namanya diganti menjadi Meteorologisch en Geofisiche Dienst. Pada tahun 1949, setelah penyerahan kedaulatan negara Republik Indonesia, instansi tersebut ganti nama menjadi Jawatan Meteorologi dan Geofisika.
                            </p>
                            <p className="mb-4">
                                Pada tahun 2008, melalui Peraturan Presiden Nomor 61 Tahun 2008, BMG berganti status menjadi Lembaga Pemerintah Non Departemen dengan nama Badan Meteorologi, Klimatologi, dan Geofisika (BMKG).
                            </p>
                        </div>
                    </div>

                    {/* Visi Section */}
                    <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-blue-100 mb-8">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Visi</h2>
                            <div className="h-1.5 w-24 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto rounded-full"></div>
                        </div>
                        <div className="text-center text-xl font-medium text-gray-800 leading-relaxed max-w-2xl mx-auto">
                            "Mewujudkan BMKG yang Handal, Tanggap dan Mampu dalam rangka mendukung Keselamatan Masyarakat serta Keberhasilan Pembangunan Nasional, dan Berperan aktif di tingkat Internasional."
                        </div>
                    </div>

                    {/* Misi Section */}
                    <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-blue-100">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Misi</h2>
                            <div className="h-1.5 w-24 bg-gradient-to-r from-emerald-400 to-green-600 mx-auto rounded-full"></div>
                        </div>
                        <div className="prose prose-lg mx-auto text-gray-600">
                            <ul className="list-none space-y-4">
                                <li className="flex items-start">
                                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full font-bold mr-4">1</span>
                                    <span>Mengamati dan memahami fenomena meteorologi, klimatologi, kualitas udara dan geofisika.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full font-bold mr-4">2</span>
                                    <span>Menyediakan data, informasi dan jasa meteorologi, klimatologi, kualitas udara dan geofisika yang handal dan terpercaya.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full font-bold mr-4">3</span>
                                    <span>Mengkoordinasikan dan memfasilitasi kegiatan di bidang meteorologi, klimatologi, kualitas udara dan geofisika.</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full font-bold mr-4">4</span>
                                    <span>Berpartisipasi aktif dalam kegiatan internasional di bidang meteorologi, klimatologi, kualitas udara dan geofisika.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
