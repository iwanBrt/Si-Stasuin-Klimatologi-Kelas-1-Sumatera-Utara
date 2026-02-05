<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Laporan Arsip Surat</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Arial', sans-serif;
            padding: 20px;
            font-size: 11px;
        }

        .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 3px solid #2563EB;
            padding-bottom: 15px;
        }

        .header h1 {
            font-size: 18px;
            color: #1E3A8A;
            margin-bottom: 5px;
        }

        .header h2 {
            font-size: 14px;
            color: #475569;
            font-weight: normal;
        }

        .info {
            margin-bottom: 20px;
            font-size: 10px;
        }

        .info table {
            width: 100%;
            max-width: 400px;
        }

        .info td {
            padding: 3px 0;
        }

        .info td:first-child {
            width: 120px;
            font-weight: bold;
        }

        table.data {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }

        table.data thead {
            background-color: #2563EB;
            color: white;
        }

        table.data th {
            padding: 10px 8px;
            text-align: left;
            font-size: 10px;
            font-weight: bold;
            border: 1px solid #cbd5e1;
        }

        table.data td {
            padding: 8px;
            border: 1px solid #e2e8f0;
            font-size: 10px;
        }

        table.data tbody tr:nth-child(even) {
            background-color: #f8fafc;
        }

        table.data tbody tr:hover {
            background-color: #e0f2fe;
        }

        .footer {
            margin-top: 30px;
            text-align: right;
            font-size: 10px;
        }

        .footer .signature {
            margin-top: 60px;
            display: inline-block;
            text-align: center;
        }

        .footer .signature p {
            margin: 5px 0;
        }

        .footer .signature .line {
            width: 200px;
            border-top: 1px solid #000;
            margin-top: 50px;
        }

        .text-center {
            text-align: center;
        }

        .badge {
            display: inline-block;
            padding: 3px 8px;
            border-radius: 4px;
            font-size: 9px;
            font-weight: bold;
        }

        .badge-incoming {
            background-color: #dcfce7;
            color: #166534;
        }

        .badge-outgoing {
            background-color: #dbeafe;
            color: #1e40af;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>LAPORAN ARSIP SURAT</h1>
        <h2>UPT Stasiun Klimatologi Kelas I Sumatera Utara</h2>
    </div>

    <div class="info">
        <table>
            <tr>
                <td>Kategori</td>
                <td>: {{ $categoryLabel }}</td>
            </tr>
            <tr>
                <td>Periode</td>
                <td>: {{ $periodLabel }}</td>
            </tr>
            <tr>
                <td>Tanggal Cetak</td>
                <td>: {{ now()->format('d F Y, H:i') }} WIB</td>
            </tr>
            <tr>
                <td>Total Data</td>
                <td>: {{ $archives->count() }} arsip</td>
            </tr>
        </table>
    </div>

    <table class="data">
        <thead>
            <tr>
                <th width="5%">No</th>
                <th width="15%">Nomor Surat</th>
                <th width="20%">Pengirim</th>
                <th width="20%">Penerima</th>
                <th width="25%">Perihal</th>
                <th width="10%">Kategori</th>
                <th width="10%">Tanggal</th>
            </tr>
        </thead>
        <tbody>
            @forelse($archives as $index => $archive)
            <tr>
                <td class="text-center">{{ $index + 1 }}</td>
                <td>{{ $archive->reference_number }}</td>
                <td>{{ $archive->sender }}</td>
                <td>{{ $archive->recipient }}</td>
                <td>{{ $archive->subject }}</td>
                <td class="text-center">
                    <span class="badge {{ $archive->category === 'incoming' ? 'badge-incoming' : 'badge-outgoing' }}">
                        {{ $archive->category === 'incoming' ? 'Masuk' : 'Keluar' }}
                    </span>
                </td>
                <td class="text-center">{{ \Carbon\Carbon::parse($archive->date)->format('d/m/Y') }}</td>
            </tr>
            @empty
            <tr>
                <td colspan="7" class="text-center" style="padding: 20px;">
                    Tidak ada data arsip surat
                </td>
            </tr>
            @endforelse
        </tbody>
    </table>

    <div class="footer">
        <div class="signature">
            <p>Medan, {{ now()->format('d F Y') }}</p>
            <p style="font-weight: bold;">Administrator</p>
            <div class="line"></div>
            <p>(...........................)</p>
        </div>
    </div>
</body>
</html>
