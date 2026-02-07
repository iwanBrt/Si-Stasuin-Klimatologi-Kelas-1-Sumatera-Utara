import React, { useState, useEffect, useRef } from 'react';
import { Cloud, CloudRain, Sun, CloudLightning, CloudSun, CloudFog, Wind, Droplets, MapPin, Search, Play, Pause } from 'lucide-react';

export default function WeatherCardGrid() {
    const [weatherData, setWeatherData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [autoSlide, setAutoSlide] = useState(true);
    const [isHovered, setIsHovered] = useState(false);

    const sliderRef = useRef(null);

    // Fetch Data
    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch('/api/prakiraan-cuaca/sumut');
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const result = await response.json();
                setWeatherData(result);
                setFilteredData(result);
            } catch (err) {
                console.error("Failed to fetch weather data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, []);

    // Search Filter
    useEffect(() => {
        const lowerTerm = searchTerm.toLowerCase();
        const filtered = weatherData.filter(city =>
            city.name.toLowerCase().includes(lowerTerm)
        );
        setFilteredData(filtered);
    }, [searchTerm, weatherData]);

    // Auto Slide Logic
    useEffect(() => {
        let interval;
        if (autoSlide && !isHovered && sliderRef.current) {
            interval = setInterval(() => {
                if (sliderRef.current) {
                    const maxScroll = sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
                    if (sliderRef.current.scrollLeft >= maxScroll) {
                        sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                    } else {
                        sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
                    }
                }
            }, 3000); // Slide every 3 seconds
        }
        return () => clearInterval(interval);
    }, [autoSlide, isHovered]);

    const getWeatherIcon = (desc) => {
        if (!desc) return <Cloud className="w-16 h-16 text-gray-300" />;
        const lower = desc.toLowerCase();
        if (lower.includes('petir') || lower.includes('kilat'))
            return <CloudLightning className="w-16 h-16 text-yellow-500 animate-pulse" />;
        if (lower.includes('hujan'))
            return <CloudRain className="w-16 h-16 text-blue-500" />;
        if (lower.includes('cerah berawan'))
            return <CloudSun className="w-16 h-16 text-orange-400" />;
        if (lower.includes('berawan') || lower.includes('mendung'))
            return <Cloud className="w-16 h-16 text-blue-300" />;
        if (lower.includes('cerah'))
            return <Sun className="w-16 h-16 text-yellow-500 animate-spin-slow" />;
        if (lower.includes('kabut') || lower.includes('asap'))
            return <CloudFog className="w-16 h-16 text-gray-400" />;
        return <Cloud className="w-16 h-16 text-gray-300" />;
    };

    if (loading) return <div className="p-10 text-center text-gray-500">Memuat data cuaca...</div>;

    return (
        <div className="w-full bg-blue-50/30 p-6 md:p-8 rounded-3xl border border-blue-100">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <CloudSun className="w-6 h-6 text-blue-600" />
                        <span className="text-blue-600 font-bold tracking-wider text-sm uppercase">Prakiraan Cuaca</span>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">
                        Cuaca <span className="text-blue-600">Sumatera Utara</span>
                    </h2>
                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        Data Real-time BMKG • {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                </div>

                {/* Controls */}
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <div className="relative group w-full md:w-64">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
                            placeholder="Cari kota..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <button
                        onClick={() => setAutoSlide(!autoSlide)}
                        className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all shadow-sm ${autoSlide
                                ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-200'
                                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                            }`}
                    >
                        {autoSlide ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        <span className="whitespace-nowrap">{autoSlide ? 'Jeda Slide' : 'Mulai Slide'}</span>
                    </button>
                </div>
            </div>

            {/* Content Slider */}
            {filteredData.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
                    <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 font-medium">Tidak ada kota yang ditemukan</p>
                    <button
                        onClick={() => setSearchTerm('')}
                        className="mt-2 text-blue-600 hover:underline text-sm"
                    >
                        Reset Pencarian
                    </button>
                </div>
            ) : (
                <div
                    ref={sliderRef}
                    className="flex overflow-x-auto pb-6 -mx-2 px-2 snap-x snap-mandatory scrollbar-hide gap-5"
                    style={{ scrollBehavior: 'smooth' }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {filteredData.map((city) => (
                        <div
                            key={city.id}
                            className="flex-none w-[280px] snap-center bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 p-6 transition-all duration-300 transform hover:-translate-y-1 group"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg line-clamp-1" title={city.name}>
                                        {city.name}
                                    </h3>
                                    <p className="text-xs font-medium text-gray-400 mt-1 uppercase tracking-wide">
                                        {city.type || 'Kota'}
                                    </p>
                                </div>
                                <div className="text-xs text-right text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">
                                    {city.datetime.split(' ')[1]}
                                </div>
                            </div>

                            <div className="flex flex-col items-center justify-center py-4 mb-2">
                                <div className="p-4 bg-blue-50/50 rounded-full mb-3 group-hover:scale-110 transition-transform duration-500">
                                    {getWeatherIcon(city.weather_desc)}
                                </div>
                                <span className="text-4xl font-black text-gray-800 tracking-tighter">
                                    {city.temp}°
                                    <span className="text-lg font-medium text-gray-400 align-top ml-1">C</span>
                                </span>
                                <span className="inline-block mt-2 px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full uppercase tracking-wide">
                                    {city.weather_desc}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-gray-100">
                                <div className="text-center p-2 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                    <span className="text-[10px] text-gray-400 uppercase font-bold block mb-1">Kelembapan</span>
                                    <div className="flex items-center justify-center gap-1 font-bold text-gray-700">
                                        <Droplets className="w-3 h-3 text-blue-400" />
                                        {city.humidity}%
                                    </div>
                                </div>
                                <div className="text-center p-2 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                    <span className="text-[10px] text-gray-400 uppercase font-bold block mb-1">Angin</span>
                                    <div className="flex items-center justify-center gap-1 font-bold text-gray-700">
                                        <Wind className="w-3 h-3 text-gray-400" />
                                        {city.wind_speed} <span className="text-[10px] text-gray-500">km/j</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
}
