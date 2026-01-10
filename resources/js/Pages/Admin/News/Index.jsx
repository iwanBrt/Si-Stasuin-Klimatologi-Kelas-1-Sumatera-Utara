import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Plus, Edit, Trash2, Eye, Clock, Calendar } from 'lucide-react';
import { useState } from 'react';

export default function NewsIndex({ news }) {
    const [deleteId, setDeleteId] = useState(null);

    const handleDelete = (id) => {
        if (confirm('Yakin ingin menghapus berita ini?')) {
            router.delete(route('admin.news.destroy', id), {
                onSuccess: () => setDeleteId(null),
            });
        }
    };

    const getStatusBadge = (status) => {
        return status === 'published' ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-green-300 bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                Published
            </span>
        ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-300 bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                Draft
            </span>
        );
    };

    return (
        <AuthenticatedLayout header="Kelola Berita">
            <Head title="Kelola Berita" />

            {/* Header with Create Button */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Kelola Berita & Pengumuman</h1>
                    <p className="mt-1 text-sm text-gray-600">Buat dan kelola berita untuk ditampilkan di landing page</p>
                </div>
                <Link
                    href={route('admin.news.create')}
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:bg-blue-700 hover:scale-105"
                >
                    <Plus className="h-5 w-5" />
                    Buat Berita Baru
                </Link>
            </div>

            {/* News List */}
            <div className="rounded-xl border border-white/40 bg-white/60 shadow-lg backdrop-blur-md">
                {news.data.length > 0 ? (
                    <div className="divide-y divide-gray-200">
                        {news.data.map((item) => (
                            <div key={item.id} className="p-6 transition-colors hover:bg-blue-50/50">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3">
                                            <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                                            {getStatusBadge(item.status)}
                                        </div>

                                        {item.excerpt && (
                                            <p className="mt-2 text-sm text-gray-600 line-clamp-2">{item.excerpt}</p>
                                        )}

                                        <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-gray-500">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="h-4 w-4" />
                                                <span>{item.created_at}</span>
                                            </div>
                                            {item.published_at && (
                                                <div className="flex items-center gap-1.5">
                                                    <Clock className="h-4 w-4" />
                                                    <span>Published: {item.published_at}</span>
                                                </div>
                                            )}
                                            <div className="flex items-center gap-1.5">
                                                <Eye className="h-4 w-4" />
                                                <span>{item.views_count} views</span>
                                            </div>
                                            <div>
                                                <span>Oleh: {item.author_name}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <Link
                                            href={route('admin.news.edit', item.id)}
                                            className="inline-flex items-center gap-2 rounded-lg bg-yellow-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-yellow-600"
                                        >
                                            <Edit className="h-4 w-4" />
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="inline-flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-600"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                            Hapus
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-12 text-center">
                        <div className="mx-auto h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
                            <Calendar className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-gray-900">Belum ada berita</h3>
                        <p className="mt-2 text-sm text-gray-600">Mulai dengan membuat berita pertama Anda</p>
                        <Link
                            href={route('admin.news.create')}
                            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
                        >
                            <Plus className="h-5 w-5" />
                            Buat Berita Baru
                        </Link>
                    </div>
                )}

                {/* Pagination */}
                {news.links.length > 3 && (
                    <div className="border-t border-gray-200 px-6 py-4">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-700">
                                Menampilkan <span className="font-semibold">{news.from}</span> sampai{' '}
                                <span className="font-semibold">{news.to}</span> dari{' '}
                                <span className="font-semibold">{news.total}</span> berita
                            </p>
                            <div className="flex gap-2">
                                {news.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url || '#'}
                                        className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${link.active
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-white text-gray-700 hover:bg-gray-100'
                                            } ${!link.url ? 'cursor-not-allowed opacity-50' : ''}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
