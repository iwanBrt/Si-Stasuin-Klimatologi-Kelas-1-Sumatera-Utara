import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import {
    CheckCircle,
    XCircle,
    Download,
    FileText,
    Calendar,
    User as UserIcon,
    Building,
    Phone,
    Mail,
    GraduationCap,
    Target,
    Users,
    Clock,
    Eye,
    ArrowLeft,
    Upload
} from 'lucide-react';
import { useState } from 'react';

export default function ApplicationShow({ application }) {
    const [showApproveModal, setShowApproveModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);

    const approveForm = useForm({
        notes: '',
        confirmation_letter: null,
    });

    const rejectForm = useForm({
        notes: '',
    });

    const handleApprove = (e) => {
        e.preventDefault();
        approveForm.post(route('admin.applications.approve', application.id), {
            onSuccess: () => {
                setShowApproveModal(false);
            },
        });
    };

    const handleReject = (e) => {
        e.preventDefault();
        rejectForm.post(route('admin.applications.reject', application.id), {
            onSuccess: () => {
                setShowRejectModal(false);
            },
        });
    };

    const getStatusBadge = () => {
        const config = {
            pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Menunggu Review' },
            approved: { bg: 'bg-green-100', text: 'text-green-700', label: 'Disetujui' },
            rejected: { bg: 'bg-red-100', text: 'text-red-700', label: 'Ditolak' },
        };
        const { bg, text, label } = config[application.status];
        return <span className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${bg} ${text}`}>{label}</span>;
    };

    return (
        <AuthenticatedLayout header="Detail Permohonan">
            <Head title={`Detail - ${application.title}`} />

            {/* Back Button */}
            <div className="mb-6">
                <button
                    onClick={() => router.visit(route('admin.applications.index'))}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Kembali ke Daftar Permohonan
                </button>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Main Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Header Card */}
                    <div className="rounded-xl border border-white/40 bg-white/60 p-6 shadow-lg backdrop-blur-md">
                        <div className="flex items-start justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">{application.title}</h1>
                                <p className="mt-2 text-sm text-gray-600 capitalize">
                                    Jenis: <span className="font-semibold capitalize">{application.application_type.replace('_', ' ')}</span>
                                </p>
                            </div>
                            {getStatusBadge()}
                        </div>

                        <div className="mt-6 grid gap-4 md:grid-cols-2">
                            <div className="flex items-start gap-3">
                                <Calendar className="h-5 w-5 text-blue-600 mt-0.5" />
                                <div>
                                    <p className="text-xs text-gray-500">
                                        {application.application_type === 'permohonan_data' ? 'Periode Data' : 'Periode Magang'}
                                    </p>
                                    <p className="font-semibold text-gray-900">
                                        {application.application_type === 'permohonan_data'
                                            ? `${application.data_period_start || '-'} s/d ${application.data_period_end || '-'}`
                                            : `${application.start_date || '-'} s/d ${application.end_date || '-'}`
                                        }
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                                <div>
                                    <p className="text-xs text-gray-500">Diajukan Pada</p>
                                    <p className="font-semibold text-gray-900">{application.created_at}</p>
                                </div>
                            </div>
                        </div>

                        {/* Additional Data Info for Permohonan Data */}
                        {application.application_type === 'permohonan_data' && (
                            <div className="mt-4 grid gap-4 md:grid-cols-2 border-t border-gray-100 pt-4">
                                <div className="flex items-start gap-3">
                                    <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
                                    <div>
                                        <p className="text-xs text-gray-500">Jenis Data</p>
                                        <p className="font-semibold text-gray-900">
                                            {application.data_type === '00' ? '00 - Data Tarif Nol' : '01 - Data PNBP'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Target className="h-5 w-5 text-blue-600 mt-0.5" />
                                    <div>
                                        <p className="text-xs text-gray-500">Kategori Data</p>
                                        <p className="font-semibold text-gray-900 capitalize">{application.data_category?.replace('_', ' ') || '-'}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Applicant Info */}
                    <div className="rounded-xl border border-white/40 bg-white/60 p-6 shadow-lg backdrop-blur-md">
                        <h2 className="mb-4 text-lg font-bold text-gray-900">Data Pemohon</h2>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                                    <UserIcon className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">{application.user.name}</p>
                                    <p className="text-sm text-gray-600 capitalize">
                                        {application.applicant_type === 'employee' ? 'Pegawai Perusahaan' : 'Mahasiswa/Siswa'}
                                    </p>
                                    <p className="text-xs text-gray-500">{application.user.email}</p>
                                </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="flex items-start gap-3">
                                    <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                                    <div>
                                        <p className="text-xs text-gray-500">Telepon</p>
                                        <p className="font-medium text-gray-900">{application.phone}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    {application.applicant_type === 'employee' ? (
                                        <>
                                            <Target className="h-5 w-5 text-gray-400 mt-0.5" />
                                            <div>
                                                <p className="text-xs text-gray-500">Jabatan/Posisi</p>
                                                <p className="font-medium text-gray-900">{application.position || '-'}</p>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <GraduationCap className="h-5 w-5 text-gray-400 mt-0.5" />
                                            <div>
                                                <p className="text-xs text-gray-500">NIM/NIS</p>
                                                <p className="font-medium text-gray-900">{application.student_id || '-'}</p>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Institution/Company Info */}
                    <div className="rounded-xl border border-white/40 bg-white/60 p-6 shadow-lg backdrop-blur-md">
                        <h2 className="mb-4 text-lg font-bold text-gray-900">
                            {application.applicant_type === 'employee' ? 'Data Perusahaan' : 'Data Institusi'}
                        </h2>

                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <Building className="h-5 w-5 text-gray-400 mt-0.5" />
                                <div className="flex-1">
                                    <p className="text-xs text-gray-500">
                                        {application.applicant_type === 'employee' ? 'Nama Perusahaan' : 'Nama Institusi'}
                                    </p>
                                    <p className="font-semibold text-gray-900">{application.institution_name}</p>
                                    {application.institution_address && (
                                        <p className="mt-1 text-sm text-gray-600">{application.institution_address}</p>
                                    )}
                                </div>
                            </div>

                            {application.applicant_type !== 'employee' && (
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <p className="text-xs text-gray-500">Fakultas/Jurusan</p>
                                        <p className="font-medium text-gray-900">{application.department}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Program Studi</p>
                                        <p className="font-medium text-gray-900">{application.study_program}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Research Info (if applicable) */}
                    {(application.research_field || application.research_objective) && (
                        <div className="rounded-xl border border-white/40 bg-white/60 p-6 shadow-lg backdrop-blur-md">
                            <h2 className="mb-4 text-lg font-bold text-gray-900">Bidang Penelitian</h2>

                            <div className="space-y-3">
                                {application.research_field && (
                                    <div className="flex items-start gap-3">
                                        <Target className="h-5 w-5 text-gray-400 mt-0.5" />
                                        <div>
                                            <p className="text-xs text-gray-500">Bidang</p>
                                            <p className="font-medium text-gray-900">{application.research_field}</p>
                                        </div>
                                    </div>
                                )}

                                {application.research_objective && (
                                    <div>
                                        <p className="text-xs text-gray-500 mb-2">Tujuan Penelitian</p>
                                        <p className="text-sm text-gray-700 whitespace-pre-line rounded-lg bg-gray-50 p-4">
                                            {application.research_objective}
                                        </p>
                                    </div>
                                )}

                                {application.supervisor_name && (
                                    <div className="flex items-start gap-3 pt-2">
                                        <Users className="h-5 w-5 text-gray-400 mt-0.5" />
                                        <div>
                                            <p className="text-xs text-gray-500">Dosen Pembimbing</p>
                                            <p className="font-medium text-gray-900">{application.supervisor_name}</p>
                                            {application.supervisor_contact && (
                                                <p className="text-sm text-gray-600">{application.supervisor_contact}</p>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Additional Notes */}
                    {application.additional_notes && (
                        <div className="rounded-xl border border-white/40 bg-white/60 p-6 shadow-lg backdrop-blur-md">
                            <h2 className="mb-3 text-lg font-bold text-gray-900">Catatan Tambahan</h2>
                            <p className="text-sm text-gray-700 whitespace-pre-line rounded-lg bg-gray-50 p-4">
                                {application.additional_notes}
                            </p>
                        </div>
                    )}

                    {/* Admin Notes (if reviewed) */}
                    {application.admin_notes && (
                        <div className="rounded-xl border border-blue-200 bg-blue-50 p-6 shadow-lg">
                            <h2 className="mb-3 text-lg font-bold text-blue-900">Catatan Admin</h2>
                            <p className="text-sm text-blue-800 whitespace-pre-line">
                                {application.admin_notes}
                            </p>
                            <div className="mt-4 flex items-center gap-2 text-xs text-blue-600">
                                <Clock className="h-4 w-4" />
                                <span>Direview: {application.reviewed_at}</span>
                                {application.reviewed_by_name && (
                                    <>
                                        <span>•</span>
                                        <span>oleh {application.reviewed_by_name}</span>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar - Documents & Actions */}
                <div className="space-y-6">
                    {/* Documents */}
                    <div className="rounded-xl border border-white/40 bg-white/60 p-6 shadow-lg backdrop-blur-md">
                        <h2 className="mb-4 text-lg font-bold text-gray-900">Dokumen</h2>

                        <div className="space-y-3">
                            {application.files.proposal && (
                                <a
                                    href={`/storage/${application.files.proposal}`}
                                    target="_blank"
                                    className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-3 transition-all hover:border-blue-300 hover:shadow-md"
                                >
                                    <div className="flex items-center gap-3">
                                        <FileText className="h-5 w-5 text-blue-600" />
                                        <span className="text-sm font-medium text-gray-900">Proposal</span>
                                    </div>
                                    <Download className="h-4 w-4 text-gray-400" />
                                </a>
                            )}

                            {application.files.recommendation_letter && (
                                <a
                                    href={`/storage/${application.files.recommendation_letter}`}
                                    target="_blank"
                                    className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-3 transition-all hover:border-blue-300 hover:shadow-md"
                                >
                                    <div className="flex items-center gap-3">
                                        <FileText className="h-5 w-5 text-blue-600" />
                                        <span className="text-sm font-medium text-gray-900">Surat Pengantar</span>
                                    </div>
                                    <Download className="h-4 w-4 text-gray-400" />
                                </a>
                            )}

                            {application.files.cv && (
                                <a
                                    href={`/storage/${application.files.cv}`}
                                    target="_blank"
                                    className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-3 transition-all hover:border-blue-300 hover:shadow-md"
                                >
                                    <div className="flex items-center gap-3">
                                        <FileText className="h-5 w-5 text-blue-600" />
                                        <span className="text-sm font-medium text-gray-900">CV</span>
                                    </div>
                                    <Download className="h-4 w-4 text-gray-400" />
                                </a>
                            )}

                            {application.files.transcript && (
                                <a
                                    href={`/storage/${application.files.transcript}`}
                                    target="_blank"
                                    className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-3 transition-all hover:border-blue-300 hover:shadow-md"
                                >
                                    <div className="flex items-center gap-3">
                                        <FileText className="h-5 w-5 text-blue-600" />
                                        <span className="text-sm font-medium text-gray-900">Transkrip</span>
                                    </div>
                                    <Download className="h-4 w-4 text-gray-400" />
                                </a>
                            )}

                            {application.files.identity_card && (
                                <a
                                    href={`/storage/${application.files.identity_card}`}
                                    target="_blank"
                                    className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-3 transition-all hover:border-blue-300 hover:shadow-md"
                                >
                                    <div className="flex items-center gap-3">
                                        <FileText className="h-5 w-5 text-blue-600" />
                                        <span className="text-sm font-medium text-gray-900">KTP/Kartu Pelajar</span>
                                    </div>
                                    <Download className="h-4 w-4 text-gray-400" />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Actions (only for pending) */}
                    {application.status === 'pending' && (
                        <div className="rounded-xl border border-white/40 bg-white/60 p-6 shadow-lg backdrop-blur-md">
                            <h2 className="mb-4 text-lg font-bold text-gray-900">Aksi</h2>

                            <div className="space-y-3">
                                <button
                                    onClick={() => setShowApproveModal(true)}
                                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-green-700"
                                >
                                    <CheckCircle className="h-5 w-5" />
                                    Setujui Permohonan
                                </button>

                                <button
                                    onClick={() => setShowRejectModal(true)}
                                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-red-700"
                                >
                                    <XCircle className="h-5 w-5" />
                                    Tolak Permohonan
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Approve Modal */}
            {showApproveModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
                        <h3 className="mb-4 text-xl font-bold text-gray-900">Setujui Permohonan</h3>

                        <form onSubmit={handleApprove}>
                            <div className="mb-4">
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Surat Konfirmasi <span className="text-red-500">*</span>
                                </label>
                                <div
                                    className={`relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-all ${approveForm.data.confirmation_letter
                                            ? 'border-green-300 bg-green-50'
                                            : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
                                        }`}
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={(e) => {
                                        e.preventDefault();
                                        if (e.dataTransfer.files[0]) {
                                            approveForm.setData('confirmation_letter', e.dataTransfer.files[0]);
                                        }
                                    }}
                                    onClick={() => document.getElementById('file-upload').click()}
                                >
                                    <input
                                        id="file-upload"
                                        type="file"
                                        className="hidden"
                                        accept=".pdf,.jpg,.jpeg,.png"
                                        onChange={(e) => {
                                            if (e.target.files[0]) {
                                                approveForm.setData('confirmation_letter', e.target.files[0]);
                                            }
                                        }}
                                    />

                                    {approveForm.data.confirmation_letter ? (
                                        <div className="text-center">
                                            <FileText className="mx-auto h-8 w-8 text-green-600" />
                                            <p className="mt-2 text-sm font-medium text-green-700">
                                                {approveForm.data.confirmation_letter.name}
                                            </p>
                                            <p className="text-xs text-green-600">
                                                {(approveForm.data.confirmation_letter.size / 1024 / 1024).toFixed(2)} MB
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="text-center">
                                            <Upload className="mx-auto h-8 w-8 text-gray-400" />
                                            <p className="mt-2 text-sm font-medium text-gray-700">
                                                Klik atau drag file ke sini
                                            </p>
                                            <p className="text-xs text-gray-500">PDF, JPG, PNG (Max 2MB)</p>
                                        </div>
                                    )}
                                </div>
                                {approveForm.errors.confirmation_letter && (
                                    <p className="mt-1 text-sm text-red-600">{approveForm.errors.confirmation_letter}</p>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Catatan (Opsional)
                                </label>
                                <textarea
                                    value={approveForm.data.notes}
                                    onChange={(e) => approveForm.setData('notes', e.target.value)}
                                    rows="4"
                                    className="w-full rounded-lg border border-gray-300 p-3 focus:border-green-500 focus:ring-2 focus:ring-green-200"
                                    placeholder="Tambahkan catatan untuk pemohon..."
                                />
                                {approveForm.errors.notes && (
                                    <p className="mt-1 text-sm text-red-600">{approveForm.errors.notes}</p>
                                )}
                            </div>

                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowApproveModal(false)}
                                    className="flex-1 rounded-lg border border-gray-300 px-4 py-2 font-semibold text-gray-700 transition-colors hover:bg-gray-100"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={approveForm.processing}
                                    className="flex-1 rounded-lg bg-green-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-green-700 disabled:opacity-50"
                                >
                                    {approveForm.processing ? 'Memproses...' : 'Ya, Setujui'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Reject Modal */}
            {showRejectModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
                        <h3 className="mb-4 text-xl font-bold text-gray-900">Tolak Permohonan</h3>

                        <form onSubmit={handleReject}>
                            <div className="mb-4">
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Alasan Penolakan <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    value={rejectForm.data.notes}
                                    onChange={(e) => rejectForm.setData('notes', e.target.value)}
                                    rows="4"
                                    className="w-full rounded-lg border border-gray-300 p-3 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                                    placeholder="Jelaskan alasan penolakan..."
                                    required
                                />
                                {rejectForm.errors.notes && (
                                    <p className="mt-1 text-sm text-red-600">{rejectForm.errors.notes}</p>
                                )}
                            </div>

                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowRejectModal(false)}
                                    className="flex-1 rounded-lg border border-gray-300 px-4 py-2 font-semibold text-gray-700 transition-colors hover:bg-gray-100"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={rejectForm.processing}
                                    className="flex-1 rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-50"
                                >
                                    {rejectForm.processing ? 'Memproses...' : 'Ya, Tolak'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
