import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { FileText, Bell, TrendingUp, Image, Users, Calendar } from 'lucide-react';

export default function MediaDashboard({ stats, recentNews }) {
    const statCards = [
        {
            title: 'Total Berita',
            value: stats.total_news || 0,
            icon: Bell,
            color: 'text-blue-600',
            bg: 'bg-blue-100',
            border: 'border-blue-200',
            link: route('admin.news.index'),
        },
        {
            title: 'Berita Terbit',
            value: stats.published_news || 0,
            icon: TrendingUp,
            color: 'text-green-600',
            bg: 'bg-green-100',
            border: 'border-green-200',
            link: route('admin.news.index'),
        },
        {
            title: 'Draft Berita',
            value: stats.draft_news || 0,
            icon: FileText,
            color: 'text-yellow-600',
            bg: 'bg-yellow-100',
            border: 'border-yellow-200',
            link: route('admin.news.index'),
        },
        {
            title: 'Total Konten',
            value: stats.total_contents || 0,
            icon: Image,
            color: 'text-purple-600',
            bg: 'bg-purple-100',
            border: 'border-purple-200',
            link: route('admin.contents.index'),
        },
    ];

    const getStatusBadge = (status) => {
        const config = {
            'published': { bg: 'bg-green-100', text: 'text-green-700', label: 'Terbit' },
            'draft': { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Draft' },
        };
        const statusConfig = config[status] || config['draft'];
        return (
            <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusConfig.bg} ${statusConfig.text}`}>
                {statusConfig.label}
            </span>
        );
    };

    return (
        <AuthenticatedLayout header="Dashboard Media">
            <Head title="Dashboard Media" />

            {/* Welcome Banner */}
            <div className="mb-6 rounded-xl bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-800 p-6 shadow-2xl">
                <div className="flex items-center gap-4">
                    <div className="rounded-full bg-white/20 p-3">
                        <Bell className="h-8 w-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Selamat Datang, Tim Media!</h1>
                        <p className="text-purple-100">Kelola berita dan konten website dari sini</p>
                    </div>
                </div>
            </div>

            {/* Stats Cards Grid */}
            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {statCards.map((stat, i) => (
                    <Link
                        key={i}
                        href={stat.link}
                        className={`group block rounded-xl border ${stat.border} bg-white p-6 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl`}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                                <p className="mt-2 text-4xl font-bold text-gray-900">{stat.value}</p>
                            </div>
                            <div className={`rounded-lg ${stat.bg} p-3 transition-transform group-hover:scale-110`}>
                                <stat.icon className={`h-6 w-6 ${stat.color}`} />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Quick Actions Grid */}
            <div className="mb-6 grid gap-6 md:grid-cols-2">
                {/* Kelola Berita */}
                <Link
                    href={route('admin.news.index')}
                    className="group rounded-xl border border-white/40 bg-gradient-to-br from-blue-500 to-blue-600 p-6 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                    <div className="flex items-center gap-4">
                        <div className="rounded-lg bg-white/20 p-3">
                            <Bell className="h-8 w-8 text-white" />
                        </div>
                        <div className="flex-1 text-white">
                            <h3 className="text-xl font-bold">Kelola Berita</h3>
                            <p className="mt-1 text-sm text-blue-100">
                                Buat, edit, dan terbitkan berita terbaru
                            </p>
                        </div>
                    </div>
                </Link>

                {/* Manajemen Konten */}
                <Link
                    href={route('admin.contents.index')}
                    className="group rounded-xl border border-white/40 bg-gradient-to-br from-purple-500 to-purple-600 p-6 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                    <div className="flex items-center gap-4">
                        <div className="rounded-lg bg-white/20 p-3">
                            <FileText className="h-8 w-8 text-white" />
                        </div>
                        <div className="flex-1 text-white">
                            <h3 className="text-xl font-bold">Manajemen Konten</h3>
                            <p className="mt-1 text-sm text-purple-100">
                                Kelola konten Tim Kami, Peta, dan lainnya
                            </p>
                        </div>
                    </div>
                </Link>
            </div>

            {/* Recent News */}
            <div className="rounded-xl bg-white p-6 shadow-lg">
                <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Berita Terbaru</h2>
                        <p className="mt-1 text-sm text-gray-600">5 berita terakhir yang dibuat</p>
                    </div>
                    <Link
                        href={route('admin.news.index')}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                    >
                        Lihat Semua
                    </Link>
                </div>

                {recentNews && recentNews.length > 0 ? (
                    <div className="space-y-3">
                        {recentNews.map((news) => (
                            <div
                                key={news.id}
                                className="rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-blue-300 hover:shadow-md"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3">
                                            <h3 className="font-semibold text-gray-900">{news.title}</h3>
                                            {getStatusBadge(news.status)}
                                        </div>
                                        <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
                                            <div className="flex items-center gap-1">
                                                <Users className="h-4 w-4" />
                                                <span>{news.author}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-4 w-4" />
                                                <span>{news.published_at}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <Link
                                        href={route('admin.news.edit', news.id)}
                                        className="ml-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                                    >
                                        Edit
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-12 text-center">
                        <Bell className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-4 text-gray-600">Belum ada berita</p>
                        <Link
                            href={route('admin.news.create')}
                            className="mt-4 inline-block rounded-lg bg-blue-600 px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                        >
                            Buat Berita Baru
                        </Link>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
