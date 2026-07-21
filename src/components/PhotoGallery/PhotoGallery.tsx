'use client'

import { useCallback, useEffect, useState } from 'react'
import type { CloudinaryPhoto } from '@/src/lib/cloudinary'
import PhotoThumbnail from './PhotoThumbnail/PhotoThumbnail'
import PhotoMobileCard from './PhotoMobileCard/PhotoMobileCard'
import PhotoLightbox from './PhotoLightbox/PhotoLightbox'
import styles from './PhotoGallery.module.css'

interface PhotoGalleryProps {
  photos: CloudinaryPhoto[]
  lang: 'cz' | 'en'
}

export default function PhotoGallery({ photos, lang }: PhotoGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const isOpen = openIndex !== null

  const close = useCallback(() => setOpenIndex(null), [])
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i + 1) % photos.length)),
    [photos.length],
  )
  const prev = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i - 1 + photos.length) % photos.length)),
    [photos.length],
  )

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowRight') next()
      else if (e.key === 'ArrowLeft') prev()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, close, next, prev])

  // Logika rozdělení do sloupců zůstává zde
  const columns3 = [[], [], []] as Array<Array<CloudinaryPhoto & { originalIndex: number }>>
  photos.forEach((photo, i) => columns3[i % 3].push({ ...photo, originalIndex: i }))

  const columns2 = [[], []] as Array<Array<CloudinaryPhoto & { originalIndex: number }>>
  photos.forEach((photo, i) => columns2[i % 2].push({ ...photo, originalIndex: i }))

  const activePhoto = openIndex !== null ? photos[openIndex] : null

  return (
    <>
      {/* Desktop Grid */}
      <div className={`${styles.grid} ${styles.desktopGrid}`}>
        {columns3.map((column, colIdx) => (
          <ul key={`col-3-${colIdx}`} className={styles.column}>
            {column.map((photo) => (
              <li key={photo.publicId} className={styles.item}>
                <PhotoThumbnail
                  photo={photo}
                  lang={lang}
                  onClick={() => setOpenIndex(photo.originalIndex)}
                  sizes="(max-width: 1200px) 33vw"
                />
              </li>
            ))}
          </ul>
        ))}
      </div>

      {/* Tablet Grid */}
      <div className={`${styles.grid} ${styles.tabletGrid}`}>
        {columns2.map((column, colIdx) => (
          <ul key={`col-2-${colIdx}`} className={styles.column}>
            {column.map((photo) => (
              <li key={photo.publicId} className={styles.item}>
                <PhotoThumbnail
                  photo={photo}
                  lang={lang}
                  onClick={() => setOpenIndex(photo.originalIndex)}
                  sizes="(max-width: 920px) 50vw"
                />
              </li>
            ))}
          </ul>
        ))}
      </div>

      {/* Mobile Grid */}
      <ul className={`${styles.grid} ${styles.mobileGrid}`}>
        {photos.map((photo) => (
          <li key={photo.publicId} className={styles.mobileItem}>
            <PhotoMobileCard photo={photo} lang={lang} />
          </li>
        ))}
      </ul>

      {/* Lightbox - Modální okno */}
      {isOpen && activePhoto && (
        <PhotoLightbox
          photo={activePhoto}
          photoIndex={openIndex!}
          totalPhotos={photos.length}
          lang={lang}
          onClose={close}
          onNext={next}
          onPrev={prev}
        />
      )}
    </>
  )
}