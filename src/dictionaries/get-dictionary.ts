import 'server-only' // Zajišťuje, že se slovníky načítají jen na serveru

const dictionaries = {
  cz: () => import('./cz.json').then((module) => module.default),
  en: () => import('./en.json').then((module) => module.default),
}

export const getDictionary = async (locale: 'cz' | 'en') => {
  return dictionaries[locale]?.() ?? dictionaries.cz()
}