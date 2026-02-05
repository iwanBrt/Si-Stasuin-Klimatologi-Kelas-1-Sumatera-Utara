import { Head, Link } from '@inertiajs/react';
import { ChevronDown, Users, User } from 'lucide-react';

export default function TimKami() {
    // Placeholder data - replace with actual team data
    const teams = [
        {
            division: 'Pimpinan',
            members: [
                { name: 'Dr. Nama Kepala', role: 'Kepala Stasiun Klimatologi', image: null }
            ]
        },
        {
            division: 'Kelompok Data & Informasi',
            members: [
                { name: 'Nama Koordinator', role: 'Koordinator Bidang Data & Informasi', image: null },
                { name: 'Staff Ahli 1', role: 'Forecaster', image: null },
                { name: 'Staff Ahli 2', role: 'Analist', image: null },
            ]
        },
        {
            division: 'Kelompok Observasi',
            members: [
                { name: 'Nama Koordinator', role: 'Koordinator Bidang Observasi', image: null },
                { name: 'Staff Observer 1', role: 'Observer', image: null },
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            <Head title="Tim Kami - BMKG" />

            <nav className="border-b border-blue-100 bg-white/80 backdrop-blur-md relative z-50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-20 items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Link href="/">
                                <img src="/assets/logo-bmkg.png" alt="Logo" className="h-12 w-12" />
                            </Link>
                            <div>
                                <h1 className="text-sm md:text-lg font-bold text-gray-900 uppercase tracking-wide">Stasiun Klimatologi Sumatera Utara</h1>
                                <p className="text-[10px] md:text-xs text-blue-600 font-medium">Badan Meteorologi Klimatologi dan Geofisika</p>
                            </div>
                        </div>
                        <div className="hidden md:flex items-center gap-8">
                            <div className="relative group">
                                <button className="flex items-center gap-1.5 text-sm font-semibold text-blue-600">
                                    Profil BMKG
                                    <ChevronDown className="h-4 w-4" />
                                </button>
                                <div className="absolute top-full left-0 mt-1 w-64 rounded-xl bg-white shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                    <div className="p-2 flex flex-col gap-1">
                                        <Link href={route('profile.tentang-kami')} className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg">
                                            Tentang Kami
                                        </Link>
                                        <Link href={route('profile.sejarah-visi-misi')} className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg">
                                            Sejarah, Visi & Misi
                                        </Link>
                                        <Link href={route('profile.staklim-sumut')} className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg">
                                            Profil Staklim Sumut
                                        </Link>
                                        <Link href={route('profile.tim-kami')} className="block px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg">
                                            Tim Kami
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <Link href={route('layanan')} className="text-sm font-semibold text-gray-700 hover:text-blue-600">Layanan</Link>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link href="/" className="text-sm font-bold text-gray-600 hover:text-blue-600">Kembali ke Beranda</Link>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Tim Kami</h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Dedikasi profesional untuk memberikan pelayanan informasi Meteorologi, Klimatologi, dan Geofisika terbaik.
                        </p>
                    </div>

                    <div className="space-y-12">
                        {teams.map((division, idx) => (
                            <div key={idx} className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-blue-100">
                                <h3 className="text-2xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-100 flex items-center">
                                    <Users className="w-6 h-6 mr-3 text-blue-600" />
                                    {division.division}
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {division.members.map((member, mIdx) => (
                                        <div key={mIdx} className="group text-center p-6 rounded-2xl bg-gray-50 hover:bg-blue-50 transition-colors duration-300">
                                            <div className="w-24 h-24 mx-auto mb-4 bg-white rounded-full shadow-md flex items-center justify-center border-2 border-blue-100 group-hover:border-blue-300 transition-colors">
                                                {member.image ? (
                                                    <img src={member.image} alt={member.name} className="w-full h-full rounded-full object-cover" />
                                                ) : (
                                                    <User className="w-10 h-10 text-gray-400 group-hover:text-blue-500" />
                                                )}
                                            </div>
                                            <h4 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h4>
                                            <p className="text-sm text-gray-600 group-hover:text-blue-600">{member.role}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
