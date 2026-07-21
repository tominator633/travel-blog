import Intro from '@/src/components/Intro/Intro'
import TripCard from '@/src/components/TripCard/TripCard'
import { tripsByRecent } from '@/src/data/trips'
import { getFeaturedPhotosForTrip } from '@/src/lib/cloudinary'
import { getDictionary } from '@/src/dictionaries/get-dictionary'
import styles from './page.module.css'

// Vypne agresivní cache pro vývoj a testování změn v Cloudinary
export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ lang: 'cz' | 'en' }> | { lang: 'cz' | 'en' }
}

export default async function Home({ params }: PageProps) {
  // Ošetření pro Next.js (řeší asynchronní i synchronní předání params)
  const resolvedParams = await params
  const lang = resolvedParams.lang || 'cz'

  // Načtení slovníku pro daný jazyk
  const dict = await getDictionary(lang)

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
    <main className={styles.main}>
      <div className={styles.container}>
        <Intro dict={dict.intro} lang={lang} />

        <section className={styles.trips} aria-labelledby="trips-heading">
          <div className={styles.tripsHead}>
            <h2 id="trips-heading" className={styles.tripsTitle}>
              {dict.home.tripsTitle}
            </h2>
            <p className={styles.tripsSub}>
              {dict.home.tripsSub}
            </p>
          </div>

          <div className={styles.grid}>
            {tripsWithPreviews.map((trip) => (
              <TripCard 
                key={trip.id} 
                trip={trip} 
                lang={lang} 
                dict={dict.tripCard} 
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}