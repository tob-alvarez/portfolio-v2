import { useLanguage } from '../../i18n/context'
import s from './LangSwitch.module.css'

const OPTIONS = [
  { code: 'es', name: 'Español' },
  { code: 'en', name: 'English' },
]

export default function LangSwitch() {
  const { lang, setLang, t } = useLanguage()
  return (
    <div className={s.switch} role="group" aria-label={t('nav.language')}>
      {OPTIONS.map(({ code, name }) => (
        <button
          key={code}
          type="button"
          lang={code}
          className={s.option}
          aria-pressed={lang === code}
          aria-label={name}
          onClick={() => lang !== code && setLang(code)}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
