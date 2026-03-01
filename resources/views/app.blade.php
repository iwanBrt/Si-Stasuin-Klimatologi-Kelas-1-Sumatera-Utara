<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        
        <!-- SEO Meta Tags -->
        <meta name="description" content="Sistem Informasi UPT Stasiun Klimatologi Sumatera Utara - BMKG. Layanan permohonan data meteorologi, klimatologi, dan informasi cuaca terkini untuk wilayah Sumatera Utara.">
        <meta name="keywords" content="BMKG, Stasiun Klimatologi, Sumatera Utara, Meteorologi, Cuaca, Gempa Bumi, Data Iklim, Peringatan Cuaca, Medan, Indonesia">
        <meta name="author" content="UPT Stasiun Klimatologi BMKG Sumatera Utara">
        <meta name="robots" content="index, follow">
        <meta name="googlebot" content="index, follow">
        
        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="website">
        <meta property="og:url" content="{{ url()->current() }}">
        <meta property="og:title" content="Stasiun Klimatologi BMKG Sumatera Utara">
        <meta property="og:description" content="Sistem Informasi resmi UPT Stasiun Klimatologi BMKG Sumatera Utara. Akses data meteorologi, informasi cuaca, dan layanan klimatologi terpercaya.">
        <meta property="og:image" content="{{ asset('assets/logo-bmkg.png') }}">
        <meta property="og:site_name" content="Stasiun Klimatologi BMKG Sumut">
        <meta property="og:locale" content="id_ID">
        
        <!-- Twitter Card -->
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:url" content="{{ url()->current() }}">
        <meta name="twitter:title" content="Stasiun Klimatologi BMKG Sumatera Utara">
        <meta name="twitter:description" content="Sistem Informasi resmi UPT Stasiun Klimatologi BMKG Sumatera Utara. Akses data meteorologi, informasi cuaca, dan layanan klimatologi terpercaya.">
        <meta name="twitter:image" content="{{ asset('assets/logo-bmkg.png') }}">
        
        <!-- Canonical URL -->
        <link rel="canonical" href="{{ url()->current() }}">
        
        <!-- Schema.org markup for Google -->
        <script type="application/ld+json">
        {!! json_encode([
            '@context' => 'https://schema.org',
            '@type' => 'GovernmentOrganization',
            'name' => 'UPT Stasiun Klimatologi BMKG Sumatera Utara',
            'url' => url('/'),
            'logo' => asset('assets/logo-bmkg.png'),
            'description' => 'Unit Pelaksana Teknis Stasiun Klimatologi Badan Meteorologi Klimatologi dan Geofisika Sumatera Utara',
            'address' => [
                '@type' => 'PostalAddress',
                'streetAddress' => 'Jl. Meteorologi Raya No. 17 Sempali',
                'addressLocality' => 'Deli Serdang',
                'addressRegion' => 'Sumatera Utara',
                'postalCode' => '20371',
                'addressCountry' => 'ID'
            ],
            'telephone' => '+62-61-6614631',
            'email' => 'staklim.sumut@bmkg.go.id',
            'sameAs' => [
                'https://www.bmkg.go.id'
            ]
        ], JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) !!}
        </script>

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net" crossorigin>
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
        
        <!-- Favicon -->
        <link rel="icon" type="image/png" href="/assets/logo-bmkg.png">
        <link rel="shortcut icon" type="image/png" href="/assets/logo-bmkg.png">
        <link rel="apple-touch-icon" href="/assets/logo-bmkg.png">

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
