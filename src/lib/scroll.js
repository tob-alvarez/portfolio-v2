import Lenis from 'lenis'
import { gsap, ScrollTrigger } from './gsap'

let lenis = null
const tick = (time) => lenis?.raf(time * 1000)

/** Scroll suave sincronizado con ScrollTrigger. Una sola instancia. */
export function startLenis() {
  if (lenis) return lenis
  lenis = new Lenis({ lerp: 0.1, anchors: true })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)
  return lenis
}

export function stopLenis() {
  if (!lenis) return
  gsap.ticker.remove(tick)
  lenis.destroy()
  lenis = null
}

export const getLenis = () => lenis

/** Bloquea el scroll de la página mientras hay un overlay abierto. */
export function lockScroll(locked) {
  if (lenis) locked ? lenis.stop() : lenis.start()
  document.documentElement.style.overflow = locked ? 'hidden' : ''
}
