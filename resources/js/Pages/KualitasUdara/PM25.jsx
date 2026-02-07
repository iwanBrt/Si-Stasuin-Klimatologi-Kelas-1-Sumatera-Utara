import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import { Info, Wind, Droplets, Thermometer, MapPin, AlertCircle } from 'lucide-react';

export default function PM25({ auth, airQualityData, error }) {

    const getAqiStatus = (aqi) => {
        if (aqi <= 50) return { status: 'Baik', color: 'bg-green-500', text: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' };
        if (aqi <= 100) return { status: 'Sedang', color: 'bg-yellow-500', text: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' };
        if (aqi <= 150) return { status: 'Tidak Sehat bagi Kelompok Sensitif', color: 'bg-orange-500', text: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' };
        if (aqi <= 200) return { status: 'Tidak Sehat', color: 'bg-red-500', text: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' };
        if (aqi <= 300) return { status: 'Sangat Tidak Sehat', color: 'bg-purple-500', text: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200' };
        return { status: 'Berbahaya', color: 'bg-red-900', text: 'text-red-900', bg: 'bg-red-100', border: 'border-red-300' };
    };

    const current = airQualityData?.current;
    const pollution = current?.pollution;
    const weather = current?.weather;

    const aqiInfo = pollution ? getAqiStatus(pollution.aqius) : null;

    return (
        <>
            <Head title="Kualitas Udara - PM 2.5" />

            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Navbar auth={auth} />

                <main className="flex-grow py-12">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        {/* Header */}
                        <div className="mb-10 text-center">
                            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                                Monitoring Kualitas Udara
                            </h1>
                            <div className="mt-4 flex items-center justify-center gap-2 text-lg text-gray-600">
                                <MapPin className="h-5 w-5 text-red-500" />
                                <span>{airQualityData?.city || 'Medan'}, {airQualityData?.state || 'Sumatera Utara'}</span>
                            </div>
                        </div>

                        {error && (
                            <div className="mb-8 rounded-xl bg-red-50 p-4 text-red-700 border border-red-200 flex items-center gap-3">
                                <AlertCircle className="h-5 w-5" />
                                <p>{error}</p>
                            </div>
                        )}

                        {!airQualityData && !error && (
                            <div className="flex justify-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600"></div>
                            </div>
                        )}

                        {airQualityData && (
                            <div className="grid gap-8 lg:grid-cols-2">
                                {/* Main AQI Card */}
                                <div className={`relative overflow-hidden rounded-3xl bg-white p-8 shadow-xl border border-gray-100`}>
                                    <div className={`absolute top-0 right-0 -mt-4 -mr-4 h-32 w-32 rounded-full opacity-10 ${aqiInfo.color}`}></div>

                                    <div className="relative z-10 text-center">
                                        <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">Indeks Kualitas Udara (US AQI)</h2>
                                        <div className="mt-6 flex flex-col items-center">
                                            <div className={`flex h-40 w-40 items-center justify-center rounded-full ${aqiInfo.color} text-white shadow-lg`}>
                                                <span className="text-6xl font-bold">{pollution.aqius}</span>
                                            </div>
                                            <div className={`mt-6 rounded-full px-6 py-2 ${aqiInfo.bg} ${aqiInfo.text} font-bold text-lg border ${aqiInfo.border}`}>
                                                {aqiInfo.status}
                                            </div>
                                        </div>
                                        <p className="mt-6 text-sm text-gray-400">
                                            Diperbarui: {new Date(pollution.ts).toLocaleString('id-ID')}
                                        </p>
                                    </div>
                                </div>

                                {/* Weather & Details Grid */}
                                <div className="grid gap-4 sm:grid-cols-2">
                                    {/* Weather Items */}
                                    <div className="rounded-2xl bg-white p-6 shadow-lg border border-gray-100 flex flex-col items-center justify-center text-center hover:shadow-xl transition-shadow">
                                        <div className="mb-3 rounded-full bg-blue-50 p-3 text-blue-600">
                                            <Thermometer className="h-8 w-8" />
                                        </div>
                                        <span className="text-3xl font-bold text-gray-900">{weather.tp}°C</span>
                                        <span className="text-sm text-gray-500 mt-1">Suhu</span>
                                    </div>

                                    <div className="rounded-2xl bg-white p-6 shadow-lg border border-gray-100 flex flex-col items-center justify-center text-center hover:shadow-xl transition-shadow">
                                        <div className="mb-3 rounded-full bg-blue-50 p-3 text-blue-600">
                                            <Droplets className="h-8 w-8" />
                                        </div>
                                        <span className="text-3xl font-bold text-gray-900">{weather.hu}%</span>
                                        <span className="text-sm text-gray-500 mt-1">Kelembaban</span>
                                    </div>

                                    <div className="rounded-2xl bg-white p-6 shadow-lg border border-gray-100 flex flex-col items-center justify-center text-center hover:shadow-xl transition-shadow">
                                        <div className="mb-3 rounded-full bg-blue-50 p-3 text-blue-600">
                                            <Wind className="h-8 w-8" />
                                        </div>
                                        <span className="text-3xl font-bold text-gray-900">{weather.ws} m/s</span>
                                        <span className="text-sm text-gray-500 mt-1">Kecepatan Angin</span>
                                    </div>

                                    <div className="rounded-2xl bg-white p-6 shadow-lg border border-gray-100 flex flex-col items-center justify-center text-center hover:shadow-xl transition-shadow">
                                        <div className="mb-3 rounded-full bg-gray-50 p-3 text-gray-600">
                                            <Info className="h-8 w-8" />
                                        </div>
                                        <span className="text-xl font-bold text-gray-900 uppercase">{pollution.mainus}</span>
                                        <span className="text-sm text-gray-500 mt-1">Polutan Utama</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Info Section */}
                        <div className="mt-12 rounded-2xl bg-blue-50 p-6 sm:p-8 shadow-sm border border-blue-100">
                            <div className="flex items-start gap-4">
                                <div className="rounded-full bg-blue-100 p-2 text-blue-600 flexible-shrink-0">
                                    <Info className="h-6 w-6" />
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">Apa itu Particulate Matter (PM2.5)?</h3>
                                        <p className="mt-2 text-gray-700 leading-relaxed">
                                            Particulate Matter (PM2.5) adalah partikel udara yang berukuran lebih kecil dari atau sama dengan 2,5 µm (mikrometer).
                                            Partikel ini sangat kecil sehingga dapat masuk ke dalam sistem pernapasan manusia dan menyebabkan gangguan kesehatan.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 text-center text-sm text-gray-500">
                            Sumber Data: IQAir AirVisual
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
