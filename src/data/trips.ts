import { trips2026 } from './trips/2026'
import { trips2025 } from './trips/2025'
import { trips2024 } from './trips/2024'
import { trips2023 } from './trips/2023'



export type Accommodation = {
  name: string
  url: string
}

export type LocalizedString = {
  cz: string
  en: string
}

export type Trip = {
  id: string
  cloudinaryFolder: string
  title: LocalizedString
  location: LocalizedString
  year: number
  dates: LocalizedString
  days: number
  summary: LocalizedString
  intro: LocalizedString
  accommodation: Accommodation[]
}

// 1. DŮLEŽITÉ: Pořadí v tomto poli určuje, jak se tripy zobrazí na webu!
export const trips: Trip[] = [
  ...trips2026,
  ...trips2025,
  ...trips2024,
  ...trips2023,
]

// Pomocné exporty
export const tripsByRecent = [...trips].sort((a, b) => b.year - a.year)

export function getTrip(id: string): Trip | undefined {
  return trips.find((t) => t.id === id)
}