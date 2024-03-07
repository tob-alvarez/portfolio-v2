import html from '../../assets/html.webp'
import css from '../../assets/css3.svg'
import javaScript from '../../assets/javascript.svg'
import react from '../../assets/react.svg'
import reactN from '../../assets/native.webp'
import redux from '../../assets/redux.webp'
import node from '../../assets/node.webp'
import ex from '../../assets/express.webp'
import mongo from '../../assets/mongo.svg'
import mysql from '../../assets/mysql.svg'
import git from '../../assets/git.svg'
import gith from '../../assets/github.svg'


const Skills = () => {
  return (
    <section className="container py-5 mb-3" >
      <h2 className="seccion mb-5 text-start" id="skills">Skills</h2>
      <div className="d-flex flex-column justify-content-start align-items-center">
        <h4 className="text-start">I have experience with the following technologies and frameworks</h4>
        <div className="d-flex flex-wrap mt-5 gap-5 justify-content-center">
            <img src={html} className='img-fluid' style={{height: '50px'}}/>
            <img src={css} className='img-fluid' style={{height: '50px'}}/>
            <img src={javaScript} className='img-fluid' style={{height: '50px'}}/>
            <img src={react} className='img-fluid' style={{height: '50px'}}/>
            <img src={reactN} className='img-fluid' style={{height: '50px'}}/>
            <img src={redux} className='img-fluid' style={{height: '50px'}}/>
            <img src={node} className='img-fluid' style={{height: '50px'}}/>
            <img src={ex} className='img-fluid' style={{height: '50px'}}/>
            <img src={mongo} className='img-fluid' style={{height: '50px'}}/>
            <img src={mysql} className='img-fluid' style={{height: '50px'}}/>
            <img src={git} className='img-fluid' style={{height: '50px'}}/>
            <img src={gith} className='img-fluid' style={{height: '50px'}}/>
        </div>
      </div>
    </section>
  )
}

export default Skills