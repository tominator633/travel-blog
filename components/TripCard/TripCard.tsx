import Image from 'next/image'
import Link from 'next/link'
import type { Trip } from '@/data/trips'
import styles from './TripCard.module.css'

export default function TripCard({ trip }: { trip: Trip }) {
  const collage = trip.photos.slice(0, 4)

  return (
    <Link
      href={`/trips/${trip.id}`}
      className={styles.card}
      aria-label={`${trip.title} — ${trip.days} days in ${trip.location}`}
    >
      <div className={styles.collage} aria-hidden="true">
        {collage.map((photo, i) => (
          <div key={i} className={styles.tile}>
            <Image
              src={photo.src}
              alt=""
              fill
              sizes="(max-width: 760px) 100vw, 540px"
              className={styles.tileImg}
            />
          </div>
        ))}
        <span className={styles.scrim} />
      </div>

      <div className={styles.body}>
        <span className={styles.year}>{trip.year}</span>
        <h3 className={styles.title}>{trip.title}</h3>
        <p className={styles.location}>{trip.location}</p>
        <p className={styles.summary}>{trip.summary}</p>
        <span className={styles.cta}>
          {trip.days} days
          <span className={styles.arrow} aria-hidden="true">
            &rarr;
          </span>
        </span>
      </div>
    </Link>
  )
}
