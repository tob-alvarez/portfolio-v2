import { useRef } from 'react'
import { FINE, gsap, useGSAP } from '../../lib/gsap'
import s from './Cursor.module.css'

/** Anillo que acompaña al cursor nativo (no lo reemplaza). `data-cursor="Texto"` lo convierte en etiqueta. */
export default function Cursor() {
  const ring = useRef(null)
  const label = useRef(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(FINE, () => {
      const el = ring.current
      gsap.set(el, { xPercent: -50, yPercent: -50, autoAlpha: 0 })
      const xTo = gsap.quickTo(el, 'x', { duration: 0.35, ease: 'power3.out' })
      const yTo = gsap.quickTo(el, 'y', { duration: 0.35, ease: 'power3.out' })

      const move = (e) => {
        xTo(e.clientX)
        yTo(e.clientY)
        gsap.to(el, { autoAlpha: 1, duration: 0.2, overwrite: 'auto' })
      }
      const over = (e) => {
        const tagged = e.target.closest?.('[data-cursor]')
        const interactive = e.target.closest?.('a, button, summary')
        label.current.textContent = tagged?.dataset.cursor ?? ''
        el.dataset.state = tagged ? 'label' : interactive ? 'active' : 'idle'
      }
      const out = () => gsap.to(el, { autoAlpha: 0, duration: 0.2, overwrite: 'auto' })

      addEventListener('pointermove', move, { passive: true })
      addEventListener('pointerover', over, { passive: true })
      document.documentElement.addEventListener('pointerleave', out)
      return () => {
        removeEventListener('pointermove', move)
        removeEventListener('pointerover', over)
        document.documentElement.removeEventListener('pointerleave', out)
      }
    })
  })

  return (
    <div ref={ring} className={s.ring} data-state="idle" aria-hidden="true">
      <span ref={label} className={s.label} />
    </div>
  )
}
