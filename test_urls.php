<?php
$baseUrl = "https://dataweb.bmkg.go.id/cuaca/spartan/02_sumut_ffmc_";

$suffixes = [
    // Simple indices
    "00.png", "01.png", "02.png", "03.png", "04.png", 
    "00", "01", "02",
    
    // Dates (assuming current date 2026-02-07 from system, but fallback to 2025-02-07 if system clock is ahead)
    gmdate("Ymd") . "00.png", 
    gmdate("Ymd") . "12.png",
    
    // Real world 2025 (just in case system clock is simulated future)
    "2025020700.png",
    
    // Keywords
    "analysis.png", "obs.png", "latest.png"
];

foreach ($suffixes as $suffix) {
    $url = $baseUrl . $suffix;
    $headers = @get_headers($url);
    if ($headers && strpos($headers[0], '200') !== false) {
        echo "[FOUND] $url\n";
    } else {
        echo "[404] $url\n";
    }
}
