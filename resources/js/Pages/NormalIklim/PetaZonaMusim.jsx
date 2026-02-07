import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import { Map, Info } from 'lucide-react';

export default function PetaZonaMusim({ auth, mapUrl }) {
    return (
        <>
            <Head title="Peta Zona Musim" />

            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Navbar auth={auth} />

                <main className="flex-grow py-12">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        {/* Header */}
                        <div className="mb-12 text-center">
                            <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-4">
                                <Map className="h-8 w-8 text-blue-600" />
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                                Peta Zona Musim (ZOM)
                            </h1>
                            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                                Informasi mengenai pembagian Zona Musim di wilayah Sumatera Utara.
                            </p>
                        </div>

                        {/* Description Card */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-12">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                                <Info className="h-5 w-5 text-blue-500" />
                                Penjelasan Zona Musim
                            </h2>
                            <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed space-y-4">
                                <p>
                                    <strong>ZONA MUSIM</strong> adalah daerah yang pola hujan rata-ratanya memiliki perbedaan yang jelas antara periode musim kemarau dan musim hujan. Daerah-daerah yang pola hujan rata-ratanya tidak memiliki perbedaan yang jelas antara periode musim kemarau dan musim hujan disebut daerah <strong>Non ZOM</strong>.
                                </p>
                                <p>
                                    Luas suatu wilayah ZOM tidak selalu sama dengan luas suatu wilayah administrasi pemerintahan. Dengan demikian, satu wilayah ZOM bisa terdiri dari beberapa kabupaten, dan sebaliknya satu wilayah kabupaten bisa terdiri dari beberapa ZOM.
                                </p>
                                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                                    <p className="font-medium text-blue-900">
                                        Sejak bulan Juli 2022, Zona Musim diupdate dan dalam hal ini, terjadi perubahan jumlah Zona Musim menjadi seperti Gambar di bawah ini:
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Image Section */}
                        <div className="bg-white rounded-3xl p-4 sm:p-8 shadow-sm border border-gray-100">
                            <figure className="flex flex-col items-center">
                                <div className="overflow-hidden rounded-xl shadow-lg border border-gray-200">
                                    <img
                                        src={mapUrl || "/assets/petaZonaMusim.jpeg"}
                                        alt="Peta Zona Musim di Sumatera Utara"
                                        className="w-full h-auto max-w-4xl object-contain hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <figcaption className="mt-4 text-sm text-gray-500 italic">
                                    Gambar 1. Peta zona musim di Sumatera Utara
                                </figcaption>
                            </figure>
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
