"use client"

import Link from 'next/link'
import Image from 'next/image'
import type { Trip } from '@/src/data/trips'
import type { CloudinaryPhoto } from '@/src/lib/cloudinary'
import styles from './TripCard.module.css'

interface TripCardProps {
  trip: Trip & {
    photos: CloudinaryPhoto[]
  }
  lang: 'cz' | 'en'
  dict: {
    day: string
    days2To4: string
    days5Plus: string
  }
}

export default function TripCard({ trip, lang, dict }: TripCardProps) {
  const collage = trip.photos ? trip.photos.slice(0, 4) : []

  const location = trip.location[lang] || trip.location.en
  const summary = trip.summary[lang] || trip.summary.en

  // Pomocná funkce pro správné skloňování slov podle poctu dní a slovníku
  const getDaysLabel = (count: number) => {
    if (count === 1) return dict.day
    if (count >= 2 && count <= 4) return dict.days2To4
    return dict.days5Plus
  }

  const daysText = `${trip.days} ${getDaysLabel(trip.days)}`

  return (
    <Link
      href={`/${lang}/trips/${trip.id}`}
      className={styles.card}
      aria-label={`${trip.title} — ${daysText} (${location})`}
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
        <p className={styles.location}>{location}</p>
        <p className={styles.summary}>{summary}</p>
        <span className={styles.cta}>
          {daysText}
          <span className={styles.arrow} aria-hidden="true">
            &rarr;
          </span>
        </span>
      </div>
    </Link>
  )
}