import { useRef } from 'react'
import { useLanguage } from '../../i18n/context'
import { skills } from '../../data/skills'
import { MOTION, gsap, revealLines, useGSAP } from '../../lib/gsap'
import s from './Stack.module.css'

export default function Stack() {
  const { t, tr } = useLanguage()
  const root = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia(root)
      mm.add(MOTION, () => {
        revealLines('[data-title]')
        gsap.utils.toArray('[data-group]').forEach((group) => {
          gsap.from(group.querySelectorAll('[data-skill]'), {
            yPercent: 60,
            autoAlpha: 0,
            duration: 0.7,
            stagger: 0.03,
            scrollTrigger: { trigger: group, start: 'top 86%', once: true },
          })
        })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="stack" className="section" aria-labelledby="stack-title">
      <div className="container">
        <h2 id="stack-title" className="h-section" data-title>
          {t('stack.title')}
        </h2>
        <dl className={s.groups}>
          {skills.map(({ group, items }) => (
            <div key={tr(group)} className={s.group} data-group>
              <dt className={s.groupName}>{tr(group)}</dt>
              <dd>
                <ul className={s.items}>
                  {items.map((item) => (
                    <li key={tr(item)} className={s.item} data-skill>
                      {tr(item)}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
