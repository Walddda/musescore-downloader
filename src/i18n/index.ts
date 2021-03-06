
import en from './en'
import es from './es'

export interface LOCALE {
  'PROCESSING' (): string;
  'BTN_ERROR' (): string;

  'DEPRECATION_NOTICE' (btnName: string): string;

  'DOWNLOAD' (fileType: string): string;
  'DOWNLOAD_AUDIO' (fileType: string): string;

  'IND_PARTS' (): string;
  'IND_PARTS_TOOLTIP' (): string;

  'FULL_SCORE' (): string;
}

/**
 * type checking only so no missing keys
 */
export function createLocale<OBJ extends LOCALE> (obj: OBJ): OBJ {
  return Object.freeze(obj)
}

const locales = (<L extends { [n: string]: LOCALE } /** type checking */> (l: L) => Object.freeze(l))({
  en,
  es,
})

// detect browser language
const lang = (() => {
  const names = Object.keys(locales)
  const _lang = navigator.languages.find(l => {
    // find the first occurrence of valid languages
    return names.includes(l)
  })
  return _lang || 'en'
})()

export type STR_KEYS = keyof LOCALE
export type ALL_LOCALES = typeof locales
export type LANGS = keyof ALL_LOCALES

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function i18n<K extends STR_KEYS, L extends LANGS = 'en'> (key: K) {
  const locale = locales[lang] as ALL_LOCALES[L]
  return locale[key]
}
