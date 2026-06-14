export type PhoneLocale = 'uk' | 'en' | 'cz'

export const PHONE_CONFIG: Record<PhoneLocale, {
  prefix: string
  placeholder: string
  regex: RegExp
  hint: string
}> = {
  uk: {
    prefix: '+380',
    placeholder: '+380 XX XXX XXXX',
    regex: /^\+380\s?\d{2}\s?\d{3}\s?\d{4}$/,
    hint: 'Формат: +380 XX XXX XXXX',
  },
  cz: {
    prefix: '+420',
    placeholder: '+420 XXX XXX XXX',
    regex: /^\+420\s?\d{3}\s?\d{3}\s?\d{3}$/,
    hint: 'Formát: +420 XXX XXX XXX',
  },
  en: {
    prefix: '',
    placeholder: '+X XXX XXX XXXX',
    regex: /^\+\d{1,3}\s?\d{3,14}$/,
    hint: 'International format: +X XXX XXX XXXX',
  },
}

export function validatePhone(value: string, locale: PhoneLocale): boolean {
  const cleaned = value.replace(/\s/g, '')
  return PHONE_CONFIG[locale].regex.test(value) ||
         PHONE_CONFIG[locale].regex.test(cleaned)
}

/** Resolve the phone locale from the current pathname (per spec). */
export function localeFromPathname(pathname: string): PhoneLocale {
  if (pathname.startsWith('/cz')) return 'cz'
  if (pathname.startsWith('/en')) return 'en'
  return 'uk'
}
