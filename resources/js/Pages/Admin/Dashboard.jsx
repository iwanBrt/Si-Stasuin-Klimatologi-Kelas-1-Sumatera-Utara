import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import {
    FileText,
    Users,
    CheckCircle,
    Clock,
    XCircle,
    Newspaper,
    TrendingUp,
    ChevronLeft,
    ChevronRight,
    MapPin
} from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';
import { useState } from 'react';

export default function AdminDashboard({ stats, recentApplications, chartData, calendarEvents }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    // --- Calendar Logic ---
    const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const handleDateClick = (day) => {
        const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const clickedDate = new Date(dateStr);
        setSelectedDate(clickedDate);

        // Find events
        const events = calendarEvents.filter(e => e.date === dateStr);
        if (events.length > 0) {
            alert(`Kegiatan pada ${dateStr}:\n${events.map(e => `- ${e.title} (${e.desc})`).join('\n')}`);
        }
    };

    const renderCalendarDays = () => {
        const days = [];
        // Empty slots for previous month
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="h-8 w-8"></div>);
        }
        // Days
        for (let i = 1; i <= daysInMonth; i++) {
            const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            const hasEvent = calendarEvents.some(e => e.date === dateStr);
            const isSelected = selectedDate.getDate() === i && selectedDate.getMonth() === currentDate.getMonth() && selectedDate.getFullYear() === currentDate.getFullYear();
            const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), i).toDateString();

            days.push(
                <div key={i} className="flex justify-center items-center mb-1">
                    <button
                        onClick={() => handleDateClick(i)}
                        className={`relative flex h-8 w-8 items-center justify-center rounded-full text-sm transition-all
                            ${isSelected ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-blue-100 text-gray-700'}
                            ${isToday && !isSelected ? 'border border-blue-500 font-bold text-blue-600' : ''}
                        `}
                    >
                        {i}
                        {hasEvent && (
                            <span className="absolute bottom-0.5 h-1 w-1 rounded-full bg-red-500"></span>
                        )}
                    </button>
                </div>
            );
        }
        return days;
    };

    const statCards = [
        {
            title: 'Total Permohonan',
            value: stats.total_applications,
            icon: FileText,
            color: 'text-blue-600',
            bg: 'bg-blue-100',
            border: 'border-blue-200',
            href: route('admin.applications.index')
        },
        {
            title: 'Menunggu Review',
            value: stats.pending_applications,
            icon: Clock,
            color: 'text-yellow-600',
            bg: 'bg-yellow-100',
            border: 'border-yellow-200',
            href: route('admin.applications.index', { filter: 'pending' })
        },
        {
            title: 'Disetujui',
            value: stats.approved_applications,
            icon: CheckCircle,
            color: 'text-green-600',
            bg: 'bg-green-100',
            border: 'border-green-200',
            href: route('admin.applications.index', { filter: 'approved' })
        },
        {
            title: 'Total User',
            value: stats.total_users,
            icon: Users,
            color: 'text-indigo-600',
            bg: 'bg-indigo-100',
            border: 'border-indigo-200',
            href: route('admin.users.index')
        },
    ];

    return (
        <AuthenticatedLayout header="Admin Dashboard">
            <Head title="Admin Dashboard" />

            {/* Top Stats */}
            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {statCards.map((stat, i) => (
                    <Link
                        key={i}
                        href={stat.href}
                        className={`block rounded-xl border ${stat.border} bg-white p-5 shadow-sm transition-transform hover:scale-105 hover:shadow-md cursor-pointer`}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                                <p className="mt-1 text-2xl font-bold text-gray-900">{stat.value}</p>
                            </div>
                            <div className={`rounded-lg ${stat.bg} p-3`}>
                                <stat.icon className={`h-6 w-6 ${stat.color}`} />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Main Content (Chart & Table) */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Chart Section */}
                    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-md">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-gray-800">Grafik Permohonan</h2>
                            <div className="flex gap-2">
                                <span className="flex items-center text-xs text-gray-500"><div className="w-2 h-2 rounded-full bg-blue-500 mr-1"></div> PKL</span>
                                <span className="flex items-center text-xs text-gray-500"><div className="w-2 h-2 rounded-full bg-purple-500 mr-1"></div> Magang</span>
                            </div>
                        </div>
                        <div className="h-72 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorPkl" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorMagang" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                        itemStyle={{ fontSize: '12px' }}
                                    />
                                    <Area type="monotone" dataKey="pkl" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorPkl)" name="PKL" />
                                    <Area type="monotone" dataKey="magang" stroke="#8B5CF6" strokeWidth={3} fillOpacity={1} fill="url(#colorMagang)" name="Magang" />
                                    <Area type="monotone" dataKey="data" stroke="#F59E0B" strokeWidth={3} fillOpacity={0} fill="transparent" name="Data" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Recent Applications Table */}
                    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-md">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-gray-800">Permohonan Terbaru</h2>
                            <Link href={route('admin.applications.index')} className="text-sm font-semibold text-blue-600 hover:text-blue-700">View All</Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-100 bg-gray-50/50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        <th className="px-4 py-3">User</th>
                                        <th className="px-4 py-3">Type</th>
                                        <th className="px-4 py-3">Date</th>
                                        <th className="px-4 py-3">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {recentApplications.map((app) => (
                                        <tr key={app.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
                                                        {app.user_name.charAt(0)}
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-900">{app.user_name}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-600 capitalize">{app.application_type}</td>
                                            <td className="px-4 py-3 text-sm text-gray-500">{app.created_at}</td>
                                            <td className="px-4 py-3">
                                                <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold
                                                    ${app.status === 'approved' ? 'bg-green-100 text-green-700' :
                                                        app.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}
                                                `}>
                                                    {app.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar (Calendar & Quick Info) */}
                <div className="space-y-6">
                    {/* Calendar Widget */}
                    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-md">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="font-bold text-gray-800">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
                            <div className="flex gap-1">
                                <button onClick={handlePrevMonth} className="rounded-lg p-1 hover:bg-gray-100"><ChevronLeft className="h-4 w-4" /></button>
                                <button onClick={handleNextMonth} className="rounded-lg p-1 hover:bg-gray-100"><ChevronRight className="h-4 w-4" /></button>
                            </div>
                        </div>

                        <div className="mb-2 grid grid-cols-7 text-center text-xs font-semibold text-gray-400">
                            <div>Li</div><div>Se</div><div>Se</div><div>Ra</div><div>Ka</div><div>Ju</div><div>Sa</div>
                        </div>
                        <div className="grid grid-cols-7 gap-1">
                            {renderCalendarDays()}
                        </div>

                        {/* Selected Date Info (Mini) */}
                        <div className="mt-6 border-t border-gray-100 pt-4">
                            <h3 className="text-sm font-semibold text-gray-700 mb-3">
                                {selectedDate.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })}
                            </h3>
                            <div className="space-y-3">
                                {calendarEvents.filter(e => e.date === `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`).map((e, idx) => (
                                    <div key={idx} className="flex items-start gap-3 rounded-lg border border-gray-100 bg-gray-50 p-2 text-xs">
                                        <div className={`mt-0.5 h-2 w-2 rounded-full ${e.type === 'pkl' ? 'bg-blue-500' : 'bg-purple-500'}`}></div>
                                        <div>
                                            <p className="font-semibold text-gray-800">{e.title}</p>
                                            <p className="text-gray-500 line-clamp-1">{e.status}</p>
                                        </div>
                                    </div>
                                ))}
                                {calendarEvents.filter(e => e.date === `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`).length === 0 && (
                                    <p className="text-xs text-gray-400 italic">Tidak ada kegiatan.</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats or Observations */}
                    <div className="rounded-xl bg-gradient-to-br from-indigo-600 to-purple-700 p-6 text-white shadow-lg">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                                <TrendingUp className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <p className="text-sm text-indigo-100">Performance</p>
                                <p className="text-xl font-bold">Excellent</p>
                            </div>
                        </div>
                        <p className="text-sm text-indigo-100 leading-relaxed opacity-90">
                            Sistem berjalan lancar. Total {stats.total_applications} permohonan telah diproses bulan ini.
                        </p>
                    </div>

                    {/* Top Locations/Users (Placeholder for Observations) */}
                    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-md">
                        <h2 className="mb-4 text-sm font-bold text-gray-800 uppercase tracking-wider">Status</h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-green-100 rounded-lg text-green-600"><CheckCircle className="h-4 w-4" /></div>
                                    <span className="text-sm font-medium text-gray-600">Terverifikasi</span>
                                </div>
                                <span className="font-bold text-gray-800">{stats.approved_applications}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-yellow-100 rounded-lg text-yellow-600"><Clock className="h-4 w-4" /></div>
                                    <span className="text-sm font-medium text-gray-600">Pending</span>
                                </div>
                                <span className="font-bold text-gray-800">{stats.pending_applications}</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
