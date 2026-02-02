import { useState, useEffect } from 'react';
import { Cloud, CloudRain, Sun, CloudLightning, CloudDrizzle, AlignJustify, Search, Droplets, Wind, RefreshCw, Pause, Play } from 'lucide-react';
import { useRef } from 'react';

export default function WeatherForecastSection() {
    const [cities, setCities] = useState([]);
    const [filteredCities, setFilteredCities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [autoSlide, setAutoSlide] = useState(true);
    const scrollContainerRef = useRef(null);

    // Fetch data
    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch('/api/weather');
                if (!response.ok) throw new Error('Failed');
                const data = await response.json();

                // If data is array, set it
                if (Array.isArray(data)) {
                    setCities(data);
                    setFilteredCities(data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, []);

    // Filter
    useEffect(() => {
        if (!search) {
            setFilteredCities(cities);
        } else {
            setFilteredCities(cities.filter(c =>
                c.name.toLowerCase().includes(search.toLowerCase())
            ));
        }
    }, [search, cities]);

    // Auto Slide
    useEffect(() => {
        let interval;
        if (autoSlide && scrollContainerRef.current) {
            interval = setInterval(() => {
                if (scrollContainerRef.current) {
                    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
                    if (scrollLeft + clientWidth >= scrollWidth) {
                        scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                    } else {
                        scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
                    }
                }
            }, 3000);
        }
        return () => clearInterval(interval);
    }, [autoSlide, cities]);

    const getWeatherIcon = (code) => {
        // Simple mapping based on code or logic
        // 0: Cerah, 1-2: Cerah Berawan, 3: Berawan, 60+: Hujan
        if (code === 0) return <Sun className="h-12 w-12 text-yellow-500" />;
        if (code >= 1 && code <= 2) return <div className="relative"><Sun className="h-10 w-10 text-yellow-500" /><Cloud className="absolute bottom-0 right-0 h-6 w-6 text-gray-400" /></div>;
        if (code >= 3 && code <= 5) return <Cloud className="h-12 w-12 text-gray-400" />;
        if (code >= 60 && code < 80) return <CloudRain className="h-12 w-12 text-blue-500" />;
        if (code >= 80) return <CloudLightning className="h-12 w-12 text-yellow-600" />;
        return <Cloud className="h-12 w-12 text-gray-300" />;
    };

    if (loading) return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="h-64 animate-pulse rounded-2xl bg-gray-100"></div>
        </div>
    );

    return (
        <section className="bg-blue-50 py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <div className="flex items-center gap-2">
                            <Cloud className="h-6 w-6 text-blue-600" />
                            <h2 className="text-2xl font-bold text-blue-800">Prakiraan Cuaca Sumatera Utara</h2>
                        </div>
                        <p className="text-sm text-gray-500 ml-8">Data resmi BMKG - {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Cari kota/kabupaten..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="rounded-lg border border-gray-300 py-2 pl-9 pr-4 text-sm focus:border-blue-500 focus:outline-none"
                            />
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        </div>
                        <button
                            onClick={() => setAutoSlide(!autoSlide)}
                            className={`rounded-lg p-2 transition-colors ${autoSlide ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}
                        >
                            {autoSlide ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                        </button>
                    </div>
                </div>

                {/* Slider */}
                <div
                    ref={scrollContainerRef}
                    className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-8 scrollbar-hide"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {filteredCities.map((city) => (
                        <div
                            key={city.id}
                            className="min-w-[280px] snap-start rounded-2xl bg-white p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
                        >
                            <div className="mb-4 text-center">
                                <h3 className="text-lg font-bold text-gray-900">{city.name}</h3>
                                <div className="mx-auto mt-1 w-fit rounded-full bg-blue-50 px-3 py-0.5 text-xs text-blue-600">
                                    {city.type || 'Kota/Kab'}
                                </div>
                            </div>

                            <div className="flex flex-col items-center justify-center py-4">
                                {getWeatherIcon(city.weather_code)}
                                <div className="mt-3 text-4xl font-bold text-gray-900">
                                    {city.temp}° <span className="text-lg font-normal text-gray-500">Celsius</span>
                                </div>
                                <div className="mt-1 font-medium text-blue-600">
                                    {city.weather_name}
                                </div>
                            </div>

                            <div className="mt-4 flex justify-between border-t border-gray-100 pt-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                    <Droplets className="h-4 w-4 text-blue-400" />
                                    <span>{city.humidity}%</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Wind className="h-4 w-4 text-gray-400" />
                                    <span>{city.wind_speed} km/j</span>
                                </div>
                            </div>

                            <div className="mt-2 text-center text-xs text-gray-400">
                                Update: {city.updated_at}
                            </div>
                        </div>
                    ))}

                    {filteredCities.length === 0 && (
                        <div className="w-full py-10 text-center text-gray-500">
                            Kota tidak ditemukan.
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
