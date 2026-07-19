// data/trips.ts
//
// Read-only data source for the whole blog. No database, no POST requests.
// When your Cloudinary account is ready, simply replace the local `/images/...`
// strings below with your Cloudinary URLs, e.g.
//   "https://res.cloudinary.com/<your-id>/image/upload/v12345/singapore-2023/photo1.jpg"
// The `alt` text stays for accessibility/SEO.

export type Photo = {
  src: string
  alt: string
  caption?: string
}

export type Trip = {
  id: string
  title: string
  location: string
  year: number
  dates: string
  days: number
  // Short teaser shown on the homepage card.
  summary: string
  // Longer intro paragraph(s) shown on the trip page.
  intro: string
  hotelName: string
  hotelUrl: string
  // First few photos used for the homepage card collage.
  photos: Photo[]
}

export const trips: Trip[] = [
  {
    id: 'kyoto-2024',
    title: 'Kyoto 2024',
    location: 'Kyoto, Japan',
    year: 2024,
    dates: 'April 2024',
    days: 6,
    summary:
      'Torii gates at dawn, bamboo groves, and quiet machiya streets glowing at dusk.',
    intro:
      'Six slow days in the old capital, chasing the light between temples. I walked the Fushimi Inari gates before sunrise to beat the crowds, got lost in the Arashiyama bamboo, and ended each evening wandering the lantern-lit lanes of Gion. Spring meant leftover blossoms and impossibly clear afternoons.',
    hotelName: 'The Machiya Ryokan, Gion',
    hotelUrl: 'https://www.booking.com/',
    photos: [
      {
        src: '/images/kyoto-2024/photo1.png',
        alt: 'Endless red torii gates at Fushimi Inari shrine in Kyoto',
        caption: 'Fushimi Inari before the crowds arrived.',
      },
      {
        src: '/images/kyoto-2024/photo2.png',
        alt: 'Tall green bamboo stalks in the Arashiyama bamboo grove',
        caption: 'Light beams through the Arashiyama bamboo.',
      },
      {
        src: '/images/kyoto-2024/photo3.png',
        alt: 'Kinkaku-ji golden pavilion reflected in a still pond',
        caption: 'Kinkaku-ji, the golden pavilion.',
      },
      {
        src: '/images/kyoto-2024/photo4.png',
        alt: 'Lantern-lit wooden houses on a Gion street at dusk',
        caption: 'Gion at dusk, lanterns just coming on.',
      },
    ],
  },
  {
    id: 'iceland-2022',
    title: 'Iceland 2022',
    location: 'South Coast, Iceland',
    year: 2022,
    dates: 'October 2022',
    days: 8,
    summary:
      'Waterfalls, black sand, and green auroras dancing over the lava fields.',
    intro:
      'Eight days driving the Ring Road with no real plan beyond chasing weather. Iceland in October is raw: rainbows over Skogafoss one hour, sideways rain the next, then a clear night where the aurora quietly took over the sky. I soaked in the Blue Lagoon to thaw out and never wanted to leave.',
    hotelName: 'Hótel Vík í Mýrdal',
    hotelUrl: 'https://www.booking.com/',
    photos: [
      {
        src: '/images/iceland-2022/photo1.png',
        alt: 'Skogafoss waterfall in Iceland with a rainbow',
        caption: 'A rainbow parked over Skogafoss all afternoon.',
      },
      {
        src: '/images/iceland-2022/photo2.png',
        alt: 'Green northern lights over a snowy Icelandic mountain',
        caption: 'The aurora finally showed up around midnight.',
      },
      {
        src: '/images/iceland-2022/photo3.png',
        alt: 'Black sand beach with basalt columns and crashing waves',
        caption: 'Reynisfjara and its basalt columns.',
      },
      {
        src: '/images/iceland-2022/photo4.png',
        alt: 'Milky blue geothermal water of the Blue Lagoon',
        caption: 'Thawing out in the Blue Lagoon.',
      },
    ],
  },
  {
    id: 'singapore-2023',
    title: 'Singapore 2023',
    location: 'Singapore',
    year: 2023,
    dates: 'August 2023',
    days: 5,
    summary:
      'Futuristic skylines, Supertrees at night, and the best hawker food of my life.',
    intro:
      'Five humid, brilliant days in a city that feels like the future. I watched the Supertrees light up over Marina Bay, wandered pastel shophouse streets, and ate my way through hawker centers until I could barely move. Equal parts skyscrapers and jungle, all of it spotless.',
    hotelName: 'Marina Bay Sands',
    hotelUrl: 'https://www.booking.com/',
    photos: [
      {
        src: '/images/singapore-2023/photo1.png',
        alt: 'Marina Bay Sands and glowing Supertrees at blue hour',
        caption: 'Marina Bay at blue hour.',
      },
      {
        src: '/images/singapore-2023/photo2.png',
        alt: 'Colorful pastel Peranakan shophouses on a Singapore street',
        caption: 'Peranakan shophouses in Katong.',
      },
      {
        src: '/images/singapore-2023/photo3.png',
        alt: 'Chili crab and satay skewers at a Singapore hawker center',
        caption: 'Hawker center dinner, round two.',
      },
      {
        src: '/images/singapore-2023/photo4.png',
        alt: 'Indoor waterfall in the Cloud Forest dome at Gardens by the Bay',
        caption: 'The Cloud Forest waterfall.',
      },
    ],
  },
]

// Newest trips first.
export const tripsByRecent = [...trips].sort((a, b) => b.year - a.year)

export function getTrip(id: string): Trip | undefined {
  return trips.find((t) => t.id === id)
}
