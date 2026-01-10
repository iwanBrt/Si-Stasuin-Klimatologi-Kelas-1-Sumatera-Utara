import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { ArrowLeft, Save, Eye } from 'lucide-react';

export default function NewsCreate() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        excerpt: '',
        content: '',
        featured_image: null,
        status: 'draft',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.news.store'));
    };

    return (
        <AuthenticatedLayout header="Buat Berita Baru">
            <Head title="Buat Berita" />

            {/* Back Button */}
            <div className="mb-6">
                <button
                    onClick={() => router.visit(route('admin.news.index'))}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Kembali ke Daftar Berita
                </button>
            </div>

            <div className="max-w-4xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title */}
                    <div className="rounded-xl border border-white/40 bg-white/60 p-6 shadow-lg backdrop-blur-md">
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Judul Berita <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-lg font-semibold focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            placeholder="Masukkan judul berita..."
                            required
                        />
                        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                    </div>

                    {/* Excerpt */}
                    <div className="rounded-xl border border-white/40 bg-white/60 p-6 shadow-lg backdrop-blur-md">
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Ringkasan (Excerpt)
                        </label>
                        <textarea
                            value={data.excerpt}
                            onChange={(e) => setData('excerpt', e.target.value)}
                            rows="3"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            placeholder="Ringkasan singkat berita (opsional)..."
                        />
                        <p className="mt-1 text-xs text-gray-500">Maksimal 500 karakter</p>
                        {errors.excerpt && <p className="mt-1 text-sm text-red-600">{errors.excerpt}</p>}
                    </div>

                    {/* Featured Image */}
                    <div className="rounded-xl border border-white/40 bg-white/60 p-6 shadow-lg backdrop-blur-md">
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Gambar Utama
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setData('featured_image', e.target.files[0])}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        />
                        <p className="mt-1 text-xs text-gray-500">Format: JPG, PNG. Maksimal 2MB</p>
                        {errors.featured_image && <p className="mt-1 text-sm text-red-600">{errors.featured_image}</p>}
                    </div>

                    {/* Content */}
                    <div className="rounded-xl border border-white/40 bg-white/60 p-6 shadow-lg backdrop-blur-md">
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Konten Berita <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                            rows="15"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 font-mono text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            placeholder="Tulis konten berita di sini..."
                            required
                        />
                        <p className="mt-1 text-xs text-gray-500">Gunakan format Markdown jika diperlukan</p>
                        {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content}</p>}
                    </div>

                    {/* Status */}
                    <div className="rounded-xl border border-white/40 bg-white/60 p-6 shadow-lg backdrop-blur-md">
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Status Publikasi
                        </label>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    value="draft"
                                    checked={data.status === 'draft'}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-sm font-medium text-gray-700">Simpan sebagai Draft</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    value="published"
                                    checked={data.status === 'published'}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-sm font-medium text-gray-700">Publikasikan Sekarang</span>
                            </label>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={() => router.visit(route('admin.news.index'))}
                            className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-100"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
                        >
                            <Save className="h-5 w-5" />
                            {processing ? 'Menyimpan...' : data.status === 'published' ? 'Publikasikan Berita' : 'Simpan Draft'}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
