import Link from 'next/link'
import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand} aria-label="Wanderlines, home">
          
          <p className={styles.name}>
            T-REX
            <span className={styles.nameSpan}>ON THE GO</span>
          </p>
        </Link>
  
      </div>
    </header>
  )
}
