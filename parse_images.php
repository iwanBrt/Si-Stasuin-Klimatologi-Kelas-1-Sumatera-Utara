<?php
$html = file_get_contents('bmkg_dump.html');
$dom = new DOMDocument();
@$dom->loadHTML($html);
$images = $dom->getElementsByTagName('img');
foreach ($images as $img) {
    echo "src: " . $img->getAttribute('src') . "\n";
    echo "data-src: " . $img->getAttribute('data-src') . "\n";
    // Check all attributes just in case
    foreach ($img->attributes as $attr) {
        if (strpos($attr->nodeValue, 'ffmc') !== false) {
             echo "Found content in attribute " . $attr->nodeName . ": " . $attr->nodeValue . "\n";
        }
    }
    echo "-----------------\n";
}

$scripts = $dom->getElementsByTagName('script');
foreach ($scripts as $script) {
    if (strpos($script->textContent, 'ffmc') !== false) {
        file_put_contents('script_dump.txt', $script->textContent);
        break; // Just get the first one
    }
}
