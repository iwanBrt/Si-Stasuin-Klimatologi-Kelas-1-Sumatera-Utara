import { Head, Link } from '@inertiajs/react';
import { Download, FileText, Users, Calendar, BookOpen, Award, Clock, Mail, MapPin, Phone, Newspaper } from 'lucide-react';

export default function Welcome({ auth, latestNews = [] }) {
    const downloadItems = [
        {
            id: 1,
            title: 'Template Proposal',
            fileType: 'DOCX',
            fileSize: '125 KB',
            downloadUrl: '#',
        },
        {
            id: 2,
            title: 'Format Surat Pengantar',
            fileType: 'PDF',
            fileSize: '95 KB',
            downloadUrl: '#',
        },
        {
            id: 3,
            title: 'SOP Magang & Penelitian',
            fileType: 'PDF',
            fileSize: '210 KB',
            downloadUrl: '#',
        },
    ];

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
            <Head title="Sistem Magang UPT Stasiun Klimatologi" />

            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
                {/* Navigation Bar */}
                <nav className="border-b border-blue-100 bg-white/80 backdrop-blur-md">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-20 items-center justify-between">
                            {/* Logo & Title */}
                            <div className="flex items-center gap-3">
                                <div className="h-14 w-14 overflow-hidden rounded-full border-2 border-white shadow-lg">
                                    <img
                                        src="/assets/logo.png"
                                        alt="Logo"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h1 className="text-lg font-bold text-gray-900">SI Magang</h1>
                                    <p className="text-xs text-gray-500">UPT Stasiun Klimatologi</p>
                                </div>
                            </div>

                            {/* Auth Buttons */}
                            <div className="flex items-center gap-3">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="rounded-lg px-5 py-2.5 text-sm font-semibold text-gray-700 transition-all duration-300 hover:bg-gray-100"
                                        >
                                            Masuk
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl"
                                        >
                                            Daftar Sekarang
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 py-20">
                    <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20" />

                    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            {/* Badge */}
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 backdrop-blur-sm">
                                <Calendar className="h-5 w-5 text-yellow-300" />
                                <span className="text-sm font-semibold text-white">
                                    Pendaftaran Dibuka - Tahun 2026
                                </span>
                            </div>

                            <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                                Sistem Magang & Penelitian
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
                                        <a
                                            href="#download"
                                            className="inline-flex items-center gap-3 rounded-xl border-2 border-white px-8 py-4 text-lg font-bold text-white transition-all duration-300 hover:bg-white hover:text-blue-700"
                                        >
                                            <Download className="h-5 w-5" />
                                            <span>Unduh Panduan</span>
                                        </a>
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
                <section className="py-20">
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
                </section>

                {/* Download Section */}
                <section id="download" className="bg-gradient-to-br from-gray-50 to-blue-50 py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-12 text-center">
                            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                                <Download className="h-4 w-4" />
                                Pusat Unduhan
                            </div>
                            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                                Dokumen Persyaratan
                            </h2>
                            <p className="mx-auto max-w-2xl text-lg text-gray-600">
                                Unduh template dan panduan yang diperlukan untuk melengkapi permohonan Anda
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                            {downloadItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="group rounded-2xl border border-gray-200 bg-white p-8 shadow-md transition-all duration-300 hover:scale-105 hover:border-blue-300 hover:shadow-2xl"
                                >
                                    <div className="mb-5 flex items-start justify-between">
                                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
                                            <FileText className="h-7 w-7 text-white" />
                                        </div>
                                        <span className="rounded-lg bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                                            {item.fileType}
                                        </span>
                                    </div>

                                    <h3 className="mb-2 text-xl font-bold text-gray-900">
                                        {item.title}
                                    </h3>

                                    <div className="mb-5 flex items-center gap-2 text-xs text-gray-500">
                                        <span className="rounded bg-gray-100 px-2 py-1">
                                            {item.fileSize}
                                        </span>
                                    </div>

                                    <a
                                        href={item.downloadUrl}
                                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl"
                                    >
                                        <Download className="h-4 w-4" />
                                        Unduh Dokumen
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* News Section */}
                {latestNews.length > 0 && (
                    <section className="bg-white py-20">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="mb-12 text-center">
                                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                                    <Newspaper className="h-4 w-4" />
                                    Berita & Pengumuman
                                </div>
                                <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                                    Informasi Terbaru
                                </h2>
                                <p className="mx-auto max-w-2xl text-lg text-gray-600">
                                    Dapatkan update terkini seputar program magang dan kegiatan stasiun klimatologi
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                                {latestNews.map((news) => (
                                    <Link
                                        key={news.id}
                                        href={route('news.show', news.slug)}
                                        className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                                    >
                                        {news.featured_image && (
                                            <div className="aspect-video w-full overflow-hidden bg-gray-100">
                                                <img
                                                    src={`/storage/${news.featured_image}`}
                                                    alt={news.title}
                                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                                />
                                            </div>
                                        )}

                                        <div className="p-6">
                                            <div className="mb-3 flex items-center gap-2 text-xs text-gray-500">
                                                <Calendar className="h-4 w-4" />
                                                {news.published_at}
                                            </div>

                                            <h3 className="mb-3 text-xl font-bold text-gray-900 transition-colors group-hover:text-blue-600">
                                                {news.title}
                                            </h3>

                                            {news.excerpt && (
                                                <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-600">
                                                    {news.excerpt}
                                                </p>
                                            )}

                                            <div className="text-sm font-semibold text-blue-600 transition-all group-hover:gap-2 group-hover:text-blue-700">
                                                Baca Selengkapnya →
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

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
                                        <p className="mb-8 text-blue-100">
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
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t border-gray-200 bg-white py-8">
                    <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                        <p className="text-sm text-gray-600">
                            © 2026 UPT Stasiun Klimatologi BMKG. All rights reserved.
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}
