'use client'

import { CldImage } from 'next-cloudinary'
import type { CloudinaryPhoto } from '@/src/lib/cloudinary'
import { getCaption, getAlt } from '@/src/lib/utils' // Helper funkce vytáhneme bokem
import styles from './PhotoThumbnail.module.css'

interface PhotoThumbnailProps {
  photo: CloudinaryPhoto
  lang: 'cz' | 'en'
  onClick: () => void
  sizes: string
}

export default function PhotoThumbnail({ photo, lang, onClick, sizes }: PhotoThumbnailProps) {
  const caption = getCaption(photo, lang)
  const alt = getAlt(photo, lang)

  return (
    <button
      type="button"
      className={styles.trigger}
      onClick={onClick}
      aria-label={`${lang === 'cz' ? 'Otevřít fotku' : 'Open photo'}: ${alt}`}
    >
      <CldImage
        src={photo.publicId}
        alt={alt}
        width={1000}
        height={Math.round((1000 / photo.width) * photo.height)}
        sizes={sizes}
        className={styles.img}
        loading="lazy"
      />
      {caption && <span className={styles.caption}>{caption}</span>}
      <span className={styles.expand} aria-hidden="true">
        {lang === 'cz' ? 'Zobrazit' : 'View'}
      </span>
    </button>
  )
}