import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { CheckCircle, Clock, XCircle, FileText, Calendar, Eye, Download, MessageSquare, Plus } from 'lucide-react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

export default function MyApplications({ applications }) {
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash?.success) {
            Swal.fire({
                title: 'Berhasil!',
                text: flash.success,
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK',
                background: '#fff',
                customClass: {
                    popup: 'rounded-xl shadow-xl border border-gray-100',
                    title: 'text-xl font-bold text-gray-900',
                    htmlContainer: 'text-gray-600',
                    confirmButton: 'px-6 py-2.5 rounded-lg font-semibold text-sm'
                }
            });
        }
    }, [flash]);

    const getStatusBadge = (status) => {
        const statusConfig = {
            approved: {
                icon: CheckCircle,
                text: 'Disetujui',
                bgColor: 'bg-green-100',
                textColor: 'text-green-700',
                borderColor: 'border-green-300',
            },
            pending: {
                icon: Clock,
                text: 'Menunggu Review',
                bgColor: 'bg-yellow-100',
                textColor: 'text-yellow-700',
                borderColor: 'border-yellow-300',
            },
            rejected: {
                icon: XCircle,
                text: 'Ditolak',
                bgColor: 'bg-red-100',
                textColor: 'text-red-700',
                borderColor: 'border-red-300',
            },
        };

        const config = statusConfig[status];
        const Icon = config.icon;

        return (
            <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${config.bgColor} ${config.textColor} ${config.borderColor}`}>
                <Icon className="h-3.5 w-3.5" />
                {config.text}
            </span>
        );
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    };

    // Count statistics
    const stats = {
        total: applications.length,
        approved: applications.filter(app => app.status === 'approved').length,
        pending: applications.filter(app => app.status === 'pending').length,
        rejected: applications.filter(app => app.status === 'rejected').length,
    };

    return (
        <AuthenticatedLayout header="Permohonan Saya">
            <Head title="Permohonan Saya" />

            {/* Action Button */}
            <div className="mb-6 flex justify-end">
                <Link
                    href={route('applicant.create')}
                    className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:from-blue-700 hover:to-blue-800 hover:shadow-xl"
                >
                    <Plus className="h-5 w-5" />
                    Ajukan Permohonan Baru
                </Link>
            </div>

            {/* Statistics Cards */}
            <div className="mb-6 grid gap-4 md:grid-cols-4">
                <div className="rounded-xl border border-white/40 bg-white/60 p-5 shadow-lg backdrop-blur-md">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Permohonan</p>
                            <p className="mt-1 text-3xl font-bold text-gray-900">{stats.total}</p>
                        </div>
                        <div className="rounded-lg bg-blue-500/10 p-3">
                            <FileText className="h-6 w-6 text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-white/40 bg-white/60 p-5 shadow-lg backdrop-blur-md">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Disetujui</p>
                            <p className="mt-1 text-3xl font-bold text-green-600">{stats.approved}</p>
                        </div>
                        <div className="rounded-lg bg-green-500/10 p-3">
                            <CheckCircle className="h-6 w-6 text-green-600" />
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-white/40 bg-white/60 p-5 shadow-lg backdrop-blur-md">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Menunggu</p>
                            <p className="mt-1 text-3xl font-bold text-yellow-600">{stats.pending}</p>
                        </div>
                        <div className="rounded-lg bg-yellow-500/10 p-3">
                            <Clock className="h-6 w-6 text-yellow-600" />
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-white/40 bg-white/60 p-5 shadow-lg backdrop-blur-md">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">Ditolak</p>
                            <p className="mt-1 text-3xl font-bold text-red-600">{stats.rejected}</p>
                        </div>
                        <div className="rounded-lg bg-red-500/10 p-3">
                            <XCircle className="h-6 w-6 text-red-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Applications List */}
            <div className="space-y-4">
                {applications.map((application) => (
                    <div
                        key={application.id}
                        className="group overflow-hidden rounded-xl border border-white/40 bg-white/60 shadow-lg backdrop-blur-md transition-all hover:shadow-xl"
                    >
                        <div className="p-6">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    {/* Header */}
                                    <div className="mb-3 flex items-start justify-between">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900">
                                                {application.title}
                                            </h3>
                                            <p className="mt-1 text-sm font-medium text-gray-600">
                                                {application.position}
                                            </p>
                                        </div>
                                        {getStatusBadge(application.status)}
                                    </div>

                                    {/* Info Grid */}
                                    <div className="mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                                        <div className="flex items-center gap-2 text-sm">
                                            <Calendar className="h-4 w-4 text-gray-500" />
                                            <div>
                                                <p className="text-xs text-gray-500">Diajukan:</p>
                                                <p className="font-medium text-gray-700">
                                                    {formatDate(application.submittedDate)}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 text-sm">
                                            <Calendar className="h-4 w-4 text-gray-500" />
                                            <div>
                                                <p className="text-xs text-gray-500">Periode Magang:</p>
                                                <p className="font-medium text-gray-700">
                                                    {formatDate(application.startDate)} - {formatDate(application.endDate)}
                                                </p>
                                            </div>
                                        </div>

                                        {application.reviewDate && (
                                            <div className="flex items-center gap-2 text-sm">
                                                <Clock className="h-4 w-4 text-gray-500" />
                                                <div>
                                                    <p className="text-xs text-gray-500">Direview:</p>
                                                    <p className="font-medium text-gray-700">
                                                        {formatDate(application.reviewDate)}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Notes/Feedback */}
                                    {application.notes && (
                                        <div className={`rounded-lg border p-3 ${application.status === 'approved'
                                            ? 'border-green-200 bg-green-50'
                                            : application.status === 'rejected'
                                                ? 'border-red-200 bg-red-50'
                                                : 'border-blue-200 bg-blue-50'
                                            }`}>
                                            <div className="flex items-start gap-2">
                                                <MessageSquare className={`mt-0.5 h-4 w-4 ${application.status === 'approved'
                                                    ? 'text-green-600'
                                                    : application.status === 'rejected'
                                                        ? 'text-red-600'
                                                        : 'text-blue-600'
                                                    }`} />
                                                <div>
                                                    <p className={`text-xs font-semibold ${application.status === 'approved'
                                                        ? 'text-green-700'
                                                        : application.status === 'rejected'
                                                            ? 'text-red-700'
                                                            : 'text-blue-700'
                                                        }`}>
                                                        Catatan dari Admin:
                                                    </p>
                                                    <p className="mt-1 text-sm text-gray-700">
                                                        {application.notes}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="mt-4 flex gap-3 border-t border-gray-200 pt-4">
                                <button className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-600">
                                    <Eye className="h-4 w-4" />
                                    Lihat Detail
                                </button>
                                {application.status === 'approved' && (
                                    <a
                                        href={route('applicant.download-letter', application.id)}
                                        className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100"
                                    >
                                        <Download className="h-4 w-4" />
                                        Download Surat Penerimaan
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State (jika tidak ada data) */}
            {applications.length === 0 && (
                <div className="rounded-xl border border-white/40 bg-white/60 p-12 text-center shadow-lg backdrop-blur-md">
                    <FileText className="mx-auto h-16 w-16 text-gray-400" />
                    <h3 className="mt-4 text-xl font-semibold text-gray-900">
                        Belum Ada Permohonan
                    </h3>
                    <p className="mt-2 text-gray-600">
                        Anda belum mengajukan permohonan magang. Klik tombol di bawah untuk memulai.
                    </p>
                    <Link
                        href={route('applicant.create')}
                        className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
                    >
                        Ajukan Permohonan Baru
                    </Link>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
