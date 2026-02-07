import { Head } from '@inertiajs/react';
import HotspotWidget from '@/Components/HotspotWidget';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import { Flame, AlertCircle } from 'lucide-react';

export default function Hotspot({ title, description, auth }) {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans antialiased selection:bg-blue-500 selection:text-white">
            <Head title={title} />
            <Navbar auth={auth} />

            <div className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
                <div className="absolute inset-0 bg-[url('https://www.bmkg.go.id/asset/img/weather/background-3.jpg')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="max-w-3xl text-white">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
                            {title}
                        </h1>
                        <p className="text-lg sm:text-xl text-blue-100 max-w-2xl leading-relaxed">
                            {description}
                        </p>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 relative z-20 pb-20">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="p-6 sm:p-8 lg:p-10">
                        <div className="prose max-w-none text-gray-600 mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Flame className="h-6 w-6 text-orange-600" />
                                Tentang Sebaran Titik Panas (Hotspot)
                            </h2>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>
                                    <strong>Titik Panas (Hotspot)</strong> adalah indikator kebakaran yang terdeteksi oleh satelit cuaca. Satelit mendeteksi radiasi panas yang dipancarkan oleh permukaan bumi yang mengalami kebakaran.
                                </li>
                                <li>
                                    Citra satelit polar dari <strong>Himawari</strong> menunjukkan lokasi titik-titik panas yang aktif di wilayah Sumatera Utara dalam waktu nyata atau hampir waktu nyata.
                                </li>
                                <li>
                                    Data ini sangat penting untuk pemantauan dini kebakaran hutan dan lahan, serta untuk koordinasi upaya pemadaman.
                                </li>
                            </ul>

                            <div className="mt-6 p-4 bg-orange-50 border-l-4 border-orange-500 rounded-r-lg">
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="font-bold text-orange-900 text-sm mb-1">Catatan Penting</h3>
                                        <p className="text-xs text-orange-800">
                                            Titik panas yang terdeteksi tidak selalu menunjukkan kebakaran hutan. Bisa juga berupa aktivitas industri, pembakaran lahan pertanian, atau bahkan pantulan sinar matahari pada permukaan tertentu. Validasi lapangan diperlukan untuk konfirmasi.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Widget Display */}
                        <div className="w-full max-w-4xl mx-auto">
                            <div className="aspect-[4/3] w-full">
                                <HotspotWidget />
                            </div>
                        </div>

                        {/* Information Cards */}
                        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                                        <Flame className="h-5 w-5 text-white" />
                                    </div>
                                    <span className="font-bold text-gray-900">Titik Panas Aktif</span>
                                </div>
                                <p className="text-xs text-gray-600">Lokasi yang terdeteksi memiliki suhu permukaan tinggi oleh satelit.</p>
                            </div>
                            <div className="p-4 rounded-xl bg-green-50 border border-green-100">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                                        <AlertCircle className="h-5 w-5 text-white" />
                                    </div>
                                    <span className="font-bold text-gray-900">Pemantauan Real-time</span>
                                </div>
                                <p className="text-xs text-gray-600">Data diperbarui secara berkala setiap kali satelit melintas di atas wilayah.</p>
                            </div>
                            <div className="p-4 rounded-xl bg-orange-50 border border-orange-100">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center">
                                        <Flame className="h-5 w-5 text-white" />
                                    </div>
                                    <span className="font-bold text-gray-900">Peringatan Dini</span>
                                </div>
                                <p className="text-xs text-gray-600">Deteksi cepat membantu respons awal untuk mencegah penyebaran kebakaran.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
