'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Header.module.css'

export default function Header() {
  const pathname = usePathname()

  // Zjištění aktuálního jazyka z první části URL (např. /cz/trips/... -> "cz")
  const segments = pathname.split('/').filter(Boolean)
  const currentLang = segments[0] === 'en' ? 'en' : 'cz'
  const targetLang = currentLang === 'cz' ? 'en' : 'cz'

  // Vytvoření cílové URL pro přepínač: nahradíme prvotní kód jazyka novým
  const redirectedPathname = () => {
    if (segments.length === 0) return `/${targetLang}`
    const newSegments = [...segments]
    newSegments[0] = targetLang
    return `/${newSegments.join('/')}`
  }

  // Tlačítko zpět se zobrazí v detailu výletu (např. /cz/trips/italy-2026)
  const isTripRoute = segments.includes('trips') && segments.length > 2

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {/* Tlačítko zpět (respektuje aktuální jazyk) */}
        {isTripRoute && (
          <Link
            href={`/${currentLang}`}
            className={styles.backButton}
            aria-label={currentLang === 'cz' ? 'Zpět na přehled výletů' : 'Back to all trips'}
          >
            <span className={styles.arrow} aria-hidden="true">&#8592;</span>
            <span className={styles.backText}>
              {currentLang === 'cz' ? 'Všechny cesty' : 'All Trips'}
            </span>
          </Link>
        )}

        {/* Logo (respektuje aktuální jazyk) */}
        <Link href={`/${currentLang}`} className={styles.brand} aria-label="T-Rex on the go, home">
          <p className={styles.name}>
            T-REX
            <span className={styles.nameSpan}>ON THE GO</span>
          </p>
        </Link>

        {/* Přepínač jazyka (zarovnaný doprava) */}
        <div className={styles.langToggle}>
          <Link
            href={redirectedPathname()}
            className={`${styles.langOption} ${currentLang === 'cz' ? styles.active : ''}`}
          >
            CZ
          </Link>
          <span className={styles.langDivider}>/</span>
          <Link
            href={redirectedPathname()}
            className={`${styles.langOption} ${currentLang === 'en' ? styles.active : ''}`}
          >
            EN
          </Link>
        </div>
      </div>
    </header>
  )
}