import { Head } from '@inertiajs/react';
import KarhutlaWidget from '@/Components/KarhutlaWidget';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer'; // Assuming Footer exists since Navbar exists

export default function Ffmc({ title, description, auth }) {
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
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Tentang Fine Fuel Moisture Code (FFMC)</h2>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>
                                    <strong>FFMC</strong> menunjukkan tingkat potensi kemudahan terjadinya kebakaran ditinjau dari parameter cuaca pada bahan-bahan ringan mudah terbakar di lapisan atas permukaan tanah.
                                </li>
                                <li>
                                    Mewakili tingkat kekeringan bahan-bahan ringan mudah terbakar (seperti humus permukaan, sampah dedaunan kering, alang-alang, dan bahan ringan lain) yang biasanya menutupi lantai hutan pada kedalaman 1-2 cm.
                                </li>
                            </ul>
                        </div>

                        {/* Widget Display */}
                        <div className="w-full max-w-4xl mx-auto">
                            <div className="aspect-[4/3] w-full">
                                <KarhutlaWidget type="ffmc" title="Fine Fuel Moisture Code (FFMC)" />
                            </div>
                        </div>

                        {/* Legend / Keterangan Warna */}
                        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-6 h-6 rounded bg-[#016FFF]"></div>
                                    <span className="font-bold text-gray-900">Rendah (0–72)</span>
                                </div>
                                <p className="text-xs text-gray-600">Alang-alang dan dedaunan basah, <strong>sulit</strong> terbakar.</p>
                            </div>
                            <div className="p-4 rounded-xl bg-green-50 border border-green-100">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-6 h-6 rounded bg-[#4DE600]"></div>
                                    <span className="font-bold text-gray-900">Sedang (73–77)</span>
                                </div>
                                <p className="text-xs text-gray-600">Alang-alang dan dedaunan lembab, <strong>cukup sulit</strong> terbakar.</p>
                            </div>
                            <div className="p-4 rounded-xl bg-yellow-50 border border-yellow-100">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-6 h-6 rounded bg-[#FFFF00]"></div>
                                    <span className="font-bold text-gray-900">Tinggi (78–82)</span>
                                </div>
                                <p className="text-xs text-gray-600">Alang-alang dan dedaunan kering, <strong>mudah</strong> terbakar.</p>
                            </div>
                            <div className="p-4 rounded-xl bg-red-50 border border-red-100">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-6 h-6 rounded bg-[#FF0000]"></div>
                                    <span className="font-bold text-gray-900">Ekstrem (&gt;82)</span>
                                </div>
                                <p className="text-xs text-gray-600">Alang-alang dan dedaunan sangat kering, <strong>sangat mudah</strong> terbakar.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
