<?php
$baseUrl = "https://dataweb.bmkg.go.id/cuaca/spartan/02_sumut_fwi_";

$suffixes = [
    "00.png", "01.png", "02.png", "03.png", "04.png", 
    "00", "01", "02",
    
    // Dates 
    gmdate("Ymd") . "00.png", 
    gmdate("Ymd") . "12.png",
    "2025020700.png",
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
