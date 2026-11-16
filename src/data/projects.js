// Casos destacados. Las imágenes son nombres base de src/assets/screens (ver scripts/optimize-images.mjs).
export const projects = [
  {
    slug: 'mapa-smt',
    accent: '#2eb1ff',
    title: 'Mapa SMT',
    live: 'https://mapa.smt.gob.ar/',
    tagline: {
      es: 'El mapa interactivo de San Miguel de Tucumán, ahora también en 3D.',
      en: 'The interactive map of San Miguel de Tucumán, now in 3D too.',
    },
    role: { es: 'Desarrollo completo, front y back', en: 'End-to-end development, front and back' },
    bullets: {
      es: [
        'Capas públicas de puntos de interés, distritos, circuitos y líneas de colectivo.',
        'Vista 3D con MapLibre GL: edificios extruidos de OpenStreetMap y modelos glTF con three.js.',
        'Paneles donde cada área carga y edita sus propias capas dibujando sobre el mapa.',
      ],
      en: [
        'Public layers for points of interest, districts, circuits and bus lines.',
        '3D view with MapLibre GL: extruded OpenStreetMap buildings and glTF models with three.js.',
        'Admin panels where each office adds and edits its own layers by drawing on the map.',
      ],
    },
    stack: ['React 18', 'Vite', 'MUI 6', 'Leaflet', 'MapLibre GL', 'three.js', 'Express', 'MySQL'],
    cover: { name: 'mapa-3d', alt: { es: 'Vista 3D del Mapa SMT con edificios extruidos', en: 'Mapa SMT 3D view with extruded buildings' } },
    gallery: [
      { name: 'mapa-2d', alt: { es: 'Vista 2D del mapa con el panel de capas', en: '2D map view with the layers panel' } },
      { name: 'mapa-mobile', mobile: true, alt: { es: 'Mapa SMT en un teléfono', en: 'Mapa SMT on a phone' } },
    ],
    caseStudy: {
      context: {
        es: 'Varias áreas del municipio necesitaban mostrar en un solo lugar dónde está cada cosa en la ciudad: dependencias, escuelas, centros de salud, espacios verdes, cortes de tránsito y recorridos de colectivos.',
        en: 'Several city offices needed one place to show where everything is: public buildings, schools, health centres, green spaces, road closures and bus routes.',
      },
      did: {
        es: 'Desarrollé el mapa completo: el visor público, los paneles de administración y la API. Después sumé la vista 3D, con un panel para ubicar modelos 3D sobre la ciudad, y adapté toda la app al sistema de diseño Ciudad Digital con modo día y noche.',
        en: 'I built the whole map: the public viewer, the admin panels and the API. Later I added the 3D view, with a panel to place 3D models on the city, and moved the whole app to the Ciudad Digital design system with day and night modes.',
      },
      how: {
        es: 'React con Leaflet para la vista 2D y MapLibre GL con una capa de extrusión para la 3D; three.js renderiza los modelos glTF. Las capas son GeoJSON dinámico servido por una API Express sobre MySQL. El inicio de sesión se delega en el backend central de CiDiTuc y las rutas de administración están protegidas en el front y en el back.',
        en: 'React with Leaflet for the 2D view and MapLibre GL with an extrusion layer for 3D; three.js renders the glTF models. Layers are dynamic GeoJSON served by an Express API on MySQL. Sign-in is delegated to the central CiDiTuc backend, and admin routes are protected on both the front and the back end.',
      },
    },
  },
  {
    slug: 'portal-smt',
    accent: '#7c5cff',
    title: 'Portal smt.gob.ar',
    live: null,
    status: { es: 'En etapa de despliegue', en: 'Rolling out to production' },
    tagline: {
      es: 'El sitio oficial de la ciudad, reescrito de Laravel a React y Express.',
      en: "The city's official website, rewritten from Laravel to React and Express.",
    },
    role: { es: 'Migración completa', en: 'Full migration' },
    bullets: {
      es: [
        'Mismas URL públicas y misma base de datos: la migración no rompe enlaces ni contenido.',
        'API Express 5 con helmet, política de contenido, lista de orígenes permitidos y límite de peticiones.',
        '60 tests automatizados entre el servidor y el cliente.',
      ],
      en: [
        'Same public URLs and same database: the migration breaks no links and no content.',
        'Express 5 API with helmet, a content security policy, a CORS allow-list and rate limiting.',
        '60 automated tests across server and client.',
      ],
    },
    stack: ['React 19', 'Vite 8', 'React Router 7', 'MUI 6', 'Express 5', 'MariaDB', 'Vitest'],
    cover: { name: 'portal-servicios', alt: { es: 'Inicio del nuevo portal con los trámites y servicios', en: 'Home of the new portal showing services' } },
    gallery: [],
    caseStudy: {
      context: {
        es: 'El portal oficial corría sobre Laravel 7 con el panel Voyager: un stack distinto al del resto de los sistemas municipales, que ya se construyen con React y Node.',
        en: 'The official portal ran on Laravel 7 with the Voyager admin: a different stack from every other city system, which are already built with React and Node.',
      },
      did: {
        es: 'Analicé el sitio original, planifiqué la migración módulo por módulo y lo reescribí como un monorepo con un cliente React y una API Express. El panel de administración entra con la cuenta de CiDiTuc, igual que el resto de los sistemas, y todo el sitio adopta el sistema de diseño Ciudad Digital.',
        en: 'I analysed the original site, planned the migration module by module and rewrote it as a monorepo with a React client and an Express API. The admin panel signs in with the CiDiTuc account, like every other system, and the whole site adopts the Ciudad Digital design system.',
      },
      how: {
        es: 'npm workspaces sobre Node 20. La sesión del panel viaja en una cookie httpOnly; el contenido que cargan los editores se sanea con DOMPurify; el mapa usa Leaflet con OpenStreetMap en lugar de Google Maps. Los tests corren con node:test en el servidor y Vitest en el cliente.',
        en: 'npm workspaces on Node 20. The admin session travels in an httpOnly cookie; editor-authored content is sanitised with DOMPurify; the map uses Leaflet with OpenStreetMap instead of Google Maps. Tests run on node:test for the server and Vitest for the client.',
      },
    },
  },
  {
    slug: 'cidituc',
    accent: '#0066ff',
    title: 'CiDiTuc',
    live: 'https://ciudaddigital.smt.gob.ar/',
    tagline: {
      es: 'Una sola cuenta para los trámites de la ciudad y un solo portal para quienes los gestionan.',
      en: 'One account for every city service, and one portal for the people who run them.',
    },
    role: { es: 'Desarrollo en equipo, front y back', en: 'Team development, front and back' },
    bullets: {
      es: [
        'Rediseñé el landing, el inicio de sesión y el registro públicos, con modo día y noche.',
        'Portal interno que reúne una decena de sistemas de gestión detrás de un único inicio de sesión.',
        'Permisos por tipo de usuario y por persona que arman el menú de cada empleado.',
      ],
      en: [
        'Redesigned the public landing, sign-in and registration pages, with day and night modes.',
        'Internal portal that brings about ten back-office systems behind a single sign-on.',
        "Permissions by user type and by person that build each employee's menu.",
      ],
    },
    stack: ['React 18', 'Vite', 'MUI 5', 'Zustand', 'Chart.js', 'Express', 'MySQL', 'JWT'],
    cover: { name: 'cidituc-landing-live', alt: { es: 'Landing público de Ciudad Digital en modo noche', en: 'Ciudad Digital public landing in night mode' } },
    gallery: [
      { name: 'cidituc-login-live', alt: { es: 'Pantalla de ingreso a CiDiTuc', en: 'CiDiTuc sign-in screen' } },
      { name: 'cidituc-mobile', mobile: true, alt: { es: 'Landing de CiDiTuc en un teléfono', en: 'CiDiTuc landing on a phone' } },
    ],
    caseStudy: {
      context: {
        es: 'Cada área municipal tenía su propio sistema y su propio inicio de sesión. Ciudad Digital los reúne: el vecino entra con una sola cuenta y el empleado ve solo lo que le corresponde. El contador público del sitio supera los 168.000 ciudadanos registrados.',
        en: 'Every city office had its own system and its own sign-in. Ciudad Digital brings them together: residents use a single account and employees see only what is theirs. The public counter on the site shows more than 168,000 registered citizens.',
      },
      did: {
        es: 'Trabajé en el portal interno y en su backend: el sistema unificado de permisos, el tablero de métricas de los sistemas, la consulta pública de reclamos y la incorporación de nuevos sistemas al inicio de sesión único. Más adelante rediseñé las pantallas públicas y el portal interno con el sistema de diseño Ciudad Digital.',
        en: 'I worked on the internal portal and its backend: the unified permission system, the systems metrics dashboard, the public complaint lookup and bringing new systems under single sign-on. Later I redesigned the public screens and the internal portal with the Ciudad Digital design system.',
      },
      how: {
        es: 'Un backend central en Express emite el token y cada sistema lo valida. Los menús se generan desde una tabla de permisos con dos niveles: tipo de usuario y permisos puntuales por persona. El front es React con Zustand, Material UI y Chart.js para los tableros.',
        en: 'A central Express backend issues the token and each system validates it. Menus are generated from a permissions table with two levels: user type and fine-grained per-person permissions. The front end is React with Zustand, Material UI and Chart.js for the dashboards.',
      },
    },
  },
]

// Sistemas de uso interno: van en la lista compacta, sin capturas.
export const moreProjects = [
  {
    name: 'Movilidad Urbana',
    stack: ['React 18', 'Vite 7', 'Express 5', 'MySQL'],
    text: {
      es: 'Licencias de taxi, conductores de plataformas e inspecciones vehiculares, con autogestión para el ciudadano y back-office por roles.',
      en: 'Taxi licences, ride-hailing drivers and vehicle inspections, with citizen self-service and a role-based back office.',
    },
  },
  {
    name: 'Atención Ciudadana',
    stack: ['React 19', 'Leaflet', 'Turf', 'Express', 'MySQL'],
    text: {
      es: 'Reclamos vecinales de punta a punta: alta, derivación entre áreas, mapa de calor por distrito y reportes en PDF y Excel.',
      en: 'Citizen complaints end to end: intake, routing between offices, a heat map by district and PDF and Excel reports.',
    },
  },
  {
    name: 'Licitaciones y Compras',
    stack: ['React 18', 'Zustand', 'Express', 'MySQL'],
    text: {
      es: 'Portal público de licitaciones del municipio, con descarga de pliegos y un panel de carga para el área de compras.',
      en: "The city's public tenders portal, with downloadable tender documents and an admin panel for the purchasing office.",
    },
  },
  {
    name: 'Catastro',
    stack: ['React 18', 'MUI 5', 'Express', 'MySQL'],
    text: {
      es: 'Trámites online de obras privadas: formularios para profesionales, carpetas, asignación a inspectores y pagos.',
      en: 'Online procedures for private building works: forms for professionals, case folders, inspector assignment and payments.',
    },
  },
  {
    name: 'GAF',
    stack: ['React 18', 'MUI 5', 'Express', 'MySQL'],
    text: {
      es: 'Gestión financiera municipal. Hice el módulo de usuarios, permisos por persona y por tipo de usuario, y menús.',
      en: 'Municipal public finance. I built the users module, per-person and per-user-type permissions, and menus.',
    },
  },
  {
    name: 'Educación',
    stack: ['React 18', 'MUI 5', 'Zustand', 'Express'],
    text: {
      es: 'Portal de educación municipal: escuelas, autoridades, convocatorias y novedades, con su back-office.',
      en: 'Municipal education portal: schools, authorities, job calls and news, with its back office.',
    },
  },
  {
    name: 'Patrimonio Municipal',
    stack: ['React 18', 'MUI 5', 'Zustand'],
    text: {
      es: 'Catálogo público de esculturas, bustos y pinturas de la ciudad, con filtros y galería de imágenes.',
      en: "Public catalogue of the city's sculptures, busts and paintings, with filters and an image gallery.",
    },
  },
  {
    name: 'Equipasis',
    stack: ['React', 'Material UI'],
    text: {
      es: 'Trabajo freelance: frontend de una plataforma de gestión de equipamiento hospitalario, con inventario, turnos y gráficos.',
      en: 'Freelance work: frontend for a hospital equipment management platform, with inventory, scheduling and charts.',
    },
  },
]
