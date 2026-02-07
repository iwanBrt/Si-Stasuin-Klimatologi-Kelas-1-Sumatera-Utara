<?php
$url = 'https://www.bmkg.go.id/cuaca/satelit/polar-hotspot/3';
$html = file_get_contents($url);

echo "Fetched page content.\n";

// Find image src containing 'satelit' or 'hotspot'
// Looking for something like: https://dataweb.bmkg.go.id/Satelit/IMAGE/HIMA/hotspot/HKB_hotspot_HIMA_....png

preg_match_all('/https:[^"\']*hotspot[^"\']*/i', $html, $matches);

if (!empty($matches[0])) {
    echo "Found URLs:\n";
    foreach ($matches[0] as $m) {
        $m = trim($m, '"\\\'');
        echo "$m\n";
    }
} else {
    echo "No hotspot URLs found.\n";
    // Dump a snippet of the HTML to see what's there
    echo "HTML snippet:\n" . substr($html, 0, 2000) . "\n...";
}
