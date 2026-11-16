import { useRef, useState } from 'react'
import '@fontsource/poppins/latin-400.css'
import '@fontsource/poppins/latin-600.css'
import '@fontsource/poppins/latin-700.css'
import { useLanguage } from '../../i18n/context'
import { MOTION, gsap, revealLines, revealUp, useGSAP } from '../../lib/gsap'
import Icon from '../ui/Icon.jsx'
import s from './DesignSystem.module.css'

// Tokens reales del sistema (guía Ciudad Digital, variables --cd-*).
const SWATCHES = [
  { name: 'primary', hex: '#1f89f6' },
  { name: 'hover', hex: '#0b63c9' },
  { name: 'soft', hex: '#e8f2fe' },
  { name: 'success', hex: '#16a34a' },
  { name: 'warning', hex: '#f59e0b' },
  { name: 'danger', hex: '#dc2626' },
]
const RADII = [20, 14, 10]
// La sección solo se fija si hay ancho y alto para que entre completa (igual que en el CSS).
const PINNED = `${MOTION} and (min-width: 1024px) and (min-height: 700px)`

export default function DesignSystem() {
  const { t } = useLanguage()
  const root = useRef(null)
  const [theme, setTheme] = useState('claro')
  const [copied, setCopied] = useState(null)
  const beats = t('system.beats')
  const demo = t('system.demo')
  const night = theme === 'oscuro'

  useGSAP(
    () => {
      const mm = gsap.matchMedia(root)
      mm.add(MOTION, () => {
        revealLines('[data-title]')
        revealUp('[data-intro]', { delay: 0.15 })
      })
      // Escritorio: la sección queda fija y el scroll recorre tokens → componentes → despliegue.
      mm.add(PINNED, () => {
        const steps = gsap.utils.toArray('[data-beat]')
        const layers = gsap.utils.toArray('[data-layer]')
        gsap.set(layers.slice(1), { autoAlpha: 0, y: 48 })
        gsap.set(steps.slice(1), { opacity: 0.32 })

        let auto = 'claro'
        const tl = gsap.timeline({
          defaults: { ease: 'power2.inOut', duration: 0.6 },
          scrollTrigger: {
            trigger: '[data-stage]',
            start: 'top top',
            end: '+=220%',
            pin: true,
            scrub: 0.6,
            // A mitad de camino se hace de noche.
            onUpdate: (self) => {
              const next = self.progress > 0.45 ? 'oscuro' : 'claro'
              if (next !== auto) {
                auto = next
                setTheme(next)
              }
            },
          },
        })
        tl.to({}, { duration: 0.5 })
          .to(layers[0], { autoAlpha: 0, y: -48 }, 'components')
          .to(layers[1], { autoAlpha: 1, y: 0 }, 'components')
          .to(steps[0], { opacity: 0.32 }, 'components')
          .to(steps[1], { opacity: 1 }, 'components')
          .to({}, { duration: 0.7 })
          .to(layers[1], { autoAlpha: 0, y: -48 }, 'rollout')
          .to(layers[2], { autoAlpha: 1, y: 0 }, 'rollout')
          .to(steps[1], { opacity: 0.32 }, 'rollout')
          .to(steps[2], { opacity: 1 }, 'rollout')
          .from('[data-app]', { scale: 0.85, autoAlpha: 0, stagger: 0.06, duration: 0.4, ease: 'back.out(1.8)' }, 'rollout+=0.25')
          .to({}, { duration: 0.6 })
      })
    },
    { scope: root },
  )

  const copy = async (hex) => {
    try {
      await navigator.clipboard.writeText(hex)
      setCopied(hex)
      setTimeout(() => setCopied((current) => (current === hex ? null : current)), 1400)
    } catch {
      /* sin permiso de portapapeles: el valor igual está a la vista */
    }
  }

  return (
    <section ref={root} id="system" className={s.section} aria-labelledby="system-title">
      <div className={s.stage} data-stage>
        <div className={`container ${s.grid}`}>
          <div className={s.copy}>
            <h2 id="system-title" className="h-section" data-title>
              {t('system.title')}
            </h2>
            <p className={`t-lead ${s.intro}`} data-intro>
              {t('system.intro')}
            </p>
            <ol className={s.beats}>
              {beats.map(({ title, text }) => (
                <li key={title} className={s.beat} data-beat>
                  <h3 className={s.beatTitle}>{title}</h3>
                  <p>{text}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className={s.demo} data-tema={theme}>
            <div className={s.demoHeader}>
              <p className={s.brand}>
                <span>{demo.brandTop}</span>
                {demo.brandBottom}
              </p>
              <button
                type="button"
                className={s.themeToggle}
                aria-label={night ? demo.toggleDay : demo.toggleNight}
                onClick={() => setTheme(night ? 'claro' : 'oscuro')}
              >
                <Icon name={night ? 'sun' : 'moon'} size={18} />
              </button>
            </div>

            <div className={s.layers}>
              <div className={s.layer} data-layer>
                <ul className={s.swatches}>
                  {SWATCHES.map(({ name, hex }) => (
                    <li key={hex}>
                      <button type="button" className={s.swatch} onClick={() => copy(hex)} aria-label={`${demo.copyHint} ${hex}`}>
                        <span className={s.chip} style={{ background: hex }} />
                        <span className={s.swatchName}>--cd-{name}</span>
                        <span className={s.swatchHex}>{copied === hex ? demo.copied : hex}</span>
                      </button>
                    </li>
                  ))}
                </ul>
                <div className={s.typeRow}>
                  <p className={s.typeSample}>Aa</p>
                  <p className={s.typeLabel}>{demo.typeSample}</p>
                  <ul className={s.radii} aria-hidden="true">
                    {RADII.map((radius) => (
                      <li key={radius} style={{ borderTopLeftRadius: radius }}>
                        {radius}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className={s.layer} data-layer>
                <div className={s.buttons}>
                  <span className={`${s.cdButton} ${s.cdPrimary}`}>{demo.primary}</span>
                  <span className={`${s.cdButton} ${s.cdSecondary}`}>{demo.secondary}</span>
                  <span className={`${s.cdButton} ${s.cdDanger}`}>{demo.danger}</span>
                </div>
                <p className={s.alert}>
                  <Icon name="check" size={18} />
                  {demo.alert}
                </p>
                <div className={s.card}>
                  <p className={s.cardTitle}>{demo.cardTitle}</p>
                  <p className={s.cardValue}>87%</p>
                  <p className={s.cardText}>{demo.cardText}</p>
                  <span className={s.meter} aria-hidden="true" />
                  <span className={s.skeleton} aria-hidden="true" />
                </div>
              </div>

              <div className={s.layer} data-layer>
                <p className={s.appsLabel}>{t('system.appsLabel')}</p>
                <ul className={s.apps}>
                  {t('system.apps').map((app) => (
                    <li key={app} className={s.app} data-app>
                      <Icon name="check" size={16} />
                      {app}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
