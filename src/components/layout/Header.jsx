import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../../i18n/context'
import { site } from '../../data/site'
import { MOTION, ScrollTrigger, gsap, useGSAP } from '../../lib/gsap'
import { lockScroll } from '../../lib/scroll'
import LangSwitch from '../ui/LangSwitch.jsx'
import s from './Header.module.css'

const LINKS = [
  { key: 'work', href: '#work' },
  { key: 'experience', href: '#experience' },
  { key: 'stack', href: '#stack' },
  { key: 'contact', href: '#contact' },
]

export default function Header() {
  const { t } = useLanguage()
  const root = useRef(null)
  const progress = useRef(null)
  const [open, setOpen] = useState(false)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(MOTION, () => {
      // Se esconde al bajar y vuelve al subir.
      const hide = gsap.to(root.current, { yPercent: -100, duration: 0.45, ease: 'power3.inOut', paused: true })
      const direction = ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => (self.direction === 1 && self.scroll() > 120 ? hide.play() : hide.reverse()),
      })
      const bar = gsap.to(progress.current, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
      })
      return () => {
        direction.kill()
        bar.scrollTrigger?.kill()
      }
    })
  })

  useEffect(() => {
    lockScroll(open)
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header ref={root} className={s.header} data-open={open}>
      <div className={`container ${s.bar}`}>
        <a className={s.brand} href="#top" onClick={() => setOpen(false)}>
          {site.name}
        </a>
        <nav className={s.nav} aria-label={t('nav.label')}>
          <ul className={s.links}>
            {LINKS.map(({ key, href }) => (
              <li key={key}>
                <a className={s.link} href={href}>
                  {t(`nav.${key}`)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className={s.tools}>
          <LangSwitch />
          <button type="button" className={s.toggle} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((v) => !v)}>
            {open ? t('nav.close') : t('nav.menu')}
          </button>
        </div>
      </div>
      <span ref={progress} className={s.progress} aria-hidden="true" />

      <div id="mobile-menu" className={s.menu} hidden={!open}>
        <nav aria-label={t('nav.label')}>
          <ul className={s.menuLinks}>
            {LINKS.map(({ key, href }) => (
              <li key={key}>
                <a className={s.menuLink} href={href} onClick={() => setOpen(false)}>
                  {t(`nav.${key}`)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p className="t-meta">{site.location}</p>
      </div>
    </header>
  )
}
