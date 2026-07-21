// src/data/trips.ts

// Definice typu pro jedno ubytování
export type Accommodation = {
  name: string
  url: string
}

// Lokalizovaný řetězec pro podporu více jazyků
export type LocalizedString = {
  cz: string
  en: string
}

// Upravený typ Trip s plnou podporou i18n
export type Trip = {
  id: string
  cloudinaryFolder: string
  title: string
  location: LocalizedString
  year: number
  dates: LocalizedString
  days: number
  summary: LocalizedString
  intro: LocalizedString
  accommodation: Accommodation[]
}

export const trips: Trip[] = [
  {
    id: '2023-singapore',
    cloudinaryFolder: 'MY-TRAVEL-BLOG/2023-SINGAPORE',
    title: 'Singapore',
    location: {
      cz: 'Singapur',
      en: 'Singapore',
    },
    year: 2023,
    dates: {
      cz: 'Červen 2023',
      en: 'June 2023',
    },
    days: 6,
    summary: {
      cz: 'Futuristické mrakodrapy, noční Supertrees a nejlepší pouliční jídlo mého života.',
      en: 'Futuristic skylines, Supertrees at night, and the best hawker food of my life.',
    },
    intro: {
      cz: 'Pět vlhkých, úžasných dní ve městě, které působí jako z budoucnosti. Sledoval jsem, jak se Supertrees rozsvěcují nad Marina Bay, toulal se ulicemi s pastelovými domky a jedl v hawker centrech, dokud jsem se mohl hýbat. Rovným dílem mrakodrapy i džungle, a všechno naprosto čisté.',
      en: 'Five humid, brilliant days in a city that feels like the future. I watched the Supertrees light up over Marina Bay, wandered pastel shophouse streets, and ate my way through hawker centers until I could barely move. Equal parts skyscrapers and jungle, all of it spotless.',
    },
    accommodation: [
      {
        name: 'lyf Farrer Park Singapore', 
        url: 'https://www.tripadvisor.com/Hotel_Review-g294265-d23857498-Reviews-Lyf_Farrer_Park_Singapore-Singapore.html',
      }
    ]
  },
  {
    id: '2023-cambodia',
    cloudinaryFolder: 'MY-TRAVEL-BLOG/2023-CAMBODIA' ,
    title: 'Siem Reap',
    location: {
      cz: 'Kambodža',
      en: 'Cambodia',
    },
    year: 2023,
    dates: {
      cz: 'Červen 2023',
      en: 'June 2023',
    },
    days: 4,
    summary: {
      cz: 'Starobylé chrámy v džungli, východ slunce nad Angkor Watem a neuvěřitelné měřítko Khmérské říše.',
      en: 'Ancient jungle temples, sunrise over Angkor Wat, and the incredible scale of the Khmer Empire.',
    },
    intro: {
      cz: 'Ztracen v kamenném bludišti Khmérské říše. Od vyrážejícího měřítka Angkor Watu v poledním horku až po procházky mezi obřími, tajemnými kamennými tvářemi Bayonu – každé zákoutí působilo legendárně. Strávil jsem hodiny navigací po prašných cestách a sledováním, jak masivní kořeny stromů pomalu pohlcují ruiny Ta Prohm.',
      en: 'Lost in the stone maze of the Khmer Empire. From the jaw-dropping scale of Angkor Wat in the midday heat to walking between the giant, enigmatic stone faces of Bayon, every corner felt legendary. I spent hours navigating dusty dirt paths and watching massive tree roots slowly swallow the ruins of Ta Prohm. A brilliant, exhausting blur of ancient history, jungle humidity, and sheer architectural wonder.',
    },
    accommodation: [
      {
        name: 'THE PRIVILEGE FLOOR by Borei Angkor', 
        url: 'https://www.tripadvisor.com/Hotel_Review-g297390-d2350683-Reviews-THE_PRIVILEGE_FLOOR_by_Borei_Angkor-Siem_Reap_Siem_Reap_Province.html',
      }
    ],
    
  },
  {
    id: '2025-sweden',
    cloudinaryFolder: 'MY-TRAVEL-BLOG/2025-SWEDEN' ,
    title: 'Stockholm - Malmö - Copenhagen',
    location: {
      cz: 'Švédsko, Dánsko',
      en: 'Sweden, Denmark',
    },
    year: 2025,
    dates: {
      cz: 'Říjen 2025',
      en: 'October 2025',
    },
    days: 5,
    summary: {
      cz: 'Od divoké show Lady Gaga ve Stockholmu až po architektonické mosty a designové uličky Malmö a Kodaňe.',
      en: 'From the sheer mayhem of Lady Gaga in Stockholm to the architectural bridges and design streets of Malmö and Copenhagen.',
    },
    intro: {
      cz: 'Skvělá podzimní cesta Skandinávií, která odstartovala stadionovým šílenstvím. Přistáli jsme ve Stockholmu a zamířili přímo do čisté energie Mayhem Ballu Lady Gaga v Avicii Areně. Z tohoto nezapomenutelného zážitku se výlet přesunul na scénickou cestu na jih – přes vodu z moderního Malmö do živé Kodaňe plné kol a designu.',
      en: 'A brilliant autumn journey through Scandinavia that kicked off with absolute stadium chaos. We landed in Stockholm and went straight into the pure energy of Lady Gaga’s Mayhem Ball at the Avicii Arena. From that unforgettable high, the trip transitioned into a scenic path south—crossing the water from the modern, quiet corners of Malmö to the vibrant, bicycle-filled design hubs of Copenhagen. A perfect mix of pop spectacle, crisp October air, and effortless Nordic charm.',
    },
    accommodation: [
      {
        name: "Avanti Apartment Hotel - STOCKHOLM", 
        url: "https://www.tripadvisor.com/Hotel_Review-g189852-d23763547-Reviews-Avanti_Apartment_Hotel-Stockholm.html"
      },
      {
        name: "CABINN City Hotel - COPENHAGEN", 
        url: "https://www.tripadvisor.com/Hotel_Review-g189541-d338239-Reviews-CABINN_City_Hotel-Copenhagen_Zealand.html"
      },
    ],
    
  },
  {
    id: '2026-italy',
    cloudinaryFolder: 'MY-TRAVEL-BLOG/2026-ITALY',
    title: 'Emilia Romagna - Firenze',
    location: {
      cz: 'Itálie',
      en: 'Italy',
    },
    year: 2026,
    dates: {
      cz: 'Červen 2026',
      en: 'June 2026',
    },
    days: 9,
    summary: {
      cz: 'Italská kombinace gastronomie, pohodových dnů u moře, výhledů z pevnosti San Marina a adrenalinu na horských dráhách.',
      en: 'A perfect Italian mix of food culture, slow coastal days, mountaintop fortress views, and high-speed coaster adrenaline.',
    },
    intro: {
      cz: 'Neskutečná cesta živým srdcem Itálie. Začali jsme historickými podloubími a skvělým jídlem v Boloni společně s renesanční magií Florencie, načež jsme zamířili na jadrandské pobřeží do Rimini. Odtud jsme vyrazili do skalní pevnosti v San Marinu a výlet zakončili na horských dráhách v Mirabilandii.',
      en: 'An incredible journey through the vibrant heart of Italy. We started with the historic porticoes and rich food culture of Bologna and the Renaissance magic of Florence, before heading to the Adriatic coast for six deeply relaxing days in Rimini. Using the coast as our hub, we scaled the towering cliffside fortresses of San Marino and wrapped up the trip with two high-octane, adrenaline-fueled days conquering the massive roller coasters at Mirabilandia. Sun, history, and pure theme park speed.',
    },
    accommodation: [
      {
        name: "Astoria Prestige Apartments - BOLOGNA", 
        url: "https://www.tripadvisor.ie/Hotel_Review-g187801-d34310223-Reviews-Astoria_Prestige_Apartments-Bologna_Province_of_Bologna_Emilia_Romagna.html"
      },
      {
        name: "Residence Ten Suite - RIMINI", 
        url: "https://www.tripadvisor.com/Hotel_Review-g187807-d10272014-Reviews-Residence_Ten_Suite-Rimini_Province_of_Rimini_Emilia_Romagna.html"
      },
    ],
    
  },
  {
  id: '2025-srilanka',
  cloudinaryFolder: 'MY-TRAVEL-BLOG/2025-SRILANKA',
  title: 'Sri Lanka',
  location: {
    cz: 'Srí Lanka',
    en: 'Sri Lanka',
  },
  year: 2025,
  dates: {
    cz: 'Duben 2025',
    en: 'April 2025',
  },
  days: 7,
  summary: {
    cz: 'Exotická kombinace odpočinku na tropických plážích Hikkaduwy a objevování buddhistické kultury i zelených kopců v Kandy.',
    en: 'An exotic mix of relaxing days on the tropical beaches of Hikkaduwa and exploring Buddhist culture and green hills in Kandy.',
  },
  intro: {
    cz: 'Nezapomenutelný týden na Srí Lance. Začali jsme na pobřeží v Hikkaduwě relaxem na tropických plážích, pozorováním mořských želv a surfováním, načež jsme zamířili do vnitrozemí do historického Kandy obklopeného malebnými kopci a chrámy.',
    en: 'An unforgettable week in Sri Lanka. We started on the coast of Hikkaduwa with tropical beaches, sea turtles, and ocean waves, before heading inland to historic Kandy surrounded by scenic hills and sacred temples.',
  },
  accommodation: [
    {
      name: "Hikka Tranz by Cinnamon - HIKKADUWA", 
      url: "https://www.tripadvisor.com/Hotel_Review-g304134-d579245-Reviews-Hikka_Tranz_by_Cinnamon-Hikkaduwa_Galle_District_Southern_Province.html"
    },
    {
      name: "Sevana City Hotel - KANDY", 
      url: "https://www.tripadvisor.com/Hotel_Review-g304138-d1541208-Reviews-Sevana_City_Hotel-Kandy_Kandy_District_Central_Province.html"
    },
  ],
},
  {
  id: '2025-luxembourg',
  cloudinaryFolder: 'MY-TRAVEL-BLOG/2025-LUXEMBOURG',
  title: 'Luxembourg',
  location: {
    cz: 'Lucembursko',
    en: 'Luxembourg',
  },
  year: 2025,
  dates: {
    cz: 'Srpen 2025',
    en: 'August 2025',
  },
  days: 4,
  summary: {
    cz: 'Prohlídka historického hlavního města Lucemburska, impozantních opevnění Bock Casemates a přírody v okolí.',
    en: 'Exploring the historic capital of Luxembourg, the impressive Bock Casemates fortress, and the surrounding countryside.',
  },
  intro: {
    cz: 'Návštěva jednoho z nejmenších a nejbohatších států Evropy. Zázemím nám byl hotel u letiště v Senningerbergu, odkud jsme pohodlně obdivovali dramatické údolí Alzette, historické pevnosti, moderní evropskou čtvrť i malebná zákoutí hlavního města.',
    en: 'A visit to one of Europe’s smallest yet most fascinating countries. Based near the airport in Senningerberg, we spent our days discovering the dramatic Alzette valley, historic fortifications, the modern European quarter, and the picturesque corners of Luxembourg City.',
  },
  accommodation: [
    {
      name: "Mandarina Hotel Luxembourg Airport", 
      url: "https://www.tripadvisor.com/Hotel_Review-g1749413-d530357-Reviews-Mandarina_Hotel_Luxembourg_Airport-Senningerberg.html"
    },
  ],
},
]

export const tripsByRecent = [...trips].sort((a, b) => b.year - a.year)

export function getTrip(id: string): Trip | undefined {
  return trips.find((t) => t.id === id)
}