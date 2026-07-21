import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import TripIntro from '@/src/components/TripIntro/TripIntro'
import PhotoGallery from '@/src/components/PhotoGallery/PhotoGallery'
import { getTrip, trips } from '@/src/data/trips'
import { getPhotosFromFolder } from '@/src/lib/cloudinary'
import { getDictionary } from '@/src/dictionaries/get-dictionary'
import styles from './page.module.css'

interface PageParams {
  lang: 'cz' | 'en'
  id: string
}

interface PageProps {
  params: Promise<PageParams> | PageParams
}

// Generování kombinací pro všechny jazyky a výlety
export async function generateStaticParams() {
  const languages: Array<'cz' | 'en'> = ['cz', 'en']

  return languages.flatMap((lang) =>
    trips.map((trip) => ({
      lang,
      id: trip.id,
    }))
  )
}

// Dynamická metadata přizpůsobená jazyku
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params
  const lang = resolvedParams.lang || 'cz'
  const trip = getTrip(resolvedParams.id)

  if (!trip) {
    return {
      title: lang === 'cz' ? 'Výlet nenalezen — T-Rex' : 'Trip not found — T-Rex',
    }
  }

  const summary = trip.summary[lang] || trip.summary.en
  const cloudinaryPhotos = await getPhotosFromFolder(trip.cloudinaryFolder)
  const coverImage = cloudinaryPhotos[0]?.src || ''

  return {
    title: `${trip.title} — T-Rex`,
    description: summary,
    openGraph: {
      title: `${trip.title} — T-Rex`,
      description: summary,
      images: coverImage ? [{ url: coverImage }] : [],
    },
  }
}

export default async function TripPage({ params }: PageProps) {
  const resolvedParams = await params
  const lang = resolvedParams.lang || 'cz'
  const trip = getTrip(resolvedParams.id)

  if (!trip) notFound()

  // Načtení slovníku pro daný jazyk
  const dict = await getDictionary(lang)

  // Voláme načtení fotek podle složky výletu
  const cloudinaryPhotos = await getPhotosFromFolder(trip.cloudinaryFolder)

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <TripIntro trip={trip} lang={lang} dict={dict.tripIntro} />

        <section aria-label="Photos" className={styles.gallery}>
          {cloudinaryPhotos.length > 0 ? (
            <PhotoGallery photos={cloudinaryPhotos} lang={lang} />
          ) : (
            <p className={styles.noPhotos}>
              {lang === 'cz'
                ? 'Zatím tu nejsou žádné fotky z cest.'
                : 'No photos found for this trip yet.'}
            </p>
          )}
        </section>
      </div>
    </main>
  )
}