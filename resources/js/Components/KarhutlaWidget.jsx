import { useState, useEffect } from 'react';
import { Map, AlertTriangle, RefreshCw, ZoomIn } from 'lucide-react';

export default function KarhutlaWidget({ type = 'ffmc', title = 'Fire Danger (FFMC)' }) {
    const [maps, setMaps] = useState([]);
    const [selectedMapIndex, setSelectedMapIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [lastUpdated, setLastUpdated] = useState(null);

    const fetchMap = async () => {
        setLoading(true);
        setError(false);
        try {
            const response = await fetch(`/api/proxy/karhutla-map/${type}`);
            const result = await response.json();

            if (result.status === 'success' && Array.isArray(result.data)) {
                setMaps(result.data);
                setSelectedMapIndex(0);
                setLastUpdated(new Date().toLocaleTimeString());
            } else {
                setMaps([]);
                setError(true);
            }
        } catch (err) {
            console.error('Failed to fetch Karhutla map', err);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMap();
    }, []);

    const currentMap = maps[selectedMapIndex];

    return (
        <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-red-900/90 to-orange-900/90 p-4 shadow-xl backdrop-blur-md transition-all hover:scale-[1.01] group h-full flex flex-col">
            {/* Background decoration */}
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-orange-500/20 blur-3xl"></div>
            <div className="absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-red-500/20 blur-3xl"></div>

            <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-orange-500/20 rounded-lg">
                            <Map className="h-4 w-4 text-orange-300" />
                        </div>
                        <h3 className="text-sm font-bold text-white tracking-wide">
                            {title}
                        </h3>
                    </div>
                    {/* Refresh Button */}
                    <button
                        onClick={fetchMap}
                        disabled={loading}
                        className={`p-1.5 rounded-lg bg-black/20 hover:bg-black/40 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                        <RefreshCw className={`h-3.5 w-3.5 text-white/70 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                </div>

                {/* Map Display */}
                <div className="relative flex-1 bg-black/40 rounded-xl overflow-hidden border border-white/10 min-h-[250px] flex items-center justify-center">
                    {loading ? (
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                            <span className="text-xs text-orange-200/80">Memuat Peta...</span>
                        </div>
                    ) : error || !currentMap ? (
                        <div className="flex flex-col items-center gap-2 text-red-200/80 p-4 text-center">
                            <AlertTriangle className="h-6 w-6" />
                            <span className="text-xs">Gagal memuat data BMKG.</span>
                            <button onClick={fetchMap} className="text-[10px] underline hover:text-white">Coba lagi</button>
                        </div>
                    ) : (
                        <div className="relative w-full h-full group/image flex flex-col">
                            {/* Map Image */}
                            <div className="flex-1 flex items-center justify-center p-2">
                                <img
                                    src={currentMap.url}
                                    alt={`Peta FFMC ${currentMap.label}`}
                                    className="max-w-full max-h-[300px] w-auto h-auto object-contain transition-transform duration-700"
                                />
                            </div>

                            {/* Overlay Interaction */}
                            <a
                                href={currentMap.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute inset-0 bg-black/0 group-hover/image:bg-black/10 transition-colors flex items-center justify-center pointer-events-none group-hover/image:pointer-events-auto"
                            >
                                <div className="opacity-0 group-hover/image:opacity-100 bg-black/60 backdrop-blur-sm p-2 rounded-full text-white transition-opacity">
                                    <ZoomIn className="h-5 w-5" />
                                </div>
                            </a>
                        </div>
                    )}
                </div>

                {/* Tabs / Controls */}
                {!loading && !error && maps.length > 0 && (
                    <div className="mt-3 overflow-x-auto pb-1 scrollbar-hide">
                        <div className="flex gap-1.5">
                            {maps.map((map, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedMapIndex(index)}
                                    className={`
                                        whitespace-nowrap px-2.5 py-1 rounded-md text-[10px] font-medium transition-all
                                        ${selectedMapIndex === index
                                            ? 'bg-orange-500 text-white shadow-md'
                                            : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white'}
                                    `}
                                >
                                    {map.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div className="mt-2 flex items-center justify-between text-[10px] text-white/40">
                    <span>Sumber: BMKG (Spartan)</span>
                    {lastUpdated && <span>Update: {lastUpdated}</span>}
                </div>
            </div>
        </div>
    );
}
