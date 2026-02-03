import { Head, Link } from '@inertiajs/react';
import {
    Calendar,
    User,
    Eye,
    Share2,
    Facebook,
    Twitter,
    Linkedin,
    ArrowLeft,
    Home,
    Clock,
    Hash,
    ChevronRight,
    TrendingUp
} from 'lucide-react';

export default function NewsShow({ news, relatedNews }) {
    return (
        <>
            <Head title={news.title} />

            <div className="min-h-screen bg-white font-sans text-gray-900">
                {/* Navigation Bar (simplified for consistency) */}
                <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <Link href="/" className="flex items-center gap-2">
                                <div className="h-8 w-8 overflow-hidden rounded-full border border-gray-200">
                                    <img src="/assets/logo.png" alt="Logo" className="h-full w-full object-cover" />
                                </div>
                                <span className="font-bold text-gray-900">SI Magang</span>
                            </Link>
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Kembali
                            </Link>
                        </div>
                    </div>
                </nav>

                <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    {/* Breadcrumbs */}
                    <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500">
                        <Link href="/" className="transition-colors hover:text-blue-600">
                            <Home className="h-4 w-4" />
                        </Link>
                        <ChevronRight className="h-4 w-4" />
                        <span className="font-medium text-blue-600">Berita</span>
                        <ChevronRight className="h-4 w-4" />
                        <span className="truncate max-w-xs font-medium text-gray-900">{news.title}</span>
                    </nav>

                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                        {/* Main Content Column */}
                        <div className="lg:col-span-8">
                            <article>
                                {/* Article Header */}
                                <header className="mb-8">
                                    <div className="mb-6 flex flex-wrap items-center gap-4 text-sm font-medium text-gray-600">
                                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-blue-700">
                                            <Hash className="h-3.5 w-3.5" />
                                            Berita Utama
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-gray-400" />
                                            <span>{news.published_at}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-gray-400" />
                                            <span>5 min read</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Eye className="h-4 w-4 text-gray-400" />
                                            <span>{news.views_count} views</span>
                                        </div>
                                    </div>

                                    <h1 className="mb-6 text-3xl font-black leading-tight tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
                                        {news.title}
                                    </h1>

                                    {news.excerpt && (
                                        <p className="text-xl leading-relaxed text-gray-600">
                                            {news.excerpt}
                                        </p>
                                    )}
                                </header>

                                {/* Featured Image */}
                                {news.featured_image && (
                                    <figure className="mb-10 overflow-hidden rounded-2xl shadow-xl">
                                        <img
                                            src={`/storage/${news.featured_image}`}
                                            alt={news.title}
                                            className="w-full object-cover transition-transform duration-700 hover:scale-105"
                                        />
                                        <figcaption className="mt-2 text-center text-sm italic text-gray-500">
                                            Dokumentasi Kegiatan: {news.title}
                                        </figcaption>
                                    </figure>
                                )}

                                {/* Author & Share (Mobile accessible) */}
                                <div className="mb-10 flex flex-col justify-between gap-6 border-y border-gray-100 py-6 sm:flex-row sm:items-center">
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 font-bold text-white shadow-md">
                                            {news.author_name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-bold text-gray-900">{news.author_name}</div>
                                            <div className="text-sm text-gray-500">Penulis / Administrator</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-semibold text-gray-500">Bagikan:</span>
                                        <button className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-colors hover:bg-blue-600 hover:text-white">
                                            <Facebook className="h-4 w-4" />
                                        </button>
                                        <button className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-50 text-sky-500 transition-colors hover:bg-sky-500 hover:text-white">
                                            <Twitter className="h-4 w-4" />
                                        </button>
                                        <button className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-800 hover:text-white">
                                            <Share2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* Article Body */}
                                <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:leading-8 prose-p:text-gray-700 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl">
                                    {news.content.split('\n').map((paragraph, index) => (
                                        paragraph.trim() && (
                                            <p key={index} className="mb-6">
                                                {paragraph}
                                            </p>
                                        )
                                    ))}
                                </div>
                            </article>
                        </div>

                        {/* Sidebar Column */}
                        <aside className="lg:col-span-4">
                            <div className="sticky top-24 space-y-8">
                                {/* Search Widget (Placeholder) */}
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Cari berita..."
                                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                    <div className="absolute right-3 top-3 text-gray-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Related News Widget */}
                                {relatedNews.length > 0 && (
                                    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                                        <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-4">
                                            <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900">
                                                <TrendingUp className="h-5 w-5 text-blue-600" />
                                                Berita Lainnya
                                            </h3>
                                        </div>

                                        <div className="space-y-6">
                                            {relatedNews.map((item) => (
                                                <Link
                                                    key={item.id}
                                                    href={route('news.show', item.slug)}
                                                    className="group flex gap-4"
                                                >
                                                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                                                        {item.featured_image && (
                                                            <img
                                                                src={`/storage/${item.featured_image}`}
                                                                alt={item.title}
                                                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                                            />
                                                        )}
                                                    </div>
                                                    <div className="flex flex-col justify-between">
                                                        <h4 className="line-clamp-2 text-sm font-bold text-gray-900 transition-colors group-hover:text-blue-600">
                                                            {item.title}
                                                        </h4>
                                                        <span className="text-xs text-gray-500">{item.published_at}</span>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>

                                        <div className="mt-6 pt-4 text-center">
                                            <Link href="/" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                                                Lihat Semua Berita &rarr;
                                            </Link>
                                        </div>
                                    </div>
                                )}

                                {/* Promotion / CTA Widget */}
                                <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-6 text-white shadow-lg">
                                    <h3 className="mb-2 text-xl font-bold">Ingin Magang di Sini?</h3>
                                    <p className="mb-6 text-sm text-blue-100">
                                        Dapatkan pengalaman berharga di stasiun klimatologi. Daftar sekarang!
                                    </p>
                                    <Link
                                        href={route('register')}
                                        className="block w-full rounded-lg bg-white px-4 py-2 text-center text-sm font-bold text-blue-600 transition-colors hover:bg-blue-50"
                                    >
                                        Daftar Magang
                                    </Link>
                                </div>
                            </div>
                        </aside>
                    </div>
                </main>

                <footer className="mt-20 border-t border-gray-200 bg-white py-12">
                    <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                        <div className="mb-4 flex items-center justify-center gap-2">
                            <div className="h-8 w-8 overflow-hidden rounded-full border border-gray-200">
                                <img src="/assets/logo.png" alt="Logo" className="h-full w-full object-cover" />
                            </div>
                            <span className="text-lg font-bold text-gray-900">SI Magang</span>
                        </div>
                        <p className="text-sm text-gray-500">
                            © 2026 UPT Stasiun Klimatologi BMKG. All rights reserved.
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}
