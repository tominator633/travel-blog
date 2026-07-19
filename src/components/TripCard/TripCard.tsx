"use client"

import Link from 'next/link'
import Image from 'next/image'
import type { Trip } from '@/src/data/trips'
import type { CloudinaryPhoto } from '@/src/lib/cloudinary'
import styles from './TripCard.module.css'

// Rozšíříme typ Trip o pole fotek z Cloudinary, které mu doplňujeme na homepage
interface TripCardProps {
  trip: Trip & {
    photos: CloudinaryPhoto[]
  }
}

export default function TripCard({ trip }: TripCardProps) {
  // Cloudinary Search API nám už vrátilo přesně 4 fotky, pojistíme se pomocí slice
  const collage = trip.photos ? trip.photos.slice(0, 4) : []

  return (
    <Link
      href={`/trips/${trip.id}`}
      className={styles.card}
      aria-label={`${trip.title} — ${trip.days} days in ${trip.location}`}
    >
      <div className={styles.collage} aria-hidden="true">
        {collage.map((photo, i) => (
          <div key={photo.src} className={styles.tile}>
            <Image
              src={photo.src}
              alt=""
              fill
              sizes="(max-width: 760px) 100vw, 540px"
              className={styles.tileImg}
              priority={i === 0}
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding="async"
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