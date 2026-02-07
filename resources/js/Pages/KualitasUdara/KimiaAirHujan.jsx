import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import { FlaskConical, MapPin, Calendar, Microscope, CloudRain } from 'lucide-react';

export default function KimiaAirHujan({ auth }) {
    return (
        <>
            <Head title="Kimia Air Hujan" />

            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Navbar auth={auth} />

                <main className="flex-grow py-12">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        {/* Header */}
                        <div className="mb-12 text-center">
                            <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-4">
                                <FlaskConical className="h-8 w-8 text-blue-600" />
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                                Kimia Air Hujan
                            </h1>
                            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                                Pemantauan kualitas air hujan di Stasiun Klimatologi Sumatera Utara untuk mendukung analisis lingkungan dan perubahan iklim.
                            </p>
                        </div>

                        {/* Content Grid */}
                        <div className="grid gap-8 lg:grid-cols-3">
                            {/* Main Content Card */}
                            <div className="lg:col-span-2 space-y-8">
                                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                    <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2 mb-4">
                                        <MapPin className="h-5 w-5 text-blue-500" />
                                        Lokasi & Metode Pemantauan
                                    </h2>
                                    <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed">
                                        <p className="mb-4">
                                            Pemantauan tingkat keasaman air hujan (pH) di Indonesia dilakukan di <strong className="text-gray-900">52 stasiun</strong>,
                                            salah satunya berlokasi di Stasiun Klimatologi Sumatera Utara. Pengamatan ini sangat penting untuk mengetahui indikasi pencemaran udara dan dampaknya terhadap lingkungan.
                                        </p>
                                        <p>
                                            Parameter yang diamati meliputi:
                                        </p>
                                        <ul className="list-disc pl-5 mb-4 space-y-1">
                                            <li>Derajat Keasaman (pH)</li>
                                            <li>Daya Hantar Listrik (DHL)</li>
                                        </ul>
                                        <p>
                                            Pengambilan sampel dilakukan menggunakan peralatan standar <strong>Automatic Rain Water Sampler (ARWS)</strong> dengan dua metode utama:
                                            <span className="inline-block bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-sm font-medium ml-1">Wet Deposition</span> dan
                                            <span className="inline-block bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-sm font-medium ml-1">Wet & Dry Deposition</span>.
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                    <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2 mb-4">
                                        <Microscope className="h-5 w-5 text-purple-500" />
                                        Analisis Laboratorium
                                    </h2>
                                    <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed">
                                        <p className="mb-4">
                                            Sampel air hujan yang terkumpul air hujan dikirim ke <strong>BMKG Pusat</strong> setiap bulannya untuk analisis lebih lanjut.
                                        </p>
                                        <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100 mb-6">
                                            <h3 className="text-indigo-900 font-medium mb-2 flex items-center gap-2">
                                                <FlaskConical className="h-4 w-4" />
                                                Metode Analisis
                                            </h3>
                                            <p className="text-indigo-800 text-sm">
                                                Analisis sampel di laboratorium kualitas udara BMKG Pusat menggunakan alat canggih <strong>Ion Chromatograph</strong> untuk mendeteksi komposisi kimia secara presisi.
                                            </p>
                                        </div>
                                        <p className="text-sm italic text-gray-500 bg-gray-50 p-4 rounded-lg border border-gray-200">
                                            *Catatan: Jika dalam rentang waktu pengumpulan sampel tidak terjadi hujan, maka analisis kimia air hujan pada periode tersebut ditiadakan.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar / Info Cards */}
                            <div className="space-y-6">
                                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-6 text-white shadow-lg">
                                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                                        <Calendar className="h-5 w-5" />
                                        Jadwal Kegiatan
                                    </h3>
                                    <p className="text-blue-50">
                                        Kegiatan pengambilan dan pemeriksaan sampel dilakukan secara rutin:
                                    </p>
                                    <div className="mt-4 bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                                        <p className="text-2xl font-bold">1x Seminggu</p>
                                        <p className="text-sm text-blue-100 mt-1">Pengambilan Sampel</p>
                                    </div>
                                </div>

                                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                                    <h3 className="text-gray-900 font-semibold mb-4">Alat Utama</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <div className="bg-green-100 p-2 rounded-lg text-green-600">
                                                <CloudRain className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-gray-900">ARWS</h4>
                                                <p className="text-sm text-gray-500">Automatic Rain Water Sampler untuk koleksi sampel otomatis.</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
                                                <Microscope className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-gray-900">Ion Chromatograph</h4>
                                                <p className="text-sm text-gray-500">Alat analisis komposisi ion di laboratorium.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="border-t border-gray-200 bg-white py-8 mt-auto">
                    <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                        <p className="text-sm text-gray-600">
                            © 2026 UPT Stasiun Klimatologi BMKG Sumatera Utara. Hak Cipta Dilindungi.
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}
