import Link from 'next/link'
import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand} aria-label="Wanderlines, home">
          <span className={styles.mark} aria-hidden="true" />
          <span className={styles.name}>T-REX ON THE GO</span>
        </Link>
        <nav className={styles.nav} aria-label="Primary">
          <Link href="/" className={styles.link}>
            Trips
          </Link>
          <a href="#about" className={styles.link}>
            About
          </a>
        </nav>
      </div>
    </header>
  )
}
