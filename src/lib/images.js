// Resuelve las imágenes generadas por `npm run images` a partir de su nombre base.
const files = import.meta.glob('../assets/{screens,photo}/*.{avif,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
})

const index = {}
for (const [path, url] of Object.entries(files)) {
  const [, name, width, format] = path.match(/([^/]+)-(\d+)\.(avif|webp)$/)
  index[name] ??= { avif: [], webp: [] }
  index[name][format].push({ width: Number(width), url })
}
for (const entry of Object.values(index)) {
  entry.avif.sort((a, b) => a.width - b.width)
  entry.webp.sort((a, b) => a.width - b.width)
}

const srcSet = (list) => list.map(({ url, width }) => `${url} ${width}w`).join(', ')

export function imageSources(name) {
  const entry = index[name]
  if (!entry) throw new Error(`Imagen no generada: ${name}`)
  return {
    avif: srcSet(entry.avif),
    webp: srcSet(entry.webp),
    fallback: entry.webp.at(-1).url,
  }
}
