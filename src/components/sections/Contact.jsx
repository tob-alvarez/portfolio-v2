import { useRef, useState } from 'react'
import { useLanguage } from '../../i18n/context'
import { site } from '../../data/site'
import { MOTION, SplitText, gsap, revealUp, useGSAP } from '../../lib/gsap'
import useMagnetic from '../../hooks/useMagnetic'
import Button from '../ui/Button.jsx'
import Icon from '../ui/Icon.jsx'
import s from './Contact.module.css'

export default function Contact() {
  const { t } = useLanguage()
  const root = useRef(null)
  const email = useRef(null)
  const [copied, setCopied] = useState(false)
  useMagnetic(email, 0.18)

  useGSAP(
    () => {
      const mm = gsap.matchMedia(root)
      mm.add(MOTION, () => {
        const [title] = gsap.utils.toArray('[data-title]')
        SplitText.create(title, {
          type: 'chars',
          mask: 'chars',
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.chars, {
              yPercent: 115,
              duration: 1.1,
              stagger: 0.04,
              scrollTrigger: { trigger: title, start: 'top 85%', once: true },
            }),
        })
        revealUp('[data-fade]', { trigger: title, start: 'top 70%' })
        // El sol sale detrás del título a medida que se llega al final.
        gsap.fromTo(
          '[data-sun]',
          { yPercent: 40, scale: 0.7, opacity: 0.3 },
          { yPercent: 0, scale: 1, opacity: 1, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom bottom', scrub: true } },
        )
      })
    },
    { scope: root },
  )

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      location.href = `mailto:${site.email}`
    }
  }

  return (
    <section ref={root} id="contact" className={`section ${s.contact}`} aria-labelledby="contact-title">
      <span className={s.sun} data-sun aria-hidden="true" />
      <div className="container">
        <h2 id="contact-title" className={s.title} data-title>
          {t('contact.title')}
        </h2>
        <p className={`t-lead ${s.text}`} data-fade>
          {t('contact.text')}
        </p>

        <div className={s.row} data-fade>
          <button ref={email} type="button" className={s.email} onClick={copy} aria-label={`${t('contact.copy')}: ${site.email}`}>
            <span>{site.email}</span>
            <span className={s.copyState}>
              <Icon name={copied ? 'check' : 'copy'} size={18} />
              <span aria-live="polite">{copied ? t('contact.copied') : t('contact.copy')}</span>
            </span>
          </button>
        </div>

        <ul className={s.links} data-fade>
          <li>
            <Button href={site.github} variant="ghost" icon="github" external>
              GitHub
            </Button>
          </li>
          <li>
            <Button href={site.linkedin} variant="ghost" icon="linkedin" external>
              LinkedIn
            </Button>
          </li>
          <li>
            <Button href={site.cv} variant="ghost" icon="download" external>
              {t('contact.cv')}
            </Button>
          </li>
        </ul>
      </div>
    </section>
  )
}
