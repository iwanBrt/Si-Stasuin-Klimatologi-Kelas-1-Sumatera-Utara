import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react'; // ensure router is imported if needed, usually just useForm
import { useState, useEffect } from 'react';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';
import { Plus, Pencil, Trash2, Image as ImageIcon, FileText, Upload } from 'lucide-react';

export default function ContentIndex({ auth, section, contents }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editingContent, setEditingContent] = useState(null);
    const [deletingContent, setDeletingContent] = useState(null);

    const sections = [
        { id: 'normal-hujan-bulanan', label: 'Normal Hujan Bulanan' },
        { id: 'curah-hujan-harian', label: 'Curah Hujan Harian' },
        { id: 'prospek-iklim-dasarian', label: 'Prospek Iklim Dasarian' },
        { id: 'analisis-hari-tanpa-hujan', label: 'Analisis Hari Tanpa Hujan' },
        { id: 'analisis-curah-hujan-dasarian', label: 'Analisis Curah Hujan (Dasarian)' },
        { id: 'prakiraan-curah-hujan-dasarian', label: 'Prakiraan Curah Hujan (Dasarian)' },
        { id: 'probabilitas-curah-hujan-dasarian', label: 'Probabilitas Curah Hujan (Dasarian)' },
        { id: 'prakiraan-rawan-banjir-dasarian', label: 'Rawan Banjir (Dasarian)' },
        { id: 'analisis-hujan-bulanan', label: 'Analisis Hujan Bulanan' },
        { id: 'prakiraan-hujan-bulanan', label: 'Prakiraan Hujan Bulanan' },
        { id: 'prakiraan-ketersediaan-air', label: 'Ketersediaan Air Bagi Tanaman' },
        { id: 'spi', label: 'SPI' },
        { id: 'kualitas-udara-pm25', label: 'Kualitas Udara PM 2.5' },
        { id: 'kualitas-udara-grk', label: 'Gas Rumah Kaca' },
        { id: 'publikasi-buletin-musim', label: 'Buletin Prakiraan Musim' },
        { id: 'publikasi-buletin-bulanan', label: 'Buletin Info Iklim' },
        { id: 'publikasi-buku-saku', label: 'Buku Saku MKKuG' },
        { id: 'normal-hujan-bulanan', label: 'Normal Hujan Bulanan' },
        { id: 'normal-peta-zom', label: 'Peta Zona Musim (ZOM)' },
        { id: 'normal-schmidt-fergusson', label: 'Peta Iklim Schmidt Fergusson' },
        { id: 'normal-oldeman', label: 'Peta Iklim Oldeman' },
        { id: 'normal-suhu-maksimum', label: 'Normal Suhu Maksimum' },
        { id: 'normal-suhu-minimum', label: 'Normal Suhu Minimum' },
        { id: 'tim-kami', label: 'Tim Kami' },
        { id: 'iklim-ekstrim', label: 'Iklim Ekstrim' },
        { id: 'lain-lain', label: 'Lain-lain' }
    ];

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        section: section,
        category: '',
        title: '',
        subtitle: '',
        description: '',
        file: null,
        sort_order: 0,
        is_active: true,
        _method: 'POST', // Default to POST
    });

    // Reset form when modal closes or section changes
    useEffect(() => {
        setData('section', section);
    }, [section]);

    const handleSectionChange = (newSection) => {
        router.get(route('admin.contents.index'), { section: newSection });
    };

    const openCreateModal = () => {
        setEditingContent(null);
        reset();
        setData({
            section: section,
            category: '',
            title: '',
            subtitle: '',
            description: '',
            file: null,
            sort_order: 0,
            is_active: true,
            _method: 'POST',
        });
        clearErrors();
        setIsModalOpen(true);
    };

    const openEditModal = (content) => {
        setEditingContent(content);
        setData({
            section: content.section,
            category: content.category || '',
            title: content.title || '',
            subtitle: content.subtitle || '',
            description: content.description || '',
            file: null, // File input is always new
            sort_order: content.sort_order || 0,
            is_active: content.is_active,
            _method: 'PUT', // Spoof PUT
        });
        clearErrors();
        setIsModalOpen(true);
    };

    const openDeleteModal = (content) => {
        setDeletingContent(content);
        setIsDeleteModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingContent) {
            post(route('admin.contents.update', editingContent.id), {
                onSuccess: () => setIsModalOpen(false),
            });
        } else {
            post(route('admin.contents.store'), {
                onSuccess: () => setIsModalOpen(false),
            });
        }
    };

    const handleDelete = () => {
        if (deletingContent) {
            router.delete(route('admin.contents.destroy', deletingContent.id), {
                onSuccess: () => setIsDeleteModalOpen(false),
            });
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Manajemen Konten Media</h2>}
        >
            <Head title="Manajemen Konten" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    {/* Section Tabs */}
                    <div className="mb-6 flex overflow-x-auto space-x-2 pb-2">
                        {sections.map((sec) => (
                            <button
                                key={sec.id}
                                onClick={() => handleSectionChange(sec.id)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${section === sec.id
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                                    }`}
                            >
                                {sec.label}
                            </button>
                        ))}
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold">Daftar Konten: {sections.find(s => s.id === section)?.label}</h3>
                                <PrimaryButton onClick={openCreateModal}>
                                    <Plus className="w-4 h-4 mr-2" />
                                    Tambah Konten
                                </PrimaryButton>
                            </div>

                            {contents.length === 0 ? (
                                <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                                    <FileText className="mx-auto h-12 w-12 text-gray-400" />
                                    <p className="mt-2 text-gray-500">Belum ada konten untuk bagian ini.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {contents.map((item) => (
                                        <div key={item.id} className="bg-white border rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                                            {/* Preview Image */}
                                            <div className="h-48 bg-gray-100 relative group">
                                                {item.file_url ? (
                                                    <img
                                                        src={item.file_url}
                                                        alt={item.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                        <ImageIcon className="w-12 h-12" />
                                                    </div>
                                                )}
                                                <div className="absolute top-2 right-2 bg-white/90 rounded-full px-2 py-1 text-xs font-bold shadow-sm">
                                                    Order: {item.sort_order}
                                                </div>
                                            </div>

                                            <div className="p-4">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <h4 className="font-bold text-gray-900 line-clamp-1">{item.title}</h4>
                                                        {item.subtitle && <p className="text-sm text-gray-500">{item.subtitle}</p>}
                                                    </div>
                                                    {item.category && (
                                                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                                            {item.category}
                                                        </span>
                                                    )}
                                                </div>

                                                {item.description && (
                                                    <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                                                        {item.description}
                                                    </p>
                                                )}

                                                <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-gray-100">
                                                    <button
                                                        onClick={() => openEditModal(item)}
                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Pencil className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => openDeleteModal(item)}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Hapus"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Create/Edit Modal */}
            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">
                        {editingContent ? 'Edit Konten' : 'Tambah Konten Baru'}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Hidden Input for Method Spoofing if editing */}

                        <div>
                            <InputLabel htmlFor="title" value="Judul / Nama" />
                            <TextInput
                                id="title"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className="mt-1 block w-full"
                                placeholder={section === 'tim-kami' ? 'Nama Anggota' : 'Judul Konten'}
                                required
                            />
                            <InputError message={errors.title} className="mt-2" />
                        </div>

                        {section === 'tim-kami' && (
                            <div>
                                <InputLabel htmlFor="subtitle" value="Jabatan / Role" />
                                <TextInput
                                    id="subtitle"
                                    value={data.subtitle}
                                    onChange={(e) => setData('subtitle', e.target.value)}
                                    className="mt-1 block w-full"
                                    placeholder="Contoh: Kepala Stasiun"
                                />
                                <InputError message={errors.subtitle} className="mt-2" />
                            </div>
                        )}

                        <div>
                            <InputLabel htmlFor="category" value="Kategori / Divisi" />
                            <TextInput
                                id="category"
                                value={data.category}
                                onChange={(e) => setData('category', e.target.value)}
                                className="mt-1 block w-full"
                                placeholder={section === 'tim-kami' ? 'Contoh: Pimpinan' : 'Contoh: Peta / Grafik'}
                            />
                            <p className="text-xs text-gray-500 mt-1">Gunakan kategori yang sama untuk mengelompokkan item.</p>
                            <InputError message={errors.category} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="description" value="Deskripsi (Opsional)" />
                            <textarea
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                rows="3"
                            />
                            <InputError message={errors.description} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="sort_order" value="Urutan Tampil" />
                            <TextInput
                                id="sort_order"
                                type="number"
                                value={data.sort_order}
                                onChange={(e) => setData('sort_order', e.target.value)}
                                className="mt-1 block w-full"
                            />
                            <InputError message={errors.sort_order} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="file" value="Upload Gambar / File" />
                            <input
                                type="file"
                                id="file"
                                onChange={(e) => setData('file', e.target.files[0])}
                                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                            {editingContent && editingContent.file_url && (
                                <p className="mt-2 text-xs text-green-600">File saat ini ada. Upload baru untuk mengganti.</p>
                            )}
                            <InputError message={errors.file} className="mt-2" />
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <SecondaryButton onClick={() => setIsModalOpen(false)}>Batal</SecondaryButton>
                            <PrimaryButton disabled={processing}>
                                {processing ? 'Menyimpan...' : 'Simpan'}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal show={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 text-red-600 mb-4">Konfirmasi Hapus</h2>
                    <p className="text-gray-600 mb-6">
                        Apakah Anda yakin ingin menghapus konten <strong>{deletingContent?.title}</strong>? Tindakan ini tidak dapat dibatalkan.
                    </p>
                    <div className="flex justify-end gap-3">
                        <SecondaryButton onClick={() => setIsDeleteModalOpen(false)}>Batal</SecondaryButton>
                        <DangerButton onClick={handleDelete} disabled={processing}>
                            {processing ? 'Menghapus...' : 'Hapus'}
                        </DangerButton>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
