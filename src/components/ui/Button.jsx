import { useRef } from 'react'
import useMagnetic from '../../hooks/useMagnetic'
import Icon from './Icon.jsx'
import s from './Button.module.css'

/** Enlace o botón con la misma piel. `variant`: 'solid' | 'ghost'. */
export default function Button({ href, variant = 'solid', icon, external, children, ...rest }) {
  const ref = useRef(null)
  useMagnetic(ref)
  const className = `${s.button} ${s[variant]}`
  const content = (
    <>
      <span>{children}</span>
      {icon && <Icon name={icon} size={18} />}
    </>
  )
  if (href) {
    const target = external ? { target: '_blank', rel: 'noreferrer' } : {}
    return (
      <a ref={ref} className={className} href={href} {...target} {...rest}>
        {content}
      </a>
    )
  }
  return (
    <button ref={ref} type="button" className={className} {...rest}>
      {content}
    </button>
  )
}
