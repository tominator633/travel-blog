import Link from 'next/link'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import styles from './not-found.module.css'

export default function TripNotFound() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.inner}>
          <p className={styles.code}>404</p>
          <h1 className={styles.title}>This trip isn&apos;t on the map</h1>
          <p className={styles.text}>
            The journey you&apos;re looking for doesn&apos;t exist &mdash; maybe
            it&apos;s still just an idea. Head back and pick another one.
          </p>
          <Link href="/" className={styles.button}>
            Back to all trips
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
