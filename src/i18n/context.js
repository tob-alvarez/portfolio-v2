import { createContext, useContext } from 'react'

export const LanguageContext = createContext(null)

/** `t('nav.work')` para textos de interfaz; `tr({ es, en })` para contenido de los data files. */
export const useLanguage = () => useContext(LanguageContext)
