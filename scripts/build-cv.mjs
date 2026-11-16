// Genera el CV en español e inglés como PDF de una página en public/cv/.
// Uso: npm run cv   (necesita Chrome o Edge; se puede indicar la ruta con CHROME_PATH)
import { spawn } from 'node:child_process'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const OUT = 'public/cv'
const CONTACT = {
  email: 'tobdeveloper@gmail.com',
  phone: '+54 381 4462981',
  portfolio: 'https://tobdeveloper.vercel.app/',
  linkedin: 'https://www.linkedin.com/in/tobdeveloper/',
  github: 'https://github.com/tob-alvarez',
}

// ---------- Contenido ----------
const cv = {
  es: {
    file: 'Tobias-Alvarez-CV-ES.pdf',
    title: 'Tobias Alvarez, CV',
    role: 'Desarrollador Full Stack',
    location: 'San Miguel de Tucumán, Argentina',
    summary:
      'Desarrollador full stack con más de 4 años de experiencia creando aplicaciones web con React, Node.js, Express y MySQL. Llevo sistemas completos del diseño a producción, con foco en interfaces claras y en software que se usa todos los días. Me comunico bien y disfruto trabajar en equipos colaborativos y multidisciplinarios.',
    sections: { experience: 'Experiencia laboral', skills: 'Habilidades', education: 'Educación', languages: 'Idiomas', certifications: 'Certificaciones' },
    jobs: [
      { title: 'Desarrollador | Consultor IT', company: 'KPMG Argentina', meta: 'Puesto actual' },
      {
        title: 'Desarrollador de Software',
        company: 'Dirección de Innovación Tecnológica, Municipalidad de San Miguel de Tucumán',
        meta: 'Administración pública, tecnología',
        projects: [
          {
            name: 'Sistema de diseño Ciudad Digital',
            stack: 'CSS, Material UI',
            text: 'Diseñé y documenté el sistema de diseño de las aplicaciones municipales, con tokens, plantillas y modo día y noche, y lo apliqué en siete de ellas.',
          },
          {
            name: 'Mapa SMT',
            stack: 'React, Leaflet, MapLibre GL, three.js, Express, MySQL',
            text: 'Desarrollé de punta a punta el mapa interactivo público de la ciudad: capas que cada área administra dibujando sobre el mapa y una vista 3D con edificios extruidos.',
          },
          {
            name: 'Portal smt.gob.ar',
            stack: 'React, Express, MariaDB',
            text: 'Reescribí el sitio oficial de la ciudad de Laravel a React y Express conservando las URL y la base de datos, con 60 tests automatizados.',
          },
          {
            name: 'CiDiTuc',
            stack: 'React, Node.js, Express, MySQL',
            text: 'Participé en el portal que unifica el acceso a los sistemas municipales. Diseñé e implementé el control de permisos por tipo de usuario y por persona.',
          },
          {
            name: 'Atención Ciudadana',
            stack: 'React, Node.js, Express, MySQL',
            text: 'Sistema de gestión de reclamos vecinales de punta a punta (front, back y backoffice), con geolocalización, notificaciones por email y reportes.',
          },
        ],
      },
      {
        title: 'Desarrollador Frontend Freelance',
        company: 'Equipasis',
        meta: 'React, Material UI',
        text: 'Frontend de una plataforma de administración hospitalaria, con módulos de inventario y turnos, diseño responsive y componentes de interfaz dinámicos.',
      },
    ],
    skills: [
      ['Frontend', 'React, Next.js, React Native, TypeScript'],
      ['Backend', 'Node.js, Express, REST, JWT'],
      ['Datos', 'MySQL, MariaDB, MongoDB'],
      ['Mapas y 3D', 'Leaflet, MapLibre GL, three.js'],
      ['Herramientas', 'Git, GitHub'],
      ['Habilidades blandas', 'Trabajo en equipo, comunicación, criterio de UX/UI'],
    ],
    education: [['Tecnicatura en Desarrollo y Calidad de Software', 'Universidad del Norte Santo Tomás de Aquino, en curso']],
    languages: [['Español', 'Nativo'], ['Inglés', 'Intermedio, B1 a B2']],
    certifications: [['Fullstack Developer', 'RollingCode School'], ['Formación React', 'Oracle Next Education y Alura LATAM']],
  },
  en: {
    file: 'Tobias-Alvarez-CV-EN.pdf',
    title: 'Tobias Alvarez, CV',
    role: 'Full Stack Developer',
    location: 'San Miguel de Tucumán, Argentina',
    summary:
      'Full stack developer with 4+ years of experience building web applications with React, Node.js, Express and MySQL. I take whole systems from design to production, with a focus on clear interfaces and software that gets used every day. I communicate well and enjoy working in collaborative, cross-functional teams.',
    sections: { experience: 'Work experience', skills: 'Skills', education: 'Education', languages: 'Languages', certifications: 'Certifications' },
    jobs: [
      { title: 'Developer | IT Consultant', company: 'KPMG Argentina', meta: 'Current role' },
      {
        title: 'Software Developer',
        company: 'Technology Innovation Office, City of San Miguel de Tucumán',
        meta: 'Public administration, technology',
        projects: [
          {
            name: 'Ciudad Digital design system',
            stack: 'CSS, Material UI',
            text: "Designed and documented the design system for the city's applications, with tokens, templates and day and night modes, and applied it to seven of them.",
          },
          {
            name: 'Mapa SMT',
            stack: 'React, Leaflet, MapLibre GL, three.js, Express, MySQL',
            text: "Built the city's public interactive map end to end: layers each office manages by drawing on the map, and a 3D view with extruded buildings.",
          },
          {
            name: 'smt.gob.ar portal',
            stack: 'React, Express, MariaDB',
            text: "Rewrote the city's official website from Laravel to React and Express, keeping its URLs and database, with 60 automated tests.",
          },
          {
            name: 'CiDiTuc',
            stack: 'React, Node.js, Express, MySQL',
            text: 'Worked on the portal that unifies access to city systems. Designed and implemented access control by user type and by person.',
          },
          {
            name: 'Atención Ciudadana',
            stack: 'React, Node.js, Express, MySQL',
            text: 'End-to-end citizen complaint management system (front end, back end and back office), with geolocation, email notifications and reports.',
          },
        ],
      },
      {
        title: 'Freelance Frontend Developer',
        company: 'Equipasis',
        meta: 'React, Material UI',
        text: 'Frontend for a hospital administration platform, with inventory and scheduling modules, responsive design and dynamic interface components.',
      },
    ],
    skills: [
      ['Frontend', 'React, Next.js, React Native, TypeScript'],
      ['Backend', 'Node.js, Express, REST, JWT'],
      ['Data', 'MySQL, MariaDB, MongoDB'],
      ['Maps and 3D', 'Leaflet, MapLibre GL, three.js'],
      ['Tools', 'Git, GitHub'],
      ['Soft skills', 'Teamwork, communication, UI/UX awareness'],
    ],
    education: [['Associate degree in Software Development and Quality', 'Universidad del Norte Santo Tomás de Aquino, in progress']],
    languages: [['Spanish', 'Native'], ['English', 'Intermediate, B1 to B2']],
    certifications: [['Fullstack Developer', 'RollingCode School'], ['React track', 'Oracle Next Education and Alura LATAM']],
  },
}

// ---------- Plantilla ----------
const dataUri = (path, mime) => `data:${mime};base64,${readFileSync(path).toString('base64')}`
const font = dataUri('node_modules/@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2', 'font/woff2')
const photo = dataUri('src/assets/photo/tobias-480.webp', 'image/webp')
const esc = (text) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;')
const pairs = (rows) => rows.map(([a, b]) => `<li><b>${esc(a)}</b>: ${esc(b)}</li>`).join('')

const html = (lang, c) => `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<title>${esc(c.title)}</title>
<style>
  @font-face { font-family: Archivo; src: url(${font}) format('woff2'); font-weight: 100 900; font-stretch: 62% 125%; }
  @page { size: A4; margin: 12mm 15mm; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font: 9.5pt/1.4 Archivo, Arial, sans-serif; color: #111; }
  a { color: inherit; }
  ul { list-style: none; }
  header { display: grid; grid-template-columns: 1fr 30mm; gap: 8mm; align-items: start; }
  h1 { font-size: 21pt; font-weight: 800; line-height: 1.05; text-transform: uppercase; }
  .role { margin-top: 1mm; font-size: 8.4pt; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; }
  .contact { margin-top: 2mm; }
  .summary { margin-top: 3mm; }
  .photo { width: 30mm; height: 30mm; object-fit: cover; object-position: 50% 12%; }
  h2 { margin-top: 5mm; padding-bottom: 1mm; border-bottom: 0.3mm solid #111; font-size: 11pt; font-weight: 800; text-transform: uppercase; }
  .job { margin-top: 3mm; }
  h3 { font-size: 10pt; font-weight: 700; line-height: 1.25; }
  .meta { color: #555; }
  .project { margin-top: 2mm; break-inside: avoid; }
  .project b { font-weight: 700; }
  .stack { color: #555; }
  .cols { display: grid; grid-template-columns: 1.15fr 1fr; gap: 0 10mm; }
  .cols h2 { margin-top: 5mm; }
  .list { margin-top: 2mm; }
  .list li + li { margin-top: 0.6mm; }
</style>
</head>
<body>
<header>
  <div>
    <h1>Tobias Alvarez</h1>
    <p class="role">${esc(c.role)}</p>
    <p class="contact">
      <a href="mailto:${CONTACT.email}">${CONTACT.email}</a> | ${CONTACT.phone} | ${esc(c.location)}<br>
      <a href="${CONTACT.portfolio}">tobdeveloper.vercel.app</a> | <a href="${CONTACT.linkedin}">linkedin.com/in/tobdeveloper</a> | <a href="${CONTACT.github}">github.com/tob-alvarez</a>
    </p>
    <p class="summary">${esc(c.summary)}</p>
  </div>
  <img class="photo" src="${photo}" alt="">
</header>

<h2>${esc(c.sections.experience)}</h2>
${c.jobs
  .map(
    (job) => `<section class="job">
  <h3>${esc(job.title)}, ${esc(job.company)}</h3>
  <p class="meta">${esc(job.meta)}</p>
  ${job.text ? `<p>${esc(job.text)}</p>` : ''}
  ${(job.projects ?? [])
    .map((p) => `<div class="project"><p><b>${esc(p.name)}</b> <span class="stack">(${esc(p.stack)})</span></p><p>${esc(p.text)}</p></div>`)
    .join('')}
</section>`,
  )
  .join('')}

<div class="cols">
  <div>
    <h2>${esc(c.sections.skills)}</h2>
    <ul class="list">${pairs(c.skills)}</ul>
  </div>
  <div>
    <h2>${esc(c.sections.education)}</h2>
    <ul class="list">${pairs(c.education)}</ul>
    <h2>${esc(c.sections.languages)}</h2>
    <ul class="list">${pairs(c.languages)}</ul>
    <h2>${esc(c.sections.certifications)}</h2>
    <ul class="list">${pairs(c.certifications)}</ul>
  </div>
</div>
</body>
</html>`

// ---------- Chrome headless por CDP ----------
const CHROME = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
].find((path) => path && existsSync(path))
if (!CHROME) throw new Error('No encontré Chrome ni Edge. Indicá la ruta con CHROME_PATH.')

const PORT = 9334
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${PORT}`, '--no-first-run', `--user-data-dir=${mkdtempSync(join(tmpdir(), 'cv-'))}`, 'about:blank'], {
  stdio: 'ignore',
})

let target
for (let i = 0; i < 40 && !target; i++) {
  await sleep(250)
  try {
    target = (await (await fetch(`http://127.0.0.1:${PORT}/json`)).json()).find((t) => t.type === 'page')
  } catch {
    /* Chrome todavía está levantando */
  }
}
const ws = new WebSocket(target.webSocketDebuggerUrl)
await new Promise((resolve) => ws.addEventListener('open', resolve))
let id = 0
const pending = new Map()
ws.addEventListener('message', (event) => {
  const message = JSON.parse(event.data)
  pending.get(message.id)?.(message.result)
  pending.delete(message.id)
})
const send = (method, params = {}) =>
  new Promise((resolve) => {
    pending.set(++id, resolve)
    ws.send(JSON.stringify({ id, method, params }))
  })

mkdirSync(OUT, { recursive: true })
await send('Page.enable')
const { frameTree } = await send('Page.getFrameTree')
for (const [lang, content] of Object.entries(cv)) {
  await send('Page.setDocumentContent', { frameId: frameTree.frame.id, html: html(lang, content) })
  await send('Runtime.evaluate', { expression: 'document.fonts.ready.then(() => true)', awaitPromise: true })
  const { data } = await send('Page.printToPDF', { printBackground: true, preferCSSPageSize: true })
  const pdf = Buffer.from(data, 'base64')
  const pages = pdf.toString('latin1').match(/\/Type\s*\/Page\b(?!s)/g)?.length ?? '?'
  writeFileSync(join(OUT, content.file), pdf)
  console.log(`${content.file}: ${pages} página(s), ${Math.round(pdf.length / 1024)} KB`)
}
ws.close()
chrome.kill()
process.exit(0)
