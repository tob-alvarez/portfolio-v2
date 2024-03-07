/* eslint-disable react/no-unescaped-entities */
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import logo from "../../assets/caraNotebook.webp";
import { Button } from "@mui/material";

const Contact = () => {

    const emailAddress = "tobdeveloper@gmail.com";

    const handleEmailClick = () => {
    const mailtoLink = `mailto:${emailAddress}`;
        window.location.href = mailtoLink;
    };

    return (
        <section className="container py-5 my-5 w-100">
            <div className="row">
                <div className="col-md-6 d-flex justify-content-center align-items-center">
                    <img src={logo} className="caraAbout mb-5" />
                </div>
                <div className="col-md-6 d-flex flex-column gap-3">
                    <h2 id="contact" className="seccion">
                        Contact
                    </h2>
                    <div className='d-flex gap-3'>
                        <Button variant='outlined' onClick={handleEmailClick}>Send <EmailIcon/></Button>
                        <Button 
                            variant="outlined" 
                            href="https://www.linkedin.com/in/tobdeveloper/"
                            target="_blank"  
                            rel="noopener noreferrer"
                        > 
                            <LinkedInIcon />
                            <p className="text-decoration-none text-dark ps-2 m-0">
                                LinkedIn
                            </p>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
