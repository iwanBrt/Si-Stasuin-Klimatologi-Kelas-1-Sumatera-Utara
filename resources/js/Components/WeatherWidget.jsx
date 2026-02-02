import { useState, useEffect } from 'react';
import { Cloud, CloudRain, Sun, CloudLightning, CloudDrizzle, AlignJustify, Moon, MapPin, Droplets, AlertCircle } from 'lucide-react';

export default function WeatherWidget() {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch('/api/weather');
                if (!response.ok) throw new Error('Failed to fetch');
                const data = await response.json();

                if (data === null || data.error) {
                    setError(true);
                } else {
                    setWeather(data);
                }
            } catch (err) {
                console.error(err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, []);

    const getWeatherIcon = (desc) => {
        if (!desc) return <Cloud className="h-10 w-10 text-gray-400" />;

        const d = desc.toLowerCase();
        if (d.includes('cerah') || d.includes('clear')) return <Sun className="h-10 w-10 text-yellow-400 animate-pulse-slow" />;
        if (d.includes('hujan') || d.includes('rain')) {
            if (d.includes('petir') || d.includes('lightning')) return <CloudLightning className="h-10 w-10 text-yellow-300" />;
            return <CloudRain className="h-10 w-10 text-blue-400" />;
        }
        if (d.includes('berawan') || d.includes('cloud')) return <Cloud className="h-10 w-10 text-blue-200" />;
        if (d.includes('kabut') || d.includes('fog') || d.includes('asap')) return <AlignJustify className="h-10 w-10 text-gray-400" />;

        return <Cloud className="h-10 w-10 text-gray-200" />;
    };

    if (error) {
        return (
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-500/80 to-pink-600/80 p-4 text-white shadow-lg backdrop-blur-md min-w-[280px]">
                <div className="flex items-center gap-3">
                    <AlertCircle className="h-6 w-6" />
                    <span className="text-sm font-medium">Cuaca tidak tersedia</span>
                </div>
            </div>
        );
    }

    return (
        <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-blue-900/90 to-indigo-900/90 p-6 shadow-xl backdrop-blur-md transition-all hover:scale-[1.02] min-w-[280px]">
            {/* Background decoration */}
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-blue-500/30 blur-2xl"></div>
            <div className="absolute -left-6 -bottom-6 h-20 w-20 rounded-full bg-purple-500/30 blur-2xl"></div>

            {loading ? (
                <div className="flex animate-pulse items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-white/10"></div>
                    <div className="space-y-2">
                        <div className="h-4 w-24 rounded bg-white/10"></div>
                        <div className="h-6 w-16 rounded bg-white/10"></div>
                    </div>
                </div>
            ) : (
                <div className="relative z-10 flex items-center justify-between gap-4">
                    <div className="flex flex-col">
                        <div className="flex items-center gap-1.5 mb-1">
                            <MapPin className="h-3 w-3 text-cyan-300" />
                            <span className="text-xs font-bold uppercase tracking-wider text-cyan-100">
                                Medan (Sempakata)
                            </span>
                        </div>
                        <div className="flex items-baseline gap-1">
                            <span className="text-5xl font-bold text-white tracking-tighter">
                                {weather?.temp ?? '--'}°
                            </span>
                        </div>
                        <span className="text-sm font-medium text-blue-100 mt-1 capitalize">
                            {weather?.weather_name ?? 'Unknown'}
                        </span>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                        <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm shadow-inner">
                            {getWeatherIcon(weather?.weather_name)}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-blue-200 bg-black/20 px-2 py-1 rounded-lg">
                            <Droplets className="h-3 w-3" />
                            <span>{weather?.humidity}%</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
