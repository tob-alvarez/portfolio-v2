import { useEffect, useRef } from 'react'
import { useLanguage } from '../../i18n/context'
import { projects } from '../../data/projects'
import { lockScroll } from '../../lib/scroll'
import Button from '../ui/Button.jsx'
import Icon from '../ui/Icon.jsx'
import Picture from '../ui/Picture.jsx'
import s from './CaseStudy.module.css'

/** Caso de estudio a pantalla completa. `<dialog>` nativo: foco atrapado, Esc cierra y el foco vuelve al botón que lo abrió. */
export default function CaseStudy({ slug, onClose }) {
  const { t, tr } = useLanguage()
  const dialog = useRef(null)
  const project = projects.find((p) => p.slug === slug)

  useEffect(() => {
    const el = dialog.current
    if (!project) return
    el.showModal()
    el.scrollTop = 0
    lockScroll(true)
    return () => {
      el.close()
      lockScroll(false)
    }
  }, [project])

  // Esc dispara `cancel`: se cierra por la misma vía que el botón para mantener el historial en orden.
  const onCancel = (e) => {
    e.preventDefault()
    onClose()
  }

  return (
    <dialog ref={dialog} className={s.dialog} onCancel={onCancel} aria-labelledby="case-title" data-lenis-prevent>
      {project && (
        <article className={s.article} style={{ '--accent': project.accent }}>
          <div className={`container ${s.bar}`}>
            <button type="button" className={s.close} onClick={onClose}>
              <span>{t('case.close')}</span>
              <Icon name="close" size={18} />
            </button>
          </div>

          <header className={`container ${s.head}`}>
            <h2 id="case-title" className={s.title}>
              {project.title}
            </h2>
            <p className={s.tagline}>{tr(project.tagline)}</p>
          </header>

          <div className={`container ${s.cover}`}>
            <Picture name={project.cover.name} alt={tr(project.cover.alt)} sizes="(min-width: 1440px) 1280px, 92vw" eager />
          </div>

          <div className={`container ${s.body}`}>
            <aside className={s.aside}>
              <dl className={s.facts}>
                <div>
                  <dt>{t('work.role')}</dt>
                  <dd>{tr(project.role)}</dd>
                </div>
                <div>
                  <dt>{t('case.stack')}</dt>
                  <dd>{project.stack.join(', ')}</dd>
                </div>
              </dl>
              {project.live ? (
                <Button href={project.live} icon="external" external>
                  {t('case.visit')}
                </Button>
              ) : (
                <p className={s.status}>{tr(project.status)}</p>
              )}
            </aside>

            <div className={s.story}>
              {['context', 'did', 'how'].map((key) => (
                <section key={key}>
                  <h3 className={s.storyTitle}>{t(`case.${key}`)}</h3>
                  <p>{tr(project.caseStudy[key])}</p>
                </section>
              ))}
            </div>
          </div>

          {project.gallery.length > 0 && (
            <div className={`container ${s.gallery}`}>
              {project.gallery.map(({ name, alt, mobile }) => (
                <figure key={name} className={mobile ? s.phone : s.screen}>
                  <Picture name={name} alt={tr(alt)} kind={mobile ? 'mobile' : 'screen'} sizes={mobile ? '(min-width: 900px) 24vw, 60vw' : '(min-width: 900px) 62vw, 92vw'} />
                </figure>
              ))}
            </div>
          )}
        </article>
      )}
    </dialog>
  )
}
