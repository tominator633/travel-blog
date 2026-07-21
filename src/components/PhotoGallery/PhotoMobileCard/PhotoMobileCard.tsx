'use client'

import { CldImage } from 'next-cloudinary'
import type { CloudinaryPhoto } from '@/src/lib/cloudinary'
import { getCaption, getAlt } from '@/src/lib/utils'
import styles from './PhotoMobileCard.module.css'

interface PhotoMobileCardProps {
  photo: CloudinaryPhoto
  lang: 'cz' | 'en'
}

export default function PhotoMobileCard({ photo, lang }: PhotoMobileCardProps) {
  const caption = getCaption(photo, lang)
  const alt = getAlt(photo, lang)

  return (
    <div className={styles.mobileCard}>
      <CldImage
        src={photo.publicId}
        alt={alt}
        width={1080}
        height={Math.round((1080 / photo.width) * photo.height)}
        sizes="100vw"
        className={styles.mobileImg}
        loading="lazy"
        quality="85"
      />
      {caption && <div className={styles.mobileCaption}>{caption}</div>}
    </div>
  )
}