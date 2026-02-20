<?php
/**
 * Inspect staklimsumut.com - ambil raw HTML dengan curl dan cari sumber data
 */

$baseUrl = 'https://www.staklimsumut.com';

function fetchUrl(string $url): array {
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 20,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_ENCODING       => '', // auto-decode gzip/deflate
        CURLOPT_HTTPHEADER     => [
            'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/122 Safari/537.36',
            'Accept: text/html,application/xhtml+xml,*/*;q=0.8',
            'Accept-Language: id-ID,id;q=0.9,en;q=0.8',
        ],
    ]);
    $body = curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $type = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
    curl_close($ch);
    return ['body' => $body, 'code' => $code, 'type' => $type];
}

// Fetch halaman utama
$r = fetchUrl($baseUrl . '/index.php');
$html = $r['body'];

echo "Status: {$r['code']} | Len: " . strlen($html) . " | Type: {$r['type']}\n\n";

// Simpan HTML untuk inspeksi manual
file_put_contents(__DIR__ . '/staklimsumut_raw.html', $html);
echo "HTML saved to staklimsumut_raw.html\n\n";

// Cari semua script src
echo "=== Script sources ===\n";
preg_match_all('/<script[^>]*src=["\']([^"\']+)["\'][^>]*>/i', $html, $m);
foreach ($m[1] as $s) echo "  $s\n";

// Cari inline scripts yang ada fetch/ajax
echo "\n=== Inline <script> blocks ===\n";
preg_match_all('/<script(?![^>]*src)[^>]*>(.*?)<\/script>/si', $html, $scripts);
foreach ($scripts[1] as $idx => $script) {
    if (strlen(trim($script)) > 10) {
        echo "\n--- Script #$idx ---\n";
        echo substr($script, 0, 2000) . "\n";
    }
}

// Cari URL BMKG / fetch / ajax
echo "\n=== BMKG/API URLs ===\n";
preg_match_all('/(?:fetch|src|href|url|action)\s*[:=(,]\s*["\']([^"\']*(?:bmkg|cuaca|xml|forecast|weather|api)[^"\']*)["\']/', $html, $found);
foreach (array_unique($found[1]) as $u) echo "  $u\n";

// Cari semua link ke file PHP
echo "\n=== PHP files referenced ===\n";
preg_match_all('/["\']([^"\']*\.php[^"\']*)["\']/', $html, $php);
foreach (array_unique($php[1]) as $p) {
    if (!str_contains($p, 'index.php') || str_contains($p, '?')) {
        echo "  $p\n";
    }
}
