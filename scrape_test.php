<?php
require 'vendor/autoload.php';
use Illuminate\Support\Facades\Http;

// Mocking simple fetch since we can't easily use Laravel facade outside app without bootstrapping
// We'll use native PHP functionality for this test script
$url = 'https://www.bmkg.go.id/cuaca/peringatan-dini-cuaca/12';
$opts = [
    "ssl" => [
        "verify_peer" => false,
        "verify_peer_name" => false,
    ],
    "http" => [
        "header" => "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36\r\n"
    ]
];

$context = stream_context_create($opts);
$html = file_get_contents($url, false, $context);

if ($html === false) {
    echo "Failed to fetch URL\n";
    exit;
}

echo "Page Title: " . (preg_match('/<title>(.*?)<\/title>/', $html, $m) ? $m[1] : 'Not Found') . "\n";

// Look for images
preg_match_all('/<img[^>]+src="([^">]+)"/i', $html, $matches);
print_r($matches[1]);

// Look specifically for warning images - often related to "peringatan" or inside a specific div
// Let's print a snippet near "Peringatan Dini"
$pos = strpos($html, 'Peringatan Dini');
if ($pos !== false) {
    echo "\nSnippet around Peringatan Dini:\n";
    echo substr($html, $pos, 500) . "\n";
}
