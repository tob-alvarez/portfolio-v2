import { useEffect } from 'react'
import { useLanguage } from './i18n/context'
import { MOTION } from './lib/gsap'
import { startLenis, stopLenis } from './lib/scroll'
import useCaseRoute from './hooks/useCaseRoute'
import Header from './components/layout/Header.jsx'
import Footer from './components/layout/Footer.jsx'
import Cursor from './components/ui/Cursor.jsx'
import Marquee from './components/ui/Marquee.jsx'
import Hero from './components/sections/Hero.jsx'
import About from './components/sections/About.jsx'
import Experience from './components/sections/Experience.jsx'
import Work from './components/sections/Work.jsx'
import DesignSystem from './components/sections/DesignSystem.jsx'
import MoreProjects from './components/sections/MoreProjects.jsx'
import Stack from './components/sections/Stack.jsx'
import Contact from './components/sections/Contact.jsx'
import CaseStudy from './components/case-study/CaseStudy.jsx'

export default function App() {
  const { lang, t } = useLanguage()
  const caseRoute = useCaseRoute()

  useEffect(() => {
    if (!matchMedia(MOTION).matches) return
    startLenis()
    return stopLenis
  }, [])

  return (
    <>
      <a className="skip" href="#main">
        {t('skip')}
      </a>
      <Header />
      {/* La key remonta las secciones al cambiar de idioma: SplitText y ScrollTrigger se rearman limpios. */}
      <main id="main" key={lang}>
        <Hero />
        <Marquee />
        <About />
        <Experience />
        <Work onOpen={caseRoute.open} />
        <DesignSystem />
        <MoreProjects />
        <Stack />
        <Contact />
      </main>
      <Footer />
      <CaseStudy slug={caseRoute.slug} onClose={caseRoute.close} />
      <Cursor />
    </>
  )
}
