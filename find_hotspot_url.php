<?php
// Let's try to scrape and save the entire page to analyze it better
$url = 'https://www.bmkg.go.id/cuaca/satelit/polar-hotspot/3';
$html = file_get_contents($url);

// Save to file for inspection
file_put_contents('hotspot_page_source.html', $html);

echo "Page saved to hotspot_page_source.html\n";

// Try different regex patterns to find image URLs
$patterns = [
    '/https:\/\/[^"\']*\/satelit\/[^"\']*hotspot[^"\']*\.png/i',
    '/https:\/\/[^"\']*\/Satelit\/[^"\']*hotspot[^"\']*\.png/i',
    '/https:\/\/dataweb\.bmkg\.go\.id\/[^"\']*\.png/i',
    '/"(\/Satelit\/[^"\']+\.png)"/i',
    '/src="([^"]+hotspot[^"]+)"/i',
];

foreach ($patterns as $i => $pattern) {
    echo "\nPattern $i: $pattern\n";
    if (preg_match_all($pattern, $html, $matches)) {
        echo "Matches found:\n";
        print_r(array_unique($matches[0]));
    } else {
        echo "No matches\n";
    }
}

// Also look for any reference to "Sumatera" or "Sumut" in image context
if (preg_match_all('/https:\/\/[^"\']*[Ss]um[au]t[^"\']*\.png/i', $html, $matches)) {
    echo "\nSumatera-related images:\n";
    print_r(array_unique($matches[0]));
}
