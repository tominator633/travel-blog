import Image from 'next/image'
import { trips } from '@/src/data/trips'
import styles from './Intro.module.css'

interface IntroProps {
  dict: {
    eyebrow: string
    headingMain: string
    headingAccent: string
    lede: string
    stats: {
      trips: string
      countries: string
      cameras: string
    }
    profileAlt: string
    badge: string
  }
  lang: 'cz' | 'en'
}

export default function Intro({ dict, lang }: IntroProps) {
  const tripCount = trips.length

  // Získání počtu unikátních zemí
  const countryCount = new Set(
    trips
      .flatMap((t) => {
        const loc = t.location[lang] || t.location.en || ''
        return loc.split(',')
      })
      .map((country) => country.trim())
      .filter(Boolean)
  ).size

  return (
    <section className={styles.intro} id="about" aria-labelledby="intro-heading">
      <div className={styles.text}>
        <p className={styles.eyebrow}>{dict.eyebrow}</p>

        <h1 id="intro-heading" className={styles.heading}>
          {dict.headingMain}
          <br />
          <span className={styles.accent}>{dict.headingAccent}</span>
        </h1>

        <p className={styles.lede}>{dict.lede}</p>

        <dl className={styles.stats}>
          <div className={styles.stat}>
            <dt className={styles.statLabel}>{dict.stats.trips}</dt>
            <dd className={styles.statValue}>{tripCount}</dd>
          </div>
          <div className={styles.stat}>
            <dt className={styles.statLabel}>{dict.stats.countries}</dt>
            <dd className={styles.statValue}>{countryCount}</dd>
          </div>
          <div className={styles.stat}>
            <dt className={styles.statLabel}>{dict.stats.cameras}</dt>
            <dd className={styles.statValue}>1</dd>
          </div>
        </dl>
      </div>

      <div className={styles.portrait}>
        <div className={styles.frame}>
          <Image
            src="/images/profile.jpeg"
            alt={dict.profileAlt}
            fill
            sizes="(max-width: 900px) 80vw, 420px"
            className={styles.photo}
            priority
          />
        </div>
        <span className={styles.badge}>{dict.badge}</span>
      </div>
    </section>
  )
}