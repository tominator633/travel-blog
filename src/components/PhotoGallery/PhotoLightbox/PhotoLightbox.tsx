'use client'

import { CldImage } from 'next-cloudinary'
import type { CloudinaryPhoto } from '@/src/lib/cloudinary'
import { getCaption, getAlt } from '@/src/lib/utils' 
import styles from './PhotoLightbox.module.css'

interface PhotoLightboxProps {
  photo: CloudinaryPhoto
  photoIndex: number
  totalPhotos: number
  lang: 'cz' | 'en'
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}

export default function PhotoLightbox({
  photo,
  photoIndex,
  totalPhotos,
  lang,
  onClose,
  onNext,
  onPrev,
}: PhotoLightboxProps) {
  const alt = getAlt(photo, lang)
  const caption = getCaption(photo, lang)

  return (
    <div
      className={styles.lightbox}
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={onClose}
    >
      <button
        type="button"
        className={`${styles.close} ${styles.control}`}
        onClick={onClose}
        aria-label={lang === 'cz' ? 'Zavřít' : 'Close'}
      >
        &times;
      </button>

      {totalPhotos > 1 && (
        <button
          type="button"
          className={`${styles.prev} ${styles.control}`}
          onClick={(e) => {
            e.stopPropagation()
            onPrev()
          }}
          aria-label={lang === 'cz' ? 'Předchozí fotka' : 'Previous photo'}
        >
          &#8249;
        </button>
      )}

      <figure className={styles.stage} onClick={(e) => e.stopPropagation()}>
        <div className={styles.stageImgWrap}>
          <CldImage
            src={photo.publicId}
            alt={alt}
            fill
            sizes="90vw"
            className={styles.stageImg}
            priority
            quality="85"
            crop="fit"
          />
        </div>
        <figcaption className={styles.stageCaption}>
          <span>{caption || alt}</span>
          <span className={styles.counter}>
            {photoIndex + 1} / {totalPhotos}
          </span>
        </figcaption>
      </figure>

      {totalPhotos > 1 && (
        <button
          type="button"
          className={`${styles.next} ${styles.control}`}
          onClick={(e) => {
            e.stopPropagation()
            onNext()
          }}
          aria-label={lang === 'cz' ? 'Další fotka' : 'Next photo'}
        >
          &#8250;
        </button>
      )}
    </div>
  )
}