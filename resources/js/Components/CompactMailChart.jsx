import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Archive, ArrowRight } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function CompactMailChart({ data, stats }) {
    // Custom tooltip
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-xl">
                    <p className="mb-2 text-sm font-semibold text-gray-900">{label}</p>
                    <div className="space-y-1">
                        <p className="flex items-center gap-2 text-xs">
                            <span className="h-2 w-2 rounded-full bg-green-500"></span>
                            <span className="text-gray-600">Masuk:</span>
                            <span className="font-bold text-green-600">{payload[0].value}</span>
                        </p>
                        <p className="flex items-center gap-2 text-xs">
                            <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                            <span className="text-gray-600">Keluar:</span>
                            <span className="font-bold text-blue-600">{payload[1].value}</span>
                        </p>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="rounded-xl border border-white/40 bg-white/60 shadow-lg backdrop-blur-md">
            {/* Header */}
            <div className="border-b border-gray-200 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600">
                            <Archive className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Statistik Arsip Surat</h3>
                            <p className="text-xs text-gray-600">6 bulan terakhir</p>
                        </div>
                    </div>
                    <Link
                        href={route('admin.archives.index')}
                        className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:from-purple-700 hover:to-indigo-700 hover:shadow-lg"
                    >
                        Cek Arsip
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-3 p-4">
                <div className="rounded-lg bg-green-50 p-3 text-center">
                    <div className="text-2xl font-bold text-green-600">{stats.incoming}</div>
                    <div className="mt-1 text-xs font-medium text-gray-600">Surat Masuk</div>
                </div>
                <div className="rounded-lg bg-blue-50 p-3 text-center">
                    <div className="text-2xl font-bold text-blue-600">{stats.outgoing}</div>
                    <div className="mt-1 text-xs font-medium text-gray-600">Surat Keluar</div>
                </div>
                <div className="rounded-lg bg-gray-50 p-3 text-center">
                    <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                    <div className="mt-1 text-xs font-medium text-gray-600">Total Arsip</div>
                </div>
            </div>

            {/* Compact Chart */}
            <div className="px-4 pb-4" style={{ minHeight: '220px' }}>
                <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis
                            dataKey="month"
                            stroke="#6b7280"
                            style={{ fontSize: '11px', fontWeight: '500' }}
                        />
                        <YAxis
                            stroke="#6b7280"
                            style={{ fontSize: '11px', fontWeight: '500' }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar
                            dataKey="incoming"
                            name="Surat Masuk"
                            fill="#10b981"
                            radius={[6, 6, 0, 0]}
                        />
                        <Bar
                            dataKey="outgoing"
                            name="Surat Keluar"
                            fill="#3b82f6"
                            radius={[6, 6, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
