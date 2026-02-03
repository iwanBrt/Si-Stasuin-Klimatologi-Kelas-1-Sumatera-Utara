<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: 'Segoe UI', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .header {
            border-bottom: 3px solid #0ea5e9;
            padding-bottom: 20px;
            margin-bottom: 30px;
            text-align: center;
        }
        .header h2 {
            color: #0f172a;
            margin: 0;
            font-size: 24px;
            font-weight: 700;
        }
        .content {
            margin-bottom: 40px;
        }
        .info-table {
            width: 100%;
            border-collapse: separate;
            border-spacing: 0;
            margin: 25px 0;
            background-color: #f8fafc;
            border-radius: 8px;
            overflow: hidden;
            border: 1px solid #e2e8f0;
        }
        .info-table td {
            padding: 12px 20px;
            border-bottom: 1px solid #e2e8f0;
        }
        .info-table tr:last-child td {
            border-bottom: none;
        }
        .info-table td:first-child {
            font-weight: 600;
            width: 35%;
            color: #64748b;
            background-color: #f1f5f9;
        }
        .info-table td:last-child {
            color: #334155;
            font-weight: 500;
        }
        .btn-container {
            text-align: center;
            margin-top: 35px;
        }
        .btn {
            display: inline-block;
            background-color: #0284c7;
            color: #ffffff;
            padding: 14px 30px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            transition: background-color 0.3s ease;
        }
        .btn:hover {
            background-color: #0369a1;
        }
        .footer {
            margin-top: 30px;
            font-size: 13px;
            color: #94a3b8;
            text-align: center;
            border-top: 1px solid #eee;
            padding-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Permohonan Magang Baru</h2>
        </div>
        
        <div class="content">
            <p style="font-size: 16px;">Halo <strong>Admin</strong>,</p>
            <p>Telah masuk permohonan magang/penelitian baru di sistem. Mohon untuk segera melakukan verifikasi data berikut:</p>
            
            <table class="info-table">
                <tr>
                    <td>Nama Lengkap</td>
                    <td>{{ $application->user->name }}</td>
                </tr>
                <tr>
                    <td>Asal Instansi/Kampus</td>
                    <td>{{ $application->institution_name }}</td>
                </tr>
                @if($application->department)
                <tr>
                    <td>Jurusan</td>
                    <td>{{ $application->department }}</td>
                </tr>
                @endif
                <tr>
                    <td>Tipe Permohonan</td>
                    <td>{{ ucwords(str_replace('_', ' ', $application->application_type)) }}</td>
                </tr>
                <tr>
                    <td>Periode</td>
                    <td>
                        {{ $application->start_date ? $application->start_date->format('d M Y') : '-' }} 
                        s/d 
                        {{ $application->end_date ? $application->end_date->format('d M Y') : '-' }}
                    </td>
                </tr>
            </table>
            
            <div class="btn-container">
                <a href="{{ route('login') }}" class="btn">Cek Dashboard Admin</a>
            </div>
        </div>
        
        <div class="footer">
            <p>&copy; {{ date('Y') }} Sistem Informasi Magang & Penelitian UPT Stasiun Klimatologi.</p>
        </div>
    </div>
</body>
</html>
