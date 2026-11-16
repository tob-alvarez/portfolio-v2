import { imageSources } from '../../lib/images'

const SIZES = {
  screen: { width: 1920, height: 1200 },
  mobile: { width: 780, height: 1688 },
  photo: { width: 720, height: 900 },
}

/** Imagen generada por `npm run images`, con AVIF y WebP. */
export default function Picture({ name, alt, kind = 'screen', sizes = '100vw', eager = false, imgRef, className, style }) {
  const sources = imageSources(name)
  const { width, height } = SIZES[kind]
  return (
    <picture>
      <source type="image/avif" srcSet={sources.avif} sizes={sizes} />
      <source type="image/webp" srcSet={sources.webp} sizes={sizes} />
      <img
        ref={imgRef}
        className={className}
        style={style}
        src={sources.fallback}
        alt={alt}
        width={width}
        height={height}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
      />
    </picture>
  )
}
