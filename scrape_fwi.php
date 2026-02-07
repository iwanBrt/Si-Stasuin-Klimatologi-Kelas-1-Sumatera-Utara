<?php
$url = 'https://www.bmkg.go.id/cuaca/karhutla/fwi/2';
$html = file_get_contents($url);

echo "Fetched page content.\n";

// Find image src containing 'spartan'
preg_match_all('/https:[^"]*spartan[^"]*/', $html, $matches);

if (!empty($matches[0])) {
    echo "Found URLs:\n";
    foreach ($matches[0] as $m) {
        $m = trim($m, '"\\');
        echo "$m\n";
    }
} else {
    echo "No spartan URLs found.\n";
}
