<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Application;
use Carbon\Carbon;

class ApplicationSeeder extends Seeder
{
    public function run()
    {
        // Pastikan ada user applicant dulu
        $user = User::where('email', '!=', 'admin@klimatologi.com')->first();
        
        if (!$user) {
            $user = User::create([
                'name' => 'Budi Applicant',
                'email' => 'budi@example.com',
                'password' => bcrypt('password'),
                'role' => 'user',
                'email_verified_at' => now(),
            ]);
        }

        $applications = [
            [
                'title' => 'Permohonan Magang Analisis Data Iklim',
                'application_type' => 'magang',
                'institution_name' => 'Universitas Sumatera Utara',
                'department' => 'Fakultas MIPA',
                'study_program' => 'Fisika',
                'student_id' => '200801050',
                'phone' => '081234567890',
                'start_date' => Carbon::now()->addMonth(),
                'end_date' => Carbon::now()->addMonths(4),
                'proposal_file' => 'dummy/proposal.pdf', // Dummy path
                'recommendation_letter' => 'dummy/letter.pdf',
                'status' => 'pending',
            ],
            [
                'title' => 'Penelitian Skripsi Pola Curah Hujan',
                'application_type' => 'penelitian',
                'institution_name' => 'Institut Teknologi Medan',
                'department' => 'Teknik Sipil',
                'study_program' => 'Teknik Sipil',
                'student_id' => '180503022',
                'phone' => '082198765432',
                'start_date' => Carbon::now()->subMonth(),
                'end_date' => Carbon::now()->addMonths(2),
                'research_field' => 'Hidrologi',
                'research_objective' => 'Menganalisis pola curah hujan 10 tahun terakhir.',
                'status' => 'approved',
                'reviewed_at' => Carbon::now()->subDays(5),
                'reviewed_by' => 1, // Admin ID assumption
                'admin_notes' => 'Judul penelitian relevan dengan kebutuhan stasiun.',
                'recommendation_letter' => 'dummy/letter.pdf',
            ],
            [
                'title' => 'PKL Teknik Informatika',
                'application_type' => 'pkl',
                'institution_name' => 'Politeknik Negeri Medan',
                'department' => 'Teknik Komputer & Informatika',
                'study_program' => 'Teknik Informatika',
                'student_id' => '210511045',
                'phone' => '085211223344',
                'start_date' => Carbon::now()->addMonths(2),
                'end_date' => Carbon::now()->addMonths(5),
                'status' => 'rejected',
                'reviewed_at' => Carbon::now()->subDay(),
                'reviewed_by' => 1,
                'admin_notes' => 'Maaf, kuota untuk periode tersebut sudah penuh.',
                'recommendation_letter' => 'dummy/letter.pdf',
            ]
        ];

        foreach ($applications as $app) {
            Application::create(array_merge($app, [
                'user_id' => $user->id,
                'institution_address' => 'Jl. Dr. Mansyur No. 9, Medan',
            ]));
        }
    }
}
