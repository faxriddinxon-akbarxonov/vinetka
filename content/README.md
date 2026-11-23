# Kontent papkasi

Har bir mijoz vinetkasi — shu papkadagi bitta JSON fayl.

```
content/vignettes/
  11-a-2026.json     → /v/11-a-2026
  9-b-2025.json      → /v/9-b-2025
  <slug>.json        → /v/<slug>
```

Qoidalar:

- Fayl nomi = `slug` = URL oxiri. Faqat `a-z`, `0-9`, `-`.
- JSON to‘g‘ri bo‘lishi shart (vergul, qo‘shtirnoq). Tekshirish:
  `node -e "JSON.parse(require('fs').readFileSync('content/vignettes/<slug>.json'))"`.
- Maydonlar to‘liq bo‘lmasa ham sahifa ishlaydi — bo‘sh ro‘yxatlar
  ko‘rsatilmaydi (`lib/normalize.ts`).
- `id` maydonlari faqat fayl ichida yagona bo‘lishi kerak (masalan `g1`, `m1`).
- Rasmlar: `public/uploads/<slug>/...` ga qo‘yib, `/uploads/<slug>/rasm.jpg`
  deb yozish tavsiya etiladi. Tashqi `https://` havolalar ham ishlaydi.
- Video: YouTube/Vimeo havolasi yoki `.mp4` URL. `poster` — video ko‘rinishi.

Maydonlar tavsifi: [`../README.md`](../README.md) va
[`../lib/types.ts`](../lib/types.ts).

Eng oson yo‘l — `/yaratish` konstruktoridan foydalanib, **JSON yuklab olish**.
