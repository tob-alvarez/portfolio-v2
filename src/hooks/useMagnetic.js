import { FINE, gsap, useGSAP } from '../lib/gsap'

/** El elemento se deja atraer por el cursor. Solo con mouse y con movimiento habilitado. */
export default function useMagnetic(ref, strength = 0.3) {
  useGSAP(() => {
    const el = ref.current
    if (!el) return
    const mm = gsap.matchMedia()
    mm.add(FINE, () => {
      const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' })
      const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' })
      const move = (e) => {
        const box = el.getBoundingClientRect()
        xTo((e.clientX - box.left - box.width / 2) * strength)
        yTo((e.clientY - box.top - box.height / 2) * strength)
      }
      const leave = () => {
        xTo(0)
        yTo(0)
      }
      el.addEventListener('pointermove', move)
      el.addEventListener('pointerleave', leave)
      return () => {
        el.removeEventListener('pointermove', move)
        el.removeEventListener('pointerleave', leave)
      }
    })
  })
}
