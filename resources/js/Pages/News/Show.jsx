import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Calendar, Eye, User, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';

export default function NewsShow({ news, relatedNews }) {
    return (
        <>
            <Head title={news.title} />

            <div className="min-h-screen bg-white">
                {/* Header/Navbar */}
                <nav className="border-b border-gray-200 bg-white">
                    <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between">
                            <Link href="/" className="text-xl font-bold text-gray-900">
                                SI Klimatologi
                            </Link>
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Kembali ke Beranda
                            </Link>
                        </div>
                    </div>
                </nav>

                {/* Article Header */}
                <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
                    {/* Meta Info */}
                    <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{news.published_at}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span>{news.author_name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Eye className="h-4 w-4" />
                            <span>{news.views_count} views</span>
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
                        {news.title}
                    </h1>

                    {/* Excerpt */}
                    {news.excerpt && (
                        <p className="mb-8 text-xl leading-relaxed text-gray-600">
                            {news.excerpt}
                        </p>
                    )}

                    {/* Featured Image */}
                    {news.featured_image && (
                        <figure className="mb-8">
                            <img
                                src={`/storage/${news.featured_image}`}
                                alt={news.title}
                                className="w-full rounded-lg shadow-lg"
                            />
                        </figure>
                    )}

                    {/* Share Buttons */}
                    <div className="mb-8 flex items-center gap-3 border-y border-gray-200 py-4">
                        <span className="text-sm font-semibold text-gray-700">Bagikan:</span>
                        <div className="flex gap-2">
                            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white transition-colors hover:bg-blue-700">
                                <Facebook className="h-5 w-5" />
                            </button>
                            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500 text-white transition-colors hover:bg-sky-600">
                                <Twitter className="h-5 w-5" />
                            </button>
                            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-700 text-white transition-colors hover:bg-blue-800">
                                <Linkedin className="h-5 w-5" />
                            </button>
                            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-gray-700 transition-colors hover:bg-gray-300">
                                <Share2 className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="prose prose-lg max-w-none">
                        <div
                            className="text-gray-800 leading-relaxed"
                            style={{
                                fontSize: '1.125rem',
                                lineHeight: '1.75rem',
                            }}
                        >
                            {news.content.split('\n').map((paragraph, index) => (
                                paragraph.trim() && (
                                    <p key={index} className="mb-6">
                                        {paragraph}
                                    </p>
                                )
                            ))}
                        </div>
                    </div>

                    {/* Author Box */}
                    <div className="mt-12 rounded-lg border border-gray-200 bg-gray-50 p-6">
                        <div className="flex items-center gap-4">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white">
                                <User className="h-8 w-8" />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">{news.author_name}</p>
                                <p className="text-sm text-gray-600">Administrator</p>
                            </div>
                        </div>
                    </div>
                </article>

                {/* Related News */}
                {relatedNews.length > 0 && (
                    <section className="border-t border-gray-200 bg-gray-50 py-12">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <h2 className="mb-8 text-2xl font-bold text-gray-900">Berita Terkait</h2>

                            <div className="grid gap-6 md:grid-cols-3">
                                {relatedNews.map((item) => (
                                    <Link
                                        key={item.id}
                                        href={route('news.show', item.slug)}
                                        className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
                                    >
                                        {item.featured_image && (
                                            <div className="aspect-video w-full overflow-hidden bg-gray-100">
                                                <img
                                                    src={`/storage/${item.featured_image}`}
                                                    alt={item.title}
                                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                                />
                                            </div>
                                        )}
                                        <div className="p-4">
                                            <div className="mb-2 flex items-center gap-2 text-xs text-gray-500">
                                                <Calendar className="h-3.5 w-3.5" />
                                                {item.published_at}
                                            </div>
                                            <h3 className="mb-2 line-clamp-2 font-bold text-gray-900 transition-colors group-hover:text-blue-600">
                                                {item.title}
                                            </h3>
                                            {item.excerpt && (
                                                <p className="line-clamp-2 text-sm text-gray-600">
                                                    {item.excerpt}
                                                </p>
                                            )}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Footer */}
                <footer className="border-t border-gray-200 bg-white py-8">
                    <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                        <p className="text-sm text-gray-600">
                            © 2026 UPT Stasiun Klimatologi BMKG. All rights reserved.
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}
