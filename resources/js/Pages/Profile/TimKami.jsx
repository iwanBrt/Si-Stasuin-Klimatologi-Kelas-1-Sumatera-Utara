import { Head, Link } from '@inertiajs/react';
import { Users, User } from 'lucide-react';
import Navbar from '@/Components/Navbar';

export default function TimKami({ auth, dbTeams }) {
    // Default fallback
    const defaultTeams = [
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

    const teams = (dbTeams && dbTeams.length > 0) ? dbTeams : defaultTeams;

    return (
        <div className="min-h-screen bg-white">
            <Head title="Tim Kami - BMKG" />

            <Navbar auth={auth} />

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
