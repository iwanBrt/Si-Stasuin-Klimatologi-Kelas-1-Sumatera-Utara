# 🔧 Fix: Blade Template JSON-LD Error

## Problem
Terjadi error **ParseError** di `app.blade.php` saat menggunakan JSON-LD untuk Schema.org markup:

### Error 1 (Line 76):
```
syntax error, unexpected end of file, expecting "elseif" or "else" or "endif"
```
**Cause**: Blade menginterpretasi kurung kurawal `{}` di JSON sebagai Blade syntax.

### Error 2 (Line 36):
```
Unclosed '[' on line 36 does not match ')'
```
**Cause**: Directive `@json()` tidak bekerja dengan baik di context script tag dengan array kompleks.

## Solution ✅

Menggunakan `{!! json_encode() !!}` dengan raw output untuk merender JSON-LD dengan aman:

```blade
<!-- FINAL SOLUTION (WORKING ✅) -->
<script type="application/ld+json">
{!! json_encode([
    '@context' => 'https://schema.org',
    '@type' => 'GovernmentOrganization',
    'name' => 'UPT Stasiun Klimatologi BMKG Sumatera Utara',
    ...
], JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) !!}
</script>
```

## Why This Works

1. **`{!! !!}`** - Raw output (tidak di-escape HTML)
2. **`json_encode()`** - Native PHP function untuk convert array ke JSON
3. **`JSON_UNESCAPED_SLASHES`** - Tidak escape forward slashes dalam URLs
4. **`JSON_PRETTY_PRINT`** - Format JSON dengan indentasi (optional, untuk readability)

## Benefits

✅ **No Blade parsing issues** - PHP raw output tidak di-parse oleh Blade  
✅ **Proper JSON format** - Valid JSON-LD untuk Google  
✅ **Safe & Secure** - json_encode otomatis escape characters  
✅ **Maintainable** - Mudah diubah dan di-maintain  
✅ **Production ready** - Tested dan working  

## Commands Run

```bash
php artisan view:clear      # Clear compiled Blade views
php artisan config:clear    # Clear config cache
```

---

**Status**: ✅ FIXED & WORKING  
**File**: `resources/views/app.blade.php`  
**Lines Modified**: 34-57
