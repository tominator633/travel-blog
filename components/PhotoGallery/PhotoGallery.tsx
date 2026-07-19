'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import type { Photo } from '@/data/trips'
import styles from './PhotoGallery.module.css'

export default function PhotoGallery({ photos }: { photos: Photo[] }) {
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
          <li key={photo.src} className={styles.item}>
            <button
              type="button"
              className={styles.trigger}
              onClick={() => setOpenIndex(i)}
              aria-label={`Open photo: ${photo.alt}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={1200}
                height={800}
                sizes="(max-width: 760px) 100vw, 540px"
                className={styles.img}
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
              <Image
                src={active.src}
                alt={active.alt}
                fill
                sizes="90vw"
                className={styles.stageImg}
                priority
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
