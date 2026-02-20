<?php
$h = file_get_contents('staklimsumut_raw.html');

// Cari array cities yang lengkap
if (preg_match('/const\s+cities\s*=\s*\[(.*?)\];/s', $h, $m)) {
    echo "=== CITIES ARRAY FOUND ===\n";
    echo "const cities = [" . $m[1] . "];\n";
} else {
    echo "cities array not found with const. Trying var/let...\n";
    if (preg_match('/(?:var|let|const)\s+\w*[Cc]ities?\w*\s*=\s*\[(.*?)\];/s', $h, $m)) {
        echo "=== CITIES ARRAY FOUND ===\n";
        echo "[" . substr($m[1], 0, 10000) . "]\n";
    } else {
        // Cari manual object pattern { code: "12.xxxx"
        echo "Trying to extract city objects...\n";
        preg_match_all('/\{\s*code:\s*["\']([^"\']+)["\'],\s*name:\s*["\']([^"\']+)["\'],\s*type:\s*["\']([^"\']+)["\']\s*\}/', $h, $cities);
        if (!empty($cities[1])) {
            echo "Found " . count($cities[1]) . " cities:\n";
            for ($i = 0; $i < count($cities[1]); $i++) {
                echo "  adm4={$cities[1][$i]} | name={$cities[2][$i]} | type={$cities[3][$i]}\n";
            }
        }
    }
}
