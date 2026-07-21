import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { CloudinaryPhoto } from '@/src/lib/cloudinary'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export const getCaption = (photo: CloudinaryPhoto, lang: 'cz' | 'en') => {
  if (lang === 'cz') {
    return photo.captionCz || photo.captionEn || ''
  }
  return photo.captionEn || photo.captionCz || ''
}

export const getAlt = (photo: CloudinaryPhoto, lang: 'cz' | 'en') => {
  const caption = getCaption(photo, lang)
  return caption || photo.alt
}