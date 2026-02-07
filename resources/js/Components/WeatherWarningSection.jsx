import React, { useState, useEffect } from 'react';
import { AlertTriangle, CloudLightning, Info, MapPin, Clock, Wind, CloudRain, Zap, ExternalLink } from 'lucide-react';

export default function WeatherWarningSection() {
    const [warnings, setWarnings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        fetch('/api/weather/warning')
            .then(res => res.json())
            .then(data => {
                if (data.regions) setWarnings(data.regions);
                setLoading(false);
            })
            .catch(e => {
                console.error(e);
                setLoading(false);
            });
    }, []);

    // Loading state or No Warnings -> Return Null (Original Behavior)
    if (loading || warnings.length === 0) return null;

    // Define severity colors
    const severityColors = {
        high: {
            bg: 'bg-red-50',
            border: 'border-red-200',
            text: 'text-red-900',
            icon: 'text-red-600',
            badge: 'bg-red-100 text-red-700',
            gradient: 'from-red-500 to-orange-500'
        },
        medium: {
            bg: 'bg-orange-50',
            border: 'border-orange-200',
            text: 'text-orange-900',
            icon: 'text-orange-600',
            badge: 'bg-orange-100 text-orange-700',
            gradient: 'from-orange-500 to-yellow-500'
        }
    };

    // Determine current severity based on warnings (Default to medium if specific severity not found)
    const currentSeverity = warnings.some(w => w.severity === 'high') ? severityColors.high : severityColors.medium;

    return (
        <section className="py-16 bg-red-50 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-orange-100/50 blur-3xl animate-pulse" />
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-96 w-96 rounded-full bg-yellow-100/50 blur-3xl animate-pulse" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 text-red-700 font-bold text-sm mb-4 shadow-sm animate-bounce">
                        <AlertTriangle className="h-4 w-4" />
                        <span>PERINGATAN DINI AKTIF</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
                        Peringatan Cuaca <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">Sumatera Utara</span>
                    </h2>
                    <div className="h-1.5 w-24 rounded-full bg-gradient-to-r from-red-500 to-orange-500 mx-auto" />
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Left Side - Warning Image */}
                    <div className={`rounded-3xl ${currentSeverity.bg} ${currentSeverity.border} border-2 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:shadow-2xl`}>
                        <div className="flex items-center gap-3 mb-6">
                            <div className={`p-3 rounded-xl bg-gradient-to-br ${currentSeverity.gradient}`}>
                                <MapPin className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <h3 className={`text-xl font-bold ${currentSeverity.text}`}>Peta Sebaran</h3>
                                <p className="text-sm text-gray-600">Visualisasi Area Terdampak</p>
                            </div>
                        </div>

                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity" />
                            <div className="relative rounded-2xl overflow-hidden border-2 border-white shadow-lg bg-white">
                                <img
                                    src="https://data.bmkg.go.id/DataMKG/MEWS/LEWS/SumateraUtara.png"
                                    alt="Peta Peringatan Cuaca Sumatera Utara"
                                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                                    onLoad={() => setImageLoaded(true)}
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        setImageLoaded(false);
                                    }}
                                />
                                {!imageLoaded && (
                                    <div className="flex items-center justify-center h-64 bg-gray-100">
                                        <div className="text-center">
                                            <CloudLightning className="h-16 w-16 text-gray-300 mx-auto mb-3" />
                                            <p className="text-gray-500 text-sm">Memuat peta peringatan...</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="mt-6 flex justify-center">
                            <a
                                href="https://data.bmkg.go.id/peringatan-dini-cuaca/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold transition-all shadow-lg hover:shadow-xl hover:scale-105"
                            >
                                <ExternalLink className="h-5 w-5" />
                                Lihat Detail Lengkap di BMKG
                            </a>
                        </div>
                    </div>

                    {/* Right Side - Warning Details */}
                    <div className="space-y-6">
                        {/* Warning Info Card */}
                        <div className={`rounded-3xl ${currentSeverity.bg} ${currentSeverity.border} border-2 p-6 shadow-xl backdrop-blur-sm`}>
                            <div className="flex items-start gap-4 mb-6">
                                <div className={`p-3 rounded-xl bg-gradient-to-br ${currentSeverity.gradient} shrink-0 animate-pulse`}>
                                    <AlertTriangle className="h-6 w-6 text-white" />
                                </div>
                                <div className="flex-1">
                                    <h3 className={`text-xl font-bold ${currentSeverity.text} mb-2`}>Detail Peringatan</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        Potensi <strong>Hujan Sedang hingga Lebat</strong> yang dapat disertai dengan <strong>Kilat/Petir</strong> dan <strong>Angin Kencang</strong> pada wilayah yang tercantum.
                                    </p>
                                </div>
                            </div>

                            {/* Affected Regions */}
                            <div className="mb-6">
                                <div className="flex items-center gap-2 mb-3">
                                    <MapPin className={`h-5 w-5 ${currentSeverity.icon}`} />
                                    <span className={`font-bold ${currentSeverity.text}`}>Wilayah Terdampak:</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {warnings.map((w, idx) => (
                                        <span
                                            key={idx}
                                            className={`px-4 py-2 rounded-full ${currentSeverity.badge} font-semibold text-sm border ${currentSeverity.border} shadow-sm`}
                                        >
                                            {w.region}
                                            {w.condition && <span className="opacity-75 ml-1">({w.condition})</span>}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Time Info */}
                            <div className="p-4 rounded-xl bg-white/50 border border-red-100">
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-red-600" />
                                    <span className="font-bold text-red-700 text-sm">Status Terkini:</span>
                                </div>
                                <p className="mt-1 text-xs text-gray-500">
                                    Data diperbaharui otomatis dari server BMKG. Harap waspada dan pantau informasi terkini.
                                </p>
                            </div>
                        </div>

                        {/* Safety Notice */}
                        <div className="rounded-2xl bg-gradient-to-r from-gray-900 to-gray-800 p-6 shadow-xl text-white">
                            <div className="flex items-start gap-3">
                                <Info className="h-6 w-6 text-yellow-400 shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-bold text-lg mb-2">Himbauan Keselamatan</h4>
                                    <ul className="space-y-2 text-sm text-gray-200">
                                        <li className="flex items-start gap-2">
                                            <span className="text-yellow-400 mt-0.5">•</span>
                                            <span>Hindari berteduh di bawah pohon tua/besar</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-yellow-400 mt-0.5">•</span>
                                            <span>Waspadai potensi banjir/genangan air</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-yellow-400 mt-0.5">•</span>
                                            <span>Jauhi area terbuka saat terjadi petir</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
