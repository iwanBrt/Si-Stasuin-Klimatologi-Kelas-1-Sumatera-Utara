<?php
/**
 * Discovery kode adm4 untuk semua 33 kota/kabupaten Sumatera Utara
 * Strategi: coba kode adm4 dengan format {adm2}.{kec:02d}.{suffix}
 * dan validasi bahwa adm2 yang dikembalikkan sesuai
 */

// Semua adm2 Sumatera Utara
$adm2List = [
    '12.71', '12.72', '12.73', '12.74', '12.75', '12.76', '12.77', '12.78', // Kota
    '12.01', '12.02', '12.03', '12.04', '12.05', '12.06', '12.07', '12.08',
    '12.09', '12.10', '12.11', '12.12', '12.13', '12.14', '12.15', '12.16',
    '12.17', '12.18', '12.19', '12.20', '12.21', '12.22', '12.23', '12.24',
    '12.25', '12.26',
];

function testAdm4Fast(string $adm4): ?array
{
    $url = 'https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=' . $adm4;
    $ch  = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 8,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTPHEADER     => [
            'User-Agent: Mozilla/5.0 Chrome/122',
            'Accept: application/json',
            'Accept-Encoding: gzip, deflate',
        ],
    ]);
    $body = curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($code !== 200 || empty($body)) return null;

    $json = json_decode($body, true);
    if (empty($json['lokasi']) || empty($json['cuaca'])) return null;

    return $json['lokasi'];
}

$results = [];
echo "Mencari kode adm4 untuk setiap adm2...\n\n";

foreach ($adm2List as $adm2) {
    echo "[$adm2] Searching... ";
    $found = false;

    // Coba kecamatan 01–30, suffix 1001/2001/2002/1002
    for ($kec = 1; $kec <= 30 && !$found; $kec++) {
        $kecStr = sprintf('%02d', $kec);

        foreach (['1001', '2001', '1002', '2002', '2003'] as $suffix) {
            $adm4 = "$adm2.$kecStr.$suffix";
            $lok  = testAdm4Fast($adm4);

            if ($lok !== null) {
                // Verifikasi adm2 sesuai
                $lokAdm2 = $lok['adm2'] ?? '';
                if ($lokAdm2 === $adm2) {
                    $kab  = $lok['kota'] ?? ($lok['kabupaten'] ?? '');
                    $kec2 = $lok['kecamatan'] ?? '';
                    $kel  = $lok['kelurahan'] ?? ($lok['desa'] ?? '');
                    echo "FOUND: adm4=$adm4 | $kel, Kec.$kec2, $kab\n";
                    $results[$adm2] = [
                        'adm4' => $adm4,
                        'kab'  => $kab,
                        'kec'  => $kec2,
                        'kel'  => $kel,
                    ];
                    $found = true;
                    break;
                }
            }
            usleep(80000); // 80ms
        }
    }

    if (!$found) {
        echo "NOT FOUND\n";
        $results[$adm2] = null;
    }
}

echo "\n\n=== RINGKASAN HASIL ===\n";
foreach ($adm2List as $adm2) {
    $r = $results[$adm2];
    if ($r) {
        echo "  '$adm2' => '{$r['adm4']}', // {$r['kab']}\n";
    } else {
        echo "  '$adm2' => null, // NOT FOUND\n";
    }
}

// Simpan hasil ke file JSON
file_put_contents(__DIR__ . '/adm4_found.json', json_encode($results, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
echo "\nHasil disimpan ke adm4_found.json\n";
