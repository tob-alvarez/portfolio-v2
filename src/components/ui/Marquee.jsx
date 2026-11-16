import { useRef } from 'react'
import { marquee } from '../../data/site'
import { MOTION, ScrollTrigger, gsap, useGSAP } from '../../lib/gsap'
import s from './Marquee.module.css'

/** Cinta de tecnologías. Se acelera y cambia de sentido con la velocidad del scroll. */
export default function Marquee() {
  const root = useRef(null)
  const track = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION, () => {
        const loop = gsap.to(track.current, { xPercent: -50, duration: 38, ease: 'none', repeat: -1 })
        // Arranca lejos del inicio para poder correr hacia atrás sin frenarse en 0.
        loop.totalTime(loop.duration() * 100)
        const settle = gsap.quickTo(loop, 'timeScale', { duration: 0.6, ease: 'power2.out' })
        let rest
        const trigger = ScrollTrigger.create({
          trigger: root.current,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: (self) => {
            const direction = self.direction < 0 ? -1 : 1
            const boost = gsap.utils.clamp(-6, 6, self.getVelocity() / 300)
            settle(Math.abs(boost) > 1 ? boost : direction)
            rest?.kill()
            rest = gsap.delayedCall(0.2, () => settle(direction))
          },
        })
        return () => {
          rest?.kill()
          trigger.kill()
        }
      })
    },
    { scope: root },
  )

  // Dos copias para que el loop no tenga costura; la segunda es decorativa.
  return (
    <div ref={root} className={s.marquee}>
      <div ref={track} className={s.track}>
        {[0, 1].map((copy) => (
          <ul key={copy} className={s.list} aria-hidden={copy === 1 || undefined}>
            {marquee.map((item) => (
              <li key={item} className={s.item}>
                {item}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
