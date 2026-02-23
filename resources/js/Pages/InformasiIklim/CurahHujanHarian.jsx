import { Head } from '@inertiajs/react';
import { CloudRain, Calendar } from 'lucide-react';
import Navbar from '@/Components/Navbar';

export default function CurahHujanHarian({ auth, contents = [] }) {
    return (
        <div className="min-h-screen bg-white">
            <Head title="Curah Hujan Harian - Stasiun Klimatologi Sumatera Utara">
                <meta name="description" content="Informasi curah hujan harian UPT Stasiun Klimatologi Sumatera Utara - BMKG" />
            </Head>

            <Navbar auth={auth} />

            {/* Hero Section */}
            <section className="relative overflow-hidden py-16 md:py-20">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800" />
                <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]" />
                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 rounded-full bg-white/5 blur-3xl" />
                <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 rounded-full bg-white/5 blur-3xl" />

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2.5 backdrop-blur-sm">
                            <CloudRain className="h-5 w-5 text-yellow-300" />
                            <span className="text-sm font-semibold text-white">Informasi Iklim Harian</span>
                        </div>
                        <h1 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                            Curah Hujan Harian
                        </h1>
                        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-blue-100">
                            Data dan visualisasi curah hujan harian wilayah Sumatera Utara yang dipublikasikan oleh Stasiun Klimatologi BMKG
                        </p>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {contents.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="mx-auto w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-6">
                                <CloudRain className="h-10 w-10 text-blue-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Belum Ada Data</h3>
                            <p className="text-gray-500 max-w-md mx-auto">
                                Data curah hujan harian belum tersedia saat ini. Silakan cek kembali nanti.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-12">
                            {contents.map((item) => (
                                <article
                                    key={item.id}
                                    className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md hover:shadow-xl transition-all duration-300"
                                >
                                    {/* Image */}
                                    {item.file_url && (
                                        <div className="relative overflow-hidden bg-gray-50">
                                            <img
                                                src={item.file_url}
                                                alt={item.title}
                                                className="w-full h-auto max-h-[600px] object-contain mx-auto transition-transform duration-500 group-hover:scale-[1.02]"
                                            />
                                        </div>
                                    )}

                                    {/* Info */}
                                    <div className="p-6 md:p-8">
                                        <div className="flex flex-wrap items-center gap-3 mb-4">
                                            {item.category && (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                                                    <CloudRain className="h-3.5 w-3.5" />
                                                    {item.category}
                                                </span>
                                            )}
                                            {item.subtitle && (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-semibold">
                                                    <Calendar className="h-3.5 w-3.5" />
                                                    {item.subtitle}
                                                </span>
                                            )}
                                        </div>

                                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                                            {item.title}
                                        </h2>

                                        {item.description && (
                                            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                                                {item.description}
                                            </p>
                                        )}
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
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
