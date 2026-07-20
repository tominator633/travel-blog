'use client'

import { useCallback, useEffect, useState } from 'react'
import { CldImage } from 'next-cloudinary'
import type { CloudinaryPhoto } from '@/src/lib/cloudinary'
import styles from './PhotoGallery.module.css'

export default function PhotoGallery({ photos }: { photos: CloudinaryPhoto[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const isOpen = openIndex !== null

  const close = useCallback(() => setOpenIndex(null), [])
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i + 1) % photos.length)),
    [photos.length],
  )
  const prev = useCallback(
    () =>
      setOpenIndex((i) =>
        i === null ? i : (i - 1 + photos.length) % photos.length,
      ),
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

  // Rozdělení fotek do 3 sloupců pro velké obrazovky (Zleva doprava)
  const columns3: Array<Array<CloudinaryPhoto & { originalIndex: number }>> = [[], [], []]
  photos.forEach((photo, i) => {
    columns3[i % 3].push({ ...photo, originalIndex: i })
  })

  // Rozdělení fotek do 2 sloupců pro tablety
  const columns2: Array<Array<CloudinaryPhoto & { originalIndex: number }>> = [[], []]
  photos.forEach((photo, i) => {
    columns2[i % 2].push({ ...photo, originalIndex: i })
  })

  const active = openIndex !== null ? photos[openIndex] : null

  return (
    <>
      {/* Mřížka pro desktop (3 sloupce) */}
      <div className={`${styles.grid} ${styles.desktopGrid}`}>
        {columns3.map((column, colIdx) => (
          <ul key={`col-3-${colIdx}`} className={styles.column}>
            {column.map((photo) => (
              <li key={photo.publicId} className={styles.item}>
                <button
                  type="button"
                  className={styles.trigger}
                  onClick={() => setOpenIndex(photo.originalIndex)}
                  aria-label={`Open photo: ${photo.alt}`}
                >
                  <CldImage
                    src={photo.publicId}
                    alt={photo.alt}
                    width={1000}
                    height={Math.round((1000 / photo.width) * photo.height)}
                    sizes="(max-width: 1200px) 33vw"
                    className={styles.img}
                    loading="lazy"
                  />
                  {photo.caption && (
                    <span className={styles.caption}>{photo.caption}</span>
                  )}
                  <span className={styles.expand} aria-hidden="true">
                    View
                  </span>
                </button>
              </li>
            ))}
          </ul>
        ))}
      </div>

      {/* Mřížka pro tablety (2 sloupce) */}
      <div className={`${styles.grid} ${styles.tabletGrid}`}>
        {columns2.map((column, colIdx) => (
          <ul key={`col-2-${colIdx}`} className={styles.column}>
            {column.map((photo) => (
              <li key={photo.publicId} className={styles.item}>
                <button
                  type="button"
                  className={styles.trigger}
                  onClick={() => setOpenIndex(photo.originalIndex)}
                  aria-label={`Open photo: ${photo.alt}`}
                >
                  <CldImage
                    src={photo.publicId}
                    alt={photo.alt}
                    width={1000}
                    height={Math.round((1000 / photo.width) * photo.height)}
                    sizes="(max-width: 920px) 50vw"
                    className={styles.img}
                    loading="lazy"
                  />
                  {photo.caption && (
                    <span className={styles.caption}>{photo.caption}</span>
                  )}
                  <span className={styles.expand} aria-hidden="true">
                    View
                  </span>
                </button>
              </li>
            ))}
          </ul>
        ))}
      </div>

      {/* Mřížka pro mobily (1 sloupec - Lightbox VYPNUT, bez buttonu, captions přímo pod fotkou) */}
      <ul className={`${styles.grid} ${styles.mobileGrid}`}>
        {photos.map((photo) => (
          <li key={photo.publicId} className={styles.mobileItem}>
            <div className={styles.mobileCard}>
              <CldImage
                src={photo.publicId}
                alt={photo.alt}
                width={1080} // Vyšší šířka pro ideální ostrost na mobilních Retina displejích
                height={Math.round((1080 / photo.width) * photo.height)}
                sizes="100vw"
                className={styles.mobileImg}
                priority={false}
                loading="lazy"
                quality="85" // Vyšší kvalita přímo v gridu na mobilu
              />
              {photo.caption && (
                <div className={styles.mobileCaption}>
                  {photo.caption}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* Lightbox Modál (Zůstává funkční pro desktop/tablet) */}
      {isOpen && active && (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
          onClick={close}
        >
          <button
            type="button"
            className={`${styles.close} ${styles.control}`}
            onClick={close}
            aria-label="Close"
          >
            &times;
          </button>

          {photos.length > 1 && (
            <button
              type="button"
              className={`${styles.prev} ${styles.control}`}
              onClick={(e) => {
                e.stopPropagation()
                prev()
              }}
              aria-label="Previous photo"
            >
              &#8249;
            </button>
          )}

          <figure
            className={styles.stage}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.stageImgWrap}>
              <CldImage
                src={active.publicId}
                alt={active.alt}
                fill
                sizes="90vw"
                className={styles.stageImg}
                priority
                quality="85" 
                crop="fit"
              />
            </div>
            <figcaption className={styles.stageCaption}>
              <span>{active.caption ?? active.alt}</span>
              <span className={styles.counter}>
                {openIndex! + 1} / {photos.length}
              </span>
            </figcaption>
          </figure>

          {photos.length > 1 && (
            <button
              type="button"
              className={`${styles.next} ${styles.control}`}
              onClick={(e) => {
                e.stopPropagation()
                next()
              }}
              aria-label="Next photo"
            >
              &#8250;
            </button>
          )}
        </div>
      )}
    </>
  )
}