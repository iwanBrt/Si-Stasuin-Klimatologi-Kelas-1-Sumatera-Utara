# 🎉 SISTEM INFORMASI KLIMATOLOGI - DOKUMENTASI LENGKAP

## 📊 **DATABASE SCHEMA**

### **Users Table**
- id
- name
- email
- password
- **role** (enum: 'user', 'admin') - DEFAULT: 'user'
- email_verified_at
- timestamps

### **Applications Table**
- id
- user_id (FK)
- application_type (magang/penelitian/pkl/observasi/kerja_praktek/tugas_akhir)
- **status** (enum: 'pending', 'approved', 'rejected') - DEFAULT: 'pending'
- title
- institution_name
- institution_address
- department
- study_program
- student_id
- phone
- start_date
- end_date
- research_field (nullable)
- research_objective (nullable)
- supervisor_name (nullable)
- supervisor_contact (nullable)
- **File uploads:**
  - proposal_file
  - recommendation_letter
  - cv_file
  - transcript_file
  - identity_card_file
- additional_notes
- **admin_notes** (feedback dari admin)
- **reviewed_at** (tanggal review)
- **reviewed_by** (FK to users - admin yang review)
- timestamps

### **News Table**
- id
- user_id (FK - admin yang post)
- title
- slug (unique, auto-generated)
- excerpt
- content (longText)
- featured_image
- status (enum: 'draft', 'published')
- published_at
- views_count (default: 0)
- timestamps

---

## 🔐 **AKUN ADMIN**

### Admin 1:
- **Email:** admin@klimatologi.com
- **Password:** admin123
- **Role:** admin

### Admin 2:
- **Email:** klimatologi@admin.com
- **Password:** klimat2024
- **Role:** admin

---

## 🚀 **CARA SETUP PERTAMA KALI**

### 1. Jalankan Migration:
```bash
php artisan migrate
```

### 2. Jalankan Seeder untuk Admin:
```bash
php artisan db:seed --class=AdminSeeder
```

### 3. Create Storage Link (untuk file uploads):
```bash
php artisan storage:link
```

---

## 📁 **STRUKTUR FILE**

### **Models:**
- `app/Models/User.php` - User model dengan role & applications relationship
- `app/Models/Application.php` - Application model
- `app/Models/News.php` - News model

### **Controllers:**
**User/Applicant:**
- `app/Http/Controllers/ApplicationController.php`
  - index() - List user applications
  - create() - Form pengajuan
  - store() - Submit application
  - show() - Detail application

**Admin:**
- `app/Http/Controllers/Admin/DashboardController.php` (belum dibuat isi)
- `app/Http/Controllers/Admin/ApplicationManagementController.php` (belum dibuat isi)
- `app/Http/Controllers/Admin/NewsController.php` (belum dibuat isi)

### **Middleware:**
- `app/Http/Middleware/AdminMiddleware.php` - Cek role admin

### **Frontend Pages:**
**User:**
- `resources/js/Pages/Dashboard.jsx` - User dashboard
- `resources/js/Pages/Applicant/MyApplications.jsx` - List permohonan
- `resources/js/Pages/Applicant/CreateApplication.jsx` - Form pengajuan

**Auth:**
- `resources/js/Pages/Auth/Login.jsx` - Login page
- ~~Register.jsx~~ - DISABLED (admin only system)

**Admin:** (Perlu dibuat)
- Admin Dashboard
- Manage Applications
- Manage News

---

## 🛣️ **ROUTES**

### User Routes (auth required):
```
GET  /dashboard                 - User dashboard
GET  /my-applications           - List permohonan user
GET  /application/new           - Form pengajuan baru
POST /application               - Submit permohonan
```

### Admin Routes (admin middleware required):
```
(Belum dibuat - Next step)
GET  /admin/dashboard           - Admin dashboard dengan statistik
GET  /admin/applications        - Manage all applications
POST /admin/applications/{id}/approve - Approve application
POST /admin/applications/{id}/reject  - Reject application
GET  /admin/news                - Manage news
POST /admin/news                - Create news
etc.
```

---

## ✅ **FITUR YANG SUDAH SELESAI**

### ✅ Backend:
1. Database migrations (users, applications, news)
2. Models dengan relationships
3. ApplicationController untuk user submit application
4. File upload handling (max 5MB)
5. Validation untuk form
6. Admin middleware
7. Admin seeder
8. Registration DISABLED

### ✅ Frontend (User):
1. Login page (modern glassmorphism design)
2. Dashboard dengan status cards
3. Form pengajuan lengkap (6 jenis)
4. List permohonan dengan status badges
5. Sidebar navigation
6. Profile dropdown dengan logout confirmation

---

## 🚧 **YANG PERLU DISELESAIKAN NEXT**

### 1. Admin Dashboard Pages:
- [ ] Admin dashboard dengan statistik
- [ ] Manage applications (list, approve, reject)
- [ ] Manage news (CRUD)

### 2. Admin Controllers:
- [ ] DashboardController - statistik & charts
- [ ] ApplicationManagementController - approve/reject logic
- [ ] NewsController - CRUD operations

### 3. Additional Features:
- [ ] Email notifications untuk approval/rejection
- [ ] Download surat penerimaan (PDF)
- [ ] Export applications ke Excel
- [ ] Rich text editor untuk admin news

---

## 📝 **VALIDATION RULES**

### Application Form:
- application_type: required
- title: required, max 255
- institution_name: required
- department: required
- study_program: required
- student_id: required
- phone: required
- start_date: required, after_or_equal:today
- end_date: required, after:start_date
- recommendation_letter: required file (PDF, max 5MB)
- proposal: nullable (PDF/DOC/DOCX, max 5MB)
- cv: nullable (PDF, max 5MB)

---

## 🎨 **DESAIN SYSTEM**

### Color Scheme:
- Primary: Blue (#3B82F6)
- Success: Green (#10B981)
- Warning: Yellow (#F59E0B)
- Danger: Red (#EF4444)
- Background: Gradient blue sky

### Design Features:
- Glassmorphism (backdrop-blur, transparent backgrounds)
- Modern card-based UI
- Smooth animations & transitions
- Responsive (mobile-friendly)
- Icons from Lucide React

---

## 📧 **EMAIL SYSTEM**

Current: Email verification OTP sudah ada

Todo:
- Email notification untuk application approval
- Email notification untuk application rejection
- Email untuk news/announcements

---

## 💾 **FILE STORAGE**

Files uploaded ke: `storage/app/public/applications/`

Format nama file: `{timestamp}_{field}_{original_name}`

Example: `1704892800_proposal_Proposal_Magang.pdf`

---

## 🔒 **SECURITY**

1. Admin middleware untuk protect admin routes
2. User can only see their own applications
3. File upload validation (type & size)
4. CSRF protection (Laravel default)
5. Password hashing
6. Email verification

---

## 🎯 **USER FLOW**

### User:
1. Login
2. View Dashboard
3. Click "Ajukan Permohonan Baru"
4. Fill form & upload documents
5. Submit
6. View in "Permohonan Saya"
7. Wait for admin review
8. Get notification (email)
9. Download surat penerimaan (if approved)

### Admin:
1. Login dengan akun admin
2. View admin dashboard (stats)
3. View pending applications
4. Review documents
5. Approve/Reject dengan notes
6. Post news/announcements
7. Manage system

---

**Status:** Backend ✅ | User Frontend ✅ | Admin Frontend 🚧

**Next Task:** Create Admin Dashboard & Management Pages
