# Portfolio de Tobias Alvarez

Sitio personal: https://tobdeveloper.vercel.app/

Una sola página, bilingüe (ES/EN), con React 19, Vite, GSAP (ScrollTrigger y SplitText) y Lenis. Sin router ni librería de UI: CSS Modules y variables CSS.

## Comandos

```bash
npm install
npm run dev       # servidor de desarrollo
npm run build     # build de producción en dist/
npm run lint
npm run images    # regenera src/assets a partir de assets-src/
```

Requiere Node 22.12 o superior.

## Dónde se edita cada cosa

| Qué | Archivo |
|---|---|
| Links, email, CV | `src/data/site.js` |
| Experiencia, educación, certificaciones | `src/data/experience.js` |
| Casos destacados y lista de "Más sistemas" | `src/data/projects.js` |
| Tecnologías | `src/data/skills.js` |
| Textos de interfaz | `src/i18n/es.js` y `src/i18n/en.js` |
| Colores, tipografía, espaciado | `src/styles/tokens.css` |

El contenido de los data files lleva los dos idiomas juntos: `{ es: '…', en: '…' }`.

## Imágenes

Las capturas crudas viven en `assets-src/raw/` y el retrato en `assets-src/profile-pic.jpeg`. `npm run images` genera las versiones AVIF y WebP en `src/assets/`, que se commitean (el build de Vercel no corre sharp).

- Una captura de escritorio nueva: PNG de 16:10 en `assets-src/raw/<nombre>.png`.
- Una captura de teléfono: el nombre tiene que terminar en `-mobile`.
- Después se referencia por `<nombre>` en `src/data/projects.js`.

Solo se publican vistas públicas de los sistemas municipales, sin sesión iniciada.

## Movimiento y accesibilidad

- Con `prefers-reduced-motion: reduce` no hay preloader, scroll suave, secciones fijas ni shader: el contenido se muestra completo y quieto.
- El fondo del hero es un shader WebGL2 (`src/components/sections/HeroCanvas.jsx`); si no hay WebGL queda un degradado CSS.
- Los casos de estudio se abren en un `<dialog>` y son enlazables como `/#work/<slug>`.
- El idioma se resuelve en este orden: `?lang=`, `localStorage`, idioma del navegador.
