import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import TripIntro from '@/components/TripIntro/TripIntro'
import PhotoGallery from '@/components/PhotoGallery/PhotoGallery'
import { getTrip, trips } from '@/data/trips'
import styles from './page.module.css'

export function generateStaticParams() {
  return trips.map((trip) => ({ id: trip.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const trip = getTrip(id)
  if (!trip) return { title: 'Trip not found — Wanderlines' }

  return {
    title: `${trip.title} — Wanderlines`,
    description: trip.summary,
    openGraph: {
      title: `${trip.title} — Wanderlines`,
      description: trip.summary,
      images: [{ url: trip.photos[0]?.src }],
    },
  }
}

export default async function TripPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const trip = getTrip(id)
  if (!trip) notFound()

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <TripIntro trip={trip} />

          <section aria-label="Photos" className={styles.gallery}>
            <PhotoGallery photos={trip.photos} />
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
