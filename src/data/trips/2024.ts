import type { Trip } from '../trips'

export const trips2024: Trip[] = [
  // POLSKO (Prosinec 2024)
  {
    id: '2024-poland',
    cloudinaryFolder: 'MY-TRAVEL-BLOG/2024-POLAND',
    title: {
      cz: 'Polsko - Vánoční trhy',
      en: 'Poland - Christmas Markets Tour',
    },
    location: {
      cz: 'Polsko',
      en: 'Poland',
    },
    year: 2024,
    dates: {
      cz: 'Prosinec 2024',
      en: 'December 2024',
    },
    days: 4,
    summary: {
      cz: 'Čtyřdenní sváteční cesta po Polsku: vánoční trhy v Krakově, Varšavě a Vratislavi doplněné o relaxaci v aquaparku Suntago.',
      en: 'A 4-day festive Polish road trip: magical Christmas markets in Krakow, Warsaw, and Wroclaw, paired with a fun day at Park of Poland Suntago.',
    },
    intro: {
      cz: 'Předvánoční výlet za tou nejhezčí atmosférou do Polska. Začali jsme pohádkovými trhy na náměstí v Krakově, pokračovali do svátečně osvětlené Varšavy spojené s návštěvou obřího aquaparku Suntago a celou cestu jsme zakončili na vyhlášených vánočních trzích ve Vratislavi.',
      en: 'A festive trip soaking up the best holiday spirit in Poland. We started with the magical Christmas markets in Krakow, continued to brightly illuminated Warsaw combined with a fun visit to Suntago water park, and wrapped up the journey at the famous markets in Wroclaw.',
    },
    accommodation: [
      {
        name: 'Apartments Of Pawia - KRAKOW',
        url: 'https://www.tripadvisor.com/Hotel_Review-g274772-d15738597-Reviews-Apartments_Of_Pawia-Krakow_Lesser_Poland_Province_Southern_Poland.html',
      },
      {
        name: 'Apartament Wika - WARSAW',
        url: 'https://www.booking.com/hotel/pl/apartament-wika-warszawa.cs.html',
      },
    ],
  },

  // ITÁLIE (Září 2024)
  {
    id: '2024-italy',
    cloudinaryFolder: 'MY-TRAVEL-BLOG/2024-ITALY',
    title: {
      cz: 'Milán a Ligurie',
      en: 'Milano & Liguria',
    },
    location: {
      cz: 'Itálie',
      en: 'Italy',
    },
    year: 2024,
    dates: {
      cz: 'Září 2024',
      en: 'September 2024',
    },
    days: 7,
    summary: {
      cz: 'Kombinace milánské módy a památek s malebným ligurským pobřežím, ikonickým Portofinem, romantickým Cinque Terre a plážemi v Alassiu.',
      en: 'A blend of Milanese fashion and culture with the scenic Ligurian coast, featuring Portofino, iconic Cinque Terre, and beaches in Alassio.',
    },
    intro: {
      cz: 'Italské dobrodružství plné památek i moře. První den jsme strávili v rušném Miláně, odkud jsme se přesunuli do naší základny v Janově. Odtud jsme podnikali pohodové výlety vlakem po ligurské riviéře – obdivovali jsme luxusní Portofino, ikonické barevné vesničky Cinque Terre a užívali si odpočinek na plážích v Alassiu.',
      en: 'An Italian getaway combining city culture with coastal views. We spent the first day exploring bustling Milan before heading to our base in Genoa. From there, we took scenic train trips along the Ligurian Riviera to discover luxurious Portofino, the iconic colorful villages of Cinque Terre, and the sandy beaches of Alassio.',
    },
    accommodation: [
      {
        name: 'Via Freiköfel - MILANO',
        url: 'https://www.google.com/maps?q=Via+Freik%C3%B6fel,+23,+20138+Milano+MI,+It%C3%A1lie',
      },
      {
        name: 'La Bicocca di Giò - GENOA',
        url: 'https://www.booking.com/hotel/it/la-bicocca-di-gio.cs.html',
      },
    ],
  },
]