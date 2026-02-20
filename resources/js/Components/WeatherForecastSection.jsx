import { useState, useEffect, useRef } from 'react';
import { Cloud, CloudRain, Sun, CloudLightning, CloudDrizzle, Search, Droplets, Wind, RefreshCw, Pause, Play, Thermometer, Eye, MapPin, ExternalLink, CloudSnow, CloudFog, AlertTriangle } from 'lucide-react';

export default function WeatherForecastSection() {
    const [cities, setCities] = useState([]);
    const [filteredCities, setFilteredCities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAutoSliding, setIsAutoSliding] = useState(true);
    const scrollContainerRef = useRef(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch('/api/weather');
                if (!response.ok) throw new Error(`HTTP ${response.status}: gagal mengambil data cuaca`);
                const data = await response.json();

                console.log('[WeatherForecastSection] Raw API response:', data);

                if (!Array.isArray(data)) {
                    console.warn('[WeatherForecastSection] API Success but No Data — bukan array');
                    setError(true);
                    return;
                }

                if (data.length === 0) {
                    console.warn('[WeatherForecastSection] API Success but No Data — array kosong');
                }

                // Filter: hanya tampilkan data valid (suhu > 0)
                const validCities = data.filter(city =>
                    city &&
                    city.temp !== null &&
                    city.temp !== undefined &&
                    city.temp !== '-' &&
                    city.weather_name !== 'Offline'
                );
                setCities(validCities);
                setFilteredCities(validCities);
            } catch (err) {
                console.error('[WeatherForecastSection] Fetch error:', err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, []);

    useEffect(() => {
        if (!Array.isArray(cities)) return;

        const lowerQuery = searchQuery.toLowerCase().trim();

        if (!lowerQuery) {
            setFilteredCities(cities);
            setActiveIndex(0);
            return;
        }

        const filtered = cities.filter(city =>
            (city?.name ?? '').toLowerCase().includes(lowerQuery)
        );
        setFilteredCities(filtered);
        setActiveIndex(0);
    }, [searchQuery, cities]);


    useEffect(() => {
        let interval;
        if (isAutoSliding && !loading && filteredCities.length > 0) {
            interval = setInterval(() => {
                setActiveIndex((prev) => (prev + 1) % filteredCities.length);

                // Also scroll container if needed (desktop view)
                if (scrollContainerRef.current) {
                    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
                    const cardWidth = 320;
                    if (scrollLeft + clientWidth >= scrollWidth - 10) {
                        scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                    } else {
                        scrollContainerRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
                    }
                }
            }, 3000);
        }
        return () => clearInterval(interval);
    }, [isAutoSliding, loading, filteredCities.length]);

    const getWeatherIcon = (code) => {
        if (code === 0) return <Sun className="h-16 w-16 text-yellow-500 animate-pulse" />;
        if (code >= 1 && code <= 2) return <Cloud className="h-16 w-16 text-blue-400" />;
        if (code >= 3 && code <= 4) return <Cloud className="h-16 w-16 text-gray-400" />;
        if (code === 5 || code === 45) return <CloudFog className="h-16 w-16 text-gray-300" />;
        if (code === 60) return <CloudDrizzle className="h-16 w-16 text-blue-300" />;
        if (code === 61) return <CloudRain className="h-16 w-16 text-blue-500" />;
        if (code === 63 || code === 80) return <CloudRain className="h-16 w-16 text-blue-700 font-bold" />;
        if (code >= 95) return <CloudLightning className="h-16 w-16 text-yellow-600 animate-bounce" />;
        return <Cloud className="h-16 w-16 text-gray-300" />;
    };

    const getGradient = (code) => {
        if (code === 0) return 'from-yellow-200 to-orange-100'; // Cerah
        if (code >= 95) return 'from-gray-700 to-gray-500'; // Petir
        if (code >= 60) return 'from-blue-600 to-blue-400'; // Hujan
        if (code >= 3) return 'from-gray-400 to-gray-200'; // Berawan
        return 'from-blue-200 to-white'; // Default
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-32">
                <div className="text-center p-8 bg-white rounded-3xl shadow-xl border border-blue-100 max-w-sm mx-4">
                    <div className="relative mb-6 mx-auto w-20 h-20">
                        <div className="absolute inset-0 rounded-full border-4 border-blue-100"></div>
                        <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
                        <Cloud className="absolute inset-0 m-auto h-8 w-8 text-blue-500 animate-bounce" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Memuat Data Cuaca</h3>
                    <p className="text-gray-500 text-sm">Mengambil data terbaru dari server BMKG...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return null; // Hide section on error
    }

    return (
        <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 -ml-20 -mt-20 h-96 w-96 rounded-full bg-blue-100/50 blur-3xl opacity-60"></div>
            <div className="absolute bottom-0 right-0 -mr-20 -mb-20 h-96 w-96 rounded-full bg-indigo-100/50 blur-3xl opacity-60"></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-bold text-xs mb-4 shadow-sm">
                            <Cloud className="h-3 w-3" />
                            <span>PRAKIRAAN CUACA</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-2">
                            Cuaca <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Sumatera Utara</span>
                        </h2>
                        <p className="text-gray-600 flex items-center gap-2 text-sm font-medium">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            Data Real-time BMKG
                        </p>
                    </div>

                    {/* Controls */}
                    <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-4 py-3 border-none rounded-xl bg-white shadow-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all w-full sm:w-64"
                                placeholder="Cari kota atau kabupaten..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <button
                            onClick={() => setIsAutoSliding(!isAutoSliding)}
                            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-lg ${isAutoSliding
                                ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-xl hover:-translate-y-0.5'
                                : 'bg-white text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            {isAutoSliding ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                            <span className="hidden sm:inline">{isAutoSliding ? 'Jeda Slide' : 'Mulai Slide'}</span>
                        </button>
                    </div>
                </div>

                {/* Cards Slider */}
                <div
                    ref={scrollContainerRef}
                    className="flex overflow-x-auto pb-8 gap-6 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0"
                    style={{ scrollBehavior: 'smooth' }}
                >
                    {filteredCities.length > 0 ? (
                        filteredCities.map((city, index) => (
                            <div
                                key={city.id}
                                className={`snap-center shrink-0 w-[280px] sm:w-[320px] bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 relative group border border-slate-100 ${index === activeIndex ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}
                            >
                                {/* Card Header */}
                                <div className="p-6 pb-0 flex justify-between items-start z-10 relative">
                                    <div>
                                        <div className="flex items-center gap-1.5 text-gray-500 mb-1.5">
                                            <MapPin className="h-3.5 w-3.5" />
                                            <span className="text-[10px] uppercase font-bold tracking-wider">{city.type}</span>
                                        </div>
                                        <h3 className="font-bold text-gray-900 text-xl leading-tight truncate w-48" title={city.name}>
                                            {city.name}
                                        </h3>
                                    </div>
                                </div>

                                {/* Weather Icon & Temp */}
                                <div className="p-6 text-center relative z-10">
                                    <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl p-6 shadow-inner mb-6 border border-slate-100 group-hover:from-blue-50 group-hover:to-indigo-50 transition-colors duration-500">
                                        <div className="flex justify-center mb-4 drop-shadow-md transition-transform group-hover:scale-110 duration-500">
                                            {getWeatherIcon(city.weather_code)}
                                        </div>
                                        <div className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2 px-3 py-1 rounded-full bg-white/60 inline-block shadow-sm">
                                            {city.weather_name}
                                        </div>
                                        <div className="flex items-start justify-center text-gray-800 tracking-tighter drop-shadow-sm">
                                            <span className="text-6xl font-black">{city.temp}</span>
                                            <span className="text-3xl font-bold text-gray-400 mt-1">°C</span>
                                        </div>
                                    </div>

                                    {/* Weather Stats */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-blue-50/80 p-3.5 rounded-2xl flex flex-col items-center justify-center border border-blue-100 transition-colors group-hover:bg-blue-100/80">
                                            <div className="flex items-center gap-1.5 text-blue-400 mb-1">
                                                <Droplets className="h-3.5 w-3.5" />
                                                <span className="text-[10px] font-bold uppercase">Kelembaban</span>
                                            </div>
                                            <span className="font-black text-gray-700 text-lg">
                                                {city.humidity}<span className="text-xs font-normal text-gray-500 ml-0.5">%</span>
                                            </span>
                                        </div>
                                        <div className="bg-indigo-50/80 p-3.5 rounded-2xl flex flex-col items-center justify-center border border-indigo-100 transition-colors group-hover:bg-indigo-100/80">
                                            <div className="flex items-center gap-1.5 text-indigo-400 mb-1">
                                                <Wind className="h-3.5 w-3.5" />
                                                <span className="text-[10px] font-bold uppercase">Angin</span>
                                            </div>
                                            <span className="font-black text-gray-700 text-lg">
                                                {city.wind_speed}<span className="text-xs font-normal text-gray-500 ml-0.5">km/j</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Card Footer */}
                                <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-between items-center relative z-10">
                                    <span className="text-[10px] text-gray-400 font-bold flex items-center gap-1.5">
                                        <RefreshCw className="h-3 w-3" />
                                        Update: {city.updated_at}
                                    </span>
                                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                                        BMKG
                                    </span>
                                </div>

                                {/* Hover Gradient Blob */}
                                <div className={`absolute -right-12 -bottom-12 w-48 h-48 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 bg-gradient-to-br ${getGradient(city.weather_code)} pointer-events-none`}></div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full w-full py-20 text-center bg-white rounded-3xl shadow-sm border-2 border-dashed border-gray-200 mx-4">
                            <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="h-8 w-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">Tidak ada hasil ditemukan</h3>
                            <p className="text-gray-500 text-sm">Coba kata kunci pencarian lain</p>
                            <button
                                onClick={() => setSearchQuery('')}
                                className="mt-4 text-sm text-blue-600 hover:text-blue-700 font-bold hover:underline"
                            >
                                Reset Pencarian
                            </button>
                        </div>
                    )}
                </div>

                {/* Footer Attribution */}
                <div className="mt-12 flex flex-col sm:flex-row justify-between items-center gap-6 border-t border-blue-100 pt-8">
                    <div className="flex items-center gap-4">
                        <div className="bg-white p-2 rounded-lg shadow-sm">
                            <img src="https://www.bmkg.go.id/asset/img/logo/logo-bmkg.png" alt="BMKG" className="h-8 w-auto" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-0.5">Sumber Data Resmi</p>
                            <p className="text-xs text-gray-400 font-medium">Badan Meteorologi, Klimatologi, dan Geofisika</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="flex items-center gap-2">
                            <a
                                href="https://www.bmkg.go.id"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors bg-white px-4 py-2 rounded-xl shadow-sm hover:shadow-md border border-blue-50"
                            >
                                Portal Resmi BMKG <ExternalLink className="h-3 w-3" />
                            </a>
                        </div>
                        <p className="text-[10px] text-gray-400 mt-2 font-medium">* Menampilkan data valid dari BMKG. Data offline tidak ditampilkan.</p>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </section>
    );
}
