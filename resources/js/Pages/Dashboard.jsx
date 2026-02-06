import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { FileText, CheckCircle, Clock, XCircle, X, Eye, Download, HelpCircle, Users, Mail } from 'lucide-react';
import { useState } from 'react';
import Modal from '@/Components/Modal';

export default function Dashboard({ stats = {}, applications = [] }) {
    // Default values for stats
    const safeStats = {
        total: stats?.total || 0,
        approved: stats?.approved || 0,
        pending: stats?.pending || 0,
        rejected: stats?.rejected || 0,
    };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [modalTitle, setModalTitle] = useState('');

    const handleCardClick = (filter, title) => {
        setSelectedFilter(filter);
        setModalTitle(title);
        setIsModalOpen(true);
    };

    // Filter applications based on selected status
    const getFilteredApplications = () => {
        const safeApplications = Array.isArray(applications) ? applications : [];
        if (selectedFilter === 'all') return safeApplications;
        if (selectedFilter === 'approved') return safeApplications.filter(app => app.status === 'approved');
        if (selectedFilter === 'pending') return safeApplications.filter(app => ['pending', 'submitted', 'reviewing'].includes(app.status));
        if (selectedFilter === 'rejected') return safeApplications.filter(app => app.status === 'rejected');
        return safeApplications;
    };

    const filteredApplications = getFilteredApplications();

    const statCards = [
        {
            title: 'Total Permohonan',
            value: safeStats.total,
            icon: FileText,
            color: 'text-blue-600',
            bg: 'bg-blue-100',
            border: 'border-blue-200',
            gradient: 'from-blue-500 to-blue-600',
            filter: 'all',
        },
        {
            title: 'Disetujui',
            value: safeStats.approved,
            icon: CheckCircle,
            color: 'text-green-600',
            bg: 'bg-green-100',
            border: 'border-green-200',
            gradient: 'from-green-500 to-green-600',
            filter: 'approved',
        },
        {
            title: 'Menunggu',
            value: safeStats.pending,
            icon: Clock,
            color: 'text-yellow-600',
            bg: 'bg-yellow-100',
            border: 'border-yellow-200',
            gradient: 'from-yellow-500 to-yellow-600',
            filter: 'pending',
        },
        {
            title: 'Ditolak',
            value: safeStats.rejected,
            icon: XCircle,
            color: 'text-red-600',
            bg: 'bg-red-100',
            border: 'border-red-200',
            gradient: 'from-red-500 to-red-600',
            filter: 'rejected',
        },
    ];

    const getStatusBadge = (status) => {
        const statusConfig = {
            'approved': { bg: 'bg-green-100', text: 'text-green-700', label: 'Disetujui' },
            'pending': { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Menunggu' },
            'submitted': { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Terkirim' },
            'reviewing': { bg: 'bg-purple-100', text: 'text-purple-700', label: 'Direview' },
            'rejected': { bg: 'bg-red-100', text: 'text-red-700', label: 'Ditolak' },
        };

        const config = statusConfig[status] || statusConfig['pending'];
        return (
            <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${config.bg} ${config.text}`}>
                {config.label}
            </span>
        );
    };

    // Support documents
    const supportDocuments = [
        {
            title: 'Form Permohonan Data',
            filename: 'Form_Permohonan_Data.docx',
            url: '/documents/Form_Permohonan_Data.docx',
            icon: 'DOC',
        },
        {
            title: 'Surat Pernyataan',
            filename: 'Surat_Pernyataan.docx',
            url: '/documents/Surat_Pernyataan.docx',
            icon: 'DOC',
        },
        {
            title: 'Template Surat Pengantar',
            filename: 'Template_Surat_Pengantar.docx',
            url: '/documents/Template_Surat_Pengantar.docx',
            icon: 'DOC',
        },
    ];

    return (
        <AuthenticatedLayout header="Dashboard">
            <Head title="Dashboard" />

            {/* Stats Cards Grid */}
            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {statCards.map((stat, i) => (
                    <button
                        key={i}
                        onClick={() => handleCardClick(stat.filter, stat.title)}
                        className={`group block rounded-xl border ${stat.border} bg-white p-6 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer text-left`}
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

                        {/* Hover indicator */}
                        <div className="mt-4 flex items-center gap-2 text-xs font-semibold opacity-0 transition-opacity group-hover:opacity-100">
                            <Eye className="h-3 w-3" />
                            <span className={stat.color}>Lihat Detail</span>
                        </div>
                    </button>
                ))}
            </div>

            {/* Quick Actions & Documents Grid */}
            <div className="mb-6 grid gap-6 md:grid-cols-2">
                {/* Buat Permohonan Baru */}
                <Link
                    href={route('applicant.create')}
                    className="group rounded-xl border border-white/40 bg-gradient-to-br from-blue-500 to-blue-600 p-6 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                    <div className="flex items-center gap-4">
                        <div className="rounded-lg bg-white/20 p-3">
                            <FileText className="h-8 w-8 text-white" />
                        </div>
                        <div className="flex-1 text-white">
                            <h3 className="text-xl font-bold">Buat Permohonan Baru</h3>
                            <p className="mt-1 text-sm text-blue-100">
                                PKL, Magang, Riset, Kunjungan, atau Permohonan Data
                            </p>
                        </div>
                    </div>
                </Link>

                {/* Dokumen Pendukung */}
                <div className="rounded-xl border border-white/40 bg-white/60 p-6 shadow-lg backdrop-blur-md">
                    <div className="mb-4 flex items-center gap-3">
                        <div className="rounded-lg bg-indigo-100 p-2">
                            <FileText className="h-6 w-6 text-indigo-600" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Dokumen Pendukung</h3>
                    </div>
                    <div className="space-y-2">
                        {supportDocuments.map((doc, i) => (
                            <a
                                key={i}
                                href={doc.url}
                                download={doc.filename}
                                className="flex items-center gap-3 rounded-lg border border-blue-100 bg-blue-50/50 p-3 transition-all hover:border-blue-300 hover:bg-blue-100/50"
                            >
                                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-500 text-xs font-bold text-white">
                                    {doc.icon}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900">{doc.title}</p>
                                    <p className="text-xs text-gray-500">{doc.filename}</p>
                                </div>
                                <Download className="h-4 w-4 text-blue-600" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Info Cards Grid */}
            <div className="grid gap-6 md:grid-cols-3">
                {/* Status Permohonan */}
                <button
                    onClick={() => handleCardClick('pending', 'Permohonan Menunggu')}
                    className="group rounded-xl border border-white/40 bg-white/60 p-6 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-xl text-left"
                >
                    <div className="flex items-center gap-4">
                        <div className="rounded-lg bg-yellow-100 p-3">
                            <Clock className="h-6 w-6 text-yellow-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Status Permohonan</h3>
                            <p className="text-sm text-gray-600">Cek status permohonan Anda</p>
                        </div>
                    </div>
                </button>

                {/* Panduan Pengguna */}
                <div className="rounded-xl border border-white/40 bg-white/60 p-6 shadow-lg backdrop-blur-md">
                    <div className="flex items-center gap-4">
                        <div className="rounded-lg bg-purple-100 p-3">
                            <HelpCircle className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Panduan</h3>
                            <p className="text-sm text-gray-600">Cara mengajukan permohonan</p>
                            <a href="#" className="mt-1 text-xs text-blue-600 hover:underline">
                                Lihat Panduan
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bantuan */}
                <div className="rounded-xl border border-white/40 bg-white/60 p-6 shadow-lg backdrop-blur-md">
                    <div className="flex items-center gap-4">
                        <div className="rounded-lg bg-green-100 p-3">
                            <Mail className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Butuh Bantuan?</h3>
                            <p className="text-sm text-gray-600">Hubungi kami</p>
                            <a href="mailto:staklimbelawan@gmail.com" className="mt-1 text-xs text-blue-600 hover:underline">
                                staklimbelawan@gmail.com
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for Applications List */}
            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)} maxWidth="4xl">
                <div className="p-6">
                    {/* Modal Header */}
                    <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-4">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">{modalTitle}</h2>
                            <p className="mt-1 text-sm text-gray-600">
                                Total: {filteredApplications.length} permohonan
                            </p>
                        </div>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Applications Table */}
                    <div className="max-h-[500px] overflow-y-auto">
                        {filteredApplications.length === 0 ? (
                            <div className="py-12 text-center">
                                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                                <p className="mt-4 text-gray-600">Tidak ada permohonan</p>
                                <Link
                                    href={route('applicant.create')}
                                    className="mt-4 inline-block rounded-lg bg-blue-600 px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                                >
                                    Buat Permohonan Baru
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {filteredApplications.map((app) => (
                                    <div
                                        key={app.id}
                                        className="rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-blue-300 hover:shadow-md"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3">
                                                    <h3 className="font-semibold text-gray-900">{app.title}</h3>
                                                    {getStatusBadge(app.status)}
                                                </div>
                                                <div className="mt-2 grid grid-cols-2 gap-2 text-sm text-gray-600">
                                                    <div>
                                                        <span className="font-medium">Tipe:</span>{' '}
                                                        <span className="capitalize">{app.application_type}</span>
                                                    </div>
                                                    <div>
                                                        <span className="font-medium">Kategori:</span>{' '}
                                                        <span className="capitalize">{app.applicant_type || '-'}</span>
                                                    </div>
                                                    <div>
                                                        <span className="font-medium">Dibuat:</span> {app.created_at}
                                                    </div>
                                                    <div>
                                                        <span className="font-medium">Diupdate:</span> {app.updated_at}
                                                    </div>
                                                </div>
                                                {app.start_date && (
                                                    <div className="mt-2 text-sm text-gray-600">
                                                        <span className="font-medium">Periode:</span> {app.start_date} - {app.end_date || 'Belum ditentukan'}
                                                    </div>
                                                )}
                                            </div>
                                            <Link
                                                href={route('applicant.applications.show', app.id)}
                                                className="ml-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                                            >
                                                Detail
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
