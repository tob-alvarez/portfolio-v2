import './Projects.css'
import Paper from '@mui/material/Paper';

const Projects = () => {

  return (
    <section className='projectsSection mt-5 pt-5 container'>
        <h2 className='seccion'>Projects</h2>
        <div className='d-flex mt-5 w-100 justify-content-around flex-wrap'>
            <Paper elevation={4} className='project'>
                <h2>hola</h2>
            </Paper>
            <Paper elevation={4} className='project'>
                <h2>hola</h2>
            </Paper>
            <Paper elevation={4} className='project'>
                <h2>hola</h2>
            </Paper>
        </div>
    </section>
  )
}

export default Projects