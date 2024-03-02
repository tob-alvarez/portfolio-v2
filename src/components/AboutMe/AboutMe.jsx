/* eslint-disable react/no-unescaped-entities */
import './AboutMe.css'
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import logo from '../../assets/tobPNG.png'
import { ListItemButton } from '@mui/material';

const AboutMe = () => {


  return (
    <section className="container my-5 py-5 w-100">
        <div className='row'>
            <div className='col-md-6 d-flex justify-content-center align-items-center'>
                <img src={logo} className='my-5 py-5'/>
            </div>
            <div className='col-md-6 d-flex flex-column gap-3'>
                <h2 id="about" className="seccion">About Me</h2>
                <p className='introduction'>I'm a frontend developer driven by a passion for crafting user-friendly interfaces. My focus is on blending design and functionality to create seamless digital experiences. Constantly exploring new technologies, I aim to bring innovation and excellence to every project. Let's build something exceptional together.</p>
                <div className='d-flex justify-content-end'>
                    <ListItemButton component="a" href="#home">
                        <GitHubIcon/>
                        <p className='text-decoration-none text-dark ps-2 m-0'>Github</p>
                    </ListItemButton>
                    <ListItemButton component="a" href="#home">
                        <LinkedInIcon/>
                        <p className='text-decoration-none text-dark ps-2 m-0'>LinkedIn</p>
                    </ListItemButton>
                    <ListItemButton component="a" href="#home">
                        <ContactPageIcon/>
                        <p className='text-decoration-none text-dark ps-2 m-0'>Resume</p>
                    </ListItemButton>
                </div>
            </div>
        </div>
    </section>
  )
}

export default AboutMe