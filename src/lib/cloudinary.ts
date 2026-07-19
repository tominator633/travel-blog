import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  secure: true,
})

export interface CloudinaryPhoto {
  src: string
  alt: string
  createdAt: string
  width: number
  height: number
}

function getOptimizedImageUrl(
  publicId: string,
  options: { width?: number; height?: number; crop?: string; quality?: string } = {},
): string {
  const transformation: Array<Record<string, string | number>> = [
    {
      fetch_format: 'auto',
      quality: 'auto',
    },
  ]

  if (options.width) transformation[0].width = options.width
  if (options.height) transformation[0].height = options.height
  if (options.crop) transformation[0].crop = options.crop
  if (options.quality) transformation[0].quality = options.quality

  return cloudinary.url(publicId, {
    secure: true,
    transformation,
  })
}

// 1. PŮVODNÍ FUNKCE: Načte VŠECHNY fotky pro detail výletu (seřazené podle EXIFu)
export async function getPhotosFromFolder(folderId: string): Promise<CloudinaryPhoto[]> {
  try {
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: folderId,
      max_results: 100,
      exif: true,
    })

    const photos: CloudinaryPhoto[] = result.resources.map((resource: any) => ({
      // ZMĚNA: Pouze omezíme max šířku na 1000px, výšku a ořez fill vymažeme, aby zůstal zachován poměr stran
      src: getOptimizedImageUrl(resource.public_id, { width: 1000 }), 
      alt: `Fotka z výletu ${folderId}`,
      createdAt: resource.exif?.DateTimeOriginal || resource.created_at,
      width: resource.width || 1200,
      height: resource.height || 800,
    }))

    return photos.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
  } catch (error) {
    console.error(`Chyba při načítání fotek ze složky ${folderId}:`, error)
    return []
  }
}

// 2. NOVÁ FUNKCE: Načte pouze 4 vybrané fotky pro koláž na homepage pomocí TAGU
export async function getFeaturedPhotosForTrip(folderId: string): Promise<CloudinaryPhoto[]> {
  try {
    // Použijeme Cloudinary Search API, které je pro vyhledávání podle kombinace složky a tagu nejvhodnější
    const result = await cloudinary.search
      .expression(`folder:${folderId} AND tags:featured`)
      .max_results(4)
      .execute()

    return result.resources.map((resource: any) => ({
      src: getOptimizedImageUrl(resource.public_id, { width: 540, height: 360, crop: 'fill' }),
      alt: `Náhledová fotka z výletu ${folderId}`,
      // Search API vrací datum nahrání/vytvoření v poli created_at, pro náhled na homepage nám to bohatě stačí
      createdAt: resource.created_at,
      width: resource.width || 1200,
      height: resource.height || 800,
    }))
  } catch (error) {
    console.error(`Chyba při načítání featured fotek pro ${folderId}:`, error)
    return []
  }
}