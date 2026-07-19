import Link from 'next/link'
import styles from './Footer.module.css'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <Link href="/" className={styles.brand}>
            Wanderlines
          </Link>
          <p className={styles.tagline}>
            Field notes and photos from the road.
          </p>
        </div>
        <p className={styles.copy}>
          &copy; {year} Wanderlines. All photos are my own.
        </p>
      </div>
    </footer>
  )
}
