import logoTob from "../../assets/tobPNG.png";
import { ListItemButton, ListItemText } from "@mui/material";
import './Navbar.css'
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
    const matches = useMediaQuery('(min-width:600px)');


  return (
    <nav className={matches? 'd-flex justify-content-around align-items-center mt-4 px-3' : 'd-flex align-items-center mt-4 px-3'}>
      {!matches ? (
            <MenuIcon />
      ) : (
        <>
          <img src={logoTob} className="logo" />
          <div className="d-flex justify-content-center align-items-center gap-3">
            <ListItemButton component="a" href="#home">
              <ListItemText primary="Home" />
            </ListItemButton>
            <ListItemButton component="a" href="#about">
              <ListItemText primary="About me" />
            </ListItemButton>
            <ListItemButton component="a" href="#projects">
              <ListItemText primary="Projects" />
            </ListItemButton>
            <ListItemButton component="a" href="#skills">
              <ListItemText primary="Skills" />
            </ListItemButton>
            <ListItemButton component="a" href="#contact">
              <ListItemText primary="Contact" />
            </ListItemButton>
          </div>
        </>
      )}
    </nav>
  );
}

export default Navbar