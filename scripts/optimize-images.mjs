// Genera las imágenes optimizadas del sitio a partir de assets-src/.
// Uso: npm run images   (las salidas se commitean; el build de Vercel no corre sharp)
import { mkdir, readdir, rm } from 'node:fs/promises'
import { basename, extname, join } from 'node:path'
import sharp from 'sharp'

const RAW = 'assets-src/raw'
const OUT = 'src/assets/screens'
const PHOTO_OUT = 'src/assets/photo'

const write = async (pipeline, base, width) => {
  await pipeline.clone().resize({ width, withoutEnlargement: true }).avif({ quality: 55 }).toFile(`${base}-${width}.avif`)
  await pipeline.clone().resize({ width, withoutEnlargement: true }).webp({ quality: 78 }).toFile(`${base}-${width}.webp`)
}

await rm(OUT, { recursive: true, force: true })
await rm(PHOTO_OUT, { recursive: true, force: true })
await mkdir(OUT, { recursive: true })
await mkdir(PHOTO_OUT, { recursive: true })

for (const file of await readdir(RAW)) {
  const name = basename(file, extname(file))
  const widths = name.endsWith('-mobile') ? [480, 780] : [960, 1920]
  for (const width of widths) await write(sharp(join(RAW, file)), join(OUT, name), width)
  console.log('screen', name)
}

// Retrato: recorte vertical 4:5 centrado en la cara.
const photo = sharp('assets-src/profile-pic.jpeg').extract({ left: 385, top: 0, width: 720, height: 900 })
for (const width of [480, 720]) await write(photo, join(PHOTO_OUT, 'tobias'), width)
console.log('photo tobias')
