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
    Calendar
} from 'lucide-react';

export default function AdminDashboard({ stats, recentApplications, applicationsByType }) {
    const statCards = [
        {
            title: 'Total Permohonan',
            value: stats.total_applications,
            icon: FileText,
            color: 'blue',
            bgColor: 'bg-blue-500/10',
            iconColor: 'text-blue-600',
            borderColor: 'border-blue-200',
        },
        {
            title: 'Menunggu Review',
            value: stats.pending_applications,
            icon: Clock,
            color: 'yellow',
            bgColor: 'bg-yellow-500/10',
            iconColor: 'text-yellow-600',
            borderColor: 'border-yellow-200',
        },
        {
            title: 'Disetujui',
            value: stats.approved_applications,
            icon: CheckCircle,
            color: 'green',
            bgColor: 'bg-green-500/10',
            iconColor: 'text-green-600',
            borderColor: 'border-green-200',
        },
        {
            title: 'Ditolak',
            value: stats.rejected_applications,
            icon: XCircle,
            color: 'red',
            bgColor: 'bg-red-500/10',
            iconColor: 'text-red-600',
            borderColor: 'border-red-200',
        },
        {
            title: 'Total User',
            value: stats.total_users,
            icon: Users,
            color: 'indigo',
            bgColor: 'bg-indigo-500/10',
            iconColor: 'text-indigo-600',
            borderColor: 'border-indigo-200',
        },
        {
            title: 'Total Berita',
            value: stats.total_news,
            icon: Newspaper,
            color: 'purple',
            bgColor: 'bg-purple-500/10',
            iconColor: 'text-purple-600',
            borderColor: 'border-purple-200',
        },
    ];

    const getStatusBadge = (status) => {
        const config = {
            pending: {
                bg: 'bg-yellow-100',
                text: 'text-yellow-700',
                label: 'Menunggu'
            },
            approved: {
                bg: 'bg-green-100',
                text: 'text-green-700',
                label: 'Disetujui'
            },
            rejected: {
                bg: 'bg-red-100',
                text: 'text-red-700',
                label: 'Ditolak'
            },
        };
        const { bg, text, label } = config[status] || config.pending;
        return (
            <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${bg} ${text}`}>
                {label}
            </span>
        );
    };

    return (
        <AuthenticatedLayout header="Admin Dashboard">
            <Head title="Admin Dashboard" />

            {/* Welcome Section */}
            <div className="mb-6 rounded-xl border border-white/40 bg-gradient-to-r from-blue-600 to-indigo-700 p-6 shadow-xl backdrop-blur-md">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-white">
                            Selamat Datang, Administrator! 👋
                        </h1>
                        <p className="mt-1 text-blue-100">
                            Kelola sistem magang dan penelitian di sini
                        </p>
                    </div>
                    <div className="rounded-lg bg-white/20 p-3 backdrop-blur-sm">
                        <TrendingUp className="h-8 w-8 text-white" />
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {statCards.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={index}
                            className={`group rounded-xl border ${stat.borderColor} bg-white/60 p-6 shadow-lg backdrop-blur-md transition-all hover:scale-105 hover:shadow-xl`}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                                    <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
                                </div>
                                <div className={`rounded-xl ${stat.bgColor} p-4 transition-transform group-hover:scale-110`}>
                                    <Icon className={`h-8 w-8 ${stat.iconColor}`} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Recent Applications */}
                <div className="rounded-xl border border-white/40 bg-white/60 p-6 shadow-lg backdrop-blur-md">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-900">Permohonan Terbaru</h2>
                        <Link
                            href={route('admin.applications.index')}
                            className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                        >
                            Lihat Semua →
                        </Link>
                    </div>

                    <div className="space-y-3">
                        {recentApplications && recentApplications.length > 0 ? (
                            recentApplications.map((app) => (
                                <div
                                    key={app.id}
                                    className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-blue-300 hover:shadow-md"
                                >
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <p className="font-semibold text-gray-900">{app.user_name}</p>
                                            <span className="text-xs text-gray-500">•</span>
                                            <span className="text-xs text-gray-500">{app.created_at}</span>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-600">{app.title}</p>
                                        <p className="mt-1 text-xs text-gray-500 capitalize">{app.application_type}</p>
                                    </div>
                                    <div>{getStatusBadge(app.status)}</div>
                                </div>
                            ))
                        ) : (
                            <div className="py-8 text-center text-gray-500">
                                <FileText className="mx-auto h-12 w-12 text-gray-300" />
                                <p className="mt-2">Belum ada permohonan</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Applications by Type */}
                <div className="rounded-xl border border-white/40 bg-white/60 p-6 shadow-lg backdrop-blur-md">
                    <h2 className="mb-4 text-xl font-bold text-gray-900">Permohonan per Jenis</h2>

                    <div className="space-y-3">
                        {applicationsByType && applicationsByType.length > 0 ? (
                            applicationsByType.map((item, index) => {
                                const percentage = stats.total_applications > 0
                                    ? (item.total / stats.total_applications) * 100
                                    : 0;

                                return (
                                    <div key={index} className="rounded-lg border border-gray-200 bg-white p-4">
                                        <div className="mb-2 flex items-center justify-between">
                                            <span className="font-semibold capitalize text-gray-900">
                                                {item.type}
                                            </span>
                                            <span className="text-sm font-bold text-gray-700">
                                                {item.total} permohonan
                                            </span>
                                        </div>
                                        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                                            <div
                                                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all"
                                                style={{ width: `${percentage}%` }}
                                            ></div>
                                        </div>
                                        <div className="mt-1 text-right text-xs text-gray-500">
                                            {percentage.toFixed(1)}%
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="py-8 text-center text-gray-500">
                                <Calendar className="mx-auto h-12 w-12 text-gray-300" />
                                <p className="mt-2">Belum ada data</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 grid gap-4 md:grid-cols-3">
                <Link
                    href={route('admin.applications.index')}
                    className="group flex items-center gap-4 rounded-xl border border-white/40 bg-white/60 p-6 shadow-lg backdrop-blur-md transition-all hover:scale-105 hover:border-blue-300 hover:shadow-xl"
                >
                    <div className="rounded-lg bg-blue-500/10 p-3">
                        <FileText className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900">Kelola Permohonan</h3>
                        <p className="text-sm text-gray-600">Review & approve aplikasi</p>
                    </div>
                </Link>

                <Link
                    href={route('admin.news.index')}
                    className="group flex items-center gap-4 rounded-xl border border-white/40 bg-white/60 p-6 shadow-lg backdrop-blur-md transition-all hover:scale-105 hover:border-purple-300 hover:shadow-xl"
                >
                    <div className="rounded-lg bg-purple-500/10 p-3">
                        <Newspaper className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900">Kelola Berita</h3>
                        <p className="text-sm text-gray-600">Posting pengumuman</p>
                    </div>
                </Link>

                <Link
                    href={route('admin.applications.index', { filter: 'pending' })}
                    className="group flex items-center gap-4 rounded-xl border border-white/40 bg-white/60 p-6 shadow-lg backdrop-blur-md transition-all hover:scale-105 hover:border-yellow-300 hover:shadow-xl"
                >
                    <div className="rounded-lg bg-yellow-500/10 p-3">
                        <Clock className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900">Pending Review</h3>
                        <p className="text-sm text-gray-600">{stats.pending_applications} permohonan menunggu</p>
                    </div>
                </Link>
            </div>
        </AuthenticatedLayout>
    );
}
