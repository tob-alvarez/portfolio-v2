/* eslint-disable react/no-unescaped-entities */
import "./AboutMe.css";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import EmailIcon from '@mui/icons-material/Email';
import logo from "../../assets/caraSaludo.webp";
import { Button } from "@mui/material";
import { useContext } from "react";
import { TobContext } from "../../context/TobContext";

const AboutMe = () => {

    const { darkMode } = useContext(TobContext);
    const textColor = darkMode ? "text-dark" : "text-white";

    return (
        <section className="container py-5 w-100">
            <div className="row">
                <div className="col-md-6 d-flex justify-content-center align-items-center">
                    <img src={logo} className="caraAbout mb-5" />
                </div>
                <div className="col-md-6 d-flex flex-column gap-3">
                    <h2 id="about" className={`seccion ${textColor}`}>
                        About Me
                    </h2>
                    <p className={`introduction ${textColor}`}>
                        I'm a fullstack developer driven by a passion for crafting
                        user-friendly interfaces. My focus is on blending design and
                        functionality to create seamless digital experiences. Constantly
                        exploring new technologies, I aim to bring innovation and excellence
                        to every project. Let's build something exceptional together.
                    </p>
                    <div className={`d-flex justify-content-start gap-2 flex-wrap ${textColor}`}>
                        <Button     
                            variant="outlined" 
                            color="inherit"
                            href="https://github.com/tob-alvarez"
                            target="_blank"  
                            rel="noopener noreferrer"
                        >
                            <GitHubIcon />
                            <p className={`text-decoration-none ${textColor} ps-2 m-0`}>Github</p>
                        </Button>
                        <Button 
                            variant="outlined" 
                            href="https://www.linkedin.com/in/tobdeveloper"
                            target="_blank"  
                            rel="noopener noreferrer"
                        > 
                            <LinkedInIcon />
                            <p className={`text-decoration-none ${textColor} ps-2 m-0`}>
                                LinkedIn
                            </p>
                        </Button>
                        <Button 
                            variant="outlined" 
                            color="error"
                            href="https://drive.google.com/file/d/1iGq5qqbtBpc7B9EMdYrdzPl3lSoOj5ZX/view?usp=drive_link"
                            target="_blank"  
                            rel="noopener noreferrer">
                            <ContactPageIcon />
                            <p className={`text-decoration-none ${textColor} ps-2 m-0`}>Resume</p>
                        </Button>
                        <Button variant="outlined" color="success" onClick={() =>window.location.href = '#contact'}>
                            <EmailIcon />
                            <p className={`text-decoration-none ${textColor} ps-2 m-0`}>Contact</p>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutMe;
