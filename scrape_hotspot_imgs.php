<?php
$url = 'https://www.bmkg.go.id/cuaca/satelit/polar-hotspot/3';
$html = file_get_contents($url);

echo "Fetched page content.\n";

// The image is likely in an 'img' tag. Let's dump all img src attributes.
preg_match_all('/<img[^>]+src="([^">]+)"/i', $html, $matches);

if (!empty($matches[1])) {
    echo "Found IMG sources:\n";
    foreach ($matches[1] as $m) {
        echo "$m\n";
    }
} else {
    echo "No IMG tags found.\n";
}
