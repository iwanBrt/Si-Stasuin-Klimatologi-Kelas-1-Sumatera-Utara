import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Search, User, Mail, Calendar } from 'lucide-react';
import { useState } from 'react';

export default function Index({ users, filters }) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.users.index'), { search }, { preserveState: true });
    };

    return (
        <AuthenticatedLayout header="Manajemen User">
            <Head title="Manajemen User" />

            <div className="rounded-xl border border-white/40 bg-white/60 p-6 shadow-lg backdrop-blur-md">
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Daftar Pengguna</h2>
                        <p className="text-sm text-gray-600">Total {users.total} pengguna terdaftar</p>
                    </div>

                    <form onSubmit={handleSearch} className="relative w-full md:w-64">
                        <input
                            type="text"
                            placeholder="Cari user..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    </form>
                </div>

                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-gray-500">
                            <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                                <tr>
                                    <th className="px-6 py-3">Nama</th>
                                    <th className="px-6 py-3">Email</th>
                                    <th className="px-6 py-3">Tanggal Bergabung</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {users.data.length > 0 ? (
                                    users.data.map((user) => (
                                        <tr key={user.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                                        <User className="h-4 w-4" />
                                                    </div>
                                                    <div className="font-medium text-gray-900">{user.name}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <Mail className="h-4 w-4 text-gray-400" />
                                                    {user.email}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="h-4 w-4 text-gray-400" />
                                                    {new Date(user.created_at).toLocaleDateString('id-ID', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="px-6 py-10 text-center text-gray-500">
                                            Tidak ada user ditemukan.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    {/* Pagination */}
                    {users.links.length > 3 && (
                        <div className="border-t border-gray-200 bg-gray-50 px-6 py-3">
                            <div className="flex justify-center gap-1">
                                {users.links.map((link, i) => (
                                    <Link
                                        key={i}
                                        href={link.url}
                                        className={`rounded px-3 py-1 text-xs ${link.active
                                            ? 'bg-blue-600 text-white'
                                            : !link.url
                                                ? 'bg-transparent text-gray-400'
                                                : 'bg-white text-gray-600 hover:bg-gray-200'
                                            }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
