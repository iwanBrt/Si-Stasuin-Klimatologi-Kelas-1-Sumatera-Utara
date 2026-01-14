import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { FileText, Clock, CheckCircle, AlertCircle, Plus, Download } from 'lucide-react';

export default function Onboarding() {
    // Quick stats for dashboard
    const stats = [
        {
            icon: FileText,
            label: 'Status Aplikasi',
            value: 'Belum Ada',
            color: 'gray',
            bgColor: 'bg-gray-100',
            iconColor: 'text-gray-600'
        },
        {
            icon: Clock,
            label: 'Waktu Proses',
            value: '3-5 Hari',
            color: 'blue',
            bgColor: 'bg-blue-100',
            iconColor: 'text-blue-600'
        },
        {
            icon: CheckCircle,
            label: 'Dokumen',
            value: '0/3 Lengkap',
            color: 'orange',
            bgColor: 'bg-orange-100',
            iconColor: 'text-orange-600'
        },
    ];

    const steps = [
        {
            number: 1,
            title: 'Unduh Template',
            description: 'Download template proposal dan surat pengantar',
            status: 'current'
        },
        {
            number: 2,
            title: 'Lengkapi Dokumen',
            description: 'Isi formulir dan upload dokumen persyaratan',
            status: 'upcoming'
        },
        {
            number: 3,
            title: 'Submit Permohonan',
            description: 'Kirim aplikasi untuk ditinjau oleh admin',
            status: 'upcoming'
        },
        {
            number: 4,
            title: 'Menunggu Persetujuan',
            description: 'Tim kami akan meninjau dalam 3-5 hari kerja',
            status: 'upcoming'
        },
    ];

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-bold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard - Sistem Magang" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Welcome Banner */}
                    <div className="mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 shadow-xl">
                        <div className="p-8 sm:p-12">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h1 className="mb-3 text-3xl font-bold text-white sm:text-4xl">
                                        Selamat Datang! 👋
                                    </h1>
                                    <p className="mb-6 max-w-2xl text-lg text-blue-100">
                                        Mulai permohonan magang Anda sekarang untuk bergabung dengan program magang UPT Stasiun Klimatologi.
                                    </p>
                                    <Link
                                        href="/application/create"
                                        className="inline-flex items-center gap-3 rounded-xl bg-white px-6 py-3 text-base font-bold text-blue-700 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-yellow-300 hover:text-blue-900"
                                    >
                                        <Plus className="h-5 w-5" />
                                        Ajukan Permohonan Magang
                                    </Link>
                                </div>
                                <div className="hidden sm:block">
                                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                                        <FileText className="h-12 w-12 text-yellow-300" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                        {stats.map((stat, index) => {
                            const IconComponent = stat.icon;
                            return (
                                <div
                                    key={index}
                                    className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${stat.bgColor}`}>
                                            <IconComponent className={`h-7 w-7 ${stat.iconColor}`} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                                            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        {/* Steps Guide - Left Column */}
                        <div className="lg:col-span-2">
                            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-md">
                                <div className="mb-6 flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                                        <CheckCircle className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900">
                                        Langkah Pendaftaran
                                    </h3>
                                </div>

                                <div className="space-y-6">
                                    {steps.map((step, index) => (
                                        <div key={index} className="flex gap-4">
                                            <div className="flex flex-col items-center">
                                                <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${step.status === 'current'
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-200 text-gray-600'
                                                    }`}>
                                                    {step.number}
                                                </div>
                                                {index < steps.length - 1 && (
                                                    <div className="mt-2 h-12 w-0.5 bg-gray-300" />
                                                )}
                                            </div>
                                            <div className="flex-1 pb-8">
                                                <h4 className="mb-1 text-lg font-bold text-gray-900">
                                                    {step.title}
                                                </h4>
                                                <p className="text-sm text-gray-600">
                                                    {step.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions - Right Column */}
                        <div className="space-y-6">
                            {/* Download Resources */}
                            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md">
                                <div className="mb-4 flex items-center gap-2">
                                    <Download className="h-5 w-5 text-blue-600" />
                                    <h3 className="text-lg font-bold text-gray-900">
                                        Dokumen Pendukung
                                    </h3>
                                </div>

                                <div className="space-y-3">
                                    <a
                                        href="#"
                                        className="block rounded-xl border border-gray-200 p-4 transition-all duration-300 hover:border-blue-300 hover:bg-blue-50"
                                    >
                                        <div className="flex items-center gap-3">
                                            <FileText className="h-5 w-5 text-blue-600" />
                                            <div className="flex-1">
                                                <p className="text-sm font-semibold text-gray-900">
                                                    Template Proposal
                                                </p>
                                                <p className="text-xs text-gray-500">DOCX • 125 KB</p>
                                            </div>
                                        </div>
                                    </a>

                                    <a
                                        href="#"
                                        className="block rounded-xl border border-gray-200 p-4 transition-all duration-300 hover:border-blue-300 hover:bg-blue-50"
                                    >
                                        <div className="flex items-center gap-3">
                                            <FileText className="h-5 w-5 text-blue-600" />
                                            <div className="flex-1">
                                                <p className="text-sm font-semibold text-gray-900">
                                                    Surat Pengantar
                                                </p>
                                                <p className="text-xs text-gray-500">PDF • 95 KB</p>
                                            </div>
                                        </div>
                                    </a>

                                    <a
                                        href="#"
                                        className="block rounded-xl border border-gray-200 p-4 transition-all duration-300 hover:border-blue-300 hover:bg-blue-50"
                                    >
                                        <div className="flex items-center gap-3">
                                            <FileText className="h-5 w-5 text-blue-600" />
                                            <div className="flex-1">
                                                <p className="text-sm font-semibold text-gray-900">
                                                    SOP Magang
                                                </p>
                                                <p className="text-xs text-gray-500">PDF • 210 KB</p>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>

                            {/* Help Box */}
                            <div className="rounded-2xl border-l-4 border-blue-500 bg-blue-50 p-6 shadow-md">
                                <div className="flex gap-3">
                                    <AlertCircle className="h-6 w-6 flex-shrink-0 text-blue-600" />
                                    <div>
                                        <h4 className="mb-2 font-bold text-blue-900">
                                            Butuh Bantuan?
                                        </h4>
                                        <p className="mb-3 text-sm text-blue-800">
                                            Hubungi tim kami jika Anda memiliki pertanyaan tentang proses pendaftaran.
                                        </p>
                                        <a
                                            href="mailto:magang@klimatologi.bmkg.go.id"
                                            className="text-sm font-semibold text-blue-700 underline hover:text-blue-900"
                                        >
                                            magang@klimatologi.bmkg.go.id
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* CTA Box */}
                            <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-6 shadow-xl">
                                <h4 className="mb-2 text-xl font-bold text-white">
                                    Siap Memulai?
                                </h4>
                                <p className="mb-4 text-sm text-blue-100">
                                    Ajukan permohonan magang Anda sekarang dan mulai perjalanan karir di bidang klimatologi.
                                </p>
                                <Link
                                    href="/application/create"
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-blue-700 shadow-lg transition-all duration-300 hover:bg-yellow-300 hover:text-blue-900"
                                >
                                    <Plus className="h-5 w-5" />
                                    Mulai Permohonan
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
