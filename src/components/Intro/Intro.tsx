import Image from 'next/image'
import { trips } from '@/src/data/trips'
import styles from './Intro.module.css'

export default function Intro() {
  const tripCount = trips.length
  const countryCount = new Set(trips.map((t) => t.location.split(',').pop()?.trim())).size

  return (
    <section className={styles.intro} id="about" aria-labelledby="intro-heading">
      <div className={styles.text}>
        <p className={styles.eyebrow}>Field notes from the world</p>
        <h1 id="intro-heading" className={styles.heading}>
          I go places
          <br />
          and put it <span className={styles.accent}>here.</span>
        </h1>
        <p className={styles.lede}>
          Hi, I&apos;m Tomas. This is where I keep the photos and stories from my
          trips &mdash; the sunrises I woke up too early for, the food I ate too
          much of, and the roads that didn&apos;t go where I expected. Pick a
          trip below and come along.
        </p>
        <dl className={styles.stats}>
          <div className={styles.stat}>
            <dt className={styles.statLabel}>Trips logged</dt>
            <dd className={styles.statValue}>{tripCount}</dd>
          </div>
          <div className={styles.stat}>
            <dt className={styles.statLabel}>Countries</dt>
            <dd className={styles.statValue}>{countryCount}</dd>
          </div>
          <div className={styles.stat}>
            <dt className={styles.statLabel}>Cameras lost</dt>
            <dd className={styles.statValue}>1</dd>
          </div>
        </dl>
      </div>

      <div className={styles.portrait}>
        <div className={styles.frame}>
          <Image
            src="/images/profile.jpeg"
            alt="Tomas at Angkor Wat"
            fill
            sizes="(max-width: 900px) 80vw, 420px"
            className={styles.photo}
            priority
          />
        </div>
        <span className={styles.badge}>Somewhere</span>
      </div>
    </section>
  )
}
