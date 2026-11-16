import { useCallback, useEffect, useMemo, useState } from 'react'
import { flushSync } from 'react-dom'
import { viewTransition } from '../lib/transition'
import { LanguageContext } from './context'
import es from './es'
import en from './en'

const dictionaries = { es, en }

const lookup = (dict, key) => key.split('.').reduce((node, part) => node?.[part], dict)

export default function LanguageProvider({ children }) {
  // El script inline de index.html ya resolvió el idioma (?lang → localStorage → navegador).
  const [lang, setLangState] = useState(() => (document.documentElement.lang === 'es' ? 'es' : 'en'))

  const setLang = useCallback((next) => {
    try {
      localStorage.setItem('lang', next)
    } catch {
      /* almacenamiento bloqueado: el idioma dura lo que dure la pestaña */
    }
    viewTransition(() => flushSync(() => setLangState(next)))
  }, [])

  useEffect(() => {
    const dict = dictionaries[lang]
    document.documentElement.lang = lang
    document.title = dict.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', dict.meta.description)
    document.querySelector('meta[property="og:locale"]')?.setAttribute('content', lang === 'es' ? 'es_AR' : 'en_US')
  }, [lang])

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t: (key) => lookup(dictionaries[lang], key) ?? key,
      tr: (localized) => (localized && typeof localized === 'object' && 'es' in localized ? localized[lang] : localized),
    }),
    [lang, setLang],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
