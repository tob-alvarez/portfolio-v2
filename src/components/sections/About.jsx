import { useRef } from 'react'
import { useLanguage } from '../../i18n/context'
import { MOTION, SplitText, gsap, useGSAP } from '../../lib/gsap'
import Picture from '../ui/Picture.jsx'
import s from './About.module.css'

export default function About() {
  const { t } = useLanguage()
  const root = useRef(null)
  const facts = t('about.facts')

  useGSAP(
    () => {
      const mm = gsap.matchMedia(root)
      mm.add(MOTION, () => {
        // El párrafo se enciende palabra por palabra a medida que se lee.
        const [text] = gsap.utils.toArray('[data-text]')
        SplitText.create(text, {
          type: 'words',
          autoSplit: true,
          onSplit: (self) =>
            gsap.fromTo(
              self.words,
              { opacity: 0.16 },
              {
                opacity: 1,
                ease: 'none',
                stagger: 0.08,
                scrollTrigger: { trigger: text, start: 'top 82%', end: 'bottom 55%', scrub: true },
              },
            ),
        })

        gsap.from('[data-photo]', {
          clipPath: 'inset(100% 0 0 0)',
          duration: 1.3,
          ease: 'power4.inOut',
          scrollTrigger: { trigger: '[data-photo]', start: 'top 80%', once: true },
        })
        gsap.fromTo(
          '[data-photo] img',
          { yPercent: -6, scale: 1.14 },
          { yPercent: 6, scale: 1.14, ease: 'none', scrollTrigger: { trigger: '[data-photo]', start: 'top bottom', end: 'bottom top', scrub: true } },
        )

        gsap.utils.toArray('[data-count]').forEach((el) => {
          const target = Number(el.dataset.count)
          const state = { value: 0 }
          gsap.to(state, {
            value: target,
            duration: 1.6,
            ease: 'power3.out',
            onUpdate: () => (el.textContent = Math.round(state.value)),
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          })
        })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="about" className={`section ${s.about}`} aria-labelledby="about-title">
      <div className={`container ${s.grid}`}>
        <h2 id="about-title" className="sr-only">
          {t('about.title')}
        </h2>
        <p className={s.text} data-text>
          {t('about.text')}
        </p>
        <div className={s.photo} data-photo>
          <Picture name="tobias" kind="photo" alt={t('about.photoAlt')} sizes="(min-width: 900px) 30vw, 70vw" />
        </div>
        <dl className={s.facts}>
          {facts.map(({ value, prefix = '', suffix, label }) => (
            <div key={label} className={s.fact}>
              <dt className={s.factLabel}>{label}</dt>
              <dd className={s.factValue}>
                {prefix}
                <span data-count={value}>{value}</span>
                {suffix}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
