import { useRef } from 'react'
import { useLanguage } from '../../i18n/context'
import { certifications, education, experience, languages } from '../../data/experience'
import { MOTION, gsap, revealLines, revealUp, useGSAP } from '../../lib/gsap'
import s from './Experience.module.css'

export default function Experience() {
  const { t, tr } = useLanguage()
  const root = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia(root)
      mm.add(MOTION, () => {
        revealLines('[data-title]')
        // La línea de tiempo se dibuja con el scroll.
        gsap.from('[data-rail]', {
          scaleY: 0,
          ease: 'none',
          scrollTrigger: { trigger: '[data-timeline]', start: 'top 70%', end: 'bottom 60%', scrub: 0.4 },
        })
        gsap.utils.toArray('[data-company]').forEach((block) => {
          revealUp(block.querySelectorAll('[data-item]'), { trigger: block, start: 'top 78%' })
          gsap.from(block.querySelector('[data-node]'), {
            scale: 0,
            duration: 0.6,
            ease: 'back.out(2.5)',
            scrollTrigger: { trigger: block, start: 'top 78%', once: true },
          })
        })
        revealUp('[data-extra]', { trigger: '[data-extras]' })
      })
    },
    { scope: root },
  )

  const extras = [
    { key: 'education', items: education },
    { key: 'certifications', items: certifications },
    { key: 'languages', items: languages },
  ]

  return (
    <section ref={root} id="experience" className="section" aria-labelledby="experience-title">
      <div className="container">
        <h2 id="experience-title" className="h-section" data-title>
          {t('experience.title')}
        </h2>

        <div className={s.timeline} data-timeline>
          <span className={s.rail} data-rail aria-hidden="true" />
          <ol className={s.list}>
          {experience.map(({ company, unit, current, roles }) => (
            <li key={company} className={s.company} data-company>
              <span className={s.node} data-node aria-hidden="true" />
              <div className={s.head} data-item>
                <h3 className={s.companyName}>{company}</h3>
                {current && <p className={s.current}>{t('experience.current')}</p>}
                {unit && <p className={s.unit}>{tr(unit)}</p>}
              </div>
              <ul className={s.roles}>
                {roles.map((role) => (
                  <li key={tr(role.title)} className={s.role} data-item>
                    <div>
                      <h4 className={s.roleTitle}>{tr(role.title)}</h4>
                      {role.bullets && (
                        <ul className={s.bullets}>
                          {tr(role.bullets).map((bullet) => (
                            <li key={bullet}>{bullet}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </li>
          ))}
          </ol>
        </div>

        <div className={s.extras} data-extras>
          {extras.map(({ key, items }) => (
            <div key={key} data-extra>
              <h3 className={s.extraTitle}>{t(`experience.${key}`)}</h3>
              <ul className={s.extraList}>
                {items.map((item) => (
                  <li key={tr(item.title)}>
                    <p className={s.extraName}>{tr(item.title)}</p>
                    <p className={s.extraPlace}>
                      {tr(item.place)}
                      {item.period && <span className="t-meta"> ({tr(item.period)})</span>}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
