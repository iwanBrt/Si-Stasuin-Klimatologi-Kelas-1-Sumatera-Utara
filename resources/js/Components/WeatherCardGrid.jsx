import React, { useState, useEffect, useRef } from 'react';
import {
    Cloud, CloudRain, Sun, CloudLightning, CloudSun,
    CloudFog, CloudDrizzle, Wind, Droplets, Search,
    Play, Pause, AlertCircle, RefreshCw, MapPin, ExternalLink
} from 'lucide-react';

// ─── Helper: Kode cuaca BMKG → Deskripsi teks ─────────────────────────────
const getWeatherStatus = (code) => {
    const map = {
        0: 'Cerah',
        1: 'Cerah Berawan',
        2: 'Cerah Berawan',
        3: 'Berawan',
        4: 'Berawan Tebal',
        5: 'Udara Kabur',
        10: 'Asap',
        45: 'Kabut',
        60: 'Hujan Ringan',
        61: 'Hujan Sedang',
        63: 'Hujan Lebat',
        80: 'Hujan Lokal',
        95: 'Hujan Petir',
        97: 'Hujan Petir',
    };
    return map[code] ?? 'Berawan';
};

// ─── Helper: Teks cuaca → Ikon React ───────────────────────────────────────
const getWeatherIcon = (desc = '') => {
    const lower = (desc || '').toLowerCase();
    if (lower.includes('petir') || lower.includes('kilat'))
        return <CloudLightning className="w-16 h-16 text-yellow-500 animate-pulse" />;
    if (lower.includes('lebat') || lower.includes('sedang'))
        return <CloudRain className="w-16 h-16 text-blue-600" />;
    if (lower.includes('hujan'))
        return <CloudDrizzle className="w-16 h-16 text-blue-400" />;
    if (lower.includes('cerah berawan'))
        return <CloudSun className="w-16 h-16 text-orange-400" />;
    if (lower.includes('berawan tebal') || lower.includes('mendung'))
        return <Cloud className="w-16 h-16 text-gray-500" />;
    if (lower.includes('berawan'))
        return <Cloud className="w-16 h-16 text-blue-300" />;
    if (lower.includes('cerah'))
        return <Sun className="w-16 h-16 text-yellow-500" />;
    if (lower.includes('kabut') || lower.includes('asap') || lower.includes('kabur'))
        return <CloudFog className="w-16 h-16 text-gray-400" />;
    return <Cloud className="w-16 h-16 text-gray-300" />;
};

// ─── Helper: Gradien card berdasarkan cuaca ─────────────────────────────────
const getCardAccent = (desc = '') => {
    const lower = (desc || '').toLowerCase();
    if (lower.includes('petir')) return 'from-yellow-500/20 to-orange-500/10 border-yellow-200';
    if (lower.includes('lebat')) return 'from-blue-700/20 to-blue-500/10 border-blue-300';
    if (lower.includes('hujan')) return 'from-blue-500/20 to-cyan-400/10 border-blue-200';
    if (lower.includes('cerah berawan')) return 'from-orange-300/20 to-yellow-200/10 border-orange-100';
    if (lower.includes('cerah')) return 'from-yellow-300/20 to-amber-200/10 border-yellow-100';
    if (lower.includes('kabut') || lower.includes('kabur')) return 'from-gray-400/20 to-slate-300/10 border-gray-200';
    return 'from-blue-200/20 to-slate-100/10 border-blue-100';
};

// ─── Loading Spinner ─────────────────────────────────────────────────────────
const LoadingSpinner = () => (
    <div className="flex justify-center items-center py-24">
        <div className="text-center">
            <div className="relative w-20 h-20 mx-auto mb-5">
                <div className="absolute inset-0 rounded-full border-4 border-blue-100" />
                <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
                <Cloud className="absolute inset-0 m-auto h-8 w-8 text-blue-500 animate-bounce" />
            </div>
            <p className="text-gray-600 font-semibold text-lg">Memuat data cuaca…</p>
            <p className="text-gray-400 text-sm mt-1">Mengambil data terbaru dari BMKG</p>
        </div>
    </div>
);

// ─── Komponen Utama ───────────────────────────────────────────────────────────
export default function WeatherCardGrid() {
    const [weatherData, setWeatherData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [autoSlide, setAutoSlide] = useState(true);
    const [isHovered, setIsHovered] = useState(false);
    const [isFallback, setIsFallback] = useState(false);
    const [fallbackCount, setFallbackCount] = useState(0);

    const sliderRef = useRef(null);

    // ── Fetch data ───────────────────────────────────────────────────────
    useEffect(() => {
        const fetchWeather = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch('/api/prakiraan-cuaca/sumut');
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }

                const result = await response.json();
                console.log('[WeatherCardGrid] Raw API response:', result);

                if (!Array.isArray(result)) {
                    throw new Error('Respons API bukan array');
                }

                if (result.length === 0) {
                    console.warn('[WeatherCardGrid] API Success but No Data — array kosong');
                    setWeatherData([]);
                    setFilteredData([]);
                } else {
                    setWeatherData(result);
                    setFilteredData(result);
                    // Hitung berapa data fallback vs real
                    const fbCount = result.filter(c => c.is_fallback === true).length;
                    setFallbackCount(fbCount);
                    setIsFallback(fbCount > 0);
                    console.log(`[WeatherCardGrid] Data loaded: ${result.length - fbCount} real, ${fbCount} fallback`);
                }
            } catch (err) {
                console.error('[WeatherCardGrid] Fetch error:', err.message);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, []);

    // ── Filter pencarian ─────────────────────────────────────────────────
    useEffect(() => {
        if (!Array.isArray(weatherData)) return;

        const lowerTerm = searchTerm.toLowerCase().trim();

        if (!lowerTerm) {
            // Saat search bar kosong → tampilkan semua kota
            setFilteredData(weatherData);
            return;
        }

        const filtered = weatherData.filter(city => {
            const name = (city?.name ?? '').toLowerCase();
            return name.includes(lowerTerm);
        });

        setFilteredData(filtered);
    }, [searchTerm, weatherData]);

    // ── Auto-slide ───────────────────────────────────────────────────────
    useEffect(() => {
        let interval;
        if (autoSlide && !isHovered && sliderRef.current && filteredData.length > 0) {
            interval = setInterval(() => {
                if (sliderRef.current) {
                    const maxScroll = sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
                    if (sliderRef.current.scrollLeft >= maxScroll - 5) {
                        sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                    } else {
                        sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
                    }
                }
            }, 3000);
        }
        return () => clearInterval(interval);
    }, [autoSlide, isHovered, filteredData.length]);

    // ── Render loading ───────────────────────────────────────────────────
    if (loading) return <LoadingSpinner />;

    // ── Render error ─────────────────────────────────────────────────────
    if (error) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="text-center p-8 bg-red-50 rounded-2xl border border-red-100 max-w-md">
                    <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-3" />
                    <h3 className="font-bold text-gray-800 mb-1">Gagal Memuat Data</h3>
                    <p className="text-gray-500 text-sm mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="flex items-center gap-2 mx-auto px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                        <RefreshCw className="w-4 h-4" /> Coba Lagi
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full bg-gradient-to-br from-blue-50/50 to-indigo-50/30 p-6 md:p-8 rounded-3xl border border-blue-100">
            {/* ── Header ─────────────────────────────────────────────────── */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <CloudSun className="w-6 h-6 text-blue-600" />
                        <span className="text-blue-600 font-bold tracking-wider text-sm uppercase">
                            Prakiraan Cuaca
                        </span>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">
                        Cuaca <span className="text-blue-600">Sumatera Utara</span>
                    </h2>
                    <div className="flex items-center gap-3 mt-2 flex-wrap">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span className={`w-2 h-2 rounded-full ${fallbackCount === weatherData.length ? 'bg-amber-500' : 'bg-green-500'} animate-pulse`} />
                            {fallbackCount === 0 ? 'Data Real-time BMKG' : fallbackCount === weatherData.length ? 'Mode Demo — API Tidak Tersedia' : 'Data BMKG (Sebagian)'} •{' '}
                            {new Date().toLocaleDateString('id-ID', {
                                weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
                            })}
                        </div>
                        {fallbackCount > 0 && fallbackCount < weatherData.length && (
                            <span className="text-xs text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full font-medium">
                                ⚠ {weatherData.length - fallbackCount}/{weatherData.length} data real
                            </span>
                        )}
                        {fallbackCount === weatherData.length && weatherData.length > 0 && (
                            <span className="text-xs text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full font-medium">
                                ⚠ Mode Demo
                            </span>
                        )}
                        {fallbackCount === 0 && weatherData.length > 0 && (
                            <span className="text-xs text-green-600 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full font-medium">
                                ✓ Semua data real BMKG
                            </span>
                        )}
                        <span className="text-xs text-gray-400 bg-white border border-gray-100 px-2 py-0.5 rounded-full">
                            {filteredData.length} kota ditampilkan
                        </span>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <div className="relative group w-full md:w-64">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                        </div>
                        <input
                            id="weather-search"
                            type="text"
                            className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm text-sm"
                            placeholder="Cari kota atau kabupaten…"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                title="Hapus pencarian"
                            >
                                ×
                            </button>
                        )}
                    </div>

                    <button
                        onClick={() => setAutoSlide(!autoSlide)}
                        className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all shadow-sm whitespace-nowrap ${autoSlide
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                            }`}
                    >
                        {autoSlide ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        <span>{autoSlide ? 'Jeda Slide' : 'Mulai Slide'}</span>
                    </button>

                    <a
                        href="https://www.bmkg.go.id/cuaca/prakiraan-cuaca/12"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all shadow-sm whitespace-nowrap bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 hover:shadow-md"
                    >
                        <ExternalLink className="w-4 h-4" />
                        <span>Lihat Detail</span>
                    </a>
                </div>
            </div>

            {/* ── Content ─────────────────────────────────────────────────── */}
            {filteredData.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
                    <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-700 font-semibold">
                        {weatherData.length === 0
                            ? 'Tidak ada data cuaca tersedia'
                            : `Tidak ada kota yang cocok dengan "${searchTerm}"`}
                    </p>
                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm('')}
                            className="mt-3 inline-flex items-center gap-1 text-blue-600 hover:underline text-sm font-medium"
                        >
                            <RefreshCw className="w-3 h-3" /> Reset Pencarian
                        </button>
                    )}
                </div>
            ) : (
                <div
                    ref={sliderRef}
                    className="flex overflow-x-auto pb-6 -mx-2 px-2 snap-x snap-mandatory gap-5"
                    style={{ scrollBehavior: 'smooth', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {filteredData.map((city) => {
                        const accent = getCardAccent(city.weather_desc);
                        return (
                            <div
                                key={city.id}
                                className={`flex-none w-[270px] snap-center bg-white rounded-2xl shadow-sm hover:shadow-xl border p-6 transition-all duration-300 transform hover:-translate-y-1 group bg-gradient-to-br ${accent}`}
                            >
                                {/* Card header */}
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <div className="flex items-center gap-1 text-gray-400 mb-1">
                                            <MapPin className="w-3 h-3" />
                                            <span className="text-[10px] font-bold uppercase tracking-wider">
                                                {city.type || 'Wilayah'}
                                            </span>
                                        </div>
                                        <h3 className="font-bold text-gray-900 text-base leading-tight" title={city.name}>
                                            {city.name}
                                        </h3>
                                    </div>
                                    <div className="text-xs text-right text-gray-400 bg-gray-50 px-2 py-1 rounded-lg shrink-0 ml-2">
                                        {city.datetime ? city.datetime.split(' ')[1] : '--:--'}
                                    </div>
                                </div>

                                {/* Icon & suhu */}
                                <div className="flex flex-col items-center justify-center py-4 mb-2">
                                    <div className="p-4 bg-white/60 rounded-full mb-3 group-hover:scale-110 transition-transform duration-500 shadow-sm">
                                        {getWeatherIcon(city.weather_desc)}
                                    </div>
                                    <span className="text-5xl font-black text-gray-800 tracking-tighter">
                                        {city.temp}
                                        <span className="text-lg font-medium text-gray-400 align-top ml-1">°C</span>
                                    </span>
                                    <span className="inline-block mt-2 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full uppercase tracking-wide">
                                        {city.weather_desc || 'N/A'}
                                    </span>
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-white/60">
                                    <div className="text-center p-2 bg-white/70 rounded-xl hover:bg-white transition-colors">
                                        <span className="text-[10px] text-gray-400 uppercase font-bold block mb-1">
                                            Kelembapan
                                        </span>
                                        <div className="flex items-center justify-center gap-1 font-bold text-gray-700">
                                            <Droplets className="w-3 h-3 text-blue-400" />
                                            {city.humidity}%
                                        </div>
                                    </div>
                                    <div className="text-center p-2 bg-white/70 rounded-xl hover:bg-white transition-colors">
                                        <span className="text-[10px] text-gray-400 uppercase font-bold block mb-1">
                                            Angin
                                        </span>
                                        <div className="flex items-center justify-center gap-1 font-bold text-gray-700">
                                            <Wind className="w-3 h-3 text-gray-400" />
                                            {city.wind_speed}
                                            <span className="text-[10px] text-gray-400 font-normal">km/j</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
