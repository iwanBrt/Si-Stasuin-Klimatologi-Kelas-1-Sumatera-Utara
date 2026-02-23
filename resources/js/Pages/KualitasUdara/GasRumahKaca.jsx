import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import { Info, Wind, MapPin, Wind as AirIcon, Calendar, Activity } from 'lucide-react';

export default function GasRumahKaca({ auth, contents = [] }) {
    return (
        <div className="min-h-screen bg-white">
            <Head title="Gas Rumah Kaca - Stasiun Klimatologi Sumatera Utara">
                <meta name="description" content="Informasi Gas Rumah Kaca (GRK) UPT Stasiun Klimatologi Sumatera Utara - BMKG" />
            </Head>

            <Navbar auth={auth} />

            {/* Hero Section */}
            <section className="relative overflow-hidden py-16 md:py-20">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-blue-700 to-slate-800" />
                <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]" />
                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 rounded-full bg-white/5 blur-3xl" />
                <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 rounded-full bg-white/5 blur-3xl" />

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2.5 backdrop-blur-sm">
                            <Activity className="h-5 w-5 text-indigo-300" />
                            <span className="text-sm font-semibold text-white">Monitoring Atmosfer Global</span>
                        </div>
                        <h1 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                            Gas Rumah Kaca (GRK)
                        </h1>
                        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-blue-100">
                            Pengukuran dan pemantauan konsentrasi Gas Rumah Kaca di Stasiun Global Atmosphere Watch (GAW) Bukit Kototabang.
                        </p>
                    </div>
                </div>
            </section>

            {/* Introduction Section */}
            <section className="py-12 bg-gray-50 border-b border-gray-100">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                        <div className="flex flex-col md:flex-row gap-10 items-start">
                            <div className="md:w-1/3">
                                <div className="rounded-2xl overflow-hidden shadow-lg">
                                    <div className="bg-indigo-600 p-4 text-white text-center font-bold">Stasiun GAW Bukit Kototabang</div>
                                    <div className="h-64 bg-gray-200 flex items-center justify-center">
                                        <MapPin className="w-16 h-16 text-indigo-400 opacity-50" />
                                    </div>
                                </div>
                                <div className="mt-4 space-y-2">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <MapPin className="h-4 w-4 text-indigo-500" />
                                        <span>Sumatra Barat, Indonesia</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Activity className="h-4 w-4 text-indigo-500" />
                                        <span>Koordinat: 0.20 LS 100.32 BT</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <AirIcon className="h-4 w-4 text-indigo-500" />
                                        <span>Ketinggian: 864.5 m dpl</span>
                                    </div>
                                </div>
                            </div>
                            <div className="md:w-2/3">
                                <p className="text-gray-700 leading-relaxed mb-6">
                                    Sejak tahun 2004, Badan Meteorologi Klimatologi dan Geofisika (BMKG) telah melakukan pengukuran gas rumah kaca di
                                    stasiun Global Atmosphere Watch (GAW) yang berlokasi di Bukit Kototabang Sumatra Barat, terletak pada 0.20 LS
                                    100.32 BT dengan ketinggian 864.5 m dpl.
                                </p>
                                <p className="text-gray-700 leading-relaxed mb-6">
                                    Pengukuran konsentrasi gas rumah kaca menggunakan peralatan otomatis (direct method) dan peralatan manual (sampling method).
                                    Peralatan otomatis menggunakan Analizer Picarro G2401 dengan metoda Cavity Ring-Down Spectroscopy (CRDS).
                                    Peralatan manual menggunakan "Air Kit Flask Sampling" dan sampel tersebut dikirim ke laboratorium NOAA – USA untuk di analisis.
                                </p>
                                <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100 italic text-indigo-800">
                                    Grafik tren konsentrasi GRK di Stasiun GAW–Bukit Kototabang dapat dilihat di bawah ini:
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section (Graphs) */}
            <section className="py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {contents.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="mx-auto w-20 h-20 rounded-full bg-indigo-50 flex items-center justify-center mb-6">
                                <Activity className="h-10 w-10 text-indigo-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Belum Ada Grafik Tersedia</h3>
                            <p className="text-gray-500 max-w-md mx-auto">
                                Grafik tren konsentrasi GRK belum tersedia saat ini. Silakan cek kembali nanti.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {contents.map((item) => (
                                <article
                                    key={item.id}
                                    className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md hover:shadow-xl transition-all duration-300"
                                >
                                    {/* Header */}
                                    <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                                        <div>
                                            <h2 className="text-lg font-bold text-gray-900 leading-tight">
                                                {item.title}
                                            </h2>
                                            {item.subtitle && (
                                                <p className="text-xs text-gray-500 mt-0.5">{item.subtitle}</p>
                                            )}
                                        </div>
                                        {item.category && (
                                            <span className="px-2.5 py-1 rounded-md bg-indigo-100 text-indigo-700 text-[10px] font-bold uppercase tracking-wider">
                                                {item.category}
                                            </span>
                                        )}
                                    </div>

                                    {/* Image/Graph */}
                                    {item.file_url && (
                                        <div className="relative overflow-hidden bg-white p-4">
                                            <img
                                                src={item.file_url}
                                                alt={item.title}
                                                className="w-full h-auto object-contain mx-auto transition-transform duration-500 group-hover:scale-[1.03]"
                                            />
                                        </div>
                                    )}

                                    {/* Info Panel if description exists */}
                                    {item.description && (
                                        <div className="px-6 pb-6 pt-2">
                                            <p className="text-sm text-gray-600 leading-relaxed border-t border-gray-50 pt-4 italic">
                                                {item.description}
                                            </p>
                                        </div>
                                    )}
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
