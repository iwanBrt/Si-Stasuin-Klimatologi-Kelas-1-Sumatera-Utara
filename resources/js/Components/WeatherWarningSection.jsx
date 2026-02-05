import React, { useState, useEffect } from 'react';
import { AlertTriangle, CloudLightning, Info } from 'lucide-react';

export default function WeatherWarningSection() {
    const [warnings, setWarnings] = useState([]);
    const [loading, setLoading] = useState(true);

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

    if (loading || warnings.length === 0) return null;

    return (
        <section className="py-8 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-b border-yellow-200 dark:border-yellow-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    {/* Icon & Title */}
                    <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100 dark:bg-yellow-800/50 text-yellow-600 dark:text-yellow-400">
                        <AlertTriangle className="h-8 w-8 animate-pulse" />
                    </div>

                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                            Peringatan Dini Cuaca Sumatera Utara
                        </h2>

                        {/* Try to show official image, if fails, show text */}
                        <div className="hidden md:block mb-4">
                            {/* Attempt to load official warning map directly from client browser */}
                            <img
                                src="https://data.bmkg.go.id/DataMKG/MEWS/LEWS/SumateraUtara.png"
                                className="rounded-xl shadow-lg border border-yellow-200 mx-auto md:mx-0 max-w-full md:max-w-lg"
                                style={{ minHeight: '100px' }}
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                        </div>

                        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                            Potensi Hujan Sedang-Lebat yang dapat disertai Kilat/Petir dan Angin Kencang di wilayah: {' '}
                            <span className="font-semibold text-yellow-800 dark:text-yellow-400">
                                {warnings.map(w => w.region).join(', ') || "Sebagian wilayah Sumatera Utara"}
                            </span>.
                        </p>

                        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                            <a
                                href="https://data.bmkg.go.id/peringatan-dini-cuaca/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-6 py-2 rounded-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold transition-colors shadow-sm"
                            >
                                <Info className="h-4 w-4 mr-2" />
                                Sumber Resmi BMKG
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
