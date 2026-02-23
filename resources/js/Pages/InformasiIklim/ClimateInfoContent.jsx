import { Head } from '@inertiajs/react';
import {
    CloudRain,
    Calendar,
    BarChart3,
    Droplets,
    TrendingUp,
    Map,
    Zap,
    Waves,
    Target,
    AlertTriangle
} from 'lucide-react';
import Navbar from '@/Components/Navbar';

const iconMap = {
    // Bulanan
    'analisis-hujan-bulanan': CloudRain,
    'prakiraan-hujan-bulanan': TrendingUp,
    'prakiraan-ketersediaan-air': Droplets,
    'spi': BarChart3,
    // Dasarian
    'prospek-iklim-dasarian': Map,
    'analisis-hari-tanpa-hujan': Zap,
    'analisis-curah-hujan-dasarian': CloudRain,
    'prakiraan-curah-hujan-dasarian': TrendingUp,
    'probabilitas-curah-hujan-dasarian': Target,
    'prakiraan-rawan-banjir-dasarian': Waves,
};

const colorMap = {
    // Bulanan
    'analisis-hujan-bulanan': {
        gradient: 'from-blue-600 via-blue-700 to-cyan-700',
        badge: 'bg-cyan-400/20 text-cyan-100',
        iconBg: 'bg-blue-100 text-blue-600',
        accent: 'from-blue-500 to-cyan-500',
        tagBg: 'bg-blue-100 text-blue-700',
    },
    'prakiraan-hujan-bulanan': {
        gradient: 'from-indigo-600 via-indigo-700 to-purple-700',
        badge: 'bg-purple-400/20 text-purple-100',
        iconBg: 'bg-indigo-100 text-indigo-600',
        accent: 'from-indigo-500 to-purple-500',
        tagBg: 'bg-indigo-100 text-indigo-700',
    },
    'prakiraan-ketersediaan-air': {
        gradient: 'from-teal-600 via-teal-700 to-emerald-700',
        badge: 'bg-emerald-400/20 text-emerald-100',
        iconBg: 'bg-teal-100 text-teal-600',
        accent: 'from-teal-500 to-emerald-500',
        tagBg: 'bg-teal-100 text-teal-700',
    },
    'spi': {
        gradient: 'from-amber-600 via-orange-600 to-red-600',
        badge: 'bg-orange-400/20 text-orange-100',
        iconBg: 'bg-amber-100 text-amber-600',
        accent: 'from-amber-500 to-orange-500',
        tagBg: 'bg-amber-100 text-amber-700',
    },
    // Dasarian
    'prospek-iklim-dasarian': {
        gradient: 'from-sky-500 via-blue-600 to-blue-800',
        badge: 'bg-sky-400/20 text-sky-100',
        iconBg: 'bg-sky-100 text-sky-600',
        accent: 'from-sky-500 to-blue-500',
        tagBg: 'bg-sky-100 text-sky-700',
    },
    'analisis-hari-tanpa-hujan': {
        gradient: 'from-orange-500 via-red-600 to-rose-700',
        badge: 'bg-orange-400/20 text-orange-100',
        iconBg: 'bg-orange-100 text-orange-600',
        accent: 'from-orange-500 to-red-500',
        tagBg: 'bg-orange-100 text-orange-700',
    },
    'analisis-curah-hujan-dasarian': {
        gradient: 'from-blue-500 via-indigo-600 to-indigo-800',
        badge: 'bg-blue-400/20 text-blue-100',
        iconBg: 'bg-blue-100 text-blue-600',
        accent: 'from-blue-500 to-indigo-500',
        tagBg: 'bg-blue-100 text-blue-700',
    },
    'prakiraan-curah-hujan-dasarian': {
        gradient: 'from-indigo-500 via-violet-600 to-purple-800',
        badge: 'bg-indigo-400/20 text-indigo-100',
        iconBg: 'bg-indigo-100 text-indigo-600',
        accent: 'from-indigo-500 to-violet-500',
        tagBg: 'bg-indigo-100 text-indigo-700',
    },
    'probabilitas-curah-hujan-dasarian': {
        gradient: 'from-emerald-500 via-teal-600 to-cyan-800',
        badge: 'bg-emerald-400/20 text-emerald-100',
        iconBg: 'bg-emerald-100 text-emerald-600',
        accent: 'from-emerald-500 to-teal-500',
        tagBg: 'bg-emerald-100 text-emerald-700',
    },
    'prakiraan-rawan-banjir-dasarian': {
        gradient: 'from-cyan-500 via-blue-600 to-indigo-800',
        badge: 'bg-cyan-400/20 text-cyan-100',
        iconBg: 'bg-cyan-100 text-cyan-600',
        accent: 'from-cyan-500 to-blue-500',
        tagBg: 'bg-cyan-100 text-cyan-700',
    },
};

export default function ClimateInfoContent({ auth, contents = [], section, title, subtitle, infoType = 'Bulanan' }) {
    const colors = colorMap[section] || colorMap['analisis-hujan-bulanan'];
    const HeroIcon = iconMap[section] || CloudRain;

    return (
        <div className="min-h-screen bg-gray-50">
            <Head title={`${title} - Stasiun Klimatologi Sumatera Utara`}>
                <meta name="description" content={`${title} - UPT Stasiun Klimatologi Sumatera Utara BMKG. ${subtitle}`} />
            </Head>

            <Navbar auth={auth} />

            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient}`} />
                {/* Decorative patterns */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-white/20 blur-3xl" />
                    <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/5 blur-3xl" />
                </div>
                {/* Grid pattern */}
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)',
                    backgroundSize: '32px 32px'
                }} />

                <div className="relative py-20 md:py-28">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <div className={`mb-5 inline-flex items-center gap-2.5 rounded-full ${colors.badge} px-5 py-2.5 backdrop-blur-sm border border-white/10`}>
                                <HeroIcon className="h-5 w-5" />
                                <span className="text-sm font-semibold">Informasi Iklim {infoType}</span>
                            </div>
                            <h1 className="mb-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl leading-tight">
                                {title}
                            </h1>
                            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-white/80">
                                {subtitle}
                            </p>

                            {/* Decorative line */}
                            <div className="mt-8 flex items-center justify-center gap-2">
                                <div className="h-1 w-12 rounded-full bg-white/30" />
                                <div className="h-1 w-6 rounded-full bg-white/50" />
                                <div className="h-1 w-3 rounded-full bg-white/70" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Wave separator */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                        <path d="M0 80V40C240 0 480 0 720 20C960 40 1200 80 1440 60V80H0Z" fill="#f9fafb" />
                    </svg>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-16 md:py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {contents.length === 0 ? (
                        /* Empty State */
                        <div className="text-center py-24">
                            <div className={`mx-auto w-24 h-24 rounded-2xl ${colors.iconBg} flex items-center justify-center mb-6 shadow-lg`}>
                                <HeroIcon className="h-12 w-12" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">Belum Ada Data</h3>
                            <p className="text-gray-500 max-w-md mx-auto text-lg">
                                Data {title.toLowerCase()} belum tersedia saat ini. Silakan cek kembali nanti.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-16">
                            {contents.map((item, index) => (
                                <article
                                    key={item.id}
                                    className={`group relative ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
                                >
                                    <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-stretch`}>
                                        {/* Image */}
                                        {item.file_url && (
                                            <div className="md:w-3/5 flex-shrink-0">
                                                <div className="relative overflow-hidden rounded-2xl shadow-xl border border-gray-200 bg-white h-full">
                                                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${colors.accent}`} />
                                                    <img
                                                        src={item.file_url}
                                                        alt={item.title}
                                                        className="w-full h-full object-contain p-2 transition-transform duration-700 group-hover:scale-[1.02]"
                                                        style={{ minHeight: '300px', maxHeight: '500px' }}
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {/* Text Content */}
                                        <div className={`${item.file_url ? 'md:w-2/5' : 'w-full'} flex flex-col justify-center`}>
                                            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 h-full">
                                                {/* Tags */}
                                                <div className="flex flex-wrap items-center gap-2 mb-5">
                                                    {item.category && (
                                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ${colors.tagBg} text-xs font-bold uppercase tracking-wider`}>
                                                            <HeroIcon className="h-3.5 w-3.5" />
                                                            {item.category}
                                                        </span>
                                                    )}
                                                    {item.subtitle && (
                                                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 text-xs font-semibold">
                                                            <Calendar className="h-3.5 w-3.5" />
                                                            {item.subtitle}
                                                        </span>
                                                    )}
                                                </div>

                                                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 leading-tight">
                                                    {item.title}
                                                </h2>

                                                {item.description && (
                                                    <div className="relative">
                                                        <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-full bg-gradient-to-b ${colors.accent}`} />
                                                        <p className="pl-5 text-gray-600 leading-relaxed whitespace-pre-line">
                                                            {item.description}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-gray-200 bg-white py-8">
                <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                    <p className="text-sm text-gray-600">
                        © 2026 UPT Stasiun Klimatologi BMKG Sumatera Utara. Hak Cipta Dilindungi.
                    </p>
                </div>
            </footer>
        </div>
    );
}
