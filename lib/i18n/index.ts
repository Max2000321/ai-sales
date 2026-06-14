import { Locale, LandingDict } from './types'
import { uk } from './locales/uk'
import { en } from './locales/en'
import { cz } from './locales/cz'

const dicts: Record<Locale, LandingDict> = { uk, en, cz }

export function getDict(locale: Locale): LandingDict {
  return dicts[locale] ?? dicts['uk']
}

export type { Locale, LandingDict } from './types'
