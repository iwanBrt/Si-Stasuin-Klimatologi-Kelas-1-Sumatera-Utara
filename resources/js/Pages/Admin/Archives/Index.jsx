import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { FileText, Download, Trash, Plus, Search, Calendar, Inbox, Send } from 'lucide-react';
import { useState } from 'react';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import Pagination from '@/Components/Pagination';

export default function ArchivesIndex({ auth, archives, filters }) {
    const [activeTab, setActiveTab] = useState(filters.category || 'incoming');
    const [searchQuery, setSearchQuery] = useState(filters.search || '');
    const [isModalOpen, setIsModalOpen] = useState(false);

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
        setData('category', category);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        reset();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.archives.store'), {
            onSuccess: () => closeModal(),
            forceFormData: true,
        });
    };

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus arsip ini?')) {
            router.delete(route('admin.archives.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Arsip Surat</h2>}
        >
            <Head title="Arsip Surat" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">

                    {/* Controls Header */}
                    <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                        {/* Tabs */}
                        <div className="inline-flex rounded-lg bg-gray-100 p-1">
                            <button
                                onClick={() => handleTabChange('incoming')}
                                className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all ${activeTab === 'incoming'
                                    ? 'bg-white text-blue-600 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                <Inbox className="h-4 w-4" />
                                Surat Masuk
                            </button>
                            <button
                                onClick={() => handleTabChange('outgoing')}
                                className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all ${activeTab === 'outgoing'
                                    ? 'bg-white text-blue-600 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                <Send className="h-4 w-4" />
                                Surat Keluar
                            </button>
                        </div>

                        {/* Search & Add */}
                        <div className="flex items-center gap-3">
                            <form onSubmit={handleSearch} className="relative">
                                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Cari nomor/perihal..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="h-10 w-64 rounded-lg border-gray-300 pl-9 text-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                            </form>
                            <PrimaryButton onClick={() => openModal(activeTab)}>
                                <Plus className="mr-2 h-4 w-4" />
                                Tambah Arsip
                            </PrimaryButton>
                        </div>
                    </div>

                    {/* Content Table */}
                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Nomor Surat</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Tanggal</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Detail</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {archives.data.length > 0 ? (
                                    archives.data.map((archive) => (
                                        <tr key={archive.id} className="hover:bg-gray-50">
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                                                        <FileText className="h-5 w-5" />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-gray-900">{archive.reference_number}</div>
                                                        <div className="text-xs text-gray-500 capitalize">{archive.category}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <Calendar className="h-4 w-4 text-gray-400" />
                                                    {new Date(archive.date).toLocaleDateString('id-ID', {
                                                        day: 'numeric', month: 'long', year: 'numeric'
                                                    })}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-medium text-gray-900">{archive.subject}</div>
                                                <div className="text-xs text-gray-500">
                                                    {archive.category === 'incoming'
                                                        ? `Dari: ${archive.sender}`
                                                        : `Kepada: ${archive.recipient}`}
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <a
                                                        href={`/storage/${archive.file_path}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center justify-center rounded-lg border border-gray-200 p-2 text-gray-500 hover:bg-gray-100 hover:text-blue-600"
                                                        title="Download / View"
                                                    >
                                                        <Download className="h-4 w-4" />
                                                    </a>
                                                    <button
                                                        onClick={() => handleDelete(archive.id)}
                                                        className="inline-flex items-center justify-center rounded-lg border border-gray-200 p-2 text-gray-500 hover:bg-red-50 hover:text-red-600"
                                                        title="Delete"
                                                    >
                                                        <Trash className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-12 text-center text-gray-500">
                                            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                                                <FileText className="h-6 w-6 text-gray-400" />
                                            </div>
                                            <p>Belum ada arsip surat {activeTab === 'incoming' ? 'masuk' : 'keluar'}.</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {archives.links && (
                        <div className="mt-6 flex justify-center">
                            <Pagination links={archives.links} />
                        </div>
                    )}
                </div>
            </div>

            {/* Modal Form */}
            <Modal show={isModalOpen} onClose={closeModal} maxWidth="lg">
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Tambah Arsip Surat {data.category === 'incoming' ? 'Masuk' : 'Keluar'}
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
                            <InputLabel htmlFor="file" value="File Surat (PDF/Image max 5MB)" />
                            <input
                                type="file"
                                id="file"
                                className="mt-1 block w-full rounded-lg border border-gray-300 p-2 text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
                                onChange={(e) => setData('file', e.target.files[0])}
                                accept=".pdf,.jpg,.jpeg,.png"
                                required
                            />
                            <InputError message={errors.file} className="mt-2" />
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <SecondaryButton onClick={closeModal} disabled={processing}>
                                Batal
                            </SecondaryButton>
                            <PrimaryButton disabled={processing}>
                                {processing ? 'Menyimpan...' : 'Simpan Arsip'}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
