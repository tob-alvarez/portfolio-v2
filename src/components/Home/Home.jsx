/* eslint-disable react/no-unescaped-entities */
import { useContext } from 'react';
import { TobContext } from '../../context/TobContext';
import './Home.css'
const Home = () => {

  const { darkMode } = useContext(TobContext);
  const textColor = darkMode ? "text-dark" : "text-white";

  return (
    <section className="container py-5">
        <h2 className={`home ${textColor}`}>Home</h2>
        <h2 className={`hi ${textColor}`}>Hi, I'm Tobias Alvarez</h2>
        <p className={`introduction ${textColor}`}> I'm a passionate and creative developer with a love for beautiful interfaces and delightful user experiences.</p>
      </section>
  )
}

export default Home