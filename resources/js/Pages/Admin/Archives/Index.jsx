import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { FileText, Download, Trash, Plus, Search, Calendar, Inbox, Send, Edit, Eye, X, Printer } from 'lucide-react';
import { useState } from 'react';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function ArchivesIndex({ auth, archives, filters, stats, chartData }) {
    const [activeTab, setActiveTab] = useState(filters.category || 'incoming');
    const [searchQuery, setSearchQuery] = useState(filters.search || '');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingArchive, setEditingArchive] = useState(null);
    const [previewFile, setPreviewFile] = useState(null);
    const [showPreview, setShowPreview] = useState(false);
    const [showExportModal, setShowExportModal] = useState(false);
    const [exportFormat, setExportFormat] = useState('excel');
    const [exportPeriod, setExportPeriod] = useState('all');
    const [exportMonth, setExportMonth] = useState(new Date().getMonth() + 1);
    const [exportYear, setExportYear] = useState(new Date().getFullYear());

    const { data, setData, post, processing, errors, reset } = useForm({
        category: 'incoming',
        reference_number: '',
        date: '',
        sender: '',
        recipient: '',
        subject: '',
        description: '',
        file: null,
    });

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        router.get(route('admin.archives.index'), { category: tab, search: searchQuery }, { preserveState: true });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.archives.index'), { category: activeTab, search: searchQuery }, { preserveState: true });
    };

    const openModal = (category) => {
        setEditingArchive(null);
        setData({
            category: category,
            reference_number: '',
            date: '',
            sender: '',
            recipient: '',
            subject: '',
            description: '',
            file: null,
        });
        setIsModalOpen(true);
    };

    const openEditModal = (archive) => {
        setEditingArchive(archive);
        setData({
            category: archive.category,
            reference_number: archive.reference_number,
            date: archive.date,
            sender: archive.sender,
            recipient: archive.recipient,
            subject: archive.subject,
            description: archive.description || '',
            file: null,
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingArchive(null);
        reset();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingArchive) {
            router.post(route('admin.archives.update', editingArchive.id), {
                _method: 'PUT',
                ...data,
            }, {
                onSuccess: () => closeModal(),
                forceFormData: true,
            });
        } else {
            post(route('admin.archives.store'), {
                onSuccess: () => closeModal(),
                forceFormData: true,
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus arsip ini?')) {
            router.delete(route('admin.archives.destroy', id));
        }
    };

    const openPreview = (filePath) => {
        setPreviewFile(filePath);
        setShowPreview(true);
    };

    const closePreview = () => {
        setShowPreview(false);
        setPreviewFile(null);
    };

    const handleExport = () => {
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = route('admin.archives.export');
        form.style.display = 'none';

        // CSRF Token
        const csrfInput = document.createElement('input');
        csrfInput.type = 'hidden';
        csrfInput.name = '_token';
        csrfInput.value = document.querySelector('meta[name="csrf-token"]').content;
        form.appendChild(csrfInput);

        // Format
        const formatInput = document.createElement('input');
        formatInput.type = 'hidden';
        formatInput.name = 'format';
        formatInput.value = exportFormat;
        form.appendChild(formatInput);

        // Category
        const categoryInput = document.createElement('input');
        categoryInput.type = 'hidden';
        categoryInput.name = 'category';
        categoryInput.value = activeTab;
        form.appendChild(categoryInput);

        // Period
        const periodInput = document.createElement('input');
        periodInput.type = 'hidden';
        periodInput.name = 'period';
        periodInput.value = exportPeriod;
        form.appendChild(periodInput);

        // Month (if needed)
        if (exportPeriod === 'month') {
            const monthInput = document.createElement('input');
            monthInput.type = 'hidden';
            monthInput.name = 'month';
            monthInput.value = exportMonth;
            form.appendChild(monthInput);
        }

        // Year (if needed)
        if (exportPeriod === 'month' || exportPeriod === 'year') {
            const yearInput = document.createElement('input');
            yearInput.type = 'hidden';
            yearInput.name = 'year';
            yearInput.value = exportYear;
            form.appendChild(yearInput);
        }

        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);

        setShowExportModal(false);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Arsip Surat</h2>}
        >
            <Head title="Arsip Surat" />

            <div className="space-y-6">
                {/* Search and Action Buttons */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setShowExportModal(true)}
                            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
                        >
                            <Printer className="h-5 w-5" />
                            Cetak Arsip
                        </button>
                        <button
                            onClick={() => openModal(activeTab)}
                            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-700"
                        >
                            <Plus className="h-5 w-5" />
                            Tambah Arsip
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-2">
                    <div
                        onClick={() => handleTabChange('incoming')}
                        className={`cursor-pointer rounded-xl border p-5 shadow-lg backdrop-blur-md transition-all hover:scale-105 ${activeTab === 'incoming'
                            ? 'border-green-400 bg-green-500/20'
                            : 'border-white/40 bg-white/60'
                            }`}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Surat Masuk</p>
                                <p className="mt-1 text-3xl font-bold text-green-600">
                                    {stats?.incoming || 0}
                                </p>
                            </div>
                            <Inbox className="h-8 w-8 text-green-600" />
                        </div>
                    </div>

                    <div
                        onClick={() => handleTabChange('outgoing')}
                        className={`cursor-pointer rounded-xl border p-5 shadow-lg backdrop-blur-md transition-all hover:scale-105 ${activeTab === 'outgoing'
                            ? 'border-blue-400 bg-blue-500/20'
                            : 'border-white/40 bg-white/60'
                            }`}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Surat Keluar</p>
                                <p className="mt-1 text-3xl font-bold text-blue-600">
                                    {stats?.outgoing || 0}
                                </p>
                            </div>
                            <Send className="h-8 w-8 text-blue-600" />
                        </div>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="rounded-xl border border-white/40 bg-white/60 p-4 shadow-lg backdrop-blur-md">
                    <form onSubmit={handleSearch} className="flex gap-3">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Cari nomor/perihal..."
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

                {/* Archives Table */}
                <div className="rounded-xl border border-white/40 bg-white/60 shadow-lg backdrop-blur-md">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="border-b border-gray-200 bg-gray-50/50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                                        Pengirim / Penerima
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                                        Perihal
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                                        Kategori
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                                        Tanggal
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-700">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {archives.data.length > 0 ? (
                                    archives.data.map((archive) => (
                                        <tr key={archive.id} className="transition-colors hover:bg-blue-50/50">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                                                        <FileText className="h-5 w-5 text-blue-600" />
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-900">{archive.sender}</p>
                                                        <p className="text-sm text-gray-500">Kepada: {archive.recipient}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="font-medium text-gray-900">{archive.subject}</p>
                                                <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                                                    <FileText className="h-4 w-4" />
                                                    {archive.reference_number}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${archive.category === 'incoming'
                                                    ? 'border-green-300 bg-green-100 text-green-700'
                                                    : 'border-blue-300 bg-blue-100 text-blue-700'
                                                    }`}>
                                                    {archive.category === 'incoming' ? (
                                                        <>
                                                            <Inbox className="h-3.5 w-3.5" />
                                                            Surat Masuk
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Send className="h-3.5 w-3.5" />
                                                            Surat Keluar
                                                        </>
                                                    )}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-sm text-gray-700">
                                                    <Calendar className="h-4 w-4" />
                                                    <span>
                                                        {new Date(archive.date).toLocaleDateString('id-ID', {
                                                            day: '2-digit',
                                                            month: 'short',
                                                            year: 'numeric'
                                                        })}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => openPreview(archive.file_path)}
                                                        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                        Detail
                                                    </button>
                                                    <a
                                                        href={`/storage/${archive.file_path}`}
                                                        download
                                                        className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white p-2 text-gray-600 transition-colors hover:bg-gray-50"
                                                        title="Download"
                                                    >
                                                        <Download className="h-4 w-4" />
                                                    </a>
                                                    <button
                                                        onClick={() => openEditModal(archive)}
                                                        className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white p-2 text-gray-600 transition-colors hover:bg-gray-50"
                                                        title="Edit"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(archive.id)}
                                                        className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white p-2 text-red-600 transition-colors hover:bg-red-50"
                                                        title="Hapus"
                                                    >
                                                        <Trash className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="py-12 text-center">
                                            <FileText className="mx-auto h-12 w-12 text-gray-300" />
                                            <p className="mt-2 text-gray-500">Tidak ada arsip surat ditemukan</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {archives.links && archives.links.length > 3 && (
                        <div className="border-t border-gray-200 px-6 py-4">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-gray-700">
                                    Menampilkan <span className="font-semibold">{archives.from}</span> sampai{' '}
                                    <span className="font-semibold">{archives.to}</span> dari{' '}
                                    <span className="font-semibold">{archives.total}</span> arsip
                                </p>
                                <div className="flex gap-2">
                                    {archives.links.map((link, index) => (
                                        <button
                                            key={index}
                                            onClick={() => link.url && router.get(link.url)}
                                            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${link.active
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-white text-gray-700 hover:bg-gray-100'
                                                } ${!link.url ? 'cursor-not-allowed opacity-50' : ''}`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                            disabled={!link.url}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal Form */}
            <Modal show={isModalOpen} onClose={closeModal} maxWidth="lg">
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        {editingArchive ? 'Edit' : 'Tambah'} Arsip Surat {data.category === 'incoming' ? 'Masuk' : 'Keluar'}
                    </h2>

                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                        <div>
                            <InputLabel htmlFor="reference_number" value="Nomor Surat" />
                            <TextInput
                                id="reference_number"
                                className="mt-1 block w-full"
                                value={data.reference_number}
                                onChange={(e) => setData('reference_number', e.target.value)}
                                required
                            />
                            <InputError message={errors.reference_number} className="mt-2" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <InputLabel htmlFor="date" value="Tanggal Surat" />
                                <TextInput
                                    id="date"
                                    type="date"
                                    className="mt-1 block w-full"
                                    value={data.date}
                                    onChange={(e) => setData('date', e.target.value)}
                                    required
                                />
                                <InputError message={errors.date} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="category" value="Kategori" />
                                <select
                                    id="category"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value)}
                                >
                                    <option value="incoming">Surat Masuk</option>
                                    <option value="outgoing">Surat Keluar</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <InputLabel htmlFor="sender" value="Pengirim" />
                            <TextInput
                                id="sender"
                                className="mt-1 block w-full"
                                value={data.sender}
                                onChange={(e) => setData('sender', e.target.value)}
                                required
                            />
                            <InputError message={errors.sender} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="recipient" value="Penerima" />
                            <TextInput
                                id="recipient"
                                className="mt-1 block w-full"
                                value={data.recipient}
                                onChange={(e) => setData('recipient', e.target.value)}
                                required
                            />
                            <InputError message={errors.recipient} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="subject" value="Perihal" />
                            <TextInput
                                id="subject"
                                className="mt-1 block w-full"
                                value={data.subject}
                                onChange={(e) => setData('subject', e.target.value)}
                                required
                            />
                            <InputError message={errors.subject} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="file"
                                value={editingArchive ? "File Surat (Opsional - kosongkan jika tidak ingin mengganti)" : "File Surat (PDF/Image max 5MB)"}
                            />
                            <input
                                type="file"
                                id="file"
                                className="mt-1 block w-full rounded-lg border border-gray-300 p-2 text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
                                onChange={(e) => setData('file', e.target.files[0])}
                                accept=".pdf,.jpg,.jpeg,.png"
                                required={!editingArchive}
                            />
                            <InputError message={errors.file} className="mt-2" />
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <SecondaryButton onClick={closeModal} disabled={processing}>
                                Batal
                            </SecondaryButton>
                            <PrimaryButton disabled={processing}>
                                {processing ? 'Menyimpan...' : (editingArchive ? 'Update Arsip' : 'Simpan Arsip')}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </Modal>

            {/* Preview Modal */}
            <Modal show={showPreview} onClose={closePreview} maxWidth="6xl">
                <div className="relative bg-gray-900 p-4">
                    <button
                        onClick={closePreview}
                        className="absolute right-4 top-4 z-10 rounded-lg bg-white/10 p-2 text-white backdrop-blur-sm transition-all hover:bg-white/20"
                    >
                        <X className="h-5 w-5" />
                    </button>

                    {previewFile && (
                        <div className="flex items-center justify-center" style={{ minHeight: '70vh' }}>
                            {previewFile.endsWith('.pdf') ? (
                                <iframe
                                    src={`/storage/${previewFile}`}
                                    className="h-[80vh] w-full rounded-lg border-0"
                                    title="File Preview"
                                />
                            ) : (
                                <img
                                    src={`/storage/${previewFile}`}
                                    alt="File Preview"
                                    className="max-h-[80vh] w-auto rounded-lg object-contain"
                                />
                            )}
                        </div>
                    )}

                    <div className="mt-4 flex justify-center">
                        <a
                            href={`/storage/${previewFile}`}
                            download
                            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-all hover:bg-blue-700"
                        >
                            <Download className="h-5 w-5" />
                            Download File
                        </a>
                    </div>
                </div>
            </Modal>

            {/* Export Modal */}
            <Modal show={showExportModal} onClose={() => setShowExportModal(false)} maxWidth="md">
                <div className="p-6">
                    <div className="mb-6">
                        <h2 className="text-xl font-bold text-gray-900">Cetak Arsip Surat</h2>
                        <p className="mt-1 text-sm text-gray-600">Pilih format dan periode untuk mencetak arsip</p>
                    </div>

                    <div className="space-y-5">
                        {/* Format Selection */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                Format Export
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => setExportFormat('excel')}
                                    className={`flex items-center justify-center gap-2 rounded-lg border-2 p-4 font-medium transition-all ${exportFormat === 'excel'
                                        ? 'border-green-500 bg-green-50 text-green-700'
                                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    <FileText className="h-5 w-5" />
                                    Excel (.xlsx)
                                </button>
                                <button
                                    onClick={() => setExportFormat('pdf')}
                                    className={`flex items-center justify-center gap-2 rounded-lg border-2 p-4 font-medium transition-all ${exportFormat === 'pdf'
                                        ? 'border-red-500 bg-red-50 text-red-700'
                                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    <FileText className="h-5 w-5" />
                                    PDF (.pdf)
                                </button>
                            </div>
                        </div>

                        {/* Period Selection */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                Periode
                            </label>
                            <div className="grid grid-cols-3 gap-3 mb-4">
                                <button
                                    onClick={() => setExportPeriod('all')}
                                    className={`rounded-lg border-2 px-4 py-2 text-sm font-medium transition-all ${exportPeriod === 'all'
                                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    Semua
                                </button>
                                <button
                                    onClick={() => setExportPeriod('month')}
                                    className={`rounded-lg border-2 px-4 py-2 text-sm font-medium transition-all ${exportPeriod === 'month'
                                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    Per Bulan
                                </button>
                                <button
                                    onClick={() => setExportPeriod('year')}
                                    className={`rounded-lg border-2 px-4 py-2 text-sm font-medium transition-all ${exportPeriod === 'year'
                                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    Per Tahun
                                </button>
                            </div>

                            {/* Month Selector */}
                            {exportPeriod === 'month' && (
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-600 mb-2">Bulan</label>
                                        <select
                                            value={exportMonth}
                                            onChange={(e) => setExportMonth(parseInt(e.target.value))}
                                            className="w-full rounded-lg border-gray-300 text-sm focus:border-blue-500 focus:ring-blue-500"
                                        >
                                            <option value="1">Januari</option>
                                            <option value="2">Februari</option>
                                            <option value="3">Maret</option>
                                            <option value="4">April</option>
                                            <option value="5">Mei</option>
                                            <option value="6">Juni</option>
                                            <option value="7">Juli</option>
                                            <option value="8">Agustus</option>
                                            <option value="9">September</option>
                                            <option value="10">Oktober</option>
                                            <option value="11">November</option>
                                            <option value="12">Desember</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-600 mb-2">Tahun</label>
                                        <select
                                            value={exportYear}
                                            onChange={(e) => setExportYear(parseInt(e.target.value))}
                                            className="w-full rounded-lg border-gray-300 text-sm focus:border-blue-500 focus:ring-blue-500"
                                        >
                                            {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map(year => (
                                                <option key={year} value={year}>{year}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            )}

                            {/* Year Selector */}
                            {exportPeriod === 'year' && (
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-2">Tahun</label>
                                    <select
                                        value={exportYear}
                                        onChange={(e) => setExportYear(parseInt(e.target.value))}
                                        className="w-full rounded-lg border-gray-300 text-sm focus:border-blue-500 focus:ring-blue-500"
                                    >
                                        {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map(year => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </div>

                        {/* Info */}
                        <div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
                            <p className="text-sm text-blue-800">
                                <span className="font-semibold">Kategori:</span> {activeTab === 'incoming' ? 'Surat Masuk' : 'Surat Keluar'}
                            </p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 flex justify-end gap-3">
                        <SecondaryButton onClick={() => setShowExportModal(false)}>
                            Batal
                        </SecondaryButton>
                        <button
                            onClick={handleExport}
                            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white transition-colors hover:bg-blue-700"
                        >
                            <Printer className="h-4 w-4" />
                            Cetak
                        </button>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
