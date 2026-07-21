// app/page.tsx
import { redirect } from 'next/navigation'

export default function RootPage() {
  // Automatický přesun z čisté domény na českou lokalizaci
  redirect('/cz')
}