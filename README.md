# Vinetka

> Maktab bitiruvchilarining xotirasini abadiy saqlaydigan onlayn vinetka.
> Bitta shablon — har bir sinf uchun alohida dizayn, alohida hikoya.

Vinetka — bu sinfning onlayn xotira sahifasi: qopqoq rasm, bitiruvchilar,
ustozlar, video va rasm galereyasi, yillar xaritasi va mehmonlar kitobi.
Sayt telefon, planshet va kompyuterda bir xil chiroyli ochiladi.

**Shu repozitoriy — biz sotaveradigan asosiy shablon.** Har bir mijoz uchun
faqat kontent (`JSON`) va kerak bo‘lsa ranglar o‘zgaradi; dizayn va mantiq
o‘zgarmaydi. Shu sababli yangi vinetka tayyorlash 15–30 daqiqa ish.

---

## Tez boshlash

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # production server

npm run lint       # ESLint
npm run typecheck  # TypeScript
```

Node.js 20+ (20.9 yoki 22 tavsiya etiladi).

## Sahifalar

| Manzil | Tavsif |
| --- | --- |
| `/` | Asosiy landing: hissiy hero, namunalar, dizayn sinovi, narxlar, FAQ |
| `/v/11-a-2026` | To‘liq namuna vinetka (**Oltin kun** uslubi) |
| `/v/9-b-2025` | Ikkinchi namuna (**Yulduzlar** uslubi) |
| `/v/[slug]` | Har qanday mijoz vinetkasi — `content/vignettes/<slug>.json` dan |
| `/yaratish` | Vinetka konstruktori: 4 qadam, jonli ko‘rinish, avtosaqlash |
| `/v/preview` | Konstruktordagi qoralamani to‘liq ekranda ko‘rish (`noindex`) |

Demo vinetka tarkibi: parallaks qopqoq, ustoz xati, bitiruvchilar kartochkalari,
ustozlar, masonry galereya (lightbox + video), yillar xaritasi, mehmonlar
kitobi, ulashish va yakuniy ekran.

## Texnologiyalar

- **Next.js 15** (App Router, Turbopack, SSG) + **React 19** + **TypeScript**
- **Tailwind CSS v4** — dizayn tokenlari `app/globals.css` ichida
- **Framer Motion** — parallaks, scroll-reveal, lightbox, mikro-animatsiyalar
- **Fontlar npm orqali** (`@fontsource`) — Google Fonts’ga tashqi bog‘liqlik yo‘q,
  oflayn va bloklangan tarmoqlarda ham ishlaydi
- **Kontent** — fayl tizimidagi JSON (server komponentlar orqali o‘qiladi)

## Papka tuzilishi

```
app/
  page.tsx                 # landing
  yaratish/page.tsx        # konstruktor
  v/[slug]/page.tsx        # mijoz vinetkasi (SSG)
  v/preview/page.tsx       # qoralama ko‘rinishi
  globals.css              # ranglar, tipografiya, grain, marquee
  layout.tsx               # fontlar, SEO
  icon.svg, sitemap.ts, robots.ts
components/
  site/                    # landing bo‘limlari
  vignette/                # vinetka sahifasi qismlari
  editor/                  # konstruktor UI
  ui/                      # Reveal, Logo, ShareButton
content/vignettes/*.json   # barcha mijoz vinetkalari (yagona manba)
lib/
  types.ts                 # Vignette, Person, Memory, Wish, TimelineItem
  themes.ts                # 4 ta dizayn uslubi (CSS o‘zgaruvchilari)
  content.ts               # JSON o‘qish + normalizatsiya
  draft.ts                 # localStorage qoralama, rasm yuklash
  site.ts                  # narxlar, FAQ, kontakt
docs/                      # arxitektura, biznes, topshirish
public/images/             # demo rasmlar
```

## Vinetka qanday tuzilgan

`content/vignettes/<slug>.json` — bitta vinetka. Asosiy maydonlar:

| Maydon | Izoh |
| --- | --- |
| `slug` | Havola nomi: faqat `a-z`, `0-9`, `-` |
| `theme` | `oltin` \| `tong` \| `yulduz` \| `shaftoli` |
| `school`, `overline`, `className`, `graduationYear`, `motto` | Qopqoq matnlari |
| `coverImage`, `coverPosition` | Qopqoq rasmi va uning markazi |
| `letter` | Sinf rahbari xati (sarlavha, matn, imzo, lavozim) |
| `graduates[]` | `{ name, role, quote }` |
| `teachers[]` | `{ name, role, quote }` |
| `memories[]` | `{ type: "photo" \| "video", src, poster?, title?, caption?, date?, ratio? }` |
| `timeline[]` | `{ year, title, text }` |
| `wishes[]` | Boshlang‘ich tabriklar |
| `closing`, `contact`, `audioUrl` | Yakun va aloqa |

To‘ldirilmagan maydonlar xavfsiz — `lib/normalize.ts` bo‘sh ro‘yxatlarni
tashlab yuboradi, sahifa buzilmaydi.

## Dizayn uslublari

Barcha ranglar CSS o‘zgaruvchilari orqali beriladi (`lib/themes.ts`):

| ID | Nomi | Kayfiyat |
| --- | --- | --- |
| `oltin` | Oltin kun | Tungi, iliq oltin — asosiy va eng ko‘p sotiladigan |
| `tong` | Tong | Yorug‘, bosma albom hissi |
| `yulduz` | Yulduzlar | Tungi osmon, kumush, zamonaviy |
| `shaftoli` | Shaftoli | Issiq terrakota, samimiy |

Yangi uslub qo‘shish: `lib/themes.ts` ga bitta obyekt (7 ta CSS o‘zgaruvchisi)
va `lib/types.ts` dagi `ThemeId` ga qiymat qo‘shish kifoya. Butun sahifa,
konstruktor va landing avtomatik yangilanadi.

## Yangi mijoz vinetkasini qo‘shish

1. `/yaratish` da kontentni to‘ldiring → **JSON yuklab olish**.
2. Faylni `content/vignettes/<slug>.json` sifatida saqlang.
3. `npm run build` (yoki deploy) → vinetka `https://…/v/<slug>` da tayyor.

Batafsil: [`docs/HANDOFF.md`](docs/HANDOFF.md).

## Hozirgi cheklovlar (halol ro‘yxat)

Bu — **shablon va MVP**, to‘liq backend emas:

- Konstruktordagi ma’lumotlar **brauzer xotirasida** (localStorage) saqlanadi.
  Boshqa qurilmada ochilmaydi — mijozga topshirish uchun JSON eksport qilinadi.
- Konstruktorda rasmlar brauzerda avtomatik siqiladi (1600px, JPEG) va
  localStorage’ga yoziladi — 15–20 tadan ko‘p rasm sig‘masligi mumkin. Katta
  arxiv uchun hozircha URL ishlatiladi; production’da obyekt saqlash kerak.
- Mehmonlar kitobi tabriklari faqat o‘z brauzerida ko‘rinadi. Server API kerak.
- Narxlar, telefon va Telegram — `lib/site.ts` dagi **placeholder** qiymatlar.
- Demo videolar YouTube’dagi namuna havola; mijoz videosi bilan almashtiriladi.
- To‘lov, autentifikatsiya, admin panel hali yo‘q.

Keyingi qadamlar va backend rejasi: [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md),
biznes modeli: [`docs/BUSINESS.md`](docs/BUSINESS.md).

## Deploy

Eng oson yo‘l — **Vercel** (GitHub repozitoriyni ulash kifoya). `npm run build`
statik sahifalarni generatsiya qiladi; `content/` o‘zgarganda qayta deploy kerak.
Kontentni CMS’dan boshqarish kerak bo‘lsa, `docs/ARCHITECTURE.md` dagi
Supabase variantiga o‘tamiz.

## Litsenziya / egalik

Shablon va brend — Vinetka jamoasi ichki mahsuloti. Mijozga faqat tayyor
vinetka va kontent topshiriladi; manba kod uchinchi shaxslarga sotilmaydi.
