import { Head } from '@inertiajs/react';
import {
    CloudRain,
    Calendar,
    Thermometer,
    ThermometerSnowflake,
    Map as MapIcon,
    Wind,
    Layers,
    Info,
    Download
} from 'lucide-react';
import Navbar from '@/Components/Navbar';

const iconMap = {
    'normal-hujan-bulanan': CloudRain,
    'normal-peta-zom': MapIcon,
    'normal-schmidt-fergusson': Layers,
    'normal-oldeman': Wind,
    'normal-suhu-maksimum': Thermometer,
    'normal-suhu-minimum': ThermometerSnowflake,
};

const colorMap = {
    'normal-hujan-bulanan': {
        gradient: 'from-slate-700 via-blue-800 to-indigo-900',
        badge: 'bg-blue-400/20 text-blue-100',
        iconBg: 'bg-blue-100 text-blue-700',
        accent: 'from-blue-600 to-indigo-600',
        tagBg: 'bg-blue-50 text-blue-700',
    },
    'normal-peta-zom': {
        gradient: 'from-slate-700 via-emerald-800 to-teal-900',
        badge: 'bg-emerald-400/20 text-emerald-100',
        iconBg: 'bg-emerald-100 text-emerald-700',
        accent: 'from-emerald-600 to-teal-600',
        tagBg: 'bg-emerald-50 text-emerald-700',
    },
    'normal-schmidt-fergusson': {
        gradient: 'from-slate-700 via-orange-800 to-amber-900',
        badge: 'bg-amber-400/20 text-amber-100',
        iconBg: 'bg-amber-100 text-amber-700',
        accent: 'from-orange-600 to-amber-600',
        tagBg: 'bg-amber-50 text-amber-700',
    },
    'normal-oldeman': {
        gradient: 'from-slate-700 via-purple-800 to-fuchsia-900',
        badge: 'bg-purple-400/20 text-purple-100',
        iconBg: 'bg-purple-100 text-purple-700',
        accent: 'from-purple-600 to-fuchsia-600',
        tagBg: 'bg-purple-50 text-purple-700',
    },
    'normal-suhu-maksimum': {
        gradient: 'from-slate-700 via-red-800 to-rose-900',
        badge: 'bg-red-400/20 text-red-100',
        iconBg: 'bg-red-100 text-red-700',
        accent: 'from-red-600 to-rose-600',
        tagBg: 'bg-red-50 text-red-700',
    },
    'normal-suhu-minimum': {
        gradient: 'from-slate-700 via-cyan-800 to-sky-900',
        badge: 'bg-cyan-400/20 text-cyan-100',
        iconBg: 'bg-cyan-100 text-cyan-700',
        accent: 'from-cyan-600 to-sky-600',
        tagBg: 'bg-cyan-50 text-cyan-700',
    },
};

export default function NormalIklimContent({ auth, contents = [], section, title, subtitle }) {
    const colors = colorMap[section] || colorMap['normal-hujan-bulanan'];
    const HeroIcon = iconMap[section] || MapIcon;

    return (
        <div className="min-h-screen bg-white">
            <Head title={`${title} - Stasiun Klimatologi Sumatera Utara`}>
                <meta name="description" content={`Data Normal Iklim: ${title} wilayah Sumatera Utara (Periode Standard 1991-2020 atau sesuai standar BMKG).`} />
            </Head>

            <Navbar auth={auth} />

            {/* Hero Section */}
            <section className="relative overflow-hidden py-16 md:py-24">
                <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient}`} />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                    <div className={`mb-6 inline-flex items-center gap-2.5 rounded-full ${colors.badge} px-5 py-2.5 backdrop-blur-md border border-white/10`}>
                        <HeroIcon className="h-5 w-5" />
                        <span className="text-sm font-bold uppercase tracking-widest">Normal Iklim Terstandar</span>
                    </div>
                    <h1 className="mb-6 text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                        {title}
                    </h1>
                    <p className="mx-auto max-w-2xl text-xl leading-relaxed text-slate-200">
                        {subtitle}
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {contents.length === 0 ? (
                        <div className="text-center py-32 rounded-3xl bg-slate-50 border-2 border-dashed border-slate-200">
                            <div className={`mx-auto w-20 h-20 rounded-2xl ${colors.iconBg} flex items-center justify-center mb-6 shadow-xl`}>
                                <HeroIcon className="h-10 w-10" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">Data Belum Tersedia</h3>
                            <p className="text-slate-500 max-w-sm mx-auto">
                                Admin belum mengunggah data {title.toLowerCase()} untuk periode ini. Silakan hubungi kami untuk informasi lebih lanjut.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-16 lg:gap-24">
                            {contents.map((item, index) => (
                                <article
                                    key={item.id}
                                    className={`flex flex-col lg:flex-row gap-12 items-start ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
                                >
                                    {/* Visual Representation */}
                                    {item.file_url ? (
                                        <div className="w-full lg:w-3/5 group">
                                            <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-white border border-slate-100 aspect-video lg:aspect-auto">
                                                <div className={`absolute top-0 inset-x-0 h-2 bg-gradient-to-r ${colors.accent}`} />
                                                <img
                                                    src={item.file_url}
                                                    alt={item.title}
                                                    className="w-full h-full object-contain p-4 transition-transform duration-1000 group-hover:scale-105"
                                                />
                                                <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <a
                                                        href={item.file_url}
                                                        target="_blank"
                                                        className="p-3 bg-white/90 backdrop-blur rounded-xl text-slate-900 shadow-xl hover:bg-white transition-all transform hover:-translate-y-1"
                                                    >
                                                        <Download className="h-5 w-5" />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="w-full lg:w-3/5 aspect-video bg-slate-100 rounded-3xl flex items-center justify-center border-2 border-dashed border-slate-200">
                                            <MapIcon className="w-20 h-20 text-slate-300" />
                                        </div>
                                    )}

                                    {/* Information Panel */}
                                    <div className="w-full lg:w-2/5 py-4">
                                        <div className="mb-6 flex flex-wrap gap-3">
                                            {item.category && (
                                                <span className={`px-4 py-1.5 rounded-full ${colors.tagBg} text-xs font-black uppercase tracking-wider`}>
                                                    {item.category}
                                                </span>
                                            )}
                                            {item.subtitle && (
                                                <span className="px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-bold flex items-center gap-2">
                                                    <Calendar className="h-3.5 w-3.5" />
                                                    {item.subtitle}
                                                </span>
                                            )}
                                        </div>

                                        <h2 className="text-3xl font-black text-slate-900 mb-6 leading-tight">
                                            {item.title}
                                        </h2>

                                        <div className="relative p-6 rounded-2xl bg-slate-50 border border-slate-100">
                                            <div className={`absolute left-0 top-6 bottom-6 w-1.5 rounded-full bg-gradient-to-b ${colors.accent}`} />
                                            {item.description ? (
                                                <p className="pl-6 text-slate-600 leading-relaxed text-lg whitespace-pre-line">
                                                    {item.description}
                                                </p>
                                            ) : (
                                                <p className="pl-6 text-slate-400 italic">Tidak ada deskripsi tambahan untuk data ini.</p>
                                            )}
                                        </div>

                                        <div className="mt-10 flex items-center gap-4 p-4 rounded-xl bg-blue-50/50 border border-blue-100">
                                            <Info className="h-6 w-6 text-blue-600 shrink-0" />
                                            <p className="text-sm text-blue-800 font-medium">
                                                Data normal ini berbasis pada hasil pengolahan data historis minimal 30 tahun sesuai standar WMO.
                                            </p>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Knowledge Section */}
            <section className="py-20 bg-slate-900 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -mr-32 -mt-32" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl -ml-32 -mb-32" />

                <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-8">Pemanfaatan Data Normal Iklim</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-8 rounded-3xl bg-white/5 backdrop-blur border border-white/10 hover:bg-white/10 transition-all">
                            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-6 mx-auto">
                                <Calendar className="text-blue-400" />
                            </div>
                            <h3 className="font-bold mb-3">Perencanaan</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">Digunakan untuk perencanaan jangka panjang sektor pertanian dan infrastruktur.</p>
                        </div>
                        <div className="p-8 rounded-3xl bg-white/5 backdrop-blur border border-white/10 hover:bg-white/10 transition-all">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center mb-6 mx-auto">
                                <Layers className="text-emerald-400" />
                            </div>
                            <h3 className="font-bold mb-3">Analisis Anomali</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">Sebagai referensi untuk mendeteksi penyimpangan (anomali) cuaca saat ini.</p>
                        </div>
                        <div className="p-8 rounded-3xl bg-white/5 backdrop-blur border border-white/10 hover:bg-white/10 transition-all">
                            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center mb-6 mx-auto">
                                <MapIcon className="text-amber-400" />
                            </div>
                            <h3 className="font-bold mb-3">Pemetaan Risiko</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">Membantu dalam mengidentifikasi pola iklim regional yang tetap dan karakteristik wilayah.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-slate-200 bg-white py-12">
                <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                    <p className="text-sm text-slate-500 font-medium">
                        © 2026 UPT Stasiun Klimatologi BMKG Sumatera Utara. Data Normal Iklim Resmi.
                    </p>
                </div>
            </footer>
        </div>
    );
}
