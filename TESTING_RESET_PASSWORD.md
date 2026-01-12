# Testing Guide: Verifikasi Link Reset Password

## Deskripsi
Panduan ini untuk memverifikasi bahwa link yang dikirim ke email saat fitur "Lupa Password" digunakan benar-benar mengarah ke halaman form pembuatan password baru (ResetPassword.jsx), bukan kembali ke halaman input email.

## Perubahan yang Dilakukan

### 1. Custom Password Reset Notification
**File**: `app/Notifications/ResetPasswordNotification.php`

Notification custom ini memastikan bahwa:
- URL yang dibuat menggunakan route `password.reset` yang benar
- Format URL: `http://yourdomain.com/reset-password/{token}?email={email}`
- Email dalam bahasa Indonesia untuk pengalaman pengguna yang lebih baik

### 2. User Model Update
**File**: `app/Models/User.php`

Method `sendPasswordResetNotification()` ditambahkan untuk:
- Override default Laravel password reset notification
- Menggunakan custom notification yang telah dibuat
- Memastikan link yang dikirim sesuai dengan routing aplikasi

## Langkah Testing

### Persiapan
1. Pastikan konfigurasi mail sudah benar di `.env`:
   ```env
   MAIL_MAILER=smtp
   MAIL_HOST=smtp.gmail.com
   MAIL_PORT=587
   MAIL_USERNAME=your-email@gmail.com
   MAIL_PASSWORD=your-app-password
   MAIL_ENCRYPTION=tls
   MAIL_FROM_ADDRESS=your-email@gmail.com
   MAIL_FROM_NAME="${APP_NAME}"
   ```

2. Pastikan `APP_URL` di `.env` sesuai dengan aplikasi Anda:
   ```env
   APP_URL=http://127.0.0.1:8000
   ```

### Testing Step-by-Step

#### 1. Test Forgot Password Flow
1. Buka browser dan akses: `http://127.0.0.1:8000/forgot-password`
2. Masukkan email yang valid dan terdaftar di sistem
3. Klik tombol "Kirim Link Reset"
4. Tunggu pesan sukses muncul

#### 2. Verifikasi Email
1. Buka inbox email yang Anda masukkan
2. Cari email dari aplikasi dengan subject "Reset Password - [APP_NAME]"
3. Buka email tersebut
4. **Periksa link yang ada di tombol "Reset Password"**

#### 3. Verifikasi URL Format
Link yang benar harus dalam format:
```
http://127.0.0.1:8000/reset-password/{RANDOM_TOKEN}?email={YOUR_EMAIL}
```

**Contoh**:
```
http://127.0.0.1:8000/reset-password/abc123def456ghi789?email=user@example.com
```

**BUKAN**:
```
http://127.0.0.1:8000/forgot-password?email=user@example.com
```

#### 4. Test Reset Password Page
1. Klik link di email
2. **Verifikasi bahwa halaman yang terbuka adalah:**
   - Judul halaman: "Reset Password"
   - Ada field email (readonly/disabled)
   - Ada field "Password Baru"
   - Ada field "Konfirmasi Password"
   - Ada tombol "Reset Password"
   - Ada password strength indicator

3. **PASTIKAN BUKAN halaman:**
   - Halaman "Lupa Password?"
   - Halaman input email lagi

#### 5. Test Reset Password Functionality
1. Masukkan password baru (minimal 8 karakter)
2. Konfirmasi password
3. Klik "Reset Password"
4. Seharusnya redirect ke halaman login dengan pesan sukses
5. Test login dengan password baru

## Troubleshooting

### Masalah: Email Tidak Terkirim
**Solusi**:
1. Cek konfigurasi mail di `.env`
2. Jika menggunakan Gmail, pastikan menggunakan "App Password", bukan password asli
3. Cek log Laravel: `storage/logs/laravel.log`
4. Test konfigurasi email dengan:
   ```bash
   php artisan tinker
   Mail::raw('Test email', function($message) {
       $message->to('your-email@gmail.com')->subject('Test');
   });
   ```

### Masalah: Link Mengarah ke Halaman yang Salah
**Solusi**:
1. Periksa `APP_URL` di `.env` apakah sesuai dengan domain aplikasi
2. Clear cache aplikasi:
   ```bash
   php artisan config:clear
   php artisan cache:clear
   php artisan route:clear
   ```
3. Restart server Laravel

### Masalah: Token Invalid
**Solusi**:
1. Token reset password memiliki masa berlaku (default 60 menit)
2. Periksa konfigurasi di `config/auth.php`:
   ```php
   'passwords' => [
       'users' => [
           'expire' => 60, // dalam menit
       ],
   ],
   ```
3. Request reset password baru jika token sudah kadaluarsa

### Masalah: Email Field Kosong di Halaman Reset
**Solusi**:
1. Pastikan URL mengandung parameter `email`
2. Periksa format URL di email
3. Custom notification sudah diimplementasikan dengan benar

## Verifikasi Teknis

### 1. Cek Route
```bash
php artisan route:list --name=password
```

Output yang diharapkan:
```
GET|HEAD   forgot-password ........... password.request › Auth\PasswordResetLinkController@create
POST       forgot-password ........... password.email › Auth\PasswordResetLinkController@store
GET|HEAD   reset-password/{token?} ... password.reset › Auth\NewPasswordController@create
POST       reset-password ............ password.store › Auth\NewPasswordController@store
```

### 2. Test Custom Notification
Buka Laravel Tinker:
```bash
php artisan tinker
```

Jalankan:
```php
$user = App\Models\User::where('email', 'test@example.com')->first();
$token = Password::createToken($user);
$user->sendPasswordResetNotification($token);
```

### 3. Verifikasi Database
Cek tabel `password_reset_tokens`:
```bash
php artisan tinker
```

```php
DB::table('password_reset_tokens')->where('email', 'your-email@example.com')->first();
```

## Checklist Testing

- [ ] Email terkirim ke inbox
- [ ] Subject email: "Reset Password - [APP_NAME]"
- [ ] Email berbahasa Indonesia
- [ ] Link format benar: `/reset-password/{token}?email={email}`
- [ ] Klik link membuka halaman ResetPassword.jsx
- [ ] Halaman menampilkan field email (readonly)
- [ ] Halaman menampilkan field password baru
- [ ] Halaman menampilkan field konfirmasi password
- [ ] Password strength indicator berfungsi
- [ ] Submit form berhasil
- [ ] Redirect ke login dengan pesan sukses
- [ ] Login dengan password baru berhasil

## Catatan Penting

1. **Security**: Token reset password hanya valid untuk satu kali penggunaan
2. **Expiry**: Token memiliki masa berlaku (default 60 menit)
3. **Email Verification**: Email harus terdaftar di sistem
4. **Rate Limiting**: Ada throttling untuk mencegah spam (60 requests per menit)

## File Yang Terlibat

```
app/
├── Http/Controllers/Auth/
│   ├── PasswordResetLinkController.php  (Handling request forgot password)
│   └── NewPasswordController.php         (Handling reset password)
├── Models/
│   └── User.php                          (Custom notification method)
└── Notifications/
    └── ResetPasswordNotification.php     (Custom email template)

resources/js/Pages/Auth/
├── ForgotPassword.jsx                    (Halaman input email)
└── ResetPassword.jsx                     (Halaman reset password)

routes/
└── auth.php                              (Route definitions)
```

## Environment Configuration Example

```env
# Application
APP_NAME="Stasiun Klimatologi"
APP_ENV=local
APP_KEY=base64:...
APP_DEBUG=true
APP_TIMEZONE=Asia/Jakarta
APP_URL=http://127.0.0.1:8000

# Mail Configuration
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=your-email@gmail.com
MAIL_FROM_NAME="${APP_NAME}"
```

---

**Dibuat**: {{ date }}
**Untuk**: Verifikasi Link Reset Password
**Status**: Ready for Testing
