<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verifikasi OTP</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .email-container {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }
        .header {
            background: linear-gradient(135deg, #2563eb 0%, #3b82f6 50%, #60a5fa 100%);
            padding: 40px 30px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        .header::before {
            content: '';
            position: absolute;
            top: -50%;
            right: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
            animation: pulse 15s ease-in-out infinite;
        }
        @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 0.8; }
            50% { transform: scale(1.1); opacity: 1; }
        }
        .logo {
            width: 80px;
            height: 80px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-center;
            margin: 0 auto 20px;
            backdrop-filter: blur(10px);
            border: 3px solid rgba(255, 255, 255, 0.3);
        }
        .logo svg {
            width: 40px;
            height: 40px;
            fill: white;
        }
        .header h1 {
            color: white;
            margin: 0;
            font-size: 28px;
            font-weight: 700;
            position: relative;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }
        .header p {
            color: rgba(255, 255, 255, 0.9);
            margin: 10px 0 0;
            font-size: 14px;
            position: relative;
        }
        .content {
            padding: 50px 40px;
            background: white;
        }
        .greeting {
            font-size: 20px;
            color: #1f2937;
            margin-bottom: 20px;
            font-weight: 600;
        }
        .message {
            color: #6b7280;
            line-height: 1.8;
            margin-bottom: 35px;
            font-size: 16px;
        }
        .otp-container {
            background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
            border: 2px dashed #3b82f6;
            border-radius: 15px;
            padding: 30px;
            text-align: center;
            margin: 30px 0;
            position: relative;
            overflow: hidden;
        }
        .otp-container::before {
            content: '';
            position: absolute;
            top: -100%;
            left: -100%;
            width: 300%;
            height: 300%;
            background: radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%);
            animation: rotate 20s linear infinite;
        }
        @keyframes rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        .otp-label {
            font-size: 14px;
            color: #3b82f6;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 15px;
            position: relative;
        }
        .otp-code {
            font-size: 48px;
            font-weight: 800;
            color: #1e40af;
            letter-spacing: 8px;
            margin: 10px 0;
            font-family: 'Courier New', monospace;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
            position: relative;
        }
        .otp-timer {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: rgba(239, 68, 68, 0.1);
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 13px;
            color: #ef4444;
            font-weight: 600;
            margin-top: 15px;
            position: relative;
        }
        .timer-icon {
            width: 16px;
            height: 16px;
        }
        .warning {
            background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
            border-left: 4px solid #f59e0b;
            padding: 20px;
            border-radius: 10px;
            margin: 25px 0;
            display: flex;
            gap: 15px;
        }
        .warning-icon {
            flex-shrink: 0;
            width: 24px;
            height: 24px;
            color: #d97706;
        }
        .warning-content {
            flex: 1;
        }
        .warning-title {
            font-weight: 700;
            color: #92400e;
            margin: 0 0 8px;
            font-size: 15px;
        }
        .warning-text {
            color: #78350f;
            margin: 0;
            font-size: 14px;
            line-height: 1.6;
        }
        .footer {
            background: #f9fafb;
            padding: 30px 40px;
            text-align: center;
            border-top: 1px solid #e5e7eb;
        }
        .footer-text {
            color: #9ca3af;
            font-size: 13px;
            line-height: 1.8;
            margin: 0 0 15px;
        }
        .footer-brand {
            color: #6b7280;
            font-weight: 600;
            font-size: 14px;
            margin: 15px 0 10px;
        }
        .footer-subtitle {
            color: #9ca3af;
            font-size: 12px;
            margin: 0;
        }
        .divider {
            height: 1px;
            background: linear-gradient(90deg, transparent 0%, #e5e7eb 50%, transparent 100%);
            margin: 25px 0;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="header">
            <div class="logo">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/>
                </svg>
            </div>
            <h1>{{ $type === 'registration' ? 'Verifikasi Email Anda' : 'Reset Password' }}</h1>
            <p>UPT Stasiun Klimatologi BMKG</p>
        </div>

        <!-- Content -->
        <div class="content">
            <div class="greeting">Halo! 👋</div>
            
            <div class="message">
                @if($type === 'registration')
                    Terima kasih telah mendaftar di Sistem Magang UPT Stasiun Klimatologi. 
                    Untuk menyelesaikan proses registrasi, silakan masukkan kode verifikasi berikut:
                @else
                    Kami menerima permintaan untuk mereset password akun Anda. 
                    Gunakan kode verifikasi berikut untuk melanjutkan proses reset password:
                @endif
            </div>

            <!-- OTP Box -->
            <div class="otp-container">
                <div class="otp-label">Kode Verifikasi Anda</div>
                <div class="otp-code">{{ $otp }}</div>
                <div class="otp-timer">
                    <svg class="timer-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Berlaku selama {{ $expiresIn }} menit
                </div>
            </div>

            <!-- Warning Box -->
            <div class="warning">
                <svg class="warning-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div class="warning-content">
                    <div class="warning-title">⚠️ Penting untuk Diperhatikan</div>
                    <p class="warning-text">
                        Jangan bagikan kode ini kepada siapa pun. Tim kami tidak akan pernah meminta kode verifikasi Anda. 
                        Jika Anda tidak melakukan permintaan ini, harap abaikan email ini dan segera hubungi tim kami.
                    </p>
                </div>
            </div>

            <div class="divider"></div>

            <div class="message">
                Jika tombol tidak berfungsi atau Anda mengalami kesulitan, silakan hubungi tim support kami di 
                <strong style="color: #2563eb;">magang@klimatologi.bmkg.go.id</strong>
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p class="footer-text">
                Email ini dikirim secara otomatis. Mohon untuk tidak membalas email ini.
            </p>
            <div class="footer-brand">Sistem Informasi Magang & Penelitian</div>
            <p class="footer-subtitle">UPT Stasiun Klimatologi BMKG © 2026</p>
        </div>
    </div>
</body>
</html>
