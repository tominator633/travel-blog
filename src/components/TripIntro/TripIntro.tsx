import Link from 'next/link'
import type { Trip } from '@/src/data/trips'
import styles from './TripIntro.module.css'

export default function TripIntro({ trip }: { trip: Trip }) {
  return (
    <section className={styles.intro} aria-labelledby="trip-heading">
      <Link href="/" className={styles.back}>
        <span aria-hidden="true">&larr;</span> All trips
      </Link>

      <p className={styles.eyebrow}>
        {trip.location} &middot; {trip.dates}
      </p>
      <h1 id="trip-heading" className={styles.heading}>
        {trip.title}
      </h1>

      <p className={styles.body}>{trip.intro}</p>

      <dl className={styles.facts}>
        <div className={styles.fact}>
          <dt className={styles.factLabel}>Duration</dt>
          <dd className={styles.factValue}>{trip.days} days</dd>
        </div>
        <div className={styles.fact}>
          <dt className={styles.factLabel}>When</dt>
          <dd className={styles.factValue}>{trip.dates}</dd>
        </div>
        <div className={styles.fact}>
          <dt className={styles.factLabel}>Where I stayed</dt>
          <dd className={styles.factValue}>
            <a
              href={trip.hotelUrl}
              className={styles.hotelLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {trip.hotelName}
              <span aria-hidden="true"> ↗</span>
            </a>
          </dd>
        </div>
      </dl>
    </section>
  )
}
