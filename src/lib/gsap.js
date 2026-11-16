import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'

// Único punto de registro de plugins.
gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)
gsap.defaults({ ease: 'expo.out', duration: 0.9 })

// Condiciones de gsap.matchMedia() que comparten todas las secciones.
export const MOTION = '(prefers-reduced-motion: no-preference)'
export const DESKTOP = '(prefers-reduced-motion: no-preference) and (min-width: 1024px)'
export const FINE = '(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)'

/** Título que sube línea por línea detrás de una máscara. */
export function revealLines(target, { delay = 0, start = 'top 85%', trigger } = {}) {
  // toArray respeta el scope del contexto activo; SplitText con un string buscaría en todo el documento.
  const [el] = gsap.utils.toArray(target)
  if (!el) return null
  return SplitText.create(el, {
    type: 'lines',
    mask: 'lines',
    autoSplit: true,
    onSplit: (self) =>
      gsap.from(self.lines, {
        yPercent: 115,
        duration: 1,
        stagger: 0.09,
        delay,
        scrollTrigger: { trigger: trigger ?? el, start, once: true },
      }),
  })
}

/** Entrada corta para bloques que acompañan a un título. */
export function revealUp(targets, { delay = 0, start = 'top 85%', trigger, stagger = 0.07 } = {}) {
  const list = gsap.utils.toArray(targets)
  if (!list.length) return null
  return gsap.from(list, {
    y: 28,
    autoAlpha: 0,
    duration: 0.8,
    stagger,
    delay,
    scrollTrigger: { trigger: trigger ?? list[0], start, once: true },
  })
}

export { gsap, ScrollTrigger, SplitText, useGSAP }
