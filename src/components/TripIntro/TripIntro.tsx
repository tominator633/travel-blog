import type { Trip } from '@/src/data/trips'
import styles from './TripIntro.module.css'

interface TripIntroProps {
  trip: Trip
  lang: 'cz' | 'en'
  dict: {
    duration: string
    when: string
    whereIStayed: string
    noAccommodation: string
  }
  // Volitelně/doporučeně pro správné skloňování dní ze slovníku
  cardDict?: {
    day: string
    days2To4: string
    days5Plus: string
  }
}

export default function TripIntro({ trip, lang, dict, cardDict }: TripIntroProps) {
  // Získáme správné jazykové mutace z objektů
  const location = trip.location[lang] || trip.location.en
  const dates = trip.dates[lang] || trip.dates.en
  const intro = trip.intro[lang] || trip.intro.en
  const title = trip.title[lang] || trip.title.en

  // Pomocné skloňování dní
  const getDaysLabel = (count: number) => {
    if (!cardDict) return lang === 'cz' ? (count === 1 ? 'den' : count < 5 ? 'dny' : 'dní') : 'days'
    if (count === 1) return cardDict.day
    if (count >= 2 && count <= 4) return cardDict.days2To4
    return cardDict.days5Plus
  }

  return (
    <section className={styles.intro} aria-labelledby="trip-heading">
      <p className={styles.eyebrow}>
        {location} &middot; {dates}
      </p>

      <h1 id="trip-heading" className={styles.heading}>
        {title}
      </h1>

      <p className={styles.body}>{intro}</p>

      <dl className={styles.facts}>
        <div className={styles.fact}>
          <dt className={styles.factLabel}>{dict.duration}</dt>
          <dd className={styles.factValue}>
            {trip.days} {getDaysLabel(trip.days)}
          </dd>
        </div>

        <div className={styles.fact}>
          <dt className={styles.factLabel}>{dict.when}</dt>
          <dd className={styles.factValue}>{dates}</dd>
        </div>

        <div className={styles.fact}>
          <dt className={styles.factLabel}>{dict.whereIStayed}</dt>
          <dd className={styles.factValue}>
            {trip.accommodation && trip.accommodation.length > 0 ? (
              trip.accommodation.map((hotel, index) => (
                <a
                  key={index}
                  href={hotel.url}
                  className={styles.hotelLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'block' }}
                >
                  {hotel.name}
                  <span aria-hidden="true"> ↗</span>
                </a>
              ))
            ) : (
              <span>{dict.noAccommodation}</span>
            )}
          </dd>
        </div>
      </dl>
    </section>
  )
}