<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Surat Penerimaan Magang</title>
    <style>
        body {
            font-family: "Times New Roman", Times, serif;
            line-height: 1.5;
            margin: 0;
            padding: 0;
        }
        .header {
            text-align: center;
            border-bottom: 3px double #000;
            padding-bottom: 10px;
            margin-bottom: 30px;
        }
        .header h2, .header h3, .header p {
            margin: 0;
            padding: 0;
        }
        .header h2 {
            font-size: 16pt;
            text-transform: uppercase;
        }
        .header h3 {
            font-size: 14pt;
            font-weight: normal;
        }
        .header p {
            font-size: 10pt;
            font-style: italic;
        }
        .content {
            margin-left: 2cm;
            margin-right: 2cm;
        }
        .title {
            text-align: center;
            margin-bottom: 30px;
        }
        .title h4 {
            text-decoration: underline;
            margin-bottom: 5px;
            font-size: 14pt;
        }
        .title p {
            margin-top: 0;
            font-size: 11pt;
        }
        .biodata table {
            width: 100%;
            margin-bottom: 20px;
        }
        .biodata td {
            vertical-align: top;
            padding: 5px 0;
        }
        .biodata .label {
            width: 150px;
        }
        .biodata .separator {
            width: 20px;
            text-align: center;
        }
        .footer {
            margin-top: 50px;
            text-align: right;
            margin-right: 2cm;
        }
        .signature {
            margin-top: 80px;
            font-weight: bold;
            text-decoration: underline;
        }
        .nip {
            margin-top: 5px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h3>BADAN METEOROLOGI, KLIMATOLOGI, DAN GEOFISIKA</h3>
        <h2>STASIUN KLIMATOLOGI KELAS I SUMATERA UTARA</h2>
        <p>Jl. Ngumban Surbakti No. 15, Sempakata, Kec. Medan Selayang, Kota Medan, Sumatera Utara 20131</p>
    </div>

    <div class="content">
        <div class="title">
            <h4>SURAT KETERANGAN PENERIMAAN</h4>
            <p>Nomor: DL.{{ str_pad($application->id, 4, '0', STR_PAD_LEFT) }}/Klimatologi/{{ date('Y') }}</p>
        </div>

        <p>Dengan hormat,</p>
        <p>Berdasarkan permohonan yang diajukan pada tanggal {{ \Carbon\Carbon::parse($application->created_at)->translatedFormat('d F Y') }}, dengan ini kami menerangkan bahwa:</p>

        <div class="biodata">
            <table>
                <tr>
                    <td class="label">Nama</td>
                    <td class="separator">:</td>
                    <td><b>{{ $user->name }}</b></td>
                </tr>
                <tr>
                    <td class="label">Asal Instansi</td>
                    <td class="separator">:</td>
                    <td>{{ $application->institution_name }}</td>
                </tr>
                <tr>
                    <td class="label">Jurusan</td>
                    <td class="separator">:</td>
                    <td>{{ $application->department }} / {{ $application->study_program }}</td>
                </tr>
                <tr>
                    <td class="label">Judul/Posisi</td>
                    <td class="separator">:</td>
                    <td>{{ $application->title }}</td>
                </tr>
            </table>
        </div>

        <p>Telah <b>DITERIMA</b> untuk melaksanakan kegiatan <b>{{ strtoupper(str_replace('_', ' ', $application->application_type)) }}</b> di lingkungan Stasiun Klimatologi Kelas I Sumatera Utara.</p>

        <p>Kegiatan tersebut akan dilaksanakan pada:</p>
        <div class="biodata">
            <table>
                <tr>
                    <td class="label">Tanggal Mulai</td>
                    <td class="separator">:</td>
                    <td>{{ \Carbon\Carbon::parse($application->start_date)->translatedFormat('d F Y') }}</td>
                </tr>
                <tr>
                    <td class="label">Tanggal Selesai</td>
                    <td class="separator">:</td>
                    <td>{{ \Carbon\Carbon::parse($application->end_date)->translatedFormat('d F Y') }}</td>
                </tr>
            </table>
        </div>

        <p>Demikian surat keterangan ini dibuat untuk dapat dipergunakan sebagaimana mestinya.</p>

        <div class="footer">
            <p>Medan, {{ now()->translatedFormat('d F Y') }}</p>
            <p>Kepala Stasiun,</p>
            <div class="signature">Dr. Admin Klimatologi, M.Si</div>
            <div class="nip">NIP. 19800101 200501 1 001</div>
        </div>
    </div>
</body>
</html>
