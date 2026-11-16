import { useRef } from 'react'
import { useLanguage } from '../../i18n/context'
import { projects } from '../../data/projects'
import { MOTION, gsap, revealLines, revealUp, useGSAP } from '../../lib/gsap'
import Button from '../ui/Button.jsx'
import Picture from '../ui/Picture.jsx'
import s from './Work.module.css'

// Las tarjetas se apilan solo si hay ancho y alto para que entren completas.
const STACKED = `${MOTION} and (min-width: 1100px) and (min-height: 760px)`

function WorkCard({ project, index, onOpen }) {
  const { t, tr } = useLanguage()
  const shot = useRef(null)
  const open = () => onOpen(project.slug, shot.current)

  return (
    <article className={s.card} data-card style={{ '--accent': project.accent, '--i': index }}>
      <div className={s.inner} data-inner>
        <div className={s.copy}>
          <h3 className={s.title}>{project.title}</h3>
          <p className={s.tagline}>{tr(project.tagline)}</p>
          <dl className={s.facts}>
            <div>
              <dt>{t('work.role')}</dt>
              <dd>{tr(project.role)}</dd>
            </div>
          </dl>
          <ul className={s.bullets}>
            {tr(project.bullets).map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
          <ul className={s.chips} aria-label={t('case.stack')}>
            {project.stack.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
          <div className={s.actions}>
            <Button onClick={open}>{t('work.open')}</Button>
            {project.live ? (
              <Button href={project.live} variant="ghost" icon="external" external>
                {t('work.visit')}
              </Button>
            ) : (
              <p className={s.status}>{tr(project.status)}</p>
            )}
          </div>
        </div>

        {/* Atajo para mouse; el control accesible es el botón "Ver caso". */}
        <div className={s.visual} onClick={open} data-cursor={t('work.cursor')}>
          <span className={s.glow} aria-hidden="true" />
          <div ref={shot} className={s.shot} data-shot>
            <Picture name={project.cover.name} alt={tr(project.cover.alt)} sizes="(min-width: 1100px) 55vw, 92vw" />
          </div>
        </div>
        <span className={s.dim} data-dim aria-hidden="true" />
      </div>
    </article>
  )
}

export default function Work({ onOpen }) {
  const { t } = useLanguage()
  const root = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia(root)
      mm.add(MOTION, () => {
        revealLines('[data-title]')
        revealUp('[data-intro]', { delay: 0.15 })
        gsap.utils.toArray('[data-card]').forEach((card) => {
          const shot = card.querySelector('[data-shot]')
          gsap.from(shot, {
            clipPath: 'inset(14% 10% 14% 10% round 24px)',
            duration: 1.3,
            ease: 'power4.out',
            scrollTrigger: { trigger: card, start: 'top 78%', once: true },
          })
          gsap.fromTo(
            shot.querySelector('img'),
            { yPercent: -2.5, scale: 1.06 },
            { yPercent: 2.5, scale: 1.06, ease: 'none', scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true } },
          )
        })
      })
      mm.add(STACKED, () => {
        const cards = gsap.utils.toArray('[data-card]')
        cards.forEach((card, i) => {
          const next = cards[i + 1]
          if (!next) return
          // La tarjeta que queda debajo se achica y se apaga mientras la siguiente la tapa.
          const cover = { trigger: next, start: 'top bottom', end: 'top 15%', scrub: true }
          gsap.to(card.querySelector('[data-inner]'), { scale: 0.93, ease: 'none', scrollTrigger: cover })
          gsap.to(card.querySelector('[data-dim]'), { opacity: 0.7, ease: 'none', scrollTrigger: cover })
        })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="work" className="section" aria-labelledby="work-title">
      <div className="container">
        <h2 id="work-title" className="h-section" data-title>
          {t('work.title')}
        </h2>
        <p className={`t-lead ${s.intro}`} data-intro>
          {t('work.intro')}
        </p>
        <div className={s.cards}>
          {projects.map((project, i) => (
            <WorkCard key={project.slug} project={project} index={i} onOpen={onOpen} />
          ))}
        </div>
      </div>
    </section>
  )
}
