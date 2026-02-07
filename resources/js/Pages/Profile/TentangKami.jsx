import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';

export default function TentangKami({ auth }) {
    return (
        <div className="min-h-screen bg-white">
            <Head title="Tentang Kami - BMKG" />

            {/* Navbar */}
            <Navbar auth={auth} />

            <main className="py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-screen">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-blue-100">
                        <div className="text-center mb-12">
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">Tentang BMKG</h1>
                            <div className="h-1.5 w-24 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
                        </div>

                        <div className="prose prose-lg mx-auto text-gray-600 text-justify">
                            <p className="mb-6">
                                <strong>Badan Meteorologi, Klimatologi, dan Geofisika (BMKG)</strong>, sebelumnya bernama Badan Meteorologi dan Geofisika (BMG), adalah Lembaga Pemerintah Non Kementerian Indonesia yang mempunyai tugas pemerintahan di bidang meteorologi, klimatologi, dan geofisika.
                            </p>
                            <p className="mb-6">
                                BMKG mempunyai status sebuah Lembaga Pemerintah Non Kementerian (LPNK), dipimpin oleh seorang Kepala Badan. BMKG mempunyai tugas : melaksanakan tugas pemerintahan di bidang Meteorologi, Klimatologi, Kualitas Udara dan Geofisika sesuai dengan ketentuan perundang-undangan yang berlaku.
                            </p>
                            <p className="mb-6">
                                Dalam melaksanakan tugas sebagaimana dimaksud di atas, Badan Meteorologi Klimatologi dan Geofisika menyelenggarakan fungsi :
                            </p>
                            <ul className="list-disc pl-6 space-y-2 mb-6">
                                <li>Perumusan kebijakan nasional dan kebijakan umum di bidang meteorologi, klimatologi, dan geofisika;</li>
                                <li>Perumusan kebijakan teknis di bidang meteorologi, klimatologi, dan geofisika;</li>
                                <li>Koordinasi kebijakan, perencanaan dan program di bidang meteorologi, klimatologi, dan geofisika;</li>
                                <li>Pelaksanaan, pembinaan dan pengendalian observasi, dan pengolahan data dan informasi di bidang meteorologi, klimatologi, dan geofisika;</li>
                                <li>Pelayanan data dan informasi di bidang meteorologi, klimatologi, dan geofisika;</li>
                                <li>Penyampaian informasi kepada instansi dan pihak terkait serta masyarakat berkenaan dengan perubahan iklim;</li>
                                <li>Penyampaian informasi dan peringatan dini kepada instansi dan pihak terkait serta masyarakat berkenaan dengan bencana karena factor meteorologi, klimatologi, dan geofisika;</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
