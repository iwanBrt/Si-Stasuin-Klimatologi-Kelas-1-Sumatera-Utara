import { Head, Link } from '@inertiajs/react';
import { MapPin, CheckCircle, Target } from 'lucide-react';
import Navbar from '@/Components/Navbar';

export default function StaklimSumut({ auth }) {
    return (
        <div className="min-h-screen bg-white">
            <Head title="Profil Staklim Sumut - Stasiun Klimatologi Sumatera Utara" />

            <Navbar auth={auth} />

            <main className="py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-screen">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">

                    {/* Header Section */}
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-4">Profil Unit</span>
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Stasiun Klimatologi Sumatera Utara</h1>
                        <div className="h-1.5 w-24 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full mb-6"></div>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Menyediakan layanan informasi iklim prima untuk mendukung keselamatan dan kesejahteraan masyarakat Sumatera Utara.
                        </p>
                    </div>

                    {/* Sejarah */}
                    {/* Sejarah & Profile Video */}
                    <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-blue-100 mb-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-16 -mt-16 z-0"></div>
                        <div className="relative z-10">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                                <MapPin className="w-6 h-6 mr-2 text-blue-600" />
                                Stasiun Klimatologi Sumatera Utara
                            </h2>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                                {/* YouTube Video Embed */}
                                <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200 aspect-video w-full">
                                    <iframe
                                        className="w-full h-full"
                                        src="https://www.youtube.com/embed/Y-X7iOr_4iA"
                                        title="Profil Stasiun Klimatologi Sumatera Utara"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                    ></iframe>
                                </div>

                                {/* Text Content */}
                                <div className="prose prose-lg text-gray-600 text-justify">
                                    <p className="mb-4">
                                        Berdirinya <strong>Stasiun Klimatologi Kelas I Sampali Medan</strong> didasari akan kebutuhan untuk melakukan pengamatan iklim di Sumatera Utara, khususnya Perkebunan Sampali. Sampali adalah sebuah desa kecil di kabupaten Deli Serdang tempat tembakau deli yang sangat tersohor di dunia tersebut.
                                    </p>
                                    <p className="mb-4">
                                        Pada tahun 1965 disepakati pendirian Stasiun Klimatologi Sampali dengan menempati areal seluas 2,5 Hektar yang merupakan bekas pembibitan tembakau. Lokasi yang saat itu masih tergolong jauh dari lokasi pemukiman penduduk, membuat Stasiun ini sangat ideal.
                                    </p>
                                    <p className="mb-4">
                                        Stasiun Klimatologi Sampali Medan kini sudah mengalami perkembangan pesat. Stasiun ini menjadi kelas I dan merupakan Stasiun Klimatologi di bawah BMKG yang memiliki fasilitas terlengkap di Sumatera.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Visi Misi */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-3xl p-8 text-white shadow-xl">
                            <h3 className="text-xl font-bold mb-4 border-b border-white/20 pb-4">Visi</h3>
                            <p className="leading-relaxed font-medium">
                                "Mewujudkan BMKG yang handal, tanggap dan mampu dalam rangka mendukung keselamatan masyarakat serta keberhasilan pembangunan nasional, dan berperan aktif di tingkat internasional."
                            </p>
                        </div>
                        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl">
                            <h3 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-4">Misi Utama</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                                    <span className="text-gray-600 text-sm">Mengamati dan memahami fenomena meteorologi, klimatologi, kualitas udara dan geofisika.</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                                    <span className="text-gray-600 text-sm">Menyediakan data dan informasi yang handal dan terpercaya.</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                                    <span className="text-gray-600 text-sm">Mengkoordinasikan dan memfasilitasi kegiatan terkait.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Tugas Pokok */}
                    <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-blue-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                            <Target className="w-6 h-6 mr-2 text-red-600" />
                            Tugas Pokok & Fungsi
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                "Pengamatan klimatologi, meteorologi pertanian, dan kualitas udara.",
                                "Pengumpulan, Penyebaran, Quality Control, dan Penyimpanan Data.",
                                "Pelayanan Jasa Analisa, Prakiraan, dan Informasi Iklim Ekstrim.",
                                "Pemeliharaan peralatan pengamatan iklim atau cuaca.",
                                "Koordinasi dan Kerjasama dengan Stakeholder di Sumatera Utara.",
                                "Pelaksanaan Tugas Administrasi dan Kerumahtanggaan."
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-start bg-gray-50 p-4 rounded-xl hover:bg-blue-50 transition-colors">
                                    <div className="w-8 h-8 rounded-full bg-white text-blue-600 font-bold flex items-center justify-center shadow-sm mr-4 text-sm flex-shrink-0 border border-blue-100">
                                        {idx + 1}
                                    </div>
                                    <p className="text-gray-700 font-medium">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
