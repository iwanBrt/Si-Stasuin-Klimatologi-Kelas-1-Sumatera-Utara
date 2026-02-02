
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { CheckCircle, Clock, XCircle, FileText, Calendar, Download, ArrowLeft, MessageSquare, Briefcase, Building, User, Phone, MapPin } from 'lucide-react';

export default function ApplicationDetail({ application }) {
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
            <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-semibold ${config.bgColor} ${config.textColor} ${config.borderColor}`}>
                <Icon className="h-4 w-4" />
                {config.text}
            </span>
        );
    };

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    };

    const formatApplicationType = (type) => {
        const types = {
            magang: 'Magang / Internship',
            penelitian: 'Penelitian / Research',
            pkl: 'Praktek Kerja Lapangan (PKL)',
            observasi: 'Kunjungan Observasi',
            kerja_praktek: 'Kerja Praktek',
            tugas_akhir: 'Tugas Akhir / Skripsi',
            permohonan_data: 'Permohonan Data',
        };
        return types[type] || type;
    };

    return (
        <AuthenticatedLayout header="Detail Permohonan">
            <Head title={`Detail - ${application.title}`} />

            <div className="mb-6">
                <Link
                    href={route('applicant.applications')}
                    className="inline-flex items-center gap-2 font-medium text-gray-500 transition-colors hover:text-blue-600"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Kembali ke Daftar Permohonan
                </Link>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Main Content */}
                <div className="space-y-6 lg:col-span-2">
                    {/* Header Card */}
                    <div className="rounded-xl border border-white/40 bg-white/60 p-6 shadow-lg backdrop-blur-md">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">{application.title}</h2>
                                <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                    <div className="flex items-center gap-1.5">
                                        <Briefcase className="h-4 w-4" />
                                        {formatApplicationType(application.application_type)}
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Calendar className="h-4 w-4" />
                                        Diajukan: {formatDate(application.created_at)}
                                    </div>
                                </div>
                            </div>
                            {getStatusBadge(application.status)}
                        </div>

                        {/* Admin Notes */}
                        {application.admin_notes && (
                            <div className={`mt-6 rounded-lg border p-4 ${application.status === 'approved' ? 'border-green-200 bg-green-50' :
                                    application.status === 'rejected' ? 'border-red-200 bg-red-50' :
                                        'border-blue-200 bg-blue-50'
                                }`}>
                                <div className="flex items-start gap-3">
                                    <MessageSquare className={`h-5 w-5 ${application.status === 'approved' ? 'text-green-600' :
                                            application.status === 'rejected' ? 'text-red-600' :
                                                'text-blue-600'
                                        }`} />
                                    <div>
                                        <h4 className={`font-semibold ${application.status === 'approved' ? 'text-green-800' :
                                                application.status === 'rejected' ? 'text-red-800' :
                                                    'text-blue-800'
                                            }`}>Catatan dari Admin</h4>
                                        <p className="mt-1 text-sm text-gray-700">{application.admin_notes}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Details Card */}
                    <div className="rounded-xl border border-white/40 bg-white/60 p-6 shadow-lg backdrop-blur-md">
                        <h3 className="mb-4 text-lg font-bold text-gray-900">Informasi Lengkap</h3>

                        <dl className="grid gap-x-4 gap-y-6 sm:grid-cols-2">
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Institusi / Perusahaan</dt>
                                <dd className="mt-1 flex items-start gap-2 font-medium text-gray-900">
                                    <Building className="mt-0.5 h-4 w-4 text-gray-400" />
                                    {application.institution_name}
                                </dd>
                            </div>

                            <div>
                                <dt className="text-sm font-medium text-gray-500">Alamat</dt>
                                <dd className="mt-1 flex items-start gap-2 text-sm text-gray-900">
                                    <MapPin className="mt-0.5 h-4 w-4 text-gray-400" />
                                    {application.institution_address || '-'}
                                </dd>
                            </div>

                            {application.applicant_type === 'student' && (
                                <>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Fakultas / Jurusan</dt>
                                        <dd className="mt-1 font-medium text-gray-900">{application.department}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Program Studi</dt>
                                        <dd className="mt-1 font-medium text-gray-900">{application.study_program}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">NIM / NIS</dt>
                                        <dd className="mt-1 font-medium text-gray-900">{application.student_id}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Dosen Pembimbing</dt>
                                        <dd className="mt-1 text-sm text-gray-900">
                                            <p className="font-medium">{application.supervisor_name || '-'}</p>
                                            <p className="text-xs text-gray-500">{application.supervisor_contact}</p>
                                        </dd>
                                    </div>
                                </>
                            )}

                            {application.applicant_type === 'employee' && (
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Posisi / Jabatan</dt>
                                    <dd className="mt-1 font-medium text-gray-900">{application.position}</dd>
                                </div>
                            )}

                            <div>
                                <dt className="text-sm font-medium text-gray-500">Kontak Pemohon</dt>
                                <dd className="mt-1 flex items-center gap-2 font-medium text-gray-900">
                                    <Phone className="h-4 w-4 text-gray-400" />
                                    {application.phone}
                                </dd>
                            </div>
                        </dl>

                        {application.application_type !== 'permohonan_data' ? (
                            <div className="mt-6 border-t border-gray-100 pt-6">
                                <h4 className="mb-3 font-semibold text-gray-900">Periode Magang/Penelitian</h4>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div>
                                        <p className="text-xs text-gray-500">Tanggal Mulai</p>
                                        <p className="font-medium text-gray-900">{formatDate(application.start_date)}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Tanggal Selesai</p>
                                        <p className="font-medium text-gray-900">{formatDate(application.end_date)}</p>
                                    </div>
                                </div>
                                {application.research_field && (
                                    <div className="mt-4">
                                        <p className="text-xs text-gray-500">Bidang Penelitian</p>
                                        <p className="font-medium text-gray-900">{application.research_field}</p>
                                    </div>
                                )}
                                {application.research_objective && (
                                    <div className="mt-4">
                                        <p className="text-xs text-gray-500">Tujuan Penelitian</p>
                                        <p className="text-sm text-gray-900">{application.research_objective}</p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="mt-6 border-t border-gray-100 pt-6">
                                <h4 className="mb-3 font-semibold text-gray-900">Detail Permohonan Data</h4>
                                <dl className="grid gap-4 sm:grid-cols-2">
                                    <div>
                                        <dt className="text-xs text-gray-500">Jenis Data</dt>
                                        <dd className="font-medium text-gray-900">
                                            {application.data_type === '00' ? 'Data Tarif Nol' : 'Data PNBP'}
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-xs text-gray-500">Kategori Data</dt>
                                        <dd className="font-medium text-gray-900">{application.data_category}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-xs text-gray-500">Periode Data</dt>
                                        <dd className="font-medium text-gray-900">
                                            {formatDate(application.data_period_start)} - {formatDate(application.data_period_end)}
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        )}

                        {application.additional_notes && (
                            <div className="mt-6 border-t border-gray-100 pt-6">
                                <h4 className="mb-2 text-sm font-semibold text-gray-900">Catatan Tambahan</h4>
                                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{application.additional_notes}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar - Files & Actions */}
                <div className="space-y-6">
                    {application.status === 'approved' && (
                        <div className="rounded-xl border border-green-200 bg-green-50 p-6 shadow-sm">
                            <h3 className="mb-2 font-bold text-green-900">Permohonan Disetujui!</h3>
                            <p className="mb-4 text-sm text-green-800">
                                Selamat, permohonan Anda telah disetujui. Silakan unduh surat balasan di bawah ini.
                            </p>
                            <a
                                href={route('applicant.download-letter', application.id)}
                                target="_blank"
                                className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-green-700 hover:shadow-md"
                            >
                                <Download className="h-5 w-5" />
                                Download Surat
                            </a>
                        </div>
                    )}

                    <div className="rounded-xl border border-white/40 bg-white/60 p-6 shadow-lg backdrop-blur-md">
                        <h3 className="mb-4 font-bold text-gray-900">Dokumen Lampiran</h3>
                        <div className="space-y-3">
                            {[
                                { file: application.proposal_file, label: 'Proposal', required: false },
                                { file: application.recommendation_letter, label: 'Surat Pengantar', required: true },
                                { file: application.cv_file, label: 'CV', required: false },
                                { file: application.transcript_file, label: 'Transkrip Nilai', required: false },
                                { file: application.identity_card_file, label: 'KTP / KTM', required: false },
                            ].map((doc, index) => (
                                doc.file ? (
                                    <a
                                        key={index}
                                        href={`/storage/${doc.file}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3 transition hover:border-blue-300 hover:bg-blue-50"
                                    >
                                        <div className="rounded-lg bg-blue-100 p-2 text-blue-600">
                                            <FileText className="h-5 w-5" />
                                        </div>
                                        <div className="overflow-hidden">
                                            <p className="truncate font-medium text-gray-900">{doc.label}</p>
                                            <p className="text-xs text-gray-500">Klik untuk melihat</p>
                                        </div>
                                    </a>
                                ) : null
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
