import { useCallback, useEffect, useState } from 'react'
import { flushSync } from 'react-dom'
import { projects } from '../data/projects'
import { viewTransition } from '../lib/transition'

const slugFromHash = () => {
  const slug = location.hash.match(/^#work\/([\w-]+)$/)?.[1]
  return projects.some((p) => p.slug === slug) ? slug : null
}

/** Caso de estudio abierto, enlazable como `#work/<slug>` y cerrable con Atrás. */
export default function useCaseRoute() {
  const [slug, setSlug] = useState(slugFromHash)

  useEffect(() => {
    const sync = () => viewTransition(() => flushSync(() => setSlug(slugFromHash())))
    addEventListener('popstate', sync)
    return () => removeEventListener('popstate', sync)
  }, [])

  // `shot` es la captura de la tarjeta: se convierte en la cabecera del caso.
  const open = useCallback((next, shot) => {
    if (shot) shot.style.viewTransitionName = 'case-shot'
    viewTransition(() => {
      if (shot) shot.style.viewTransitionName = ''
      flushSync(() => setSlug(next))
    })
    history.pushState({ caseOpen: true }, '', `#work/${next}`)
  }, [])

  const close = useCallback(() => {
    if (history.state?.caseOpen) {
      history.back()
      return
    }
    // Se entró directo por URL: no hay entrada previa a la que volver.
    history.replaceState(null, '', location.pathname + location.search + '#work')
    viewTransition(() => flushSync(() => setSlug(null)))
  }, [])

  return { slug, open, close }
}
