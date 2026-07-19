// src/app/trips/[id]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Header from '@/src/components/Header/Header'
import Footer from '@/src/components/Footer/Footer'
import TripIntro from '@/src/components/TripIntro/TripIntro'
import PhotoGallery from '@/src/components/PhotoGallery/PhotoGallery'
import { getTrip, trips } from '@/src/data/trips'
import { getPhotosFromFolder } from '@/src/lib/cloudinary' 
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

  const cloudinaryPhotos = await getPhotosFromFolder(trip.cloudinaryFolder)
  const coverImage = cloudinaryPhotos[0]?.src || ''

  return {
    title: `${trip.title} — Wanderlines`,
    description: trip.summary,
    openGraph: {
      title: `${trip.title} — Wanderlines`,
      description: trip.summary,
      images: coverImage ? [{ url: coverImage }] : [],
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

  // Voláme s novou explicitní cestou ke složce
  const cloudinaryPhotos = await getPhotosFromFolder(trip.cloudinaryFolder)

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <TripIntro trip={trip} />

          <section aria-label="Photos" className={styles.gallery}>
            {cloudinaryPhotos.length > 0 ? (
              <PhotoGallery photos={cloudinaryPhotos} />
            ) : (
              <p className={styles.noPhotos}>Zatím tu nejsou žádné fotky z cest.</p>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}