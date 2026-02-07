import { Head, Link } from '@inertiajs/react';
import { Users, Calendar, BookOpen, Award, Clock, Mail, MapPin, Phone, Newspaper, ArrowRight, ArrowUpRight, ChevronDown } from 'lucide-react';
// import WeatherForecastSection from '@/Components/WeatherForecastSection';
import EarthquakeSection from '@/Components/EarthquakeSection';
// import WeatherWarningSection from '@/Components/WeatherWarningSection';

export default function Welcome({ auth, latestNews = [] }) {
    const features = [
        {
            icon: BookOpen,
            title: 'Pembelajaran Praktis',
            description: 'Dapatkan pengalaman langsung dalam bidang klimatologi dan meteorologi'
        },
        {
            icon: Users,
            title: 'Pembimbing Ahli',
            description: 'Dibimbing oleh tenaga profesional bersertifikat BMKG'
        },
        {
            icon: Award,
            title: 'Sertifikat Resmi',
            description: 'Raih sertifikat resmi dari UPT Stasiun Klimatologi'
        },
        {
            icon: Clock,
            title: 'Durasi Fleksibel',
            description: 'Program magang dengan durasi 3-6 bulan sesuai kebutuhan'
        },
    ];

    return (
        <>
            <Head title="Stasiun Klimatologi Sumatera Utara">
                <meta name="description" content="Sistem Informasi UPT Stasiun Klimatologi Sumatera Utara - BMKG. Layanan permohonan data meteorologi, klimatologi, dan informasi cuaca terkini." />
            </Head>

            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
                {/* Navigation Bar */}
                <nav className="border-b border-blue-100 bg-white/80 backdrop-blur-md relative z-50" role="navigation" aria-label="Main navigation">
                    <div className="mx-auto max-w-[1400px] px-3 sm:px-4 lg:px-6">
                        <div className="flex h-20 items-center justify-between gap-4">
                            {/* Logo & Title - More Compact */}
                            <div className="flex items-center gap-2 flex-shrink-0">
                                <img
                                    src="/assets/logo-bmkg.png"
                                    alt="Logo BMKG - Badan Meteorologi Klimatologi dan Geofisika"
                                    className="h-12 w-auto object-contain"
                                />
                                <div>
                                    <div className="text-xs md:text-sm font-bold text-gray-900 uppercase tracking-wide leading-tight">STASIUN KLIMATOLOGI<br className="hidden lg:block" /> SUMATERA UTARA</div>
                                    <p className="text-[9px] md:text-[10px] text-blue-600 font-medium hidden md:block">BMKG</p>
                                </div>
                            </div>

                            {/* Main Navigation Menu - New Items */}
                            <div className="hidden lg:flex items-center gap-4 xl:gap-5 flex-1 justify-center">
                                {/* Informasi Iklim Dropdown - Multi-level */}
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
                                                {/* Dasarian Submenu */}
                                                <div className="absolute left-full top-0 ml-1 w-64 rounded-xl bg-white shadow-xl border border-gray-100 opacity-0 invisible group-hover/dasarian:opacity-100 group-hover/dasarian:visible transition-all duration-200 z-50">
                                                    <div className="p-2 flex flex-col gap-1">
                                                        <a href="#" className="block px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                                            Prospek Iklim Dasarian
                                                        </a>
                                                        <a href="#" className="block px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                                            Analisis Hari Tanpa Hujan
                                                        </a>
                                                        <a href="#" className="block px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                                            Analisis Curah Hujan
                                                        </a>
                                                        <a href="#" className="block px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                                            Prakiraan Curah Hujan
                                                        </a>
                                                        <a href="#" className="block px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                                            Probabilitas Curah Hujan
                                                        </a>
                                                        <a href="#" className="block px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                                            Prakiraan Daerah Potensi Rawan Banjir
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Bulanan - Nested Dropdown */}
                                            <div className="relative group/bulanan">
                                                <button className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                                    Bulanan
                                                    <ChevronDown className="h-3 w-3 -rotate-90" />
                                                </button>
                                                {/* Bulanan Submenu */}
                                                <div className="absolute left-full top-0 ml-1 w-56 rounded-xl bg-white shadow-xl border border-gray-100 opacity-0 invisible group-hover/bulanan:opacity-100 group-hover/bulanan:visible transition-all duration-200 z-50">
                                                    <div className="p-2 flex flex-col gap-1">
                                                        <a href="#" className="block px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                                            Prakiraan Maret 2026
                                                        </a>
                                                        <a href="#" className="block px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                                            Prakiraan April 2026
                                                        </a>
                                                        <a href="#" className="block px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                                            Prakiraan Mei 2026
                                                        </a>
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
                                            <Link href={route('kualitas-udara.kimia-air-hujan')} className="block px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                                Kimia Air Hujan
                                            </Link>
                                            <Link href={route('kualitas-udara.pm25')} className="block px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                                Kualitas Udara (PM 2.5)
                                            </Link>
                                            <a href="#" className="block px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                                Indeks Kenyamanan
                                            </a>
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
                                            <Link href={route('normal-iklim.normal-hujan-bulanan')} className="block px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                                Normal Hujan Bulanan
                                            </Link>
                                            <a href="#" className="block px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                                Peta Zona Musim (ZOM)
                                            </a>
                                            <a href="#" className="block px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                                Peta Iklim Schmidt Fergusson
                                            </a>
                                            <a href="#" className="block px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                                Peta Iklim Oldeman
                                            </a>
                                            <a href="#" className="block px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                                Normal Suhu Maksimum
                                            </a>
                                            <a href="#" className="block px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                                Normal Suhu Minimum
                                            </a>
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
                                            <Link href={route('kebakaran-hutan.fwi')} className="block px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                                Fire Weather Index
                                            </Link>
                                            <Link href={route('kebakaran-hutan.ffmc')} className="block px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                                Fine Fuel Moisture Code
                                            </Link>
                                            <Link href={route('kebakaran-hutan.hotspot')} className="block px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                                Sebaran Titik Panas
                                            </Link>
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
                                            <a href="#" className="block px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                                Peta Curah Hujan Harian
                                            </a>
                                            <a href="#" className="block px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                                Hujan Ekstrim
                                            </a>
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
                                            <a href="#" className="block px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                                Buletin Prakiraan Musim
                                            </a>
                                            <a href="#" className="block px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                                Buletin Info Iklim Bulanan
                                            </a>
                                            <a href="#" className="block px-4 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                                Buku Saku MKKuG
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Auth Buttons - Adjusted positioning */}
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
                </nav >

                {/* Hero Section */}
                <section className="relative overflow-hidden py-20" aria-labelledby="hero-heading">
                    {/* Background Image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: 'url(/assets/lobyKlimatologi.jpeg)' }}
                        role="img"
                        aria-label="Lobi Stasiun Klimatologi"
                    />
                    {/* Dark Overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-800/70 to-indigo-900/80" />
                    <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]" />

                    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            {/* Badge */}
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 backdrop-blur-sm">
                                <Calendar className="h-5 w-5 text-yellow-300" aria-hidden="true" />
                                <span className="text-sm font-semibold text-white">
                                    Pendaftaran Dibuka - Tahun 2026
                                </span>
                            </div>

                            <h1 id="hero-heading" className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                                Sistem Informasi
                                <span className="mt-2 block bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-200 bg-clip-text text-transparent">
                                    UPT Stasiun Klimatologi Sumatera Utara
                                </span>
                            </h1>

                            <p className="mx-auto mb-10 max-w-3xl text-lg leading-relaxed text-blue-100 sm:text-xl">
                                Bergabunglah dengan program magang profesional di bidang klimatologi dan meteorologi.
                                Kembangkan kompetensi Anda bersama tenaga ahli BMKG.
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="group inline-flex items-center gap-3 rounded-xl bg-white px-8 py-4 text-lg font-bold text-blue-700 shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-yellow-300 hover:text-blue-900"
                                    >
                                        <span>Masuk ke Dashboard</span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('register')}
                                            className="group inline-flex items-center gap-3 rounded-xl bg-white px-8 py-4 text-lg font-bold text-blue-700 shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-yellow-300 hover:text-blue-900"
                                        >
                                            <span>Daftar Sekarang</span>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </Link>
                                    </>
                                )}
                            </div>

                            {/* Stats */}
                            <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
                                <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20">
                                    <div className="text-4xl font-bold text-yellow-300">500+</div>
                                    <div className="mt-2 text-sm text-blue-100">Alumni Peserta</div>
                                </div>
                                <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20">
                                    <div className="text-4xl font-bold text-yellow-300">3-6</div>
                                    <div className="mt-2 text-sm text-blue-100">Bulan Program</div>
                                </div>
                                <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20">
                                    <div className="text-4xl font-bold text-yellow-300">15+</div>
                                    <div className="mt-2 text-sm text-blue-100">Pembimbing Ahli</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                < section className="py-20" >
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-12 text-center">
                            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                                Mengapa Memilih Program Kami?
                            </h2>
                            <p className="mx-auto max-w-2xl text-lg text-gray-600">
                                Dapatkan pengalaman berkualitas dengan fasilitas dan bimbingan terbaik
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                            {features.map((feature, index) => {
                                const IconComponent = feature.icon;
                                return (
                                    <div
                                        key={index}
                                        className="group rounded-2xl border border-gray-200 bg-white p-8 shadow-md transition-all duration-300 hover:scale-105 hover:border-blue-300 hover:shadow-2xl"
                                    >
                                        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg transition-transform duration-300 group-hover:scale-110">
                                            <IconComponent className="h-7 w-7 text-white" />
                                        </div>
                                        <h3 className="mb-3 text-xl font-bold text-gray-900">
                                            {feature.title}
                                        </h3>
                                        <p className="text-sm leading-relaxed text-gray-600">
                                            {feature.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section >

                {/* News Section */}
                {/* Creative News Section */}
                {
                    latestNews.length > 0 && (
                        <section className="relative overflow-hidden bg-gray-50 py-24">
                            {/* Abstract Background Elements */}
                            <div className="absolute right-0 top-0 -mr-20 -mt-20 h-[500px] w-[500px] rounded-full bg-blue-100/50 mix-blend-multiply blur-3xl filter" />
                            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-[500px] w-[500px] rounded-full bg-indigo-100/50 mix-blend-multiply blur-3xl filter" />

                            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                {/* Section Header */}
                                <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
                                    <div className="max-w-2xl">
                                        <div className="mb-2 flex items-center gap-2 uppercase tracking-wider text-blue-600">
                                            <Newspaper className="h-4 w-4" />
                                            <span className="text-sm font-bold">Kabar Terkini</span>
                                        </div>
                                        <h2 className="text-4xl font-black leading-tight text-gray-900 md:text-5xl">
                                            Wawasan & <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Informasi</span>
                                        </h2>
                                        <div className="mt-4 h-1.5 w-24 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600" />
                                    </div>

                                    <Link
                                        href="#"
                                        className="group hidden items-center gap-2 font-bold text-gray-600 transition-colors hover:text-blue-600 md:inline-flex"
                                    >
                                        Lihat Arsip Berita
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition-all group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-lg">
                                            <ArrowRight className="h-4 w-4" />
                                        </div>
                                    </Link>
                                </div>

                                {/* News Grid */}
                                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                                    {latestNews.map((news, index) => (
                                        <Link
                                            key={news.id}
                                            href={route('news.show', news.slug)}
                                            className={`group relative isolate flex flex-col justify-end overflow-hidden rounded-3xl shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${index === 0 ? 'bg-gray-900 md:col-span-2 md:row-span-2 min-h-[400px] md:min-h-[500px]' : 'bg-white min-h-[350px]'
                                                }`}
                                        >
                                            {/* Image */}
                                            <div className={`absolute inset-0 transition-transform duration-700 group-hover:scale-110 ${index === 0 ? '' : 'h-1/2'}`}>
                                                {news.featured_image ? (
                                                    <img
                                                        src={`/storage/${news.featured_image}`}
                                                        alt={news.title}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="h-full w-full bg-gray-200" />
                                                )}
                                                {/* Overlays */}
                                                {index === 0 ? (
                                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-80" />
                                                ) : (
                                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                                                )}
                                            </div>

                                            {/* Content Container */}
                                            <div className={`relative z-10 p-6 ${index === 0 ? 'md:p-10' : 'mt-auto'}`}>
                                                {/* Date Badge */}
                                                <div className={`mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold backdrop-blur-md ${index === 0
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-blue-50 text-blue-700 group-hover:bg-white/20 group-hover:text-white'
                                                    }`}>
                                                    <Calendar className="h-3.5 w-3.5" />
                                                    {news.published_at}
                                                </div>

                                                {/* Floating Icon for non-featured */}
                                                {index !== 0 && (
                                                    <div className="absolute right-6 top-0 -mt-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-xl transition-all duration-300 group-hover:scale-0 group-hover:opacity-0">
                                                        <ArrowUpRight className="h-6 w-6" />
                                                    </div>
                                                )}

                                                <h3 className={`mb-3 font-bold leading-tight transition-colors ${index === 0
                                                    ? 'text-3xl text-white group-hover:text-yellow-300 md:text-4xl'
                                                    : 'text-xl text-gray-900 group-hover:text-white'
                                                    }`}>
                                                    {news.title}
                                                </h3>

                                                {news.excerpt && (
                                                    <p className={`line-clamp-2 leading-relaxed ${index === 0
                                                        ? 'max-w-2xl text-lg text-gray-300'
                                                        : 'text-sm text-gray-500 group-hover:text-gray-200'
                                                        }`}>
                                                        {news.excerpt}
                                                    </p>
                                                )}

                                                {/* Read More Link */}
                                                <div className={`mt-6 flex items-center gap-2 text-sm font-bold ${index === 0 ? 'text-yellow-300' : 'text-blue-600 group-hover:text-yellow-300'
                                                    }`}>
                                                    Read More
                                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>

                                {/* Mobile View All */}
                                <div className="mt-8 text-center md:hidden">
                                    <Link href="#" className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-4 font-bold text-gray-700 shadow-sm transition-all hover:bg-gray-50">
                                        Lihat Semua Berita
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </div>
                            </div>
                        </section>
                    )
                }

                {/* Weather Sections - Disabled per request */}
                {/* <WeatherWarningSection /> */}
                {/* <WeatherForecastSection /> */}

                {/* Earthquake Section */}
                <EarthquakeSection />

                {/* Contact Section */}
                <section className="py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 shadow-2xl">
                            <div className="grid grid-cols-1 lg:grid-cols-2">
                                {/* Left Side - Info */}
                                <div className="p-12">
                                    <h2 className="mb-4 text-3xl font-bold text-white">
                                        Hubungi Kami
                                    </h2>
                                    <p className="mb-8 text-lg text-blue-100">
                                        Punya pertanyaan? Tim kami siap membantu Anda
                                    </p>

                                    <div className="space-y-5">
                                        <div className="flex items-start gap-4">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                                                <Mail className="h-6 w-6 text-yellow-300" />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-white">Email</div>
                                                <a href="mailto:staklim.sumut.bmkg.go.id" className="text-blue-200 hover:text-white">
                                                    staklim.sumut@bmkg.go.id
                                                </a>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                                                <Phone className="h-6 w-6 text-yellow-300" />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-white">Telepon</div>
                                                <a href="tel:+622112345678" className="text-blue-200 hover:text-white">
                                                    (061)-6614631
                                                </a>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                                                <MapPin className="h-6 w-6 text-yellow-300" />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-white">Alamat</div>
                                                <p className="text-blue-200">
                                                    Jl. Meteorologi Raya No. 17 Sempali,Deli Serdang<br />
                                                    Medan Sumatera Utara
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Side - CTA */}
                                <div className="flex items-center justify-center bg-white/5 p-12 backdrop-blur-sm">
                                    <div className="text-center">
                                        <h3 className="mb-4 text-2xl font-bold text-white">
                                            Siap Memulai?
                                        </h3>
                                        <p className="mb-6 text-blue-100">
                                            Daftar sekarang dan mulai perjalanan karir Anda di bidang klimatologi
                                        </p>

                                        {auth.user ? (
                                            <Link
                                                href={route('dashboard')}
                                                className="inline-flex items-center gap-3 rounded-xl bg-white px-8 py-4 text-lg font-bold text-blue-700 shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-yellow-300 hover:text-blue-900"
                                            >
                                                Buka Dashboard
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-6 w-6"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </Link>
                                        ) : (
                                            <Link
                                                href={route('register')}
                                                className="inline-flex items-center gap-3 rounded-xl bg-white px-8 py-4 text-lg font-bold text-blue-700 shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-yellow-300 hover:text-blue-900"
                                            >
                                                Daftar Sekarang
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-6 w-6"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </Link>
                                        )}
                                    </div>

                                    {/* Mini Map */}
                                    <div className="mt-8 w-full max-w-xs mx-auto rounded-2xl overflow-hidden border-4 border-white/20 shadow-xl">
                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3981.8511521342225!2d98.71232717497325!3d3.6214738963525996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x303133d7b3ce5a43%3A0xac00215bdd42dc31!2sStasiun%20Klimatologi%20Sumatera%20Utara!5e0!3m2!1sid!2sid!4v1770174688597!5m2!1sid!2sid"
                                            width="100%"
                                            height="200"
                                            style={{ border: 0 }}
                                            allowFullScreen=""
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                            className="w-full h-[200px]"
                                        ></iframe>
                                    </div>
                                </div>
                            </div>
                        </div>



                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t border-gray-200 bg-white py-8" role="contentinfo">
                    <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                        <p className="text-sm text-gray-600">
                            © 2026 UPT Stasiun Klimatologi BMKG Sumatera Utara. Hak Cipta Dilindungi.
                        </p>
                    </div>
                </footer>
            </div >
        </>
    );
}
