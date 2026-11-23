# Yangi mijozga topshirish (checklist)

Bitta vinetka uchun 30 daqiqalik jarayon. Tartibni buzmaslik muhim.

## 1. Ma’lumot yig‘ish (mijozdan)

- [ ] Maktab to‘liq nomi + tuman/shahar
- [ ] Sinf (masalan `11-A`) va bitiruv yili
- [ ] Shior yoki bir jumla (yo‘q bo‘lsa, biz taklif qilamiz)
- [ ] Sinf rahbari: ism, fan, xat matni, imzo
- [ ] Bitiruvchilar ro‘yxati: ism, orzu/kasb, bir iqtibos
- [ ] Ustozlar: ism, fan, bir iliq so‘z
- [ ] Rasmlar: qopqoq (gorizontal, 2000px+), galereya (15–60 ta)
- [ ] Videolar: YouTube/Vimeo havolalari (yoki fayl → siqib qo‘yamiz)
- [ ] Yillar xaritasi: 4–7 muhim voqea
- [ ] Aloqa: telefon, Telegram (ixtiyoriy)
- [ ] Rozilik: rasm joylashga ota-onalar/bitiruvchilar roziligi

## 2. Konstruktorda yig‘ish

- [ ] `/yaratish` ni oching
- [ ] 1-qadam: maktab, sinf, yil, shior, ustoz xati
- [ ] 2-qadam: uslub + qopqoq rasmi + fon musiqasi (bo‘lsa)
- [ ] 3-qadam: bitiruvchilar, ustozlar, rasm/video
- [ ] 4-qadam: yillar xaritasi, yakun matni, kontakt, `slug`
- [ ] **JSON yuklab olish**

> Rasm yuklashda 700 KB limit bor. Katta rasmlarni oldindan siqib oling
> (Squoosh, ImageOptim) yoki `public/uploads/<slug>/` ga qo‘yib, `/uploads/...`
> havolasi bilan bering.

## 3. Repoga qo‘shish

- [ ] Faylni `content/vignettes/<slug>.json` ga saqlang
- [ ] `slug` faqat `a-z`, `0-9`, `-` bo‘lishi shart
- [ ] Rasm fayllari repo ichida bo‘lsa — `public/uploads/<slug>/` ga
- [ ] `npm run build` — xatosiz o‘tishini tekshiring

## 4. Sifat nazorati (QA)

- [ ] Telefon (390×844) va desktop (1440×900) da ochib ko‘rish
- [ ] Qopqoq matni rasm ustida o‘qiladi (qora gradient bor)
- [ ] Barcha rasmlar yuklanadi, sindirilgan havola yo‘q
- [ ] Video ochiladi (embed ruxsat etilgan)
- [ ] Lightbox: strelkalar, Escape, mobil tugmalar
- [ ] Mehmonlar kitobi: tabrik qo‘shish ishlaydi
- [ ] “Ulashish” tugmasi havolani nusxalaydi
- [ ] Ismlarda imlo xatosi yo‘q (mijoz bilan tasdiqlangan)
- [ ] Yorug‘ uslublarda matn kontrasti yetarli (`tong`, `shaftoli`)
- [ ] 404 va `/v/preview` `noindex` ekanini tekshirish

## 5. Topshirish

- [ ] `https://vinetka.uz/v/<slug>` havolasi
- [ ] QR kod (bosma vinetka yoki taklifnoma uchun PNG)
- [ ] Mijozga qisqa yo‘riqnoma: havolani qanday ulashish, kim tahrirlay oladi
- [ ] To‘lov: qolgan 50%, chek
- [ ] Tahrirlash uchun keyingi aloqa muddati (masalan, 14 kun bepul)
- [ ] Ichki ro‘yxatga qo‘shish: maktab, sinf, tarif, sana, aloqa

## 6. Topshirgandan keyin

- [ ] 3 kundan keyin: “Ochib ko‘rdingizmi? Biror narsa qo‘shamizmi?”
- [ ] O‘sha maktabning boshqa sinflariga taklif
- [ ] Ruxsat bilan Instagram’da namuna sifatida post
- [ ] Keyingi yil uchun eslatma (maktab bazasida)
