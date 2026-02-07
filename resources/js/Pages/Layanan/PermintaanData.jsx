import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { FileText, CheckCircle, AlertCircle, ArrowRight, ExternalLink, User, Building, GraduationCap } from 'lucide-react';
import Navbar from '@/Components/Navbar';

export default function PermintaanData({ auth }) {
    const [selectedType, setSelectedType] = useState('umum');

    const requirementContent = {
        umum: {
            title: "Permohonan Umum",
            icon: <User className="w-6 h-6" />,
            color: "blue",
            items: [
                "Surat Permohonan yang ditanda tangani (jika dari perusahaan, dibubuhkan stempel perusahaan).",
                "KTP pemohon."
            ]
        },
        instansi: {
            title: "Permohonan Instansi Kerjasama BMKG",
            icon: <Building className="w-6 h-6" />,
            color: "purple",
            items: [
                "Surat Permohonan yang ditanda tangani oleh Kepala Instansi.",
                "KTP Pemohon."
            ]
        },
        mahasiswa: {
            title: "Permohonan Mahasiswa/Pelajar",
            icon: <GraduationCap className="w-6 h-6" />,
            color: "green",
            items: [
                "Surat Permohonan yang ditanda tangani oleh Kepala Prodi/ Dekan/ Pejabat Setingkat.",
                <span>Surat Permohonan Rp.0,- (Nol Rupiah) yang dapat diunduh melalui <a href="#" className="text-blue-600 underline hover:text-blue-800">link ini</a> atau pada menu Dokumen Pendukung.</span>,
                "Proposal Penelitian dalam bentuk .pdf (softcopy).",
                "KTP dan KTM pemohon."
            ]
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <Head title="Syarat & Ketentuan Permintaan Data - BMKG" />

            <Navbar auth={auth} />

            <main className="py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-screen">
                <div className="max-w-5xl mx-auto px-4 sm:px-6">
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-4">Layanan Data</span>
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Permintaan Data Klimatologi</h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Panduan lengkap, syarat, dan tata cara pengajuan permintaan data iklim dan cuaca di Stasiun Klimatologi.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column: Requirements */}
                        <div className="lg:col-span-2 space-y-8">

                            {/* Notice Card: Mohon Dipahami */}
                            <div className="bg-yellow-50 border border-yellow-200 rounded-3xl p-6 shadow-sm">
                                <h3 className="text-lg font-bold text-yellow-800 mb-4 flex items-center">
                                    <AlertCircle className="w-5 h-5 mr-2" />
                                    Mohon dipahami:
                                </h3>
                                <div className="space-y-3">
                                    <a
                                        href="/assets/Peraturan-Akses-Data-BMKG.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center p-3 bg-white rounded-xl border border-yellow-100 hover:border-blue-300 hover:shadow-md transition-all group"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mr-3 font-bold text-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">1</div>
                                        <div className="flex-1">
                                            <span className="text-gray-700 font-medium group-hover:text-blue-700">Peraturan mengenai akses data BMKG</span>
                                        </div>
                                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                                    </a>

                                    <a
                                        href="/assets/Peraturan-Tarif-PNBP-BMKG.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center p-3 bg-white rounded-xl border border-yellow-100 hover:border-blue-300 hover:shadow-md transition-all group"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mr-3 font-bold text-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">2</div>
                                        <div className="flex-1">
                                            <span className="text-gray-700 font-medium group-hover:text-blue-700">Peraturan mengenai Tarif PNBP BMKG</span>
                                        </div>
                                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                                    </a>
                                </div>
                            </div>

                            {/* Type Selection Tabs */}
                            <div className="bg-white rounded-3xl p-2 shadow-md border border-gray-100 flex p-1.5 gap-1.5 overflow-x-auto">
                                <button
                                    onClick={() => setSelectedType('umum')}
                                    className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 whitespace-nowrap ${selectedType === 'umum' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                                >
                                    <User className="w-4 h-4" />
                                    Umum/Perusahaan
                                </button>
                                <button
                                    onClick={() => setSelectedType('instansi')}
                                    className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 whitespace-nowrap ${selectedType === 'instansi' ? 'bg-purple-600 text-white shadow-md' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                                >
                                    <Building className="w-4 h-4" />
                                    Instansi Kerjasama
                                </button>
                                <button
                                    onClick={() => setSelectedType('mahasiswa')}
                                    className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 whitespace-nowrap ${selectedType === 'mahasiswa' ? 'bg-green-600 text-white shadow-md' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                                >
                                    <GraduationCap className="w-4 h-4" />
                                    Mahasiswa/Pelajar
                                </button>
                            </div>

                            {/* Dynamic Requirements Card */}
                            <div className="bg-white rounded-3xl p-8 shadow-xl border border-blue-100 transition-all duration-300">
                                <h3 className={`text-2xl font-bold text-gray-900 mb-6 flex items-center`}>
                                    <div className={`w-12 h-12 rounded-full bg-${requirementContent[selectedType].color}-100 text-${requirementContent[selectedType].color}-600 flex items-center justify-center mr-4`}>
                                        {requirementContent[selectedType].icon}
                                    </div>
                                    {requirementContent[selectedType].title}
                                </h3>
                                <div className="prose text-gray-600">
                                    <p className="mb-6 font-medium text-gray-700 bg-gray-50 p-4 rounded-xl border-l-4 border-blue-500">
                                        Berikut adalah berkas persyaratan yang harus dilengkapi untuk kategori ini:
                                    </p>
                                    <ul className="space-y-4 list-none pl-0">
                                        {requirementContent[selectedType].items.map((item, index) => (
                                            <li key={index} className="flex items-start p-3 hover:bg-blue-50 rounded-xl transition-colors">
                                                <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-${requirementContent[selectedType].color}-100 text-${requirementContent[selectedType].color}-600 flex items-center justify-center mt-0.5 mr-4 text-sm font-bold`}>{index + 1}</div>
                                                <span className="text-gray-700">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: CTA & Downloads */}
                        <div className="space-y-8">
                            {/* CTA Card */}
                            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 shadow-2xl text-white">
                                <h3 className="text-xl font-bold mb-4">Siap Mengajukan?</h3>
                                <p className="text-blue-100 mb-6">
                                    Pastikan seluruh berkas persyaratan telah lengkap dan discan dalam format PDF sebelum mengisi formulir.
                                </p>
                                <Link
                                    href={route('register')}
                                    className="block w-full text-center bg-white text-blue-700 font-bold py-3.5 px-6 rounded-xl hover:bg-yellow-300 hover:text-blue-900 transition-all shadow-lg flex items-center justify-center gap-2"
                                >
                                    Daftar untuk Pengajuan <ExternalLink className="w-5 h-5" />
                                </Link>
                            </div>

                            {/* Downloads */}
                            <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
                                <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                                    <FileText className="w-5 h-5 mr-2 text-blue-600" />
                                    Dokumen Pendukung
                                </h4>
                                <ul className="space-y-3">
                                    <li>
                                        <a href="/assets/documents/Form-Permohonan-Data.docx" download className="flex items-center text-sm text-gray-600 hover:text-blue-600 p-2 hover:bg-blue-50 rounded-lg transition-colors">
                                            <div className="w-8 h-8 rounded bg-blue-100 text-blue-600 flex items-center justify-center mr-3 font-bold text-xs">DOC</div>
                                            <span>Form Permohonan Data.docx</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/assets/documents/Surat-Pernyataan.docx" download className="flex items-center text-sm text-gray-600 hover:text-blue-600 p-2 hover:bg-blue-50 rounded-lg transition-colors">
                                            <div className="w-8 h-8 rounded bg-blue-100 text-blue-600 flex items-center justify-center mr-3 font-bold text-xs">DOC</div>
                                            <span>Surat Pernyataan.docx</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
