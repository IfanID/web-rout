# Konvensi Proyek Gemini

Dokumen ini berisi konvensi dan praktik terbaik yang harus diikuti saat mengembangkan proyek ini.

## Struktur Komponen dan View

Untuk menjaga keteraturan dan skalabilitas proyek, semua komponen dan view harus mengikuti struktur folder berikut:

-   Setiap komponen atau view harus berada dalam foldernya sendiri.
-   Nama file utama untuk komponen atau view di dalam foldernya harus `index.vue`.

**Contoh:**

```
src/
├── components/
│   ├── MyComponent/
│   │   └── index.vue  // Komponen MyComponent
│   └── AnotherComponent/
│       └── index.vue  // Komponen AnotherComponent
└── views/
    ├── dashboard/
    │   └── index.vue  // View Dashboard
    └── settings/
        └── index.vue  // View Settings
```

**Manfaat Konvensi Ini:**

-   **Keterbacaan dan Organisasi**: Memudahkan navigasi dan pemahaman struktur proyek.
-   **Skalabilitas**: Memungkinkan penambahan file terkait (seperti CSS, JS, atau tes) ke dalam folder komponen tanpa mengotori direktori utama.
-   **Konsistensi**: Memastikan semua pengembang mengikuti pola yang sama.
-   **Resolusi Impor yang Lebih Bersih**: Memungkinkan impor seperti `import MyComponent from '@/components/MyComponent';` tanpa perlu menentukan `index.vue`.

---

**Catatan:** Konvensi ini berlaku untuk semua komponen dan view baru yang dibuat dalam proyek.
