# Arxitektura

## 1. Hozirgi holat (shablon / MVP)

```
                    ┌─────────────────────────────┐
  brauzer           │  Server (Next.js App Router) │
                    │                              │
  /            ───► │  RSC + client komponentlar   │
  /v/[slug]    ───► │  content/vignettes/*.json ───┼── fs
  /yaratish    ───► │  client-only konstruktor     │
  /v/preview   ───► │  client-only qoralama        │
                    └─────────────────────────────┘
        ▲                        │
        │ localStorage           │ statik HTML + JS
        └──── vinetka:draft:v1 ◄─┘
```

- **Vinetka sahifasi** — server komponent. JSON fayl o‘qiladi, `normalizeVignette`
  bilan tozalanadi va `VignetteView` (client) ga beriladi. `generateStaticParams`
  tufayli barcha vinetkalar build vaqtida statik HTML bo‘ladi (tez, arzon, SEO).
- **Konstruktor** — butunlay client. Qoralama `localStorage` da, 700 ms debounce
  bilan avtosaqlanadi. JSON eksport → repo → qayta deploy.
- **Mehmonlar kitobi** — hozircha `localStorage` (`vinetka:wishes:<slug>`),
  ya’ni faqat o‘z brauzerida. Bu ataylab: backend qo‘shilmaguncha yolg‘on
  server ko‘rinishini bermaymiz.
- **Dizayn** — `data-theme` emas, CSS o‘zgaruvchilari (`--v-bg`, `--v-accent`, …)
  inline style orqali. Shu bilan bitta komponentlar to‘plami 5 xil ko‘rinishda
  ishlaydi va yangi uslub qo‘shish arzon.

## 2. Production maqsadli arxitektura

```
Next.js (Vercel) ──► Supabase Postgres (metadata, buyurtma, tabrik)
        │                │
        │                └── RLS: faqat egasi/admin yozadi
        └──► Cloudflare R2 / Supabase Storage (rasm, video)
                 └── imgproxy / Next Image (WebP, thumbnail)
```

**Nega shunday:** media katta (sinf arxivi 2–20 GB), shuning uchun fayllar
obyekt saqlashda, matn esa bazada. Next.js faqat render va API qiladi.

### Tavsiya etilgan stack

| Qism | Variant | Izoh |
| --- | --- | --- |
| Hosting | Vercel | ISR + Image Optimization |
| DB | Supabase Postgres | bepul tarif, RLS, realtime |
| Storage | Cloudflare R2 yoki Supabase Storage | R2 arzon egress |
| Auth | Supabase Auth (magic link) | mijoz/ota-ona uchun parolsiz |
| To‘lov | Payme / Click merchant API | O‘zbekiston bozori |
| Email | Resend | buyurtma va havola yuborish |
| Analytics | Vercel Analytics / Umami | shaxsiy ma’lumot yig‘maslik |

### Ma’lumot modeli (Postgres)

```sql
create table vignettes (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  theme         text not null default 'oltin',
  school        text not null,
  class_name    text not null,
  graduation_year int not null,
  motto         text,
  cover_url     text,
  content       jsonb not null default '{}'::jsonb, -- letter, timeline, closing
  status        text not null default 'draft',       -- draft|review|published
  owner_id      uuid references auth.users(id),
  order_id      uuid references orders(id),
  published_at  timestamptz,
  created_at    timestamptz default now()
);

create table people (
  id         uuid primary key default gen_random_uuid(),
  vignette_id uuid references vignettes(id) on delete cascade,
  kind       text not null,          -- graduate|teacher
  name       text not null,
  role       text,
  quote      text,
  photo_url  text,
  sort       int default 0
);

create table memories (
  id         uuid primary key default gen_random_uuid(),
  vignette_id uuid references vignettes(id) on delete cascade,
  kind       text not null,          -- photo|video
  storage_key text not null,
  poster_key text,
  title      text,
  caption    text,
  taken_on   date,
  ratio      text,
  sort       int default 0,
  created_at timestamptz default now()
);

create table wishes (
  id         uuid primary key default gen_random_uuid(),
  vignette_id uuid references vignettes(id) on delete cascade,
  name       text not null,
  text       text not null,
  approved   boolean default true,    -- moderatsiya uchun
  ip_hash    text,
  created_at timestamptz default now()
);

create table orders (
  id         uuid primary key default gen_random_uuid(),
  plan       text not null,
  amount     int not null,           -- so‘m
  currency   text default 'UZS',
  status     text default 'pending', -- pending|paid|refunded
  provider   text,                   -- payme|click
  provider_id text,
  buyer_name text,
  buyer_phone text,
  created_at timestamptz default now()
);
```

### API kontrakti (keyingi bosqich)

| Metod | Yo‘l | Vazifa |
| --- | --- | --- |
| `POST` | `/api/orders` | buyurtma yaratish, to‘lov havolasi qaytarish |
| `POST` | `/api/payments/payme` | Payme webhook (imzo tekshiriladi) |
| `POST` | `/api/payments/click` | Click webhook |
| `GET` | `/api/vignettes/:slug` | nashr etilgan vinetka (public, cache) |
| `PATCH` | `/api/vignettes/:slug` | egasi tahrirlaydi (auth) |
| `POST` | `/api/vignettes/:slug/media` | imzolangan upload URL |
| `POST` | `/api/vignettes/:slug/wishes` | tabrik (rate limit + moderatsiya) |
| `DELETE` | `/api/wishes/:id` | admin moderatsiyasi |

### Media pipeline

1. Brauzer → imzolangan URL → to‘g‘ridan-to‘g‘ri R2 ga (server orqali o‘tmaydi).
2. Server `sharp` bilan thumbnail (600px) va WebP/AVIF variantlar yasaydi.
3. Video: YouTube/Vimeo embed yoki Mux/R2 + HLS. 5 daqiqadan uzun videoni
   siqish kerak (ffmpeg worker).
4. Har bir fayl uchun `width/height` saqlanadi — CLS bo‘lmasligi uchun.

### Xavfsizlik va huquqiy qism

- **Voyaga yetmaganlar**: rasm joylash uchun sinf rahbari/ota-ona roziligi.
  Ommaviy sahifada indekslash `robots` bilan yopilishi mumkin.
- **`/v/preview`** hozir `noindex`; nashr etilgunga qadar havola maxfiy.
- **Tabriklar**: rate limit (IP hash), haqorat filtri, admin tasdiqlashi.
- **Fayl tekshiruvi**: MIME + hajm + `sharp` bilan qayta kodlash (EXIF tozalash).
- **Maxfiylik siyosati**: qanday ma’lumot saqlanishi, qancha vaqt, o‘chirish
  huquqi. Maktab direktori bilan yozma kelishuv — sotuvda ishonch beradi.

### Ishlash (performance)

- Vinetka — statik/ISR; media lazy (`next/image`, `sizes` to‘g‘ri berilgan).
- Hero rasmi `priority`; qolganlari lazy.
- JS byudjeti: hozir ~210 kB first load (framer-motion bilan). Media ko‘p
  bo‘lsa, galereyani virtualizatsiya qilish yoki `content-visibility` qo‘llash.
- Lighthouse maqsadi: mobil 90+ (LCP < 2.5s, CLS < 0.1).

## 3. Yo‘l xaritasi

### Bosqich 1 — shablon (bajarildi)
- [x] Landing, 5 dizayn, to‘liq vinetka sahifasi
- [x] Konstruktor + avtosaqlash + JSON eksport
- [x] Lightbox, video, tabriklar, ulashish, SEO

### Bosqich 2 — backend (1–2 hafta)
- [ ] Supabase sxema + RLS
- [ ] R2 upload (imzolangan URL), thumbnail
- [ ] `/v/[slug]` ni bazadan o‘qish (ISR, `revalidate`)
- [ ] Tabriklar API + moderatsiya
- [ ] Admin: buyurtmalar ro‘yxati, holat, kontent yig‘ish

### Bosqich 3 — savdo (1–2 hafta)
- [ ] Payme/Click integratsiyasi, webhook, chek
- [ ] Buyurtma formasi (maktab, sinf, telefon, tarif)
- [ ] Magic-link kirish: mijoz o‘z vinetkasini tahrirlaydi
- [ ] Domen boshqaruvi (`sinf.vinetka.uz` avtomatik)
- [ ] Analytics: ko‘rishlar, ulashishlar

### Bosqich 4 — mahsulot
- [ ] White-label: maktab logosi/ranglari, subdomen
- [ ] Maktab paneli: barcha sinflar, statistika
- [ ] Chop etish: QR kodli bosma vinetka (qog‘oz + onlayn)
- [ ] Musiqa kutubxonasi (litsenziyalangan)
- [ ] Telegram bot orqali rasm yig‘ish
