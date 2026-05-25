# Jakbar Story

Jakbar Story adalah web story sinematik berbasis scroll yang memperkenalkan Jakbar melalui rangkaian scene: login, hero, skills, perjalanan di luar kode, mimpi, dan monologue penutup.

Project ini dibuat dengan Next.js App Router, React, GSAP ScrollTrigger, Lenis smooth scroll, dan Howler untuk musik latar.

## Fitur

- Login sederhana sebelum masuk ke cerita utama.
- Scroll-driven storytelling dengan scene yang dipin menggunakan GSAP ScrollTrigger.
- Animasi split text per huruf tanpa memecah kata di tengah baris.
- Layer foto, vignette, video, dan musik yang berubah mengikuti progres cerita.
- Layout skills responsive yang tetap terbaca di desktop, tablet, dan mobile.
- Media optimized menggunakan format WebP untuk gambar yang tampil di halaman.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- GSAP
- Lenis
- Howler
- CSS global custom

## Struktur Project

```text
src/
  app/
    page.tsx              # Login page
    main/page.tsx         # Protected story page
    layout.tsx            # Font, metadata, root layout
    globals.css           # Styling global dan responsive layout
  components/
    Hero.tsx
    Skills.tsx
    Outside.tsx
    Dream.tsx
    Monologue.tsx
    SplitText.tsx
    story/
      PhotoLayer.tsx
      SceneLayer.tsx
      StoryStage.tsx
  lib/
    useMusic.ts
    useSmoothScroll.ts
    useStoryTimeline.ts
public/
  images/optimized/       # Gambar yang dipakai app
  music/song.mp3          # Musik latar
  videos/mainvideo.mp4    # Video scene dream
```

## Menjalankan Project

Install dependency:

```bash
npm install
```

Jalankan development server:

```bash
npm run dev
```

Buka:

```text
http://localhost:3000
```

Untuk membuat build production:

```bash
npm run build
```

Untuk menjalankan hasil build:

```bash
npm start
```

## Login

Halaman awal menggunakan endpoint demo `https://dummyjson.com/auth/login`.
Gunakan kredensial valid dari DummyJSON Auth untuk masuk ke `/main`.

Token disimpan di `sessionStorage`, sehingga akses akan reset ketika session browser ditutup.

## Catatan Development

- Saat development, gunakan `npm run dev`; tidak perlu build ulang setiap edit.
- Jika browser tidak auto-refresh, pastikan file sudah disimpan lalu lakukan hard refresh dengan `Ctrl+Shift+R`.
- Jika cache Next.js bermasalah, hentikan dev server, hapus `.next`, lalu jalankan `npm run dev` lagi.
- Build membutuhkan koneksi internet saat Next mengambil Google Fonts melalui `next/font`.

## Media

App hanya mereferensikan gambar di `public/images/optimized`.
File gambar mentah di `public/images` sengaja di-ignore agar repo tetap ringan dan commit tidak membawa aset besar yang tidak dipakai.

## Deployment

Project dapat dideploy ke platform yang mendukung Next.js, seperti Vercel.

Pastikan aset berikut ikut tersedia di repository/deployment:

- `public/images/optimized`
- `public/music/song.mp3`
- `public/videos/mainvideo.mp4`

## Repository

GitHub: https://github.com/Dzakbar/Project_Cretivox
