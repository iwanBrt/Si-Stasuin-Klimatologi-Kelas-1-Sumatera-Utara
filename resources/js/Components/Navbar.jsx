import { Link } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';

export default function Navbar({ auth }) {
    return (
        <nav className="border-b border-blue-100 bg-white/80 backdrop-blur-md relative z-50" role="navigation" aria-label="Main navigation">
            <div className="mx-auto max-w-[1400px] px-3 sm:px-4 lg:px-6">
                <div className="flex h-20 items-center justify-between gap-4">
                    {/* Logo & Title - More Compact */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                        <Link href="/" className="flex items-center gap-2">
                            <img
                                src="/assets/logo-bmkg.png"
                                alt="Logo BMKG - Badan Meteorologi Klimatologi dan Geofisika"
                                className="h-12 w-auto object-contain"
                            />
                            <div>
                                <div className="text-xs md:text-sm font-bold text-gray-900 uppercase tracking-wide leading-tight">STASIUN KLIMATOLOGI<br className="hidden lg:block" /> SUMATERA UTARA</div>
                                <p className="text-[9px] md:text-[10px] text-blue-600 font-medium hidden md:block">BMKG</p>
                            </div>
                        </Link>
                    </div>

                    {/* Main Navigation Menu - New Items */}
                    <div className="hidden lg:flex items-center gap-4 xl:gap-5 flex-1 justify-center">
                        {/* Informasi Iklim Dropdown */}
                        <div className="relative group">
                            <button className="flex items-center gap-1 text-xs xl:text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors py-2 whitespace-nowrap">
                                Informasi Iklim
                                <ChevronDown className="h-3 w-3 xl:h-4 xl:w-4 transition-transform group-hover:rotate-180" />
                            </button>
                            <div className="absolute top-full left-0 mt-1 w-64 rounded-xl bg-white shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left z-50">
                                <div className="p-2 flex flex-col gap-1">
                                    {/* Dasarian - Nested Dropdown */}
                                    <div className="relative group/dasarian">
                                        <button className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                            Dasarian
                                            <ChevronDown className="h-3 w-3 -rotate-90" />
                                        </button>
                                        <div className="absolute left-full top-0 ml-1 w-64 rounded-xl bg-white shadow-xl border border-gray-100 opacity-0 invisible group-hover/dasarian:opacity-100 group-hover/dasarian:visible transition-all duration-200 z-50">
                                            <div className="p-2 flex flex-col gap-1">
                                                <a href="#" className="block px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">Prospek Iklim Dasarian</a>
                                                <a href="#" className="block px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">Analisis Hari Tanpa Hujan</a>
                                                <a href="#" className="block px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">Analisis Curah Hujan</a>
                                                <a href="#" className="block px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">Prakiraan Curah Hujan</a>
                                                <a href="#" className="block px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">Probabilitas Curah Hujan</a>
                                                <a href="#" className="block px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">Prakiraan Daerah Potensi Rawan Banjir</a>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Bulanan - Nested Dropdown */}
                                    <div className="relative group/bulanan">
                                        <button className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                            Bulanan
                                            <ChevronDown className="h-3 w-3 -rotate-90" />
                                        </button>
                                        <div className="absolute left-full top-0 ml-1 w-56 rounded-xl bg-white shadow-xl border border-gray-100 opacity-0 invisible group-hover/bulanan:opacity-100 group-hover/bulanan:visible transition-all duration-200 z-50">
                                            <div className="p-2 flex flex-col gap-1">
                                                <a href="#" className="block px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">Prakiraan Maret 2026</a>
                                                <a href="#" className="block px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">Prakiraan April 2026</a>
                                                <a href="#" className="block px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">Prakiraan Mei 2026</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Profil Dropdown */}
                        <div className="relative group">
                            <button className="flex items-center gap-1 text-xs xl:text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors py-2 whitespace-nowrap">
                                Profil
                                <ChevronDown className="h-3 w-3 xl:h-4 xl:w-4 transition-transform group-hover:rotate-180" />
                            </button>
                            <div className="absolute top-full left-0 mt-1 w-56 rounded-xl bg-white shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left z-50">
                                <div className="p-2 flex flex-col gap-1">
                                    <Link href={route('profile.tentang-kami')} className="block px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">Tentang Kami</Link>
                                    <Link href={route('profile.sejarah-visi-misi')} className="block px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">Sejarah, Visi & Misi</Link>
                                    <Link href={route('profile.staklim-sumut')} className="block px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">Staklim Sumut</Link>
                                    <Link href={route('profile.tim-kami')} className="block px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">Tim Kami</Link>
                                </div>
                            </div>
                        </div>

                        {/* Layanan Link */}
                        <Link href={route('layanan')} className="text-xs xl:text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors py-2 whitespace-nowrap">
                            Layanan
                        </Link>


                        {/* Kualitas Udara Dropdown */}
                        <div className="relative group">
                            <button className="flex items-center gap-1 text-xs xl:text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors py-2 whitespace-nowrap">
                                Kualitas Udara
                                <ChevronDown className="h-3 w-3 xl:h-4 xl:w-4 transition-transform group-hover:rotate-180" />
                            </button>
                            <div className="absolute top-full left-0 mt-1 w-56 rounded-xl bg-white shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left z-50">
                                <div className="p-2 flex flex-col gap-1">
                                    <Link href={route('kualitas-udara.kimia-air-hujan')} className="block px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">Kimia Air Hujan</Link>
                                    <Link href={route('kualitas-udara.pm25')} className="block px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">Kualitas Udara (PM 2.5)</Link>
                                    <a href="#" className="block px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">Indeks Kenyamanan</a>
                                </div>
                            </div>
                        </div>

                        {/* Normal Iklim Dropdown */}
                        <div className="relative group">
                            <button className="flex items-center gap-1 text-xs xl:text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors py-2 whitespace-nowrap">
                                Normal Iklim
                                <ChevronDown className="h-3 w-3 xl:h-4 xl:w-4 transition-transform group-hover:rotate-180" />
                            </button>
                            <div className="absolute top-full left-0 mt-1 w-64 rounded-xl bg-white shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left z-50">
                                <div className="p-2 flex flex-col gap-1">
                                    <Link href={route('normal-iklim.normal-hujan-bulanan')} className="block px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">Normal Hujan Bulanan</Link>
                                    <Link href={route('normal-iklim.peta-zona-musim')} className="block px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">Peta Zona Musim (ZOM)</Link>
                                    <a href="#" className="block px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">Peta Iklim Schmidt Fergusson</a>
                                    <a href="#" className="block px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">Peta Iklim Oldeman</a>
                                    <a href="#" className="block px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">Normal Suhu Maksimum</a>
                                    <a href="#" className="block px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">Normal Suhu Minimum</a>
                                </div>
                            </div>
                        </div>

                        {/* Kebakaran Hutan Dropdown */}
                        <div className="relative group">
                            <button className="flex items-center gap-1 text-xs xl:text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors py-2 whitespace-nowrap">
                                Kebakaran Hutan
                                <ChevronDown className="h-3 w-3 xl:h-4 xl:w-4 transition-transform group-hover:rotate-180" />
                            </button>
                            <div className="absolute top-full left-0 mt-1 w-64 rounded-xl bg-white shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left z-50">
                                <div className="p-2 flex flex-col gap-1">
                                    <Link href={route('kebakaran-hutan.fwi')} className="block px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">Fire Weather Index</Link>
                                    <Link href={route('kebakaran-hutan.ffmc')} className="block px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">Fine Fuel Moisture Code</Link>
                                    <Link href={route('kebakaran-hutan.hotspot')} className="block px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">Sebaran Titik Panas</Link>
                                </div>
                            </div>
                        </div>

                        {/* Iklim Ekstrim Dropdown */}
                        <div className="relative group">
                            <button className="flex items-center gap-1 text-xs xl:text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors py-2 whitespace-nowrap">
                                Iklim Ekstrim
                                <ChevronDown className="h-3 w-3 xl:h-4 xl:w-4 transition-transform group-hover:rotate-180" />
                            </button>
                            <div className="absolute top-full left-0 mt-1 w-64 rounded-xl bg-white shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left z-50">
                                <div className="p-2 flex flex-col gap-1">
                                    <a href="#" className="block px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">Peta Curah Hujan Harian</a>
                                    <a href="#" className="block px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">Hujan Ekstrim</a>
                                </div>
                            </div>
                        </div>

                        {/* Publikasi Dropdown */}
                        <div className="relative group">
                            <button className="flex items-center gap-1 text-xs xl:text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors py-2 whitespace-nowrap">
                                Publikasi
                                <ChevronDown className="h-3 w-3 xl:h-4 xl:w-4 transition-transform group-hover:rotate-180" />
                            </button>
                            <div className="absolute top-full left-0 mt-1 w-64 rounded-xl bg-white shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left z-50">
                                <div className="p-2 flex flex-col gap-1">
                                    <a href="#" className="block px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">Buletin Prakiraan Musim</a>
                                    <a href="#" className="block px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">Buletin Info Iklim Bulanan</a>
                                    <a href="#" className="block px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">Buku Saku MKKuG</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Auth Buttons */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 xl:px-6 py-2 xl:py-2.5 text-xs xl:text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="rounded-lg px-3 xl:px-5 py-2 xl:py-2.5 text-xs xl:text-sm font-semibold text-gray-700 transition-all duration-300 hover:bg-gray-100"
                                >
                                    Masuk
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-flex items-center gap-1 xl:gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-3 xl:px-6 py-2 xl:py-2.5 text-xs xl:text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl whitespace-nowrap"
                                >
                                    Daftar
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
