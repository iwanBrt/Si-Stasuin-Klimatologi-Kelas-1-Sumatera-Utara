import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import {
    Search,
    Filter,
    Eye,
    CheckCircle,
    XCircle,
    Clock,
    FileText,
    Calendar,
    User as UserIcon,
    Building
} from 'lucide-react';
import { useState } from 'react';

export default function ApplicationsIndex({ applications, stats, filters }) {
    const [search, setSearch] = useState(filters.search);
    const [activeFilter, setActiveFilter] = useState(filters.filter);

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.applications.index'), { search, filter: activeFilter }, {
            preserveState: true,
        });
    };

    const handleFilterChange = (newFilter) => {
        setActiveFilter(newFilter);
        router.get(route('admin.applications.index'), { search, filter: newFilter }, {
            preserveState: true,
        });
    };

    const getStatusBadge = (status) => {
        const config = {
            pending: {
                bg: 'bg-yellow-100',
                text: 'text-yellow-700',
                border: 'border-yellow-300',
                icon: Clock,
                label: 'Menunggu'
            },
            approved: {
                bg: 'bg-green-100',
                text: 'text-green-700',
                border: 'border-green-300',
                icon: CheckCircle,
                label: 'Disetujui'
            },
            rejected: {
                bg: 'bg-red-100',
                text: 'text-red-700',
                border: 'border-red-300',
                icon: XCircle,
                label: 'Ditolak'
            },
        };

        const { bg, text, border, icon: Icon, label } = config[status] || config.pending;

        return (
            <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${bg} ${text} ${border}`}>
                <Icon className="h-3.5 w-3.5" />
                {label}
            </span>
        );
    };

    return (
        <AuthenticatedLayout header="Kelola Permohonan">
            <Head title="Kelola Permohonan" />

            {/* Stats Cards */}
            <div className="mb-6 grid gap-4 md:grid-cols-4">
                <div
                    onClick={() => handleFilterChange('all')}
                    className={`cursor-pointer rounded-xl border p-5 shadow-lg backdrop-blur-md transition-all hover:scale-105 ${activeFilter === 'all'
                            ? 'border-blue-400 bg-blue-500/20'
                            : 'border-white/40 bg-white/60'
                        }`}
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total</p>
                            <p className="mt-1 text-3xl font-bold text-gray-900">{stats.total}</p>
                        </div>
                        <FileText className="h-8 w-8 text-blue-600" />
                    </div>
                </div>

                <div
                    onClick={() => handleFilterChange('pending')}
                    className={`cursor-pointer rounded-xl border p-5 shadow-lg backdrop-blur-md transition-all hover:scale-105 ${activeFilter === 'pending'
                            ? 'border-yellow-400 bg-yellow-500/20'
                            : 'border-white/40 bg-white/60'
                        }`}
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Menunggu</p>
                            <p className="mt-1 text-3xl font-bold text-yellow-600">{stats.pending}</p>
                        </div>
                        <Clock className="h-8 w-8 text-yellow-600" />
                    </div>
                </div>

                <div
                    onClick={() => handleFilterChange('approved')}
                    className={`cursor-pointer rounded-xl border p-5 shadow-lg backdrop-blur-md transition-all hover:scale-105 ${activeFilter === 'approved'
                            ? 'border-green-400 bg-green-500/20'
                            : 'border-white/40 bg-white/60'
                        }`}
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Disetujui</p>
                            <p className="mt-1 text-3xl font-bold text-green-600">{stats.approved}</p>
                        </div>
                        <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                </div>

                <div
                    onClick={() => handleFilterChange('rejected')}
                    className={`cursor-pointer rounded-xl border p-5 shadow-lg backdrop-blur-md transition-all hover:scale-105 ${activeFilter === 'rejected'
                            ? 'border-red-400 bg-red-500/20'
                            : 'border-white/40 bg-white/60'
                        }`}
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Ditolak</p>
                            <p className="mt-1 text-3xl font-bold text-red-600">{stats.rejected}</p>
                        </div>
                        <XCircle className="h-8 w-8 text-red-600" />
                    </div>
                </div>
            </div>

            {/* Search & Filter Bar */}
            <div className="mb-6 rounded-xl border border-white/40 bg-white/60 p-4 shadow-lg backdrop-blur-md">
                <form onSubmit={handleSearch} className="flex gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Cari nama pemohon atau judul permohonan..."
                            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        />
                    </div>
                    <button
                        type="submit"
                        className="rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white transition-colors hover:bg-blue-700"
                    >
                        Cari
                    </button>
                </form>
            </div>

            {/* Applications Table */}
            <div className="rounded-xl border border-white/40 bg-white/60 shadow-lg backdrop-blur-md">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="border-b border-gray-200 bg-gray-50/50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                                    Pemohon
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                                    Permohonan
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                                    Jenis
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                                    Periode
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {applications.data.length > 0 ? (
                                applications.data.map((app) => (
                                    <tr key={app.id} className="transition-colors hover:bg-blue-50/50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                                                    <UserIcon className="h-5 w-5 text-blue-600" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900">{app.user_name}</p>
                                                    <p className="text-sm text-gray-500">{app.user_email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="font-medium text-gray-900">{app.title}</p>
                                            <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                                                <Building className="h-4 w-4" />
                                                {app.institution_name}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium capitalize text-gray-700">
                                                {app.application_type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-sm text-gray-700">
                                                <Calendar className="h-4 w-4" />
                                                <span>{app.start_date} - {app.end_date}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {getStatusBadge(app.status)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <Link
                                                href={route('admin.applications.show', app.id)}
                                                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                                            >
                                                <Eye className="h-4 w-4" />
                                                Detail
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="py-12 text-center">
                                        <FileText className="mx-auto h-12 w-12 text-gray-300" />
                                        <p className="mt-2 text-gray-500">Tidak ada permohonan ditemukan</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {applications.links.length > 3 && (
                    <div className="border-t border-gray-200 px-6 py-4">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-700">
                                Menampilkan <span className="font-semibold">{applications.from}</span> sampai{' '}
                                <span className="font-semibold">{applications.to}</span> dari{' '}
                                <span className="font-semibold">{applications.total}</span> permohonan
                            </p>
                            <div className="flex gap-2">
                                {applications.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url || '#'}
                                        className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${link.active
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-white text-gray-700 hover:bg-gray-100'
                                            } ${!link.url ? 'cursor-not-allowed opacity-50' : ''}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
