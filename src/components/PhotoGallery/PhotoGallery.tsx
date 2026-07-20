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

  const active = openIndex !== null ? photos[openIndex] : null

  return (
    <>
      <ul className={styles.grid}>
        {photos.map((photo, i) => (
          <li key={photo.publicId} className={styles.item}>
            <button
              type="button"
              className={styles.trigger}
              onClick={() => setOpenIndex(i)}
              aria-label={`Open photo: ${photo.alt}`}
            >
              <CldImage
                src={photo.publicId} // CldImage bere přímo public_id
                alt={photo.alt}
                width={1000}        // Maximální šířka pro grid náhled
                height={Math.round((1000 / photo.width) * photo.height)} // Zachování poměru stran
                sizes="(max-width: 760px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                // Zde definujeme kvalitnější transformaci pro Lightbox naprosto čistě:
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