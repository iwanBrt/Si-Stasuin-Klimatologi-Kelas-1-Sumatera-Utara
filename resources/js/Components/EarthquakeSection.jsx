import React, { useState, useEffect } from 'react';
import { MapPin, Activity, ArrowDown, ExternalLink, Calendar, Clock, AlertTriangle } from 'lucide-react';

export default function EarthquakeSection() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/earthquake');
                const result = await response.json();
                if (result.status === 'success') {
                    setData(result.data);
                }
            } catch (error) {
                console.error("Failed to fetch earthquake data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="animate-pulse bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl">
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
                    <div className="flex gap-8">
                        <div className="w-1/3 h-64 bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
                        <div className="w-2/3 h-64 bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!data) return null;

    return (
        <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-blue-100">
                    <div className="p-8">
                        <div className="flex flex-col lg:flex-row gap-8 items-start">
                            {/* Left Column: Map */}
                            <div className="w-full lg:w-1/3 relative group">
                                <div className="absolute inset-0 bg-blue-500/10 rounded-2xl transform group-hover:scale-105 transition-transform duration-500"></div>
                                <img
                                    src={data.Shakemap}
                                    alt="Shakemap Gempa"
                                    className="w-full h-auto rounded-2xl shadow-lg transform group-hover:scale-[1.02] transition-transform duration-500 relative z-10"
                                    onError={(e) => { e.target.src = 'https://via.placeholder.com/400x500?text=Map+Offline'; }}
                                />
                                <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg z-20 flex items-center animate-pulse">
                                    <Activity className="w-4 h-4 mr-2" />
                                    Terkini
                                </div>
                            </div>

                            {/* Right Column: Details */}
                            <div className="w-full lg:w-2/3 flex flex-col justify-center">
                                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                                    Gempa Bumi Terkini
                                </h2>

                                <div className="flex items-center text-gray-500 mb-6 space-x-4">
                                    <div className="flex items-center">
                                        <Calendar className="w-4 h-4 mr-2" />
                                        <span>{data.Tanggal}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Clock className="w-4 h-4 mr-2" />
                                        <span>{data.Jam}</span>
                                    </div>
                                </div>

                                {/* Impact Badge */}
                                {data.Dirasakan && (
                                    <div className="mb-6">
                                        <span className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
                                            {data.Dirasakan}
                                        </span>
                                    </div>
                                )}

                                <h3 className="text-xl font-semibold text-gray-800 mb-6 leading-relaxed">
                                    {data.Wilayah}
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                    {/* Magnitude Card */}
                                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 hover:border-blue-500 transition-colors">
                                        <div className="text-sm text-gray-500 mb-1">Magnitudo</div>
                                        <div className="flex items-center text-2xl font-bold text-red-500">
                                            <Activity className="w-6 h-6 mr-2" />
                                            {data.Magnitude}
                                        </div>
                                    </div>

                                    {/* Depth Card */}
                                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 hover:border-emerald-500 transition-colors">
                                        <div className="text-sm text-gray-500 mb-1">Kedalaman</div>
                                        <div className="flex items-center text-2xl font-bold text-emerald-600">
                                            <ArrowDown className="w-6 h-6 mr-2" />
                                            {data.Kedalaman}
                                        </div>
                                    </div>

                                    {/* Coordinates Card */}
                                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 hover:border-indigo-500 transition-colors">
                                        <div className="text-sm text-gray-500 mb-1">Koordinat</div>
                                        <div className="flex items-center text-lg font-bold text-blue-600">
                                            <MapPin className="w-5 h-5 mr-2" />
                                            {data.Lintang} - {data.Bujur}
                                        </div>
                                    </div>
                                </div>

                                {/* Warning / Advice */}
                                <div className="mb-6">
                                    <div className="flex items-start">
                                        <span className="font-semibold text-blue-600 mr-2 flex-shrink-0">
                                            Saran BMKG:
                                        </span>
                                        <p className="text-gray-600">
                                            {data.Potensi || "Hati-hati terhadap gempabumi susulan yang mungkin terjadi"}
                                        </p>
                                    </div>
                                </div>

                                <a
                                    href="https://www.bmkg.go.id/gempabumi/gempabumi-terkini.bmkg"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors group"
                                >
                                    Lihat Selengkapnya
                                    <ExternalLink className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
