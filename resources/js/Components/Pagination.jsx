import { Link } from '@inertiajs/react';

export default function Pagination({ links }) {
    return (
        links && links.length > 3 && (
            <div className="flex flex-wrap -mb-1">
                {links.map((link, key) => (
                    link.url === null ? (
                        <div key={key} className="mr-1 mb-1 px-4 py-3 text-sm leading-4 text-gray-400 border rounded">
                            <span dangerouslySetInnerHTML={{ __html: link.label }} />
                        </div>
                    ) : (
                        <Link
                            key={key}
                            className={`mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-white focus:border-indigo-500 focus:text-indigo-500 ${link.active ? 'bg-blue-700 text-white' : 'bg-white text-gray-700'
                                }`}
                            href={link.url}
                        >
                            <span dangerouslySetInnerHTML={{ __html: link.label }} />
                        </Link>
                    )
                ))}
            </div>
        )
    );
}
