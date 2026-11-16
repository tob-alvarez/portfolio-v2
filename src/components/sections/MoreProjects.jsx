import { useRef } from 'react'
import { useLanguage } from '../../i18n/context'
import { moreProjects } from '../../data/projects'
import { MOTION, gsap, revealLines, revealUp, useGSAP } from '../../lib/gsap'
import s from './MoreProjects.module.css'

export default function MoreProjects() {
  const { t, tr } = useLanguage()
  const root = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia(root)
      mm.add(MOTION, () => {
        revealLines('[data-title]')
        revealUp('[data-intro]', { delay: 0.15 })
        gsap.from('[data-row]', {
          y: 32,
          autoAlpha: 0,
          duration: 0.8,
          stagger: 0.06,
          scrollTrigger: { trigger: '[data-list]', start: 'top 82%', once: true },
        })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="more" className="section" aria-labelledby="more-title">
      <div className="container">
        <h2 id="more-title" className="h-section" data-title>
          {t('more.title')}
        </h2>
        <p className={`t-lead ${s.intro}`} data-intro>
          {t('more.intro')}
        </p>
        {/* `name` compartido: abrir una fila cierra la anterior, sin JS. */}
        <div className={s.list} data-list>
          {moreProjects.map(({ name, stack, text }, i) => (
            <details key={name} className={s.row} name="more-projects" data-row open={i === 0}>
              <summary className={s.summary}>
                <h3 className={s.name}>{name}</h3>
                <span className={s.mark} aria-hidden="true" />
              </summary>
              <div className={s.body}>
                <p>{tr(text)}</p>
                <p className="t-meta">{stack.join(', ')}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
