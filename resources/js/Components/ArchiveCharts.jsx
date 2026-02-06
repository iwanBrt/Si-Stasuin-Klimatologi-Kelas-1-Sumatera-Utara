import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, BarChart3 } from 'lucide-react';
import { useState } from 'react';

export default function ArchiveCharts({ data }) {
    const [chartType, setChartType] = useState('bar'); // 'bar' or 'line'

    // Custom tooltip
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-xl">
                    <p className="mb-2 font-semibold text-gray-900">{label}</p>
                    <div className="space-y-1">
                        <p className="flex items-center gap-2 text-sm">
                            <span className="h-3 w-3 rounded-full bg-green-500"></span>
                            <span className="text-gray-600">Surat Masuk:</span>
                            <span className="font-bold text-green-600">{payload[0].value}</span>
                        </p>
                        <p className="flex items-center gap-2 text-sm">
                            <span className="h-3 w-3 rounded-full bg-blue-500"></span>
                            <span className="text-gray-600">Surat Keluar:</span>
                            <span className="font-bold text-blue-600">{payload[1].value}</span>
                        </p>
                        <div className="mt-2 border-t border-gray-200 pt-2">
                            <p className="text-sm">
                                <span className="text-gray-600">Total:</span>
                                <span className="ml-2 font-bold text-gray-900">{payload[0].value + payload[1].value}</span>
                            </p>
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="rounded-xl border border-white/40 bg-white/60 p-6 shadow-lg backdrop-blur-md">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h3 className="text-xl font-bold text-gray-900">Statistik Arsip Surat</h3>
                    <p className="mt-1 text-sm text-gray-600">Grafik surat masuk dan keluar 6 bulan terakhir</p>
                </div>

                {/* Chart Type Toggle */}
                <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white p-1">
                    <button
                        onClick={() => setChartType('bar')}
                        className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition-all ${chartType === 'bar'
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        <BarChart3 className="h-4 w-4" />
                        Bar
                    </button>
                    <button
                        onClick={() => setChartType('line')}
                        className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition-all ${chartType === 'line'
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        <TrendingUp className="h-4 w-4" />
                        Line
                    </button>
                </div>
            </div>

            {/* Chart */}
            <div className="mt-6">
                <ResponsiveContainer width="100%" height={350}>
                    {chartType === 'bar' ? (
                        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis
                                dataKey="month"
                                stroke="#6b7280"
                                style={{ fontSize: '12px', fontWeight: '500' }}
                            />
                            <YAxis
                                stroke="#6b7280"
                                style={{ fontSize: '12px', fontWeight: '500' }}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend
                                wrapperStyle={{ paddingTop: '20px' }}
                                iconType="circle"
                            />
                            <Bar
                                dataKey="incoming"
                                name="Surat Masuk"
                                fill="#10b981"
                                radius={[8, 8, 0, 0]}
                                animationDuration={1000}
                            />
                            <Bar
                                dataKey="outgoing"
                                name="Surat Keluar"
                                fill="#3b82f6"
                                radius={[8, 8, 0, 0]}
                                animationDuration={1000}
                            />
                        </BarChart>
                    ) : (
                        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis
                                dataKey="month"
                                stroke="#6b7280"
                                style={{ fontSize: '12px', fontWeight: '500' }}
                            />
                            <YAxis
                                stroke="#6b7280"
                                style={{ fontSize: '12px', fontWeight: '500' }}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend
                                wrapperStyle={{ paddingTop: '20px' }}
                                iconType="circle"
                            />
                            <Line
                                type="monotone"
                                dataKey="incoming"
                                name="Surat Masuk"
                                stroke="#10b981"
                                strokeWidth={3}
                                dot={{ fill: '#10b981', r: 5 }}
                                activeDot={{ r: 7 }}
                                animationDuration={1000}
                            />
                            <Line
                                type="monotone"
                                dataKey="outgoing"
                                name="Surat Keluar"
                                stroke="#3b82f6"
                                strokeWidth={3}
                                dot={{ fill: '#3b82f6', r: 5 }}
                                activeDot={{ r: 7 }}
                                animationDuration={1000}
                            />
                        </LineChart>
                    )}
                </ResponsiveContainer>
            </div>

            {/* Summary Stats */}
            <div className="mt-6 grid grid-cols-3 gap-4 border-t border-gray-200 pt-6">
                <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                        {data.reduce((sum, item) => sum + item.incoming, 0)}
                    </div>
                    <div className="mt-1 text-xs font-medium text-gray-600">Total Surat Masuk</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                        {data.reduce((sum, item) => sum + item.outgoing, 0)}
                    </div>
                    <div className="mt-1 text-xs font-medium text-gray-600">Total Surat Keluar</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                        {data.reduce((sum, item) => sum + item.total, 0)}
                    </div>
                    <div className="mt-1 text-xs font-medium text-gray-600">Total Semua Surat</div>
                </div>
            </div>
        </div>
    );
}
