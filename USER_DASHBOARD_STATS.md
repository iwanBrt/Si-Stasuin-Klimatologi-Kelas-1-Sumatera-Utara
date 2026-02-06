# 📊 User Dashboard - Clickable Stats Cards

## Overview
Dashboard user telah diupdate dengan 4 card statistik yang bisa diklik untuk menampilkan detail permohonan sesuai kategori.

## ✨ Fitur Baru

### 1. **Interactive Stats Cards** 🎯
Empat card statistic yang clickable:

| Card | Warna | Icon | Filter | Deskripsi |
|------|-------|------|--------|-----------|
| **Total Permohonan** | Blue | 📄 FileText | `all` | Semua permohonan user |
| **Disetujui** | Green | ✅ CheckCircle | `approved` | Permohonan yang disetujui |
| **Menunggu** | Yellow | ⏱️ Clock | `pending` | Status pending/submitted/reviewing |
| **Ditolak** | Red | ❌ XCircle | `rejected` | Permohonan yang ditolak |

### 2. **Modal with Filtered Data** 📋
Saat card diklik, akan muncul modal yang menampilkan:
- **Title**: Sesuai card yang diklik
- **Total Count**: Jumlah permohonan di kategori tersebut
- **Filtered List**: List permohonan sesuai filter
- **Detail per Item**:
  - Judul permohonan
  - Status badge (color-coded)
  - Tipe aplikasi (PKL, Magang, Data, dll)
  - Kategori pemohon
  - Tanggal dibuat & diupdate
  - Periode (jika ada)
  - Button "Detail" untuk melihat selengkapnya

### 3. **Visual Feedback** ✨
- **Hover Effect**: Card scale up + shadow
- **Eye Icon**: "Lihat Detail" muncul saat hover
- **Smooth Transitions**: 300ms animation
- **Color-coded Status**: Green, Yellow, Blue, Purple, Red

## 🔧 Implementation

### Backend (DashboardController.php)

```php
public function index(Request $request)
{
    $user = $request->user();
    
    if ($user->role === 'user') {
        // Get statistics
        $userApplications = \App\Models\Application::where('user_id', $user->id)->get();
        
        $stats = [
            'total' => $userApplications->count(),
            'approved' => $userApplications->where('status', 'approved')->count(),
            'pending' => $userApplications->whereIn('status', ['pending', 'submitted', 'reviewing'])->count(),
            'rejected' => $userApplications->where('status', 'rejected')->count(),
        ];

        // Get all applications with details
        $applications = \App\Models\Application::where('user_id', $user->id)
            ->latest()
            ->get()
            ->map(function ($app) {
                return [
                    'id' => $app->id,
                    'title' => $app->title,
                    'application_type' => $app->application_type,
                    'applicant_type' => $app->applicant_type,
                    'status' => $app->status,
                    'created_at' => $app->created_at->format('d M Y'),
                    'updated_at' => $app->updated_at->format('d M Y'),
                    'start_date' => $app->start_date ? $app->start_date->format('d M Y') : null,
                    'end_date' => $app->end_date ? $app->end_date->format('d M Y') : null,
                ];
            });

        return Inertia::render('Dashboard', [
            'stats' => $stats,
            'applications' => $applications,
        ]);
    }
}
```

### Frontend (Dashboard.jsx)

#### State Management
```jsx
const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedFilter, setSelectedFilter] = useState('all');
const [modalTitle, setModalTitle] = useState('');
```

#### Card Click Handler
```jsx
const handleCardClick = (filter, title) => {
    setSelectedFilter(filter);
    setModalTitle(title);
    setIsModalOpen(true);
};
```

#### Filter Logic
```jsx
const getFilteredApplications = () => {
    if (selectedFilter === 'all') return applications;
    if (selectedFilter === 'approved') return applications.filter(app => app.status === 'approved');
    if (selectedFilter === 'pending') return applications.filter(app => 
        ['pending', 'submitted', 'reviewing'].includes(app.status)
    );
    if (selectedFilter === 'rejected') return applications.filter(app => app.status === 'rejected');
    return applications;
};
```

## 🎨 Design Features

### Stats Cards
```jsx
<button
    onClick={() => handleCardClick(stat.filter, stat.title)}
    className="group block rounded-xl border bg-white p-6 
               shadow-md transition-all duration-300 
               hover:scale-105 hover:shadow-xl cursor-pointer"
>
    {/* Value Display */}
    <p className="text-4xl font-bold">{stat.value}</p>
    
    {/* Hover Indicator */}
    <div className="opacity-0 group-hover:opacity-100">
        <Eye /> Lihat Detail
    </div>
</button>
```

### Status Badges
```jsx
const statusConfig = {
    'approved': { bg: 'bg-green-100', text: 'text-green-700', label: 'Disetujui' },
    'pending': { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Menunggu' },
    'reviewing': { bg: 'bg-purple-100', text: 'text-purple-700', label: 'Direview' },
    'rejected': { bg: 'bg-red-100', text: 'text-red-700', label: 'Ditolak' },
};
```

### Modal Layout
- **Max Width**: 4xl (large modal)
- **Max Height**: 500px with scroll
- **Header**: Title + Count + Close button
- **Content**: Scrollable list of applications
- **Empty State**: Icon + message

## 🚀 User Flow

```
1. User login → Dashboard
   ↓
2. See 4 stats cards
   ↓
3. Click card (e.g., "Disetujui")
   ↓
4. Modal opens with filtered list
   ↓
5. See all approved applications
   ↓
6. Click "Detail" on specific item
   ↓
7. Navigate to application detail page
```

## 📋 Status Mapping

| Status in DB | Display Label | Color | Included in "Pending" |
|--------------|---------------|-------|----------------------|
| `approved` | Disetujui | Green | ❌ |
| `pending` | Menunggu | Yellow | ✅ |
| `submitted` | Terkirim | Blue | ✅ |
| `reviewing` | Direview | Purple | ✅ |
| `rejected` | Ditolak | Red | ❌ |

## 🎯 Benefits

1. **Quick Overview**: User langsung lihat statistik
2. **Easy Access**: Klik card untuk detail
3. **Filtered View**: Data terorganisir berdasarkan status
4. **Better UX**: Tidak perlu scroll panjang
5. **Visual Feedback**: Clear indication of clickable elements

## 📱 Responsive Design

- **Desktop**: 4 columns grid
- **Tablet**: 2 columns grid
- **Mobile**: 1 column stack
- **Modal**: Full width on mobile

## ✅ Testing Checklist

- [ ] Card click opens modal
- [ ] Correct data filtered per card
- [ ] Status badges show correct color
- [ ] Modal close button works
- [ ] Detail button navigates correctly
- [ ] Empty state displays when no data
- [ ] Hover effects work smoothly
- [ ] Responsive on all screen sizes

---

**Status**: ✅ IMPLEMENTED  
**File Changed**: 
- `app/Http/Controllers/DashboardController.php`
- `resources/js/Pages/Dashboard.jsx`

**Dependencies**: 
- Modal component (already exists)
- Lucide React icons
