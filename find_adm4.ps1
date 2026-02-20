param([string]$Adm2, [string]$Name)

[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$wc = New-Object System.Net.WebClient
$wc.Headers.Add("User-Agent", "Mozilla/5.0 Chrome/122")
$wc.Headers.Add("Accept", "application/json")

$found = $false

# Coba range kecamatan 01-35, suffix kelurahan 1001 dan desa 2001/2002/2003
for ($kec = 1; $kec -le 35; $kec++) {
    $kecStr = "{0:D2}" -f $kec
    
    foreach ($suffix in @("1001", "1002", "2001", "2002")) {
        $adm4 = "$Adm2.$kecStr.$suffix"
        $url = "https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=$adm4"
        
        try {
            $data = $wc.DownloadString($url)
            $json = $data | ConvertFrom-Json
            $lok  = $json.lokasi
            
            if ($lok) {
                # Verifikasi bahwa kab/kota sesuai dengan adm2 target
                $adm2Check = $lok.adm2
                if ($adm2Check -eq $Adm2) {
                    $kel  = if ($lok.kelurahan) { $lok.kelurahan } else { $lok.desa }
                    $kab  = if ($lok.kota) { $lok.kota } else { $lok.kabupaten }
                    Write-Host "FOUND $Adm2 ($Name): adm4=$adm4 | $kel, Kec.$($lok.kecamatan), $kab"
                    $found = $true
                    exit 0
                }
            }
        } catch {
            # HTTP errors = silently continue
        }
        
        Start-Sleep -Milliseconds 100
    }
}

if (-not $found) {
    Write-Host "NOT_FOUND $Adm2 ($Name)"
}
