import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { FileText, Upload, X, AlertCircle, Send, Save } from 'lucide-react';

export default function CreateApplication() {
    const { data, setData, post, processing, errors, reset } = useForm({
        application_type: 'magang',
        applicant_type: 'student', // student or employee
        data_type: '', // For permohonan data: '00' or '01'
        data_category: '', // Specific data category: climate, rainfall, temperature, etc.
        data_period_start: '', // Start date for data request
        data_period_end: '', // End date for data request
        title: '',
        institution_name: '',
        institution_address: '',
        department: '',
        study_program: '',
        student_id: '',
        position: '', // For company employee
        phone: '',
        start_date: '',
        end_date: '',
        research_field: '',
        research_objective: '',
        supervisor_name: '',
        supervisor_contact: '',
        additional_notes: '',
        proposal: null,
        recommendation_letter: null,
        cv: null,
        transcript: null,
        identity_card: null,
        zero_fee_letter: null, // Surat Permohonan Rp.0 for students
    });

    const applicantTypes = [
        { value: 'student', label: 'Mahasiswa / Siswa' },
        { value: 'employee', label: 'Pegawai Perusahaan' },
    ];

    const applicationTypes = [
        { value: 'magang', label: 'Magang / Internship' },
        { value: 'penelitian', label: 'Penelitian / Research' },
        { value: 'pkl', label: 'Praktek Kerja Lapangan (PKL)' },
        { value: 'observasi', label: 'Kunjungan Observasi' },
        { value: 'kerja_praktek', label: 'Kerja Praktek' },
        { value: 'tugas_akhir', label: 'Tugas Akhir / Skripsi' },
        { value: 'permohonan_data', label: 'Permohonan Data' },
    ];

    const dataTypes = [
        { value: '00', label: '00 - Data Tarif Nol' },
        { value: '01', label: '01 - Data PNBP (Penerimaan Negara Non Pajak)' },
    ];

    const dataCategories = [
        { value: 'data_iklim', label: 'Data Iklim' },
        { value: 'data_curah_hujan', label: 'Data Curah Hujan' },
        { value: 'data_suhu', label: 'Data Suhu' },
        { value: 'data_kelembaban', label: 'Data Kelembaban' },
        { value: 'data_tekanan_udara', label: 'Data Tekanan Udara' },
        { value: 'data_kecepatan_angin', label: 'Data Kecepatan Angin' },
        { value: 'data_radiasi_matahari', label: 'Data Radiasi Matahari' },
        { value: 'data_lainnya', label: 'Data Lainnya' },
    ];

    const researchFields = [
        'Klimatologi',
        'Meteorologi',
        'Analisis Data Iklim',
        'Perubahan Iklim',
        'Kualitas Udara',
        'Prakiraan Cuaca',
        'Sistem Informasi Cuaca',
        'Instrumentasi Meteorologi',
        'Lainnya',
    ];

    const handleFileChange = (field, event) => {
        const file = event.target.files[0];
        if (file) {
            setData(field, file);
        }
    };

    const removeFile = (field) => {
        setData(field, null);
        // Reset file input
        const input = document.getElementById(field);
        if (input) input.value = '';
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('application.store'), {
            forceFormData: true,
        });
    };

    const getFileSize = (bytes) => {
        if (!bytes) return '0 B';
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };

    return (
        <AuthenticatedLayout header="Ajukan Permohonan Baru">
            <Head title="Ajukan Permohonan" />

            {/* Info Banner */}
            <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50/80 p-4 backdrop-blur-sm">
                <div className="flex gap-3">
                    <AlertCircle className="h-5 w-5 flex-shrink-0 text-blue-600" />
                    <div>
                        <h4 className="font-semibold text-blue-900">Informasi Penting</h4>
                        <p className="mt-1 text-sm text-blue-800">
                            Pastikan semua data yang Anda isi sudah benar dan lengkap. Permohonan akan diproses dalam 3-5 hari kerja.
                            Dokumen yang diunggah maksimal 5MB per file.
                        </p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Jenis Permohonan */}
                <div className="rounded-xl border border-white/40 bg-white/60 p-6 shadow-lg backdrop-blur-md">
                    <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                        <FileText className="h-5 w-5 text-blue-600" />
                        Jenis Permohonan
                    </h3>

                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {applicationTypes.map((type) => (
                            <label
                                key={type.value}
                                className={`cursor-pointer rounded-lg border-2 p-4 transition-all ${data.application_type === type.value
                                    ? 'border-blue-500 bg-blue-50 shadow-md'
                                    : 'border-gray-200 bg-white hover:border-blue-300'
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="application_type"
                                    value={type.value}
                                    checked={data.application_type === type.value}
                                    onChange={(e) => setData('application_type', e.target.value)}
                                    className="sr-only"
                                />
                                <div className="flex items-center gap-3">
                                    <div
                                        className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${data.application_type === type.value
                                            ? 'border-blue-500'
                                            : 'border-gray-300'
                                            }`}
                                    >
                                        {data.application_type === type.value && (
                                            <div className="h-2.5 w-2.5 rounded-full bg-blue-500"></div>
                                        )}
                                    </div>
                                    <span className="font-medium text-gray-900">{type.label}</span>
                                </div>
                            </label>
                        ))}
                    </div>
                    {errors.application_type && (
                        <p className="mt-2 text-sm text-red-600">{errors.application_type}</p>
                    )}

                    {/* Jenis Data - Show only when Permohonan Data is selected */}
                    {data.application_type === 'permohonan_data' && (
                        <div className="mt-4">
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Jenis Data <span className="text-red-500">*</span>
                            </label>
                            <div className="grid gap-3 sm:grid-cols-2">
                                {dataTypes.map((type) => (
                                    <label
                                        key={type.value}
                                        className={`cursor-pointer rounded-lg border-2 p-4 transition-all ${data.data_type === type.value
                                            ? 'border-blue-500 bg-blue-50 shadow-md'
                                            : 'border-gray-200 bg-white hover:border-blue-300'
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name="data_type"
                                            value={type.value}
                                            checked={data.data_type === type.value}
                                            onChange={(e) => setData('data_type', e.target.value)}
                                            className="sr-only"
                                            required={data.application_type === 'permohonan_data'}
                                        />
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${data.data_type === type.value
                                                    ? 'border-blue-500'
                                                    : 'border-gray-300'
                                                    }`}
                                            >
                                                {data.data_type === type.value && (
                                                    <div className="h-2.5 w-2.5 rounded-full bg-blue-500"></div>
                                                )}
                                            </div>
                                            <span className="font-medium text-gray-900">{type.label}</span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                            {errors.data_type && (
                                <p className="mt-2 text-sm text-red-600">{errors.data_type}</p>
                            )}

                            {/* Data Category - Show when data type is selected */}
                            {data.data_type && (
                                <div className="mt-4">
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Kategori Data <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={data.data_category}
                                        onChange={(e) => setData('data_category', e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                        required
                                    >
                                        <option value="">Pilih Kategori Data</option>
                                        {dataCategories.map((category) => (
                                            <option key={category.value} value={category.value}>
                                                {category.label}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.data_category && (
                                        <p className="mt-2 text-sm text-red-600">{errors.data_category}</p>
                                    )}
                                </div>
                            )}

                            {/* Data Period - Show when data category is selected */}
                            {data.data_type && data.data_category && (
                                <div className="mt-4">
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Periode Data yang Dibutuhkan <span className="text-red-500">*</span>
                                    </label>
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div>
                                            <label className="mb-1 block text-xs text-gray-600">Dari Tanggal</label>
                                            <input
                                                type="date"
                                                value={data.data_period_start}
                                                onChange={(e) => setData('data_period_start', e.target.value)}
                                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                                required
                                            />
                                            {errors.data_period_start && (
                                                <p className="mt-1 text-sm text-red-600">{errors.data_period_start}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="mb-1 block text-xs text-gray-600">Sampai Tanggal</label>
                                            <input
                                                type="date"
                                                value={data.data_period_end}
                                                onChange={(e) => setData('data_period_end', e.target.value)}
                                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                                required
                                            />
                                            {errors.data_period_end && (
                                                <p className="mt-1 text-sm text-red-600">{errors.data_period_end}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Tipe Pemohon Section */}
                <div className="rounded-xl border border-white/40 bg-white/60 p-6 shadow-lg backdrop-blur-md">
                    <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
                        <FileText className="h-5 w-5 text-blue-600" />
                        Tipe Pemohon
                    </h3>

                    {data.application_type === 'permohonan_data' ? (
                        <>
                            {/* For Permohonan Data: 3 options */}
                            <div className="grid gap-3 sm:grid-cols-3">
                                <label
                                    className={`cursor-pointer rounded-lg border-2 p-4 transition-all ${data.applicant_type === 'general'
                                        ? 'border-blue-500 bg-blue-50 shadow-md'
                                        : 'border-gray-200 bg-white hover:border-blue-300'
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="applicant_type"
                                        value="general"
                                        checked={data.applicant_type === 'general'}
                                        onChange={(e) => setData('applicant_type', e.target.value)}
                                        className="sr-only"
                                    />
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${data.applicant_type === 'general'
                                                ? 'border-blue-500'
                                                : 'border-gray-300'
                                                }`}
                                        >
                                            {data.applicant_type === 'general' && (
                                                <div className="h-2.5 w-2.5 rounded-full bg-blue-500"></div>
                                            )}
                                        </div>
                                        <span className="font-medium text-gray-900">Umum</span>
                                    </div>
                                </label>

                                <label
                                    className={`cursor-pointer rounded-lg border-2 p-4 transition-all ${data.applicant_type === 'agency'
                                        ? 'border-purple-500 bg-purple-50 shadow-md'
                                        : 'border-gray-200 bg-white hover:border-purple-300'
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="applicant_type"
                                        value="agency"
                                        checked={data.applicant_type === 'agency'}
                                        onChange={(e) => setData('applicant_type', e.target.value)}
                                        className="sr-only"
                                    />
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${data.applicant_type === 'agency'
                                                ? 'border-purple-500'
                                                : 'border-gray-300'
                                                }`}
                                        >
                                            {data.applicant_type === 'agency' && (
                                                <div className="h-2.5 w-2.5 rounded-full bg-purple-500"></div>
                                            )}
                                        </div>
                                        <span className="font-medium text-gray-900">Instansi Kerjasama BMKG</span>
                                    </div>
                                </label>

                                <label
                                    className={`cursor-pointer rounded-lg border-2 p-4 transition-all ${data.applicant_type === 'student'
                                        ? 'border-green-500 bg-green-50 shadow-md'
                                        : 'border-gray-200 bg-white hover:border-green-300'
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="applicant_type"
                                        value="student"
                                        checked={data.applicant_type === 'student'}
                                        onChange={(e) => setData('applicant_type', e.target.value)}
                                        className="sr-only"
                                    />
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${data.applicant_type === 'student'
                                                ? 'border-green-500'
                                                : 'border-gray-300'
                                                }`}
                                        >
                                            {data.applicant_type === 'student' && (
                                                <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
                                            )}
                                        </div>
                                        <span className="font-medium text-gray-900">Pelajar/Mahasiswa</span>
                                    </div>
                                </label>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* For Other Applications: 2 options */}
                            <div className="grid gap-3 sm:grid-cols-2">
                                {applicantTypes.map((type) => (
                                    <label
                                        key={type.value}
                                        className={`cursor-pointer rounded-lg border-2 p-4 transition-all ${data.applicant_type === type.value
                                            ? 'border-blue-500 bg-blue-50 shadow-md'
                                            : 'border-gray-200 bg-white hover:border-blue-300'
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name="applicant_type"
                                            value={type.value}
                                            checked={data.applicant_type === type.value}
                                            onChange={(e) => setData('applicant_type', e.target.value)}
                                            className="sr-only"
                                        />
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${data.applicant_type === type.value
                                                    ? 'border-blue-500'
                                                    : 'border-gray-300'
                                                    }`}
                                            >
                                                {data.applicant_type === type.value && (
                                                    <div className="h-2.5 w-2.5 rounded-full bg-blue-500"></div>
                                                )}
                                            </div>
                                            <span className="font-medium text-gray-900">{type.label}</span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </>
                    )}

                    {errors.applicant_type && (
                        <p className="mt-2 text-sm text-red-600">{errors.applicant_type}</p>
                    )}
                </div>

                {/* Data Diri & Institusi */}
                <div className="rounded-xl border border-white/40 bg-white/60 p-6 shadow-lg backdrop-blur-md">
                    <h3 className="mb-4 text-lg font-bold text-gray-900">
                        {data.applicant_type === 'student' ? 'Data Diri & Institusi' : 'Data Diri & Perusahaan'}
                    </h3>

                    <div className="grid gap-4 md:grid-cols-2">
                        {/* Judul Permohonan */}
                        <div className="md:col-span-2">
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Judul Permohonan <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                placeholder={data.applicant_type === 'student' ? "Contoh: Magang Analisis Data Iklim" : "Contoh: Penelitian Pola Cuaca Ekstrem"}
                                required
                            />
                            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                        </div>

                        {/* Nama Institusi/Perusahaan */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                {data.applicant_type === 'student' ? 'Nama Institusi/Universitas' : 'Nama Perusahaan'} <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={data.institution_name}
                                onChange={(e) => setData('institution_name', e.target.value)}
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                placeholder={data.applicant_type === 'student' ? "Universitas Indonesia" : "PT. Contoh Perusahaan"}
                                required
                            />
                            {errors.institution_name && (
                                <p className="mt-1 text-sm text-red-600">{errors.institution_name}</p>
                            )}
                        </div>

                        {/* Conditional Fields for Students */}
                        {data.applicant_type === 'student' ? (
                            <>
                                {/* Fakultas/Jurusan */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Fakultas/Jurusan <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.department}
                                        onChange={(e) => setData('department', e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                        placeholder="Fakultas MIPA"
                                        required
                                    />
                                    {errors.department && (
                                        <p className="mt-1 text-sm text-red-600">{errors.department}</p>
                                    )}
                                </div>

                                {/* Program Studi */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Program Studi <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.study_program}
                                        onChange={(e) => setData('study_program', e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                        placeholder="Geofisika"
                                        required
                                    />
                                    {errors.study_program && (
                                        <p className="mt-1 text-sm text-red-600">{errors.study_program}</p>
                                    )}
                                </div>

                                {/* NIM */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        NIM/NIS <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.student_id}
                                        onChange={(e) => setData('student_id', e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                        placeholder="1234567890"
                                        required
                                    />
                                    {errors.student_id && (
                                        <p className="mt-1 text-sm text-red-600">{errors.student_id}</p>
                                    )}
                                </div>
                            </>
                        ) : (
                            <>
                                {/* Jabatan/Posisi for Employee */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Jabatan/Posisi <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.position}
                                        onChange={(e) => setData('position', e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                        placeholder="Peneliti / Analis Data / Manager"
                                        required
                                    />
                                    {errors.position && (
                                        <p className="mt-1 text-sm text-red-600">{errors.position}</p>
                                    )}
                                </div>
                            </>
                        )}

                        {/* No Telepon */}
                        <div className="md:col-span-2">
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Nomor Telepon/WhatsApp <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                placeholder="08123456789"
                                required
                            />
                            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                        </div>

                        {/* Alamat Institusi */}
                        <div className="md:col-span-2">
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                {data.applicant_type === 'student' ? 'Alamat Institusi' : 'Alamat Perusahaan'}
                            </label>
                            <textarea
                                value={data.institution_address}
                                onChange={(e) => setData('institution_address', e.target.value)}
                                rows="2"
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                placeholder={data.applicant_type === 'student' ? "Jl. Margonda Raya, Depok" : "Jl. Sudirman No. 123, Jakarta"}
                            />
                            {errors.institution_address && (
                                <p className="mt-1 text-sm text-red-600">{errors.institution_address}</p>
                            )}
                        </div>
                    </div>
                </div>


                {/* Periode & Bidang - Hide for Permohonan Data */}
                {data.application_type !== 'permohonan_data' && (
                    <div className="rounded-xl border border-white/40 bg-white/60 p-6 shadow-lg backdrop-blur-md">
                        <h3 className="mb-4 text-lg font-bold text-gray-900">
                            Periode {data.application_type === 'penelitian' ? '& Bidang Penelitian' : ''}
                        </h3>

                        <div className="grid gap-4 md:grid-cols-2">
                            {/* Tanggal Mulai */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Tanggal Mulai <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    value={data.start_date}
                                    onChange={(e) => setData('start_date', e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                    required
                                />
                                {errors.start_date && (
                                    <p className="mt-1 text-sm text-red-600">{errors.start_date}</p>
                                )}
                            </div>

                            {/* Tanggal Selesai */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Tanggal Selesai <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    value={data.end_date}
                                    onChange={(e) => setData('end_date', e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                    required
                                />
                                {errors.end_date && (
                                    <p className="mt-1 text-sm text-red-600">{errors.end_date}</p>
                                )}
                            </div>

                            {/* Bidang Penelitian (jika penelitian) */}
                            {(data.application_type === 'penelitian' || data.application_type === 'tugas_akhir') && (
                                <>
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            Bidang Penelitian <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            value={data.research_field}
                                            onChange={(e) => setData('research_field', e.target.value)}
                                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                            required
                                        >
                                            <option value="">Pilih Bidang</option>
                                            {researchFields.map((field) => (
                                                <option key={field} value={field}>
                                                    {field}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.research_field && (
                                            <p className="mt-1 text-sm text-red-600">{errors.research_field}</p>
                                        )}
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            Tujuan Penelitian
                                        </label>
                                        <textarea
                                            value={data.research_objective}
                                            onChange={(e) => setData('research_objective', e.target.value)}
                                            rows="3"
                                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                            placeholder="Jelaskan tujuan penelitian Anda..."
                                        />
                                        {errors.research_objective && (
                                            <p className="mt-1 text-sm text-red-600">{errors.research_objective}</p>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}


                {/* Dosen Pembimbing - Only for Students */}
                {data.applicant_type === 'student' && (
                    <div className="rounded-xl border border-white/40 bg-white/60 p-6 shadow-lg backdrop-blur-md">
                        <h3 className="mb-4 text-lg font-bold text-gray-900">Dosen Pembimbing</h3>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Nama Dosen Pembimbing
                                </label>
                                <input
                                    type="text"
                                    value={data.supervisor_name}
                                    onChange={(e) => setData('supervisor_name', e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                    placeholder="Dr. Nama Pembimbing"
                                />
                                {errors.supervisor_name && (
                                    <p className="mt-1 text-sm text-red-600">{errors.supervisor_name}</p>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Kontak Dosen
                                </label>
                                <input
                                    type="text"
                                    value={data.supervisor_contact}
                                    onChange={(e) => setData('supervisor_contact', e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                    placeholder="Email atau No. Telepon"
                                />
                                {errors.supervisor_contact && (
                                    <p className="mt-1 text-sm text-red-600">{errors.supervisor_contact}</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Upload Dokumen */}
                <div className="rounded-xl border border-white/40 bg-white/60 p-6 shadow-lg backdrop-blur-md">
                    <h3 className="mb-4 text-lg font-bold text-gray-900">Upload Dokumen Pendukung</h3>

                    <div className="space-y-4">
                        {data.application_type === 'permohonan_data' ? (
                            <>
                                {/* For Permohonan Data - Conditional based on applicant_type */}

                                {/* 1. Surat Permohonan (All types) */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        {data.applicant_type === 'general' && 'Surat Permohonan yang ditanda tangani (jika dari perusahaan, dibubuhkan stempel perusahaan)'}
                                        {data.applicant_type === 'agency' && 'Surat Permohonan yang ditanda tangani oleh Kepala Instansi'}
                                        {data.applicant_type === 'student' && 'Surat Permohonan yang ditanda tangani oleh Kepala Prodi/Dekan/Pejabat Setingkat'}
                                        <span className="text-red-500"> *</span>
                                    </label>
                                    {!data.recommendation_letter ? (
                                        <label className="flex cursor-pointer items-center gap-3 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4 transition hover:border-blue-500 hover:bg-blue-50">
                                            <Upload className="h-5 w-5 text-gray-400" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-700">
                                                    Klik untuk upload surat permohonan
                                                </p>
                                                <p className="text-xs text-gray-500">PDF (Max 5MB)</p>
                                            </div>
                                            <input
                                                id="recommendation_letter"
                                                type="file"
                                                accept=".pdf"
                                                onChange={(e) => handleFileChange('recommendation_letter', e)}
                                                className="sr-only"
                                            />
                                        </label>
                                    ) : (
                                        <div className="flex items-center justify-between rounded-lg border border-green-300 bg-green-50 p-3">
                                            <div className="flex items-center gap-3">
                                                <FileText className="h-5 w-5 text-green-600" />
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {data.recommendation_letter.name}
                                                    </p>
                                                    <p className="text-xs text-gray-600">
                                                        {getFileSize(data.recommendation_letter.size)}
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeFile('recommendation_letter')}
                                                className="rounded-lg p-1 text-red-600 hover:bg-red-100"
                                            >
                                                <X className="h-5 w-5" />
                                            </button>
                                        </div>
                                    )}
                                    {errors.recommendation_letter && <p className="mt-1 text-sm text-red-600">{errors.recommendation_letter}</p>}
                                </div>

                                {/* 2. Surat Permohonan Rp.0 (Only for Student) */}
                                {data.applicant_type === 'student' && (
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            Surat Permohonan Rp.0 <span className="text-red-500"> *</span>
                                        </label>
                                        <p className="mb-2 text-xs text-blue-600">
                                            Template dapat diunduh di{' '}
                                            <a href="/layanan" target="_blank" className="font-semibold underline hover:text-blue-800">
                                                laman layanan
                                            </a>
                                        </p>
                                        {!data.zero_fee_letter ? (
                                            <label className="flex cursor-pointer items-center gap-3 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4 transition hover:border-blue-500 hover:bg-blue-50">
                                                <Upload className="h-5 w-5 text-gray-400" />
                                                <div>
                                                    <p className="text-sm font-medium text-gray-700">
                                                        Klik untuk upload surat permohonan Rp.0
                                                    </p>
                                                    <p className="text-xs text-gray-500">PDF (Max 5MB)</p>
                                                </div>
                                                <input
                                                    id="zero_fee_letter"
                                                    type="file"
                                                    accept=".pdf"
                                                    onChange={(e) => handleFileChange('zero_fee_letter', e)}
                                                    className="sr-only"
                                                />
                                            </label>
                                        ) : (
                                            <div className="flex items-center justify-between rounded-lg border border-green-300 bg-green-50 p-3">
                                                <div className="flex items-center gap-3">
                                                    <FileText className="h-5 w-5 text-green-600" />
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">
                                                            {data.zero_fee_letter.name}
                                                        </p>
                                                        <p className="text-xs text-gray-600">
                                                            {getFileSize(data.zero_fee_letter.size)}
                                                        </p>
                                                    </div>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeFile('zero_fee_letter')}
                                                    className="rounded-lg p-1 text-red-600 hover:bg-red-100"
                                                >
                                                    <X className="h-5 w-5" />
                                                </button>
                                            </div>
                                        )}
                                        {errors.zero_fee_letter && <p className="mt-1 text-sm text-red-600">{errors.zero_fee_letter}</p>}
                                    </div>
                                )}

                                {/* 3. Proposal Penelitian (Only for Student) */}
                                {data.applicant_type === 'student' && (
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            Proposal Penelitian (PDF/Hardcopy) <span className="text-red-500"> *</span>
                                        </label>
                                        {!data.proposal ? (
                                            <label className="flex cursor-pointer items-center gap-3 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4 transition hover:border-blue-500 hover:bg-blue-50">
                                                <Upload className="h-5 w-5 text-gray-400" />
                                                <div>
                                                    <p className="text-sm font-medium text-gray-700">
                                                        Klik untuk upload proposal penelitian
                                                    </p>
                                                    <p className="text-xs text-gray-500">PDF, DOC, DOCX (Max 5MB)</p>
                                                </div>
                                                <input
                                                    id="proposal"
                                                    type="file"
                                                    accept=".pdf,.doc,.docx"
                                                    onChange={(e) => handleFileChange('proposal', e)}
                                                    className="sr-only"
                                                />
                                            </label>
                                        ) : (
                                            <div className="flex items-center justify-between rounded-lg border border-green-300 bg-green-50 p-3">
                                                <div className="flex items-center gap-3">
                                                    <FileText className="h-5 w-5 text-green-600" />
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">
                                                            {data.proposal.name}
                                                        </p>
                                                        <p className="text-xs text-gray-600">
                                                            {getFileSize(data.proposal.size)}
                                                        </p>
                                                    </div>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeFile('proposal')}
                                                    className="rounded-lg p-1 text-red-600 hover:bg-red-100"
                                                >
                                                    <X className="h-5 w-5" />
                                                </button>
                                            </div>
                                        )}
                                        {errors.proposal && <p className="mt-1 text-sm text-red-600">{errors.proposal}</p>}
                                    </div>
                                )}

                                {/* 4. KTP (All types) */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        KTP Pemohon <span className="text-red-500"> *</span>
                                    </label>
                                    {!data.identity_card ? (
                                        <label className="flex cursor-pointer items-center gap-3 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4 transition hover:border-blue-500 hover:bg-blue-50">
                                            <Upload className="h-5 w-5 text-gray-400" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-700">
                                                    Klik untuk upload KTP
                                                </p>
                                                <p className="text-xs text-gray-500">PDF, JPG, PNG (Max 5MB)</p>
                                            </div>
                                            <input
                                                id="identity_card"
                                                type="file"
                                                accept=".pdf,.jpg,.jpeg,.png"
                                                onChange={(e) => handleFileChange('identity_card', e)}
                                                className="sr-only"
                                            />
                                        </label>
                                    ) : (
                                        <div className="flex items-center justify-between rounded-lg border border-green-300 bg-green-50 p-3">
                                            <div className="flex items-center gap-3">
                                                <FileText className="h-5 w-5 text-green-600" />
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {data.identity_card.name}
                                                    </p>
                                                    <p className="text-xs text-gray-600">
                                                        {getFileSize(data.identity_card.size)}
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeFile('identity_card')}
                                                className="rounded-lg p-1 text-red-600 hover:bg-red-100"
                                            >
                                                <X className="h-5 w-5" />
                                            </button>
                                        </div>
                                    )}
                                    {errors.identity_card && <p className="mt-1 text-sm text-red-600">{errors.identity_card}</p>}
                                </div>

                                {/* 5. KTM (Only for Student) */}
                                {data.applicant_type === 'student' && (
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            KTM (Kartu Tanda Mahasiswa) <span className="text-red-500"> *</span>
                                        </label>
                                        {!data.cv ? (
                                            <label className="flex cursor-pointer items-center gap-3 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4 transition hover:border-blue-500 hover:bg-blue-50">
                                                <Upload className="h-5 w-5 text-gray-400" />
                                                <div>
                                                    <p className="text-sm font-medium text-gray-700">
                                                        Klik untuk upload KTM
                                                    </p>
                                                    <p className="text-xs text-gray-500">PDF, JPG, PNG (Max 5MB)</p>
                                                </div>
                                                <input
                                                    id="cv"
                                                    type="file"
                                                    accept=".pdf,.jpg,.jpeg,.png"
                                                    onChange={(e) => handleFileChange('cv', e)}
                                                    className="sr-only"
                                                />
                                            </label>
                                        ) : (
                                            <div className="flex items-center justify-between rounded-lg border border-green-300 bg-green-50 p-3">
                                                <div className="flex items-center gap-3">
                                                    <FileText className="h-5 w-5 text-green-600" />
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">
                                                            {data.cv.name}
                                                        </p>
                                                        <p className="text-xs text-gray-600">
                                                            {getFileSize(data.cv.size)}
                                                        </p>
                                                    </div>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeFile('cv')}
                                                    className="rounded-lg p-1 text-red-600 hover:bg-red-100"
                                                >
                                                    <X className="h-5 w-5" />
                                                </button>
                                            </div>
                                        )}
                                        {errors.cv && <p className="mt-1 text-sm text-red-600">{errors.cv}</p>}
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                {/* For Other Application Types (magang, pkl, penelitian, etc.) */}

                                {/* 1. Proposal - Wajib untuk penelitian/tugas_akhir, opsional untuk lainnya */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Proposal{' '}
                                        {['penelitian', 'tugas_akhir'].includes(data.application_type)
                                            ? <span className="text-red-500">*</span>
                                            : <span className="text-gray-400">(Opsional)</span>
                                        }
                                    </label>
                                    {!data.proposal ? (
                                        <label className="flex cursor-pointer items-center gap-3 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4 transition hover:border-blue-500 hover:bg-blue-50">
                                            <Upload className="h-5 w-5 text-gray-400" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-700">
                                                    Klik untuk upload proposal
                                                </p>
                                                <p className="text-xs text-gray-500">PDF, DOC, DOCX (Max 5MB)</p>
                                            </div>
                                            <input
                                                id="proposal"
                                                type="file"
                                                accept=".pdf,.doc,.docx"
                                                onChange={(e) => handleFileChange('proposal', e)}
                                                className="sr-only"
                                            />
                                        </label>
                                    ) : (
                                        <div className="flex items-center justify-between rounded-lg border border-green-300 bg-green-50 p-3">
                                            <div className="flex items-center gap-3">
                                                <FileText className="h-5 w-5 text-green-600" />
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{data.proposal.name}</p>
                                                    <p className="text-xs text-gray-600">{getFileSize(data.proposal.size)}</p>
                                                </div>
                                            </div>
                                            <button type="button" onClick={() => removeFile('proposal')} className="rounded-lg p-1 text-red-600 hover:bg-red-100">
                                                <X className="h-5 w-5" />
                                            </button>
                                        </div>
                                    )}
                                    {errors.proposal && <p className="mt-1 text-sm text-red-600">{errors.proposal}</p>}
                                </div>

                                {/* 2. Surat Pengantar - WAJIB untuk semua */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Surat Pengantar dari Institusi <span className="text-red-500">*</span>
                                    </label>
                                    {!data.recommendation_letter ? (
                                        <label className="flex cursor-pointer items-center gap-3 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4 transition hover:border-blue-500 hover:bg-blue-50">
                                            <Upload className="h-5 w-5 text-gray-400" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-700">Klik untuk upload surat pengantar</p>
                                                <p className="text-xs text-gray-500">PDF (Max 5MB)</p>
                                            </div>
                                            <input
                                                id="recommendation_letter"
                                                type="file"
                                                accept=".pdf"
                                                onChange={(e) => handleFileChange('recommendation_letter', e)}
                                                className="sr-only"
                                            />
                                        </label>
                                    ) : (
                                        <div className="flex items-center justify-between rounded-lg border border-green-300 bg-green-50 p-3">
                                            <div className="flex items-center gap-3">
                                                <FileText className="h-5 w-5 text-green-600" />
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{data.recommendation_letter.name}</p>
                                                    <p className="text-xs text-gray-600">{getFileSize(data.recommendation_letter.size)}</p>
                                                </div>
                                            </div>
                                            <button type="button" onClick={() => removeFile('recommendation_letter')} className="rounded-lg p-1 text-red-600 hover:bg-red-100">
                                                <X className="h-5 w-5" />
                                            </button>
                                        </div>
                                    )}
                                    {errors.recommendation_letter && <p className="mt-1 text-sm text-red-600">{errors.recommendation_letter}</p>}
                                </div>

                                {/* 3. KTP / Kartu Identitas - WAJIB untuk semua */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        KTP / Kartu Identitas <span className="text-red-500">*</span>
                                    </label>
                                    {!data.identity_card ? (
                                        <label className="flex cursor-pointer items-center gap-3 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4 transition hover:border-blue-500 hover:bg-blue-50">
                                            <Upload className="h-5 w-5 text-gray-400" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-700">Klik untuk upload KTP</p>
                                                <p className="text-xs text-gray-500">PDF, JPG, PNG (Max 5MB)</p>
                                            </div>
                                            <input
                                                id="identity_card"
                                                type="file"
                                                accept=".pdf,.jpg,.jpeg,.png"
                                                onChange={(e) => handleFileChange('identity_card', e)}
                                                className="sr-only"
                                            />
                                        </label>
                                    ) : (
                                        <div className="flex items-center justify-between rounded-lg border border-green-300 bg-green-50 p-3">
                                            <div className="flex items-center gap-3">
                                                <FileText className="h-5 w-5 text-green-600" />
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{data.identity_card.name}</p>
                                                    <p className="text-xs text-gray-600">{getFileSize(data.identity_card.size)}</p>
                                                </div>
                                            </div>
                                            <button type="button" onClick={() => removeFile('identity_card')} className="rounded-lg p-1 text-red-600 hover:bg-red-100">
                                                <X className="h-5 w-5" />
                                            </button>
                                        </div>
                                    )}
                                    {errors.identity_card && <p className="mt-1 text-sm text-red-600">{errors.identity_card}</p>}
                                </div>

                                {/* 4. CV / KTM - Wajib untuk mahasiswa */}
                                {data.applicant_type === 'student' && (
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            CV / Kartu Tanda Mahasiswa (KTM) <span className="text-red-500">*</span>
                                        </label>
                                        {!data.cv ? (
                                            <label className="flex cursor-pointer items-center gap-3 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4 transition hover:border-blue-500 hover:bg-blue-50">
                                                <Upload className="h-5 w-5 text-gray-400" />
                                                <div>
                                                    <p className="text-sm font-medium text-gray-700">Klik untuk upload CV / KTM</p>
                                                    <p className="text-xs text-gray-500">PDF, JPG, PNG (Max 5MB)</p>
                                                </div>
                                                <input
                                                    id="cv"
                                                    type="file"
                                                    accept=".pdf,.jpg,.jpeg,.png"
                                                    onChange={(e) => handleFileChange('cv', e)}
                                                    className="sr-only"
                                                />
                                            </label>
                                        ) : (
                                            <div className="flex items-center justify-between rounded-lg border border-green-300 bg-green-50 p-3">
                                                <div className="flex items-center gap-3">
                                                    <FileText className="h-5 w-5 text-green-600" />
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">{data.cv.name}</p>
                                                        <p className="text-xs text-gray-600">{getFileSize(data.cv.size)}</p>
                                                    </div>
                                                </div>
                                                <button type="button" onClick={() => removeFile('cv')} className="rounded-lg p-1 text-red-600 hover:bg-red-100">
                                                    <X className="h-5 w-5" />
                                                </button>
                                            </div>
                                        )}
                                        {errors.cv && <p className="mt-1 text-sm text-red-600">{errors.cv}</p>}
                                    </div>
                                )}

                                {/* 5. Transcript (Opsional) */}
                                {data.applicant_type === 'student' && (
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            Transkrip Nilai <span className="text-gray-400">(Opsional)</span>
                                        </label>
                                        {!data.transcript ? (
                                            <label className="flex cursor-pointer items-center gap-3 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4 transition hover:border-blue-500 hover:bg-blue-50">
                                                <Upload className="h-5 w-5 text-gray-400" />
                                                <div>
                                                    <p className="text-sm font-medium text-gray-700">Klik untuk upload transkrip</p>
                                                    <p className="text-xs text-gray-500">PDF (Max 5MB)</p>
                                                </div>
                                                <input
                                                    id="transcript"
                                                    type="file"
                                                    accept=".pdf"
                                                    onChange={(e) => handleFileChange('transcript', e)}
                                                    className="sr-only"
                                                />
                                            </label>
                                        ) : (
                                            <div className="flex items-center justify-between rounded-lg border border-green-300 bg-green-50 p-3">
                                                <div className="flex items-center gap-3">
                                                    <FileText className="h-5 w-5 text-green-600" />
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">{data.transcript.name}</p>
                                                        <p className="text-xs text-gray-600">{getFileSize(data.transcript.size)}</p>
                                                    </div>
                                                </div>
                                                <button type="button" onClick={() => removeFile('transcript')} className="rounded-lg p-1 text-red-600 hover:bg-red-100">
                                                    <X className="h-5 w-5" />
                                                </button>
                                            </div>
                                        )}
                                        {errors.transcript && <p className="mt-1 text-sm text-red-600">{errors.transcript}</p>}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>

                {/* Catatan Tambahan */}
                <div className="rounded-xl border border-white/40 bg-white/60 p-6 shadow-lg backdrop-blur-md">
                    <h3 className="mb-4 text-lg font-bold text-gray-900">Catatan Tambahan</h3>
                    <textarea
                        value={data.additional_notes}
                        onChange={(e) => setData('additional_notes', e.target.value)}
                        rows="4"
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                        placeholder="Tambahkan informasi lain yang perlu kami ketahui..."
                    />
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-4">
                    <button
                        type="button"
                        onClick={() => window.history.back()}
                        className="flex-1 rounded-xl border-2 border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition-all hover:bg-gray-100 md:flex-none md:px-8"
                    >
                        Batal
                    </button>
                    <button
                        type="submit"
                        disabled={processing}
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:from-blue-700 hover:to-blue-800 disabled:cursor-not-allowed disabled:opacity-50 md:px-8"
                    >
                        {processing ? (
                            <>
                                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                Mengirim...
                            </>
                        ) : (
                            <>
                                <Send className="h-5 w-5" />
                                Kirim Permohonan
                            </>
                        )}
                    </button>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}
