import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import Intro from '@/components/Intro/Intro'
import TripCard from '@/components/TripCard/TripCard'
import { tripsByRecent } from '@/data/trips'
import styles from './page.module.css'

export default function Home() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <Intro />

          <section className={styles.trips} aria-labelledby="trips-heading">
            <div className={styles.tripsHead}>
              <h2 id="trips-heading" className={styles.tripsTitle}>
                The Trips
              </h2>
              <p className={styles.tripsSub}>
                Every journey, most recent first. Tap in.
              </p>
            </div>

            <div className={styles.grid}>
              {tripsByRecent.map((trip) => (
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
