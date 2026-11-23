# Biznes modeli

> Maqsad: O‘zbekistondagi har bir bitiruvchi sinfga o‘z xotira sahifasini
> sotish. Mahsulot — tayyor shablon + kontent yig‘ish xizmati + hosting.

## Kimga sotamiz

| Segment | Kim qaror qabul qiladi | Izoh |
| --- | --- | --- |
| 11-sinf bitiruvchilari | sinf sardori, ota-onalar qo‘mitasi | eng katta bozor, hissiy qaror |
| 9-sinf bitiruvchilari | sinf rahbari | keyingi yil yana 11-sinfga qaytadi |
| Maktab ma’muriyati | direktor, tarbiya bo‘yicha o‘rinbosar | bir necha sinf = katta chek |
| Kollej/universitet guruhlari | guruh sardori | bir xil mahsulot, boshqa matn |
| Xotira sahifalari (yubiley, tabrik) | oila | keyingi mahsulot yo‘nalishi |

**Asosiy kirish nuqtasi — sinf rahbari.** U rasm arxivi va ota-onalar
guruhiga ega. Unga “sizning sinfingiz uchun sovg‘a” deb murojaat qilinadi.

## Tariflar (gipoteza, bozorda tekshiriladi)

| Tarif | Narx | Tarkib | Maqsad |
| --- | --- | --- | --- |
| Boshlang‘ich | 490 000 so‘m | 1 sinf, 30 rasm, 1 video, 1 uslub, 1 yil | birinchi sinov, past to‘siq |
| **Oltin** | 990 000 so‘m | cheksiz media, 4 uslub, musiqa, tabriklar, domen, 3 yil | asosiy daromad |
| Maktab | 2 490 000 so‘m | barcha sinflar, brending, admin, 5 yil | bitta shartnoma = 3–10 sinf |

Narxni `lib/site.ts` dagi `PLANS` massivida o‘zgartirish kifoya — landing
avtomatik yangilanadi.

**Xarajat (taxminan, bitta vinetka uchun):** hosting ~0–20 000 so‘m/yil
(Vercel + R2), domen ~120 000 so‘m/yil, dizayner vaqti 1–3 soat. Demak
Oltin tarifda marja juda yuqori; asosiy xarajat — **sotuv va kontent yig‘ish**.

## Sotuv oqimi (funnel)

1. **Instagram / Telegram**: har kuni bitta namuna vinetka (turli dizayn) +
   “o‘z sinfingiz uchun buyurtma bering”.
2. **Landing** → `/v/11-a-2026` namunani ko‘rish → `/yaratish` yoki Telegram.
3. **Birinchi aloqa** (Telegram): 5 savol — maktab, sinf, yil, rasm arxivi
   qayerda, qaysi uslub yoqdi.
4. **Namuna**: 1 kunda qopqoq + 10 rasm bilan demo havola. Bu eng kuchli qadam:
   odam o‘z sinfini ko‘rgach, qaror qiladi.
5. **To‘lov**: 50% avans, qolgani topshirilganda. Payme/Click.
6. **Topshirish**: havola + QR kod (bosma uchun) + 1 yillik yordam.
7. **Qayta sotish**: o‘sha maktabning boshqa sinflari, keyingi yil, ustozlar
   uchun sovg‘a.

### Sotuv matni (qisqa)

> “Sinfingizning rasmlari telefonda sochilib yotibdi. Bir yildan keyin ularni
> topish qiyin bo‘ladi. Biz ularni bitta chiroyli sahifaga yig‘amiz — havola
> butun sinfga, ota-onalarga va ustozlarga ochiladi. Bir marta to‘lov, uch yil
> xotira.”

## Raqobat va farq

- Instagram/Telegram albomlari: aralash, qidirib bo‘lmaydi, dizayn yo‘q.
- Bosma vinetka: qimmat, bir nusxa, videoni sig‘dirmaydi.
- Xorijiy “memorial page” xizmatlari: ingliz tilida, mahalliy to‘lov yo‘q,
  o‘zbek maktab kontekstini bilmaydi.

**Bizning ustunlik:** o‘zbek tilidagi hissiy dizayn, tez tayyorlash (1 kun),
mahalliy to‘lov, sinf rahbari bilan ishlash tajribasi.

## Dizaynni “hammaga sotish” strategiyasi

1. **4 tayyor uslub** — har biri alohida “mahsulot varianti” sifatida
   ko‘rsatiladi (skrinshotlar bilan).
2. **Maktab brendingi** — logo + 2 rang + shior. Bu Oltin/Maktab tarifida
   qimmat ko‘rinadigan qo‘shimcha, lekin ish 10 daqiqa.
3. **Mavsumiy variantlar** — “Yulduzlar” (noyabr–yanvar), “Tong” (bahor),
   “Oltin kun” (may). Landing’da mavsumga mos variantni birinchi qo‘yish.
4. Shablonning o‘zagi o‘zgarmaydi — faqat `theme` va kontent. Shu sababli
   sifat barqaror, xarajat past.

## Mavsumiylik

- **Mart–may**: eng qizg‘in davr (oxirgi qo‘ng‘iroq, bitiruv).
- **Sentyabr–oktyabr**: “birinchi qo‘ng‘iroq” va 9-sinf xotiralari.
- **Dekabr–yanvar**: ustozlar uchun sovg‘a, yangi yil tabriklari.
- Yozda — maktablar bilan keyingi yilga shartnoma.

## Ko‘rsatkichlar (KPI)

- Landing → Telegram/konstruktor konversiyasi: 3–8% maqsad.
- Demo ko‘rganlardan buyurtma: 30%+.
- O‘rtacha chek: 800 000–1 200 000 so‘m.
- Bitta vinetka tayyorlash vaqti: < 2 soat (kontent yig‘ilgach).
- NPS / tavsiya: har bir mijozdan kamida 1 ta yangi sinf.

## Yuridik va ishonch

- Ota-onalar/bitiruvchilardan rasm joylash uchun rozilik (oddiy matnli
  kelishuv, Telegramda tasdiq yetarli).
- Maxfiylik siyosati va o‘chirish huquqi sahifasi.
- To‘lov cheki (Payme/Click) — maktab hisob-kitobi uchun.
- Maktab nomi/logosidan foydalanish ruxsati.
