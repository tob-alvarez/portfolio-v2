// El orden es cronológico inverso. `current` marca el puesto actual; el resto va en pasado y sin fechas.
export const experience = [
  {
    company: 'KPMG Argentina',
    current: true,
    roles: [
      {
        title: { es: 'Desarrollador | Consultor IT', en: 'Developer | IT Consultant' },
      },
    ],
  },
  {
    company: 'Municipalidad de San Miguel de Tucumán',
    unit: { es: 'Dirección de Innovación Tecnológica', en: 'Technology Innovation Office' },
    roles: [
      {
        title: { es: 'Software Developer', en: 'Software Developer' },
        bullets: {
          es: [
            'Diseñé el sistema de diseño Ciudad Digital y lo apliqué en siete aplicaciones.',
            'Desarrollé Mapa SMT, el mapa interactivo público de la ciudad, incluida su vista 3D.',
            'Reescribí el portal smt.gob.ar de Laravel a React y Express.',
            'Construí módulos de Atención Ciudadana, Movilidad Urbana, Catastro y GAF, de front a back.',
          ],
          en: [
            'Designed the Ciudad Digital design system and applied it to seven applications.',
            "Built Mapa SMT, the city's public interactive map, including its 3D view.",
            'Rewrote the smt.gob.ar portal from Laravel to React and Express.',
            'Built modules for citizen complaints, urban mobility, cadastre and public finance, front to back.',
          ],
        },
      },
      {
        title: { es: 'Técnico de desarrollo', en: 'Development Technician' },
        bullets: {
          es: ['Mis primeros sistemas en producción: SysCOM, la app de reportes de seguridad del municipio, y los primeros módulos de CiDiTuc.'],
          en: ["My first systems in production: SysCOM, the city's security reporting app, and the first CiDiTuc modules."],
        },
      },
    ],
  },
  {
    company: 'Freelance',
    roles: [
      {
        title: { es: 'Desarrollador frontend, Equipasis', en: 'Frontend developer, Equipasis' },
        bullets: {
          es: ['Frontend de una plataforma de gestión de equipamiento hospitalario: inventario, turnos, notificaciones y gráficos.'],
          en: ['Frontend for a hospital equipment management platform: inventory, scheduling, notifications and charts.'],
        },
      },
    ],
  },
]

export const education = [
  {
    title: { es: 'Tecnicatura en Desarrollo y Calidad de Software', en: 'Associate degree in Software Development and Quality' },
    place: 'Universidad del Norte Santo Tomás de Aquino',
    period: { es: '2025, en curso', en: '2025, in progress' },
  },
]

export const certifications = [
  { title: 'Fullstack Developer', place: 'RollingCode School' },
  { title: { es: 'Formación React', en: 'React track' }, place: 'Oracle Next Education y Alura LATAM' },
]

export const languages = [
  { title: { es: 'Español', en: 'Spanish' }, place: { es: 'Nativo', en: 'Native' } },
  { title: { es: 'Inglés', en: 'English' }, place: { es: 'Intermedio, B1 a B2', en: 'Intermediate, B1 to B2' } },
]
