import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import { CloudRain, Map, BarChart3, Download, FolderDown, FileImage } from 'lucide-react';

export default function NormalHujanBulanan({ auth, petaFiles, grafikFiles }) {

    const handleDownloadFolder = (type) => {
        window.location.href = route('normal-iklim.download-folder', { type });
    };

    return (
        <>
            <Head title="Normal Hujan Bulanan" />

            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Navbar auth={auth} />

                <main className="flex-grow py-12">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        {/* Header */}
                        <div className="mb-12 text-center">
                            <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-4">
                                <CloudRain className="h-8 w-8 text-blue-600" />
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                                Normal Hujan Bulanan
                            </h1>
                            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                                Informasi lengkap mengenai normal curah hujan bulanan periode 1991-2020 di Sumatera Utara.
                            </p>
                        </div>

                        {/* Description Card */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-12">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <Map className="h-5 w-5 text-blue-500" />
                                Tentang Data Normal Curah Hujan
                            </h2>
                            <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed">
                                <p>
                                    Data normal curah hujan bulanan merupakan nilai curah hujan rata-rata selama rentang waktu minimal <strong>30 tahun</strong>.
                                    Pembuatan peta spasial normal hujan bulanan ini memanfaatkan data periode <strong>1991 - 2020</strong>.
                                </p>
                                <p className="mt-4">
                                    Normal curah hujan diklasifikasikan menjadi 3 kategori utama:
                                </p>
                                <div className="grid sm:grid-cols-3 gap-4 mt-4">
                                    <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-xl text-center">
                                        <span className="block text-sm font-semibold text-yellow-700 uppercase tracking-wide">Rendah</span>
                                        <span className="block text-2xl font-bold text-yellow-900 mt-1">0 - 100 mm</span>
                                    </div>
                                    <div className="bg-green-50 border border-green-100 p-4 rounded-xl text-center">
                                        <span className="block text-sm font-semibold text-green-700 uppercase tracking-wide">Menengah</span>
                                        <span className="block text-2xl font-bold text-green-900 mt-1">100 - 300 mm</span>
                                    </div>
                                    <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl text-center">
                                        <span className="block text-sm font-semibold text-blue-700 uppercase tracking-wide">Tinggi</span>
                                        <span className="block text-2xl font-bold text-blue-900 mt-1">300 - 500 mm</span>
                                        <span className="block text-xs text-blue-600 mt-1">Sangat Tinggi &gt; 500 mm</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Peta Normal Section */}
                        <div className="mb-12">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                                <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                    <Map className="h-6 w-6 text-indigo-600" />
                                    Peta Normal Hujan
                                </h3>
                                <button
                                    onClick={() => handleDownloadFolder('peta')}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                                >
                                    <FolderDown className="h-4 w-4" />
                                    Download Semua Peta (.zip)
                                </button>
                            </div>

                            {petaFiles.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {petaFiles.map((file, index) => (
                                        <div key={index} className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all">
                                            <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                                                <img
                                                    src={file.url}
                                                    alt={file.name}
                                                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                                                />
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                                    <a
                                                        href={file.url}
                                                        download
                                                        className="p-2 bg-white rounded-full shadow-lg hover:scale-110 transition-transform"
                                                        title="Download Image"
                                                    >
                                                        <Download className="h-5 w-5 text-gray-700" />
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="p-4">
                                                <p className="text-sm font-medium text-gray-900 truncate" title={file.name}>
                                                    {file.name}
                                                </p>
                                                <a
                                                    href={file.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-xs text-indigo-600 hover:text-indigo-800 mt-1 inline-flex items-center gap-1"
                                                >
                                                    <FileImage className="h-3 w-3" />
                                                    Lihat Full Size
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-gray-50 rounded-2xl p-12 text-center text-gray-500">
                                    <FileImage className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                                    <p>Tidak ada data peta tersedia saat ini.</p>
                                </div>
                            )}
                        </div>

                        {/* Grafik Normal Section */}
                        <div className="mb-12">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                                <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                    <BarChart3 className="h-6 w-6 text-emerald-600" />
                                    Grafik Normal Hujan (Per ZOM)
                                </h3>
                                <button
                                    onClick={() => handleDownloadFolder('grafik')}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors shadow-sm"
                                >
                                    <FolderDown className="h-4 w-4" />
                                    Download Semua Grafik (.zip)
                                </button>
                            </div>

                            {grafikFiles.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {grafikFiles.map((file, index) => (
                                        <div key={index} className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all">
                                            <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                                                <img
                                                    src={file.url}
                                                    alt={file.name}
                                                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                                                />
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                                    <a
                                                        href={file.url}
                                                        download
                                                        className="p-2 bg-white rounded-full shadow-lg hover:scale-110 transition-transform"
                                                        title="Download Image"
                                                    >
                                                        <Download className="h-5 w-5 text-gray-700" />
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="p-4">
                                                <p className="text-sm font-medium text-gray-900 truncate" title={file.name}>
                                                    {file.name}
                                                </p>
                                                <a
                                                    href={file.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-xs text-emerald-600 hover:text-emerald-800 mt-1 inline-flex items-center gap-1"
                                                >
                                                    <FileImage className="h-3 w-3" />
                                                    Lihat Full Size
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-gray-50 rounded-2xl p-12 text-center text-gray-500">
                                    <FileImage className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                                    <p>Tidak ada data grafik tersedia saat ini.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="border-t border-gray-200 bg-white py-8 mt-auto">
                    <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                        <p className="text-sm text-gray-600">
                            © 2026 UPT Stasiun Klimatologi BMKG Sumatera Utara. Hak Cipta Dilindungi.
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}
