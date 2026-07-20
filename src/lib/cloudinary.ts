import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  secure: true,
})

// Veřejné rozhraní pro komponenty aplikující CldImage
export interface CloudinaryPhoto {
  publicId: string
  src: string 
  alt: string
  createdAt: string
  width: number
  height: number
  caption?: string
}

// Pomocná funkce pro generování fallback URL adres
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

// 1. UPRAVENÁ FUNKCE: Načte fotky a seřadí je abecedně/numericky podle display_name (např. IMG_0645)
export async function getPhotosFromFolder(folderId: string): Promise<CloudinaryPhoto[]> {
  try {
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: folderId,
      max_results: 100,
    })

    console.log(result);

    const photos: CloudinaryPhoto[] = result.resources.map((resource: any) => {
      return {
        publicId: resource.public_id,
        src: getOptimizedImageUrl(resource.public_id, { width: 1000 }),
        alt: `Fotka z výletu ${folderId}`,
        createdAt: resource.created_at,
        width: resource.width || 1200,
        height: resource.height || 800,
        caption: resource.context?.custom?.caption,
        // Dočasně si uložíme display_name, abychom podle něj mohli seřadit, ale nerozbili rozhraní
        _displayName: resource.display_name || '' 
      }
    })

    // Řadíme numericky vzestupně podle původního názvu souboru (IMG_0645 atd.)
    photos.sort((a: any, b: any) => 
      a._displayName.localeCompare(b._displayName, undefined, { numeric: true, sensitivity: 'base' })
    )

    // Odstraníme pomocnou vlastnost _displayName před vrácením
    return photos.map(({ _displayName, ...cleanPhoto }: any) => cleanPhoto)
  } catch (error) {
    console.error(`Chyba při načítání fotek ze složky ${folderId}:`, error)
    return []
  }
}

// 2. FUNKCE PRO HOMEPAGE: Stejná úprava pro řazení podle display_name u vybraných fotek
export async function getFeaturedPhotosForTrip(folderId: string): Promise<CloudinaryPhoto[]> {
  try {
    const result = await cloudinary.search
      .expression(`folder:${folderId} AND tags:featured`)
      .max_results(4)
      .execute()

    const photos = result.resources.map((resource: any) => ({
      publicId: resource.public_id,
      src: getOptimizedImageUrl(resource.public_id, { width: 540, height: 360, crop: 'fill' }),
      alt: `Náhledová fotka z výletu ${folderId}`,
      createdAt: resource.created_at,
      width: resource.width || 1200,
      height: resource.height || 800,
      _displayName: resource.display_name || ''
    }))

    photos.sort((a: any, b: any) => 
      a._displayName.localeCompare(b._displayName, undefined, { numeric: true, sensitivity: 'base' })
    )

    return photos.map(({ _displayName, ...cleanPhoto }: any) => cleanPhoto)
  } catch (error) {
    console.error(`Chyba při načítání featured fotek pro ${folderId}:`, error)
    return []
  }
}