// src/data/trips.ts
export type Trip = {
  id: string
  title: string
  location: string
  year: number
  dates: string
  days: number
  summary: string
  intro: string
  hotelName: string
  hotelUrl: string
  cloudinaryFolder: string // Přidané pole pro přesnou cestu
}

export const trips: Trip[] = [
  {
    id: 'singapore-2023',
    title: 'Singapore 2023',
    location: 'Singapore',
    year: 2023,
    dates: 'June 2023',
    days: 6,
    summary:
      'Futuristic skylines, Supertrees at night, and the best hawker food of my life.',
    intro:
      'Five humid, brilliant days in a city that feels like the future. I watched the Supertrees light up over Marina Bay, wandered pastel shophouse streets, and ate my way through hawker centers until I could barely move. Equal parts skyscrapers and jungle, all of it spotless.',
    hotelName: 'lyf Farrer Park Singapore',
    hotelUrl: 'https://www.tripadvisor.com/Hotel_Review-g294265-d23857498-Reviews-Lyf_Farrer_Park_Singapore-Singapore.html',
    cloudinaryFolder: 'MY-TRAVEL-BLOG/SINGAPORE-2023' // Přesná cesta bez "Home/"
  },
  {
    id: 'cambodia-2023',
    title: 'Siem Reap, Cambodia 2023',
    location: 'Cambodia',
    year: 2023,
    dates: 'June 2023',
    days: 4,
    summary:
      'Ancient jungle temples, sunrise over Angkor Wat, and the incredible scale of the Khmer Empire.',
    intro:
      'Lost in the stone maze of the Khmer Empire. From the jaw-dropping scale of Angkor Wat in the midday heat to walking between the giant, enigmatic stone faces of Bayon, every corner felt legendary. I spent hours navigating dusty dirt paths and watching massive tree roots slowly swallow the ruins of Ta Prohm. A brilliant, exhausting blur of ancient history, jungle humidity, and sheer architectural wonder.',
    hotelName: 'THE PRIVILEGE FLOOR by Borei Angkor',
    hotelUrl: 'https://www.tripadvisor.com/Hotel_Review-g297390-d2350683-Reviews-THE_PRIVILEGE_FLOOR_by_Borei_Angkor-Siem_Reap_Siem_Reap_Province.html',
    cloudinaryFolder: 'MY-TRAVEL-BLOG/CAMBODIA-2023' 
  },
  {
    id: 'sweden-2025',
    title: 'Stockholm - Malmö - Copenhagen, Scandinavia 2025',
    location: 'Sweden, Denmark',
    year: 2025,
    dates: 'October 2025',
    days: 4,
    summary:
      'From the sheer mayhem of Lady Gaga in Stockholm to the architectural bridges and design streets of Malmö and Copenhagen.',
    intro:
      'A brilliant autumn journey through Scandinavia that kicked off with absolute stadium chaos. We landed in Stockholm and went straight into the pure energy of Lady Gaga’s Mayhem Ball at the Avicii Arena. From that unforgettable high, the trip transitioned into a scenic path south—crossing the water from the modern, quiet corners of Malmö to the vibrant, bicycle-filled design hubs of Copenhagen. A perfect mix of pop spectacle, crisp October air, and effortless Nordic charm.',
    hotelName: 'THE PRIVILEGE FLOOR by Borei Angkor',
    hotelUrl: 'https://www.tripadvisor.com/Hotel_Review-g297390-d2350683-Reviews-THE_PRIVILEGE_FLOOR_by_Borei_Angkor-Siem_Reap_Siem_Reap_Province.html',
    cloudinaryFolder: 'MY-TRAVEL-BLOG/SWEDEN-2025' 
  },
  {
    id: 'italy-2026',
    title: 'Emilia Romagna - Firenze, Italy 2026',
    location: 'Italy',
    year: 2026,
    dates: 'June 2026',
    days: 9,
    summary:
      'A perfect Italian mix of food culture, slow coastal days, mountaintop fortress views, and high-speed coaster adrenaline.',
    intro:
      'An incredible journey through the vibrant heart of Italy. We started with the historic porticoes and rich food culture of Bologna and the Renaissance magic of Florence, before heading to the Adriatic coast for six deeply relaxing days in Rimini. Using the coast as our hub, we scaled the towering cliffside fortresses of San Marino and wrapped up the trip with two high-octane, adrenaline-fueled days conquering the massive roller coasters at Mirabilandia. Sun, history, and pure theme park speed.',
    hotelName: 'THE PRIVILEGE FLOOR by Borei Angkor',
    hotelUrl: 'https://www.tripadvisor.com/Hotel_Review-g297390-d2350683-Reviews-THE_PRIVILEGE_FLOOR_by_Borei_Angkor-Siem_Reap_Siem_Reap_Province.html',
    cloudinaryFolder: 'MY-TRAVEL-BLOG/ITALY-2026' 
  },
  
]

export const tripsByRecent = [...trips].sort((a, b) => b.year - a.year)

export function getTrip(id: string): Trip | undefined {
  return trips.find((t) => t.id === id)
}