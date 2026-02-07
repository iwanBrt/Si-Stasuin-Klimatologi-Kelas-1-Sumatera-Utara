import React, { useState, useEffect } from 'react';
import { AlertTriangle, CloudLightning, Info, MapPin, Clock, Wind, CloudRain, Zap, ExternalLink } from 'lucide-react';

export default function WeatherWarningSection() {
    const [warnings, setWarnings] = useState([]);
    const [warningText, setWarningText] = useState('');
    const [warningImage, setWarningImage] = useState('');
    const [loading, setLoading] = useState(true);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [hasWarning, setHasWarning] = useState(false);

    useEffect(() => {
        fetch('/api/weather/warning')
            .then(res => res.json())
            .then(data => {
                if (data.regions) setWarnings(data.regions);
                if (data.warning_text) setWarningText(data.warning_text);
                if (data.warning_image) setWarningImage(data.warning_image);
                setHasWarning(data.has_warning);
                setLoading(false);
            })
            .catch(e => {
                console.error(e);
                setLoading(false);
            });
    }, []);

    // Loading state or No Warnings -> Return Null (Original Behavior)
    if (loading || !hasWarning) return null;

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
        <section className="py-12 bg-gray-100" id="weather-warning">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-black text-gray-900">
                        Information Center
                    </h2>
                    <p className="mt-2 text-gray-600">Peringatan Dini & Monitor Cuaca Real-time</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Card: Visual Map */}
                    <div className="flex flex-col bg-[#0b1b32] rounded-3xl overflow-hidden shadow-2xl border border-blue-900">
                        {/* Card Header */}
                        <div className="bg-[#badc00] p-4 flex items-center justify-center relative">
                            {/* Decorative Icon */}
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 p-2 rounded-full hidden sm:block">
                                <CloudRain className="h-6 w-6 text-[#0b1b32]" />
                            </div>
                            <div className="text-center">
                                <h3 className="text-[#0b1b32] font-black text-lg md:text-xl leading-tight uppercase tracking-wide">
                                    Peringatan Dini Cuaca<br />Wilayah Sumatera Utara
                                </h3>
                            </div>
                        </div>

                        {/* Card Content (Image) */}
                        <div className="flex-1 relative bg-[url('https://www.bmkg.go.id/asset/img/weather-pattern.png')] bg-cover bg-center min-h-[400px] flex items-center justify-center p-4">
                            {/* Fallback pattern if URL invalid, just dark blue */}
                            <div className="relative w-full h-full flex items-center justify-center">
                                <img
                                    src={warningImage || "https://data.bmkg.go.id/DataMKG/MEWS/LEWS/SumateraUtara.png"}
                                    alt="Peta Peringatan Cuaca"
                                    className="max-w-full max-h-[500px] object-contain drop-shadow-2xl"
                                    onLoad={() => setImageLoaded(true)}
                                    onError={(e) => {
                                        if (e.target.src !== "https://data.bmkg.go.id/DataMKG/MEWS/LEWS/SumateraUtara.png") {
                                            e.target.src = "https://data.bmkg.go.id/DataMKG/MEWS/LEWS/SumateraUtara.png";
                                        }
                                    }}
                                />
                                {!imageLoaded && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#badc00]"></div>
                                    </div>
                                )}
                            </div>

                            {/* Legend Overlay (Optional Mockup to match style) */}
                            <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm p-3 rounded-lg border border-white/10 text-xs text-white space-y-1">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                                    <span>Peringatan Dini</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                    <span>Potensi Meluas</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    <span>Tidak Terdampak</span>
                                </div>
                            </div>
                        </div>

                        {/* Card Footer */}
                        <div className="bg-[#badc00] py-2 px-4 flex justify-between items-center text-[#0b1b32] text-xs md:text-sm font-bold">
                            <div className="flex items-center gap-2">
                                <ExternalLink className="h-4 w-4" />
                                <span>www.bmkg.go.id</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span>infoBMKG</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Card: Text Info */}
                    <div className="flex flex-col bg-[#0b1b32] rounded-3xl overflow-hidden shadow-2xl border border-blue-900">
                        {/* Card Header */}
                        <div className="bg-[#badc00] p-4 flex items-center justify-center relative">
                            <div className="text-center">
                                <h3 className="text-[#0b1b32] font-black text-lg md:text-xl leading-tight uppercase tracking-wide">
                                    Update Informasi<br />Terdampak
                                </h3>
                            </div>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 p-2 rounded-full hidden sm:block">
                                <Info className="h-6 w-6 text-[#0b1b32]" />
                            </div>
                        </div>

                        {/* Card Content (Text) */}
                        <div className="flex-1 p-6 md:p-8 flex flex-col">
                            {warningText ? (
                                <div className="prose prose-invert max-w-none flex-1 overflow-y-auto max-h-[500px] scrollbar-thin scrollbar-thumb-[#badc00] scrollbar-track-blue-900 pr-2">
                                    <p className="text-white text-sm md:text-base leading-relaxed whitespace-pre-wrap font-medium font-sans text-justify">
                                        {warningText}
                                    </p>
                                </div>
                            ) : (
                                <div className="flex-1 flex flex-col items-center justify-center text-center p-8 opacity-70">
                                    <CloudRain className="h-16 w-16 text-white mb-4 animate-bounce" />
                                    <p className="text-white font-medium">Memuat data peringatan dini...</p>
                                </div>
                            )}

                            {/* Timestamp or Status Badge */}
                            <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-yellow-400">
                                    <Clock className="h-4 w-4" />
                                    <span className="text-xs font-bold uppercase tracking-wider">Update Terkini</span>
                                </div>
                                <span className="bg-blue-600/50 text-blue-200 text-xs px-3 py-1 rounded-full border border-blue-500/50">
                                    Sumber: BMKG Pusat
                                </span>
                            </div>
                        </div>

                        {/* Card Footer */}
                        <div className="bg-[#badc00] py-2 px-4 flex justify-center items-center text-[#0b1b32] text-xs md:text-sm font-bold">
                            <div className="flex items-center gap-2">
                                <span>Call Center 196</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
