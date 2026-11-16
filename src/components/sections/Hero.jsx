import { Suspense, lazy, useRef, useState } from 'react'
import { useLanguage } from '../../i18n/context'
import { site } from '../../data/site'
import { MOTION, gsap, useGSAP } from '../../lib/gsap'
import Button from '../ui/Button.jsx'
import s from './Hero.module.css'

const HeroCanvas = lazy(() => import('./HeroCanvas.jsx'))

const canRunShader = () =>
  matchMedia(MOTION).matches && !navigator.connection?.saveData && (navigator.hardwareConcurrency ?? 8) > 2

const [FIRST, LAST] = site.name.toUpperCase().split(' ')

function Chars({ text }) {
  return [...text].map((char, i) => (
    <span key={i} className={s.char} data-char>
      {char}
    </span>
  ))
}

export default function Hero() {
  const { t } = useLanguage()
  const root = useRef(null)
  const [shader] = useState(canRunShader)

  useGSAP(
    () => {
      const mm = gsap.matchMedia(root)
      mm.add(MOTION, () => {
        const html = document.documentElement
        const preloader = document.getElementById('preloader')
        const withIntro = html.classList.contains('intro')
        const lines = gsap.utils.toArray('[data-line]')
        const tl = gsap.timeline()

        if (withIntro) {
          const count = document.getElementById('preloader-count')
          const counter = { value: 0 }
          tl.to(counter, {
            value: 100,
            duration: 1.1,
            ease: 'power2.inOut',
            onUpdate: () => (count.textContent = Math.round(counter.value)),
          })
            .to(preloader, { clipPath: 'inset(0 0 100% 0)', duration: 1, ease: 'power4.inOut' }, '+=0.1')
            .add(() => {
              html.classList.remove('intro')
              try {
                sessionStorage.setItem('intro', '1')
              } catch {
                /* sin sessionStorage el preloader se repite; no rompe nada */
              }
            })
            .addLabel('reveal', '-=0.55')
        } else {
          tl.addLabel('reveal', 0.1)
        }

        // El nombre entra angosto y se abre: el eje de ancho de Archivo es la animación.
        tl.from('[data-char]', { yPercent: 118, duration: 1.2, stagger: 0.035, ease: 'expo.out' }, 'reveal')
          .fromTo(lines, { '--wdth': 62 }, { '--wdth': 125, duration: 1.6, ease: 'expo.out' }, 'reveal')
          .from('[data-fade]', { y: 24, autoAlpha: 0, duration: 0.9, stagger: 0.08 }, 'reveal+=0.5')

        // Al irse, el nombre se vuelve a comprimir.
        const leave = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
        })
        leave
          .fromTo(lines, { '--wdth': 125 }, { '--wdth': 62, ease: 'none', immediateRender: false }, 0)
          .to('[data-name]', { yPercent: -18, autoAlpha: 0.15, ease: 'none' }, 0)
          .to('[data-foot]', { autoAlpha: 0, ease: 'none', duration: 0.35 }, 0)
          .to('[data-backdrop]', { yPercent: 12, ease: 'none' }, 0)
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="top" className={s.hero}>
      <div className={s.backdrop} data-backdrop aria-hidden="true">
        <div className={s.fallback} />
        {shader && (
          <Suspense fallback={null}>
            <HeroCanvas />
          </Suspense>
        )}
      </div>

      <div className={`container ${s.inner}`}>
        <div className={s.top} data-foot>
          <p className={s.status} data-fade>
            <span className={s.dot} />
            {t('hero.available')}
          </p>
          <p className={s.where} data-fade>
            {t('hero.role')}
            <br />
            {site.location}
          </p>
        </div>

        <h1 className={s.name} data-name aria-label={site.name}>
          <span className={s.line} data-line aria-hidden="true">
            <Chars text={FIRST} />
          </span>
          <span className={s.line} data-line aria-hidden="true">
            <Chars text={LAST} />
          </span>
        </h1>

        <div className={s.foot} data-foot>
          <p className={s.lead} data-fade>
            {t('hero.lead')}
          </p>
          <div className={s.actions} data-fade>
            <Button href="#work">{t('hero.work')}</Button>
            <Button href={site.cv} variant="ghost" icon="download" external>
              {t('hero.cv')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
