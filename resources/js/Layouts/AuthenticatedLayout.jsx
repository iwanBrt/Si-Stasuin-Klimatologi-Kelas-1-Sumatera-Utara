import { Link, usePage, router } from '@inertiajs/react';
import { useState } from 'react';
import { LayoutDashboard, FileText, User, Bell, LogOut, Menu, X, ChevronDown, Settings, Archive } from 'lucide-react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [showingSidebar, setShowingSidebar] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-blue-100 via-sky-50 to-blue-200">
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white/80 backdrop-blur-md shadow-xl transition-transform duration-300 lg:translate-x-0 ${showingSidebar ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex h-full flex-col">
                    {/* Logo/Brand */}
                    <div className="border-b border-gray-200 p-6">
                        <div className="text-xl font-bold text-gray-900">
                            SI Klimatologi
                        </div>
                        <p className="text-sm font-semibold text-gray-700">
                            {user.role === 'admin' ? 'Admin Panel' : 'Portal Pemohon'}
                        </p>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-2 p-4">
                        {user.role === 'admin' ? (
                            // Admin Menu
                            <>
                                <Link
                                    href={route('admin.dashboard')}
                                    className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${route().current('admin.dashboard')
                                        ? 'bg-blue-500 text-white'
                                        : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    <LayoutDashboard className="h-5 w-5" />
                                    Dashboard
                                </Link>

                                <Link
                                    href={route('admin.applications.index')}
                                    className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${route().current('admin.applications.*')
                                        ? 'bg-blue-500 text-white'
                                        : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    <FileText className="h-5 w-5" />
                                    Kelola Permohonan
                                </Link>

                                <Link
                                    href={route('admin.news.index')}
                                    className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${route().current('admin.news.*')
                                        ? 'bg-blue-500 text-white'
                                        : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    <Bell className="h-5 w-5" />
                                    Kelola Berita
                                </Link>

                                <Link
                                    href={route('admin.archives.index')}
                                    className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${route().current('admin.archives.*')
                                        ? 'bg-blue-500 text-white'
                                        : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    <Archive className="h-5 w-5" />
                                    Arsip Surat
                                </Link>

                                <Link
                                    href={route('profile.edit')}
                                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
                                >
                                    <Settings className="h-5 w-5" />
                                    Pengaturan
                                </Link>
                            </>
                        ) : (
                            // User Menu
                            <>
                                <Link
                                    href={route('dashboard')}
                                    className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${route().current('dashboard')
                                        ? 'bg-blue-500 text-white'
                                        : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    <LayoutDashboard className="h-5 w-5" />
                                    Dashboard
                                </Link>

                                <Link
                                    href={route('applicant.applications')}
                                    className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${route().current('applicant.applications')
                                        ? 'bg-blue-500 text-white'
                                        : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    <FileText className="h-5 w-5" />
                                    Permohonan Saya
                                </Link>

                                <Link
                                    href={route('profile.edit')}
                                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
                                >
                                    <User className="h-5 w-5" />
                                    Profil
                                </Link>
                            </>
                        )}
                    </nav>

                    {/* Logout */}
                    <div className="border-t border-gray-200 p-4">
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                        >
                            <LogOut className="h-5 w-5" />
                            Keluar
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Overlay untuk mobile */}
            {showingSidebar && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={() => setShowingSidebar(false)}
                ></div>
            )}

            {/* Main Content */}
            <div className="flex-1 lg:ml-64">
                {/* Top Header */}
                <header className="sticky top-0 z-30 bg-white/60 backdrop-blur-md shadow-sm">
                    <div className="flex items-center justify-between px-6 py-4">
                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setShowingSidebar(!showingSidebar)}
                            className="lg:hidden rounded-lg p-2 text-gray-600 hover:bg-gray-100"
                        >
                            {showingSidebar ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>

                        {/* Page Title */}
                        <h2 className="text-2xl font-bold text-gray-900">
                            {header || 'Dashboard'}
                        </h2>

                        {/* User Info */}
                        <div className="flex items-center gap-4">
                            {/* Notification */}
                            <button className="relative rounded-full p-2 text-gray-600 hover:bg-gray-100">
                                <Bell className="h-5 w-5" />
                                {usePage().props.auth.unread_notifications_count > 0 && (
                                    <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                                        {usePage().props.auth.unread_notifications_count}
                                    </span>
                                )}
                            </button>

                            {/* User Avatar with Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                    className="flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-gray-100"
                                >
                                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="hidden sm:block text-sm font-medium text-gray-700">
                                        {user.name}
                                    </span>
                                    <ChevronDown className={`h-4 w-4 text-gray-600 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                                </button>

                                {/* Dropdown Menu */}
                                {showUserMenu && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-10"
                                            onClick={() => setShowUserMenu(false)}
                                        ></div>
                                        <div className="absolute right-0 top-full z-20 mt-2 w-56 rounded-xl border border-gray-200 bg-white shadow-xl">
                                            <div className="border-b border-gray-100 p-4">
                                                <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                                                <p className="text-xs text-gray-600">{user.email}</p>
                                            </div>
                                            <div className="p-2">
                                                <Link
                                                    href={route('profile.edit')}
                                                    className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-100"
                                                    onClick={() => setShowUserMenu(false)}
                                                >
                                                    <Settings className="h-4 w-4" />
                                                    Pengaturan Profil
                                                </Link>
                                                <button
                                                    onClick={() => {
                                                        setShowUserMenu(false);
                                                        setShowLogoutModal(true);
                                                    }}
                                                    className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm text-red-600 transition-colors hover:bg-red-50"
                                                >
                                                    <LogOut className="h-4 w-4" />
                                                    Keluar
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="p-6">
                    {children}
                </main>
            </div>

            {/* Logout Confirmation Modal */}
            {showLogoutModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="mx-4 w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
                        {/* Modal Header */}
                        <div className="border-b border-gray-200 bg-gradient-to-r from-red-500 to-red-600 p-6">
                            <div className="flex items-center gap-4">
                                <div className="rounded-full bg-white/20 p-3">
                                    <LogOut className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">Konfirmasi Keluar</h3>
                                    <p className="text-sm text-red-100">Apakah Anda yakin ingin keluar?</p>
                                </div>
                            </div>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6">
                            <p className="text-gray-700">
                                Anda akan keluar dari sistem dan perlu login kembali untuk mengakses dashboard.
                            </p>
                        </div>

                        {/* Modal Footer */}
                        <div className="flex gap-3 border-t border-gray-200 bg-gray-50 p-6">
                            <button
                                onClick={() => setShowLogoutModal(false)}
                                className="flex-1 rounded-xl border-2 border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition-all hover:bg-gray-100 hover:border-gray-400"
                            >
                                Batal
                            </button>
                            <button
                                onClick={() => router.post(route('logout'))}
                                className="flex-1 rounded-xl bg-gradient-to-r from-red-500 to-red-600 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:from-red-600 hover:to-red-700 hover:shadow-xl"
                            >
                                Ya, Keluar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
