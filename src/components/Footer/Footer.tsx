import Link from 'next/link'
import styles from './Footer.module.css'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <Link href="/" className={styles.brand}>
            T-REX ON THE GO
          </Link>
          <p className={styles.tagline}>
            Field notes and photos from the world.
          </p>
        </div>
        <p className={styles.copy}>
          &copy; {year} T-REX ON THE GO. All photos are my own.
        </p>
      </div>
    </footer>
  )
}
