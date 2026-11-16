import { useLanguage } from '../../i18n/context'
import { site } from '../../data/site'
import useLocalTime from '../../hooks/useLocalTime'
import Icon from '../ui/Icon.jsx'
import s from './Footer.module.css'

export default function Footer() {
  const { t } = useLanguage()
  const time = useLocalTime(site.timeZone)
  return (
    <footer className={s.footer}>
      <div className={`container ${s.inner}`}>
        <p>
          © {new Date().getFullYear()} {site.name}.
        </p>
        <p className={s.time}>
          {t('footer.local')}: <time>{time}</time>
        </p>
        <a className={s.top} href="#top">
          <span>{t('footer.top')}</span>
          <Icon name="up" size={18} />
        </a>
      </div>
    </footer>
  )
}
