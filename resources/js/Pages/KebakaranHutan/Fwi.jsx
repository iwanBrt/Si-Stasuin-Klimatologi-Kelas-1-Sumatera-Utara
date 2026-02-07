import { Head } from '@inertiajs/react';
import KarhutlaWidget from '@/Components/KarhutlaWidget';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function Fwi({ title, description, auth }) {
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
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Tentang Fire Weather Index (FWI)</h2>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>
                                    <strong>FWI</strong> merupakan indeks yang menunjukkan intensitas api jika kebakaran terjadi. Nilai ini dihitung berdasarkan tiga kode kelembaban bahan bakar (FFMC, DMC, DC) dan indeks penyebaran awal (ISI) serta indeks penumpukan bahan bakar (BUI).
                                </li>
                                <li>
                                    Angka indeks ini memberikan gambaran umum mengenai tingkat bahaya kebakaran dengan mempertimbangkan kemungkinan kebakaran menyebar dan tingkat konsumsi bahan bakar.
                                </li>
                            </ul>
                        </div>

                        {/* Widget Display */}
                        <div className="w-full max-w-4xl mx-auto">
                            <div className="aspect-[4/3] w-full">
                                <KarhutlaWidget type="fwi" title="Fire Weather Index (FWI)" />
                            </div>
                        </div>

                        {/* Legend / Keterangan Warna */}
                        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-6 h-6 rounded bg-[#016FFF]"></div>
                                    <span className="font-bold text-gray-900">Rendah (0–1)</span>
                                </div>
                                <p className="text-xs text-gray-600">Resiko kebakaran rendah, api sulit menyebar.</p>
                            </div>
                            <div className="p-4 rounded-xl bg-green-50 border border-green-100">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-6 h-6 rounded bg-[#4DE600]"></div>
                                    <span className="font-bold text-gray-900">Sedang (2–6)</span>
                                </div>
                                <p className="text-xs text-gray-600">Resiko kebakaran sedang, waspada terhadap aktivitas pembakaran.</p>
                            </div>
                            <div className="p-4 rounded-xl bg-yellow-50 border border-yellow-100">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-6 h-6 rounded bg-[#FFFF00]"></div>
                                    <span className="font-bold text-gray-900">Tinggi (7–13)</span>
                                </div>
                                <p className="text-xs text-gray-600">Resiko kebakaran tinggi, api mudah menyebar.</p>
                            </div>
                            <div className="p-4 rounded-xl bg-red-50 border border-red-100">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-6 h-6 rounded bg-[#FF0000]"></div>
                                    <span className="font-bold text-gray-900">Ekstrem (&gt;13)</span>
                                </div>
                                <p className="text-xs text-gray-600">Dilarang membakar lahan, kondisi sangat berbahaya.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
