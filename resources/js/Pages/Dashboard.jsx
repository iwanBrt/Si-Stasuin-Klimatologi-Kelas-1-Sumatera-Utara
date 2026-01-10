import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Mail, Download, Calendar, Clock, FileText, CheckCircle } from 'lucide-react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout header="Dashboard">
            <Head title="Dashboard" />

            {/* Status Card - Large */}
            <div className="mb-6">
                <div className="relative overflow-hidden rounded-2xl border border-white/40 bg-white/60 p-8 shadow-xl backdrop-blur-md">
                    {/* Yellow Accent Bar */}
                    <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-yellow-400 to-orange-500"></div>

                    {/* Message Icon */}
                    <div className="absolute right-8 top-8">
                        <div className="rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 p-3 shadow-lg">
                            <FileText className="h-6 w-6 text-white" />
                        </div>
                    </div>

                    <div className="relative">
                        <p className="mb-2 text-sm font-medium text-gray-600">Status Aplikasi:</p>
                        <h2 className="mb-3 text-4xl font-bold text-gray-900">
                            Sedang Direview
                        </h2>
                        <p className="max-w-2xl text-gray-700">
                            Permohonan magang Anda sedang dalam proses peninjauan oleh tim kami.
                            Kami akan mengirimkan pemberitahuan melalui email mengenai status permohonan Anda.
                        </p>

                        {/* Progress Bar */}
                        <div className="mt-6 flex items-center gap-4">
                            <div className="flex-1">
                                <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                                    <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500"></div>
                                </div>
                            </div>
                            <span className="text-sm font-semibold text-gray-600">67%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Cards Grid */}
            <div className="grid gap-6 md:grid-cols-3">
                {/* Card 1 - Langkah Selanjutnya */}
                <div className="group rounded-xl border border-white/40 bg-white/60 p-6 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    <div className="mb-4 inline-flex rounded-lg bg-blue-500/10 p-3">
                        <Mail className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-gray-900">
                        Langkah Selanjutnya
                    </h3>
                    <p className="mb-1 text-sm font-medium text-blue-600">(Cek Email)</p>
                    <p className="text-sm text-gray-700">
                        Periksa email Anda secara berkala untuk mendapatkan informasi terbaru mengenai proses seleksi magang.
                    </p>
                </div>

                {/* Card 2 - Pusat Unduhan */}
                <div className="group rounded-xl border border-white/40 bg-white/60 p-6 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    <div className="mb-4 inline-flex rounded-lg bg-green-500/10 p-3">
                        <Download className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-gray-900">
                        Pusat Unduhan
                    </h3>
                    <p className="mb-1 text-sm font-medium text-green-600">(Template)</p>
                    <p className="text-sm text-gray-700">
                        Download template dokumen yang diperlukan seperti surat permohonan, CV, dan formulir pendaftaran.
                    </p>

                    {/* Download Links */}
                    <div className="mt-4 space-y-2">
                        <a href="#" className="flex items-center gap-2 text-xs text-blue-600 hover:underline">
                            <Download className="h-3 w-3" />
                            Template Surat Permohonan
                        </a>
                        <a href="#" className="flex items-center gap-2 text-xs text-blue-600 hover:underline">
                            <Download className="h-3 w-3" />
                            Form Pendaftaran
                        </a>
                    </div>
                </div>

                {/* Card 3 - Jadwal Penting */}
                <div className="group rounded-xl border border-white/40 bg-white/60 p-6 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    <div className="mb-4 inline-flex rounded-lg bg-purple-500/10 p-3">
                        <Calendar className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-gray-900">
                        Jadwal Penting
                    </h3>
                    <p className="mb-3 text-sm text-gray-700">
                        Jadwal penting diharapkan incididunt ut labore et dolore magna tahun 2024.
                    </p>

                    {/* Timeline */}
                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <div className="mt-1 rounded-full bg-green-500 p-1">
                                <CheckCircle className="h-3 w-3 text-white" />
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-900">Pendaftaran Dibuka</p>
                                <p className="text-xs text-gray-600">1 Januari 2024</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="mt-1 rounded-full bg-yellow-500 p-1">
                                <Clock className="h-3 w-3 text-white" />
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-900">Batas Pendaftaran</p>
                                <p className="text-xs text-gray-600">31 Januari 2024</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Additional Info Section */}
            <div className="mt-6 rounded-xl border border-blue-200/60 bg-blue-50/60 p-6 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-blue-500 p-2">
                        <Mail className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                        <h4 className="mb-1 font-semibold text-blue-900">
                            Butuh Bantuan?
                        </h4>
                        <p className="text-sm text-blue-800">
                            Jika ada pertanyaan mengenai proses pendaftaran, silakan hubungi kami melalui email:
                            <a href="mailto:magang@klimatologi.id" className="ml-1 font-semibold underline">
                                magang@klimatologi.id
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
