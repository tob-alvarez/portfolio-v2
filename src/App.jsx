/* eslint-disable react/no-unescaped-entities */
import Home from "./components/Home/Home";
import AboutMe from "./components/AboutMe/AboutMe";
import Projects from "./components/Projects/Projects";
import Navbar from "./components/Navbar/Navbar";
import Skills from "./components/Skills/Skills";
import Contact from "./components/Contact/Contact";
import Elevador from "./components/Elevador/Elevador";

function App() {

  return (
    <>
      <Navbar/>
      <Home />
      <AboutMe/>
      <Projects/>
      <Skills/>
      <Contact/>
      <Elevador/>
    </>
  );
}

export default App;
