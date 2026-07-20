'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Header.module.css'

export default function Header() {
  const pathname = usePathname()

  // Tlačítko se zobrazí, pokud jsme v detailu jakéhokoliv výletu (cesta začíná na /trips/ a není to čistý seznam)
  const isTripRoute = pathname.startsWith('/trips/') && pathname !== '/trips'

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        
        {isTripRoute && (
          <Link 
            href="/" 
            className={styles.backButton}
            aria-label="Zpět na přehled výletů"
          >
            <span className={styles.arrow} aria-hidden="true">&#8592;</span>
            <span className={styles.backText}>All Trips</span>
          </Link>
        )}

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