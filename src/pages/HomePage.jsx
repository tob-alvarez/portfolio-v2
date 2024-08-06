import Navbar from '../components/Navbar/Navbar'
import Home from '../components/Home/Home'
import AboutMe from '../components/AboutMe/AboutMe'
import Projects from '../components/Projects/Projects'
import Skills from '../components/Skills/Skills'
import Contact from '../components/Contact/Contact'
import Elevador from '../components/Elevador/Elevador'
import { TobContext } from '../context/TobContext'
import { useContext } from 'react'

const HomePage = () => {

  const { darkMode } = useContext(TobContext);

  return (
    <>
    <div style={{
      backgroundColor: darkMode ? 'white' : '#223341'
    }}>
      <Navbar/>
      <Home />
      <AboutMe/>
      <Projects/>
      <Skills/>
      <Contact/>
      <Elevador/>
    </div>
    </>
  )
}

export default HomePage