import Header from '@/src/components/Header/Header'
import Footer from '@/src/components/Footer/Footer'
import Intro from '@/src/components/Intro/Intro'
import TripCard from '@/src/components/TripCard/TripCard'
import { tripsByRecent } from '@/src/data/trips'
import { getFeaturedPhotosForTrip } from '@/src/lib/cloudinary'
import styles from './page.module.css'

// Vypne agresivní cache pro vývoj a testování změn v Cloudinary
export const dynamic = 'force-dynamic'

export default async function Home() {
  const tripsWithPreviews = await Promise.all(
    tripsByRecent.map(async (trip) => {
      // Voláme s novou kompletní cestou ke složce
      const featuredPhotos = await getFeaturedPhotosForTrip(trip.cloudinaryFolder)
      return {
        ...trip,
        photos: featuredPhotos,
      }
    })
  )

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <Intro />

          <section className={styles.trips} aria-labelledby="trips-heading">
            <div className={styles.tripsHead}>
              <h2 id="trips-heading" className={styles.tripsTitle}>The Trips</h2>
              <p className={styles.tripsSub}>Every journey, most recent first. Tap in.</p>
            </div>

            <div className={styles.grid}>
              {tripsWithPreviews.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}