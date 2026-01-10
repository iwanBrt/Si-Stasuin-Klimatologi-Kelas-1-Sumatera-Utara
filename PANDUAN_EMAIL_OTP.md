# PANDUAN KONFIGURASI EMAIL OTP - SISTEM MAGANG UPT KLIMATOLOGI

Sistem OTP (One-Time Password) telah berhasil diimplementasikan! 
Sekarang Anda perlu mengkonfigurasi akun Gmail untuk mengirim email OTP.

## 📧 LANGKAH SETTING GMAIL UNTUK OTP

### 1. Buat App Password di Google Account

1. Buka https://myaccount.google.com/
2. Pilih **Security** di sidebar kiri
3. Scroll ke bagian **"How you sign in to Google"**
4. Klik **"2-Step Verification"** (jika belum aktif, aktifkan dulu)
5. Scroll ke bawah, klik **"App passwords"**
6. Pilih app: **Mail**
7. Pilih device: **Other (Custom name)**
8. Ketik nama: **SI Magang Klimatologi**
9. Klik **"Generate"**
10. **COPY** kode 16 digit yang muncul (contoh: `abcd efgh ijkl mnop`)

### 2. Update File .env

Buka file `.env` di root project Anda, lalu update bagian mail:

```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=pomodorootp@gmail.com
MAIL_PASSWORD= jffa vwni cbvd uuji
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=pomodorootp@gmail.com
MAIL_FROM_NAME="${APP_NAME}"
```

**Ganti:**
- `MAIL_USERNAME` = Email Gmail Anda
- `MAIL_PASSWORD` = 16 digit App Password (tanpa spasi!)
- `MAIL_FROM_ADDRESS` = Email Gmail Anda

### 3. Test Konfigurasi (Opsional)

Jalankan command ini untuk test kirim email:

```bash
php artisan tinker
```

Lalu jalankan:

```php
Mail::raw('Test email from Laravel', function ($message) {
    $message->to('test@example.com')
            ->subject('Test Email');
});
```

Jika berhasil, Anda akan menerima email!

---

## 🎨 FITUR YANG SUDAH DIIMPLEMENTASIKAN

### ✅ 1. REGISTRASI DENGAN OTP
- User register → kirim OTP ke email
- Masukkan 6 digit OTP
- Countdown timer 10 menit
- Tombol resend OTP
- Email template PREMIUM dengan animasi

### ✅ 2. LUPA PASSWORD
- User input email → kirim OTP
- Verify OTP
- Reset password baru
- Password strength indicator

### ✅ 3. TAMPILAN PREMIUM
**Halaman Verifikasi OTP:**
- ✨ Animated background blobs
- 🎯 6 input OTP boxes dengan auto-focus
- ⏱️ Countdown timer real-time
- 🔄 Resend OTP button
- 📱 Responsive design

**Email Template:**
- 🎨 Gradient header dengan animasi
- 🔢 Kode OTP yang jelas dan besar
- ⚠️ Warning box keamanan
- 💼 Professional BMKG branding

---

## 🛠️ FILE-FILE PENTING

### Backend:
1. `app/Models/EmailVerification.php` - Model untuk OTP
2. `app/Mail/SendOtpMail.php` - Mailable class
3. `app/Http/Controllers/Auth/EmailVerificationController.php` - Controller OTP
4. `app/Http/Controllers/Auth/RegisteredUserController.php` - Updated registration
5. `database/migrations/XXX_create_email_verifications_table.php` - Migration OTP table
6. `resources/views/emails/otp.blade.php` - Email template HTML

### Frontend:
1. `resources/js/Pages/Auth/VerifyOtp.jsx` - Halaman verifikasi OTP
2. `resources/js/Pages/Auth/ForgotPassword.jsx` - Halaman lupa password
3. `resources/js/Pages/Auth/ResetPassword.jsx` - Halaman reset password

### Routes:
- `/email/verify` - Halaman verify OTP registrasi
- `/forgot-password` - Halaman lupa password
- `/reset-password/verify` - Verify OTP reset password
- `/reset-password` - Halaman input password baru

---

## 🔐 FLOW LENGKAP

### REGISTRASI:
1. User isi form register
2. Sistem kirim OTP ke email (6 digit)
3. User masukkan OTP di halaman verifikasi
4. Jika benar → user terdaftar & auto login
5. Jika salah → error message
6. Jika expired (10 menit) → bisa klik "Kirim Ulang"

### LUPA PASSWORD:
1. User klik "Lupa Password"
2. Input email
3. Sistem kirim OTP
4. User masukkan OTP
5. Jika benar → masuk halaman reset password
6. User buat password baru
7. Password tersimpan → redirect ke login

---

## ⚠️ TROUBLESHOOTING

### Email tidak terkirim?
1. Cek App Password sudah benar (16 digit tanpa spasi)
2. Pastikan 2-Step Verification aktif di Google Account
3. Cek .env sudah di-save
4. Restart Laravel server: `php artisan serve`

### OTP expired terus?
- OTP berlaku 10 menit
- Klik tombol "Kirim Ulang Kode" untuk generate OTP baru

### Error "SMTP Error"?
- Cek koneksi internet
- Pastikan port 587 tidak diblok firewall
- Coba ganti `MAIL_PORT=465` dan `MAIL_ENCRYPTION=ssl`

---

## 📝 CATATAN

- **Keamanan:** OTP disimpan ter-enkripsi di database
- **Expirasi:** OTP berlaku 10 menit
- **Rate Limit:** User bisa resend OTP setelah timer habis
- **Email Design:** Responsive dan compatible dengan semua email client

---

## 🎉 SELESAI!

Sistem OTP sudah siap digunakan! Tinggal:
1. Setting `.env` dengan App Password Gmail
2. Test registrasi user baru
3. Test lupa password

**Good Luck!** 🚀

---

_Dibuat dengan ❤️ untuk UPT Stasiun Klimatologi BMKG_
