export const SITE = {
  name: "Vinetka",
  tagline: "Xotiralar abadiy qoladi",
  phone: "+998 90 123 45 67",
  telegram: "https://t.me/vinetka",
  instagram: "https://instagram.com/vinetka",
  email: "salom@vinetka.uz",
  city: "Toshkent, O‘zbekiston",
};

/** Prices are placeholders — change them in one place and the whole landing updates. */
export const PLANS = [
  {
    id: "start",
    name: "Boshlang‘ich",
    price: 490_000,
    period: "bir sinf uchun",
    description: "Kichik sinf yoki bitta yo‘nalish uchun ideal boshlanish.",
    features: [
      "Bitta onlayn vinetka",
      "30 tagacha rasm",
      "1 ta video",
      "1 ta dizayn uslubi",
      "Shaxsiy havola (vinetka.uz/v/sinfingiz)",
      "1 yil hosting",
    ],
    cta: "Boshlash",
    featured: false,
  },
  {
    id: "oltin",
    name: "Oltin",
    price: 990_000,
    period: "bir sinf uchun",
    description: "To‘liq bitiruv albomi: cheksiz xotiralar, musiqa va ustozlar.",
    features: [
      "Bitta onlayn vinetka",
      "Cheksiz rasm va videolar",
      "4 ta dizayn uslubi",
      "Fon musiqasi",
      "Mehmonlar kitobi (tabriklar)",
      "O‘z domeningiz (sinf.uz)",
      "3 yil hosting",
      "Vinetka jamoasi tomonidan yig‘ish",
    ],
    cta: "Eng ko‘p tanlanadi",
    featured: true,
  },
  {
    id: "maktab",
    name: "Maktab",
    price: 2_490_000,
    period: "butun maktab",
    description: "Barcha bitiruvchi sinflar uchun yagona maktab albomi.",
    features: [
      "Barcha sinflar uchun vinetkalar",
      "Maktab brendingi (logo, rang)",
      "Bitta umumiy havola",
      "Administrator paneli",
      "Statistika: nechta odam ko‘rdi",
      "Cheksiz dizayn moslashtirish",
      "5 yil hosting",
      "Shaxsiy menejer",
    ],
    cta: "Taklif olish",
    featured: false,
  },
];

export const FAQ = [
  {
    q: "Vinetka nima va u nima uchun kerak?",
    a: "Vinetka — sinfingizning onlayn xotira sahifasi. Unda sinf rasmi, bitiruvchilar, ustozlar, videolar, yillar bo‘yicha xotiralar va mehmonlar tabriklari bitta chiroyli havolada yig‘iladi. Uni butun sinfga, ota-onalarga va ustozlarga yuborasiz — hech kim hech narsa o‘rnatmasdan ochadi.",
  },
  {
    q: "Rasm va videolarni kim joylaydi?",
    a: "O‘zingiz ham qo‘shishingiz mumkin, yoki Vinetka jamoasi sizning arxivingizni (Telegram, Google Drive, fleshka) yig‘ib, tartib bilan joylashtirib beradi. Ko‘p mijozlarimiz ikkinchi variantni tanlaydi — natija chiroyliroq chiqadi.",
  },
  {
    q: "Xotiralarimiz qancha vaqt saqlanadi?",
    a: "Tanlagan tarifga qarab 1, 3 yoki 5 yil kafolat bilan saqlanadi. Muddan keyin ham arxiv sizda qoladi va istalgan vaqtda yangilash mumkin. Biz hech qachon rasm yoki videolaringizni o‘chirmaymiz — faqat sizning ruxsatingiz bilan.",
  },
  {
    q: "Dizaynni o‘zimizga moslashtira olamizmi?",
    a: "Ha. 4 ta tayyor uslub bor: Oltin kun, Tong, Yulduzlar va Shaftoli. Maktab ranglari, logo va shiorni qo‘shishimiz mumkin. Maktab tarifida to‘liq brending qilinadi.",
  },
  {
    q: "Telefon orqali ochiladimi?",
    a: "Ha, sayt telefon, planshet va kompyuterda bir xil chiroyli ko‘rinadi. Havolani Telegram yoki WhatsApp orqali yuborsangiz bo‘ldi.",
  },
  {
    q: "To‘lov qanday amalga oshiriladi?",
    a: "Payme, Click yoki naqd pul orqali. Sinf sardori yoki ota-onalar qo‘mitasi to‘lashi mumkin. Ishni boshlashdan oldin 50% avans, tayyor bo‘lganda qolgan qismi.",
  },
];

export const STATS = [
  { value: "4", label: "dizayn uslubi" },
  { value: "1", label: "havola — butun sinf" },
  { value: "∞", label: "xotira" },
];
