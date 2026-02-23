import { Head, Link } from '@inertiajs/react';
import { BookOpen, Users, Award, Clock, CheckCircle, FileText, GraduationCap, ArrowRight, Calendar, Shield, Building } from 'lucide-react';
import Navbar from '@/Components/Navbar';

export default function MagangPKL({ auth }) {
    const features = [
        {
            icon: BookOpen,
            title: 'Pembelajaran Praktis',
            description: 'Dapatkan pengalaman langsung dalam bidang klimatologi dan meteorologi dengan peralatan modern.'
        },
        {
            icon: Users,
            title: 'Pembimbing Ahli',
            description: 'Dibimbing oleh tenaga profesional bersertifikat BMKG yang berpengalaman di bidangnya.'
        },
        {
            icon: Award,
            title: 'Sertifikat Resmi',
            description: 'Raih sertifikat resmi dari UPT Stasiun Klimatologi sebagai bukti kompetensi Anda.'
        },
        {
            icon: Clock,
            title: 'Durasi Fleksibel',
            description: 'Program magang dengan durasi 3-6 bulan yang dapat disesuaikan dengan kebutuhan Anda.'
        },
    ];

    const requirements = [
        {
            category: 'Berkas Administrasi',
            icon: FileText,
            items: [
                'Surat permohonan magang/PKL dari instansi/kampus',
                'Fotokopi KTP atau Kartu Pelajar/Mahasiswa',
                'Curriculum Vitae (CV) terbaru',
                'Pas foto 3x4 (2 lembar)',
                'Surat keterangan aktif kuliah/sekolah',
            ]
        },
        {
            category: 'Persyaratan Akademik',
            icon: GraduationCap,
            items: [
                'Mahasiswa minimal semester 4 atau siswa SMK',
                'IPK minimal 2.75 (untuk mahasiswa)',
                'Jurusan terkait: Meteorologi, Klimatologi, Geofisika, Fisika, Teknik Lingkungan, atau sejenis',
                'Surat rekomendasi dari dosen/guru pembimbing',
            ]
        },
        {
            category: 'Persyaratan Lainnya',
            icon: Shield,
            items: [
                'Bersedia mengikuti aturan dan tata tertib stasiun',
                'Memiliki laptop pribadi untuk pengolahan data',
                'Bersedia ditempatkan di Stasiun Klimatologi Sumatera Utara',
                'Surat pernyataan bermaterai (format disediakan)',
            ]
        },
    ];

    const stats = [
        { value: '500+', label: 'Alumni Peserta', icon: Users },
        { value: '3-6', label: 'Bulan Program', icon: Calendar },
        { value: '15+', label: 'Pembimbing Ahli', icon: Award },
        { value: '10+', label: 'Instansi Mitra', icon: Building },
    ];

    return (
        <div className="min-h-screen bg-white">
            <Head title="Magang & PKL - Stasiun Klimatologi Sumatera Utara">
                <meta name="description" content="Program Magang dan PKL UPT Stasiun Klimatologi Sumatera Utara - BMKG. Dapatkan pengalaman langsung di bidang klimatologi dan meteorologi bersama tenaga ahli BMKG." />
            </Head>

            <Navbar auth={auth} />

            {/* Hero Section */}
            <section className="relative overflow-hidden py-24 md:py-32 min-h-[420px] flex items-center">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: 'url(/assets/lobyKlimatologi.jpeg)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 via-blue-800/75 to-indigo-900/85" />
                <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]" />

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
                    <div className="text-center">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2.5 backdrop-blur-sm">
                            <GraduationCap className="h-5 w-5 text-yellow-300" />
                            <span className="text-sm font-semibold text-white">Program Magang & PKL</span>
                        </div>

                        <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                            Magang & Praktik Kerja
                            <span className="block mt-2 bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-200 bg-clip-text text-transparent">
                                Lapangan (PKL)
                            </span>
                        </h1>

                        <p className="mx-auto mb-10 max-w-3xl text-lg leading-relaxed text-blue-100 sm:text-xl">
                            Bergabunglah dengan program magang profesional di bidang klimatologi dan meteorologi.
                            Kembangkan kompetensi Anda bersama tenaga ahli BMKG.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="group inline-flex items-center gap-3 rounded-xl bg-white px-8 py-4 text-lg font-bold text-blue-700 shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-yellow-300 hover:text-blue-900"
                                >
                                    <span>Buka Dashboard</span>
                                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('register')}
                                        className="group inline-flex items-center gap-3 rounded-xl bg-white px-8 py-4 text-lg font-bold text-blue-700 shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-yellow-300 hover:text-blue-900"
                                    >
                                        <span>Daftar Sekarang</span>
                                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                    <a
                                        href="#persyaratan"
                                        className="inline-flex items-center gap-2 rounded-xl border-2 border-white/30 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/50"
                                    >
                                        Lihat Persyaratan
                                    </a>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="relative -mt-16 z-10 pb-12">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        {stats.map((stat, index) => {
                            const IconComponent = stat.icon;
                            return (
                                <div
                                    key={index}
                                    className="group rounded-2xl bg-white p-6 md:p-8 shadow-xl border border-gray-100 text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                                >
                                    <div className="mx-auto mb-3 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center transition-transform group-hover:scale-110">
                                        <IconComponent className="h-6 w-6 text-white" />
                                    </div>
                                    <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                        {stat.value}
                                    </div>
                                    <div className="mt-1 text-sm text-gray-600 font-medium">{stat.label}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Features Section - Mengapa Memilih Program Kami? */}
            <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-14 text-center">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-4">
                            Keunggulan Program
                        </span>
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

            {/* Requirements Section */}
            <section id="persyaratan" className="py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-14 text-center">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold mb-4">
                            Persyaratan
                        </span>
                        <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                            Syarat & Kelengkapan Berkas
                        </h2>
                        <p className="mx-auto max-w-2xl text-lg text-gray-600">
                            Pastikan Anda memenuhi persyaratan dan melengkapi berkas berikut sebelum mendaftar
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {requirements.map((req, index) => {
                            const IconComponent = req.icon;
                            return (
                                <div
                                    key={index}
                                    className="group rounded-2xl border border-gray-200 bg-white p-8 shadow-md transition-all duration-300 hover:shadow-xl hover:border-blue-200"
                                >
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
                                            <IconComponent className="h-6 w-6 text-white" />
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900">{req.category}</h3>
                                    </div>
                                    <ul className="space-y-3">
                                        {req.items.map((item, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                                <span className="text-sm text-gray-700 leading-relaxed">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Alur Pendaftaran */}
            <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-14 text-center">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-semibold mb-4">
                            Alur Pendaftaran
                        </span>
                        <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                            Cara Mendaftar
                        </h2>
                        <p className="mx-auto max-w-2xl text-lg text-gray-600">
                            Ikuti langkah-langkah berikut untuk mendaftar program magang
                        </p>
                    </div>

                    <div className="relative">
                        {/* Vertical line */}
                        <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 via-indigo-400 to-blue-400 hidden md:block" />

                        <div className="space-y-8 md:space-y-12">
                            {[
                                { step: '1', title: 'Buat Akun', desc: 'Daftar dan verifikasi akun Anda melalui website ini.' },
                                { step: '2', title: 'Lengkapi Berkas', desc: 'Upload semua berkas persyaratan yang telah disiapkan.' },
                                { step: '3', title: 'Ajukan Permohonan', desc: 'Isi formulir permohonan magang/PKL dengan lengkap.' },
                                { step: '4', title: 'Tunggu Konfirmasi', desc: 'Tim kami akan meninjau dan memberikan konfirmasi melalui email.' },
                            ].map((item, index) => (
                                <div key={index} className={`flex items-center gap-6 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                                    <div className={`flex-1 ${index % 2 === 1 ? 'md:text-right' : ''}`}>
                                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                                            <h3 className="font-bold text-lg text-gray-900 mb-2">{item.title}</h3>
                                            <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg z-10">
                                        {item.step}
                                    </div>
                                    <div className="flex-1 hidden md:block" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 shadow-2xl">
                        <div className="relative px-8 py-16 md:px-16 text-center">
                            {/* Decorative elements */}
                            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 rounded-full bg-white/5 blur-2xl" />
                            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 rounded-full bg-white/5 blur-2xl" />

                            <div className="relative">
                                <h2 className="mb-4 text-3xl md:text-4xl font-bold text-white">
                                    Siap Memulai Perjalanan Anda?
                                </h2>
                                <p className="mb-8 text-lg text-blue-100 max-w-2xl mx-auto">
                                    Daftar sekarang dan mulai karir Anda di bidang klimatologi dan meteorologi bersama BMKG
                                </p>

                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="group inline-flex items-center gap-3 rounded-xl bg-white px-8 py-4 text-lg font-bold text-blue-700 shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-yellow-300 hover:text-blue-900"
                                    >
                                        <span>Buka Dashboard</span>
                                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                ) : (
                                    <Link
                                        href={route('register')}
                                        className="group inline-flex items-center gap-3 rounded-xl bg-white px-8 py-4 text-lg font-bold text-blue-700 shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-yellow-300 hover:text-blue-900"
                                    >
                                        <span>Daftar Sekarang</span>
                                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-gray-200 bg-white py-8">
                <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                    <p className="text-sm text-gray-600">
                        © 2026 UPT Stasiun Klimatologi BMKG Sumatera Utara. Hak Cipta Dilindungi.
                    </p>
                </div>
            </footer>
        </div>
    );
}
