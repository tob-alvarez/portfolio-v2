import { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  ListItemButton,
} from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuIcon from "@mui/icons-material/Menu";
import logoTob from "../../assets/tobPNG.png";
import "./Navbar.css";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const matches = useMediaQuery('(min-width:900px)');
  const handleMenuToggle = () => {
    setMenu(!menu);
  };

  return (
    <>
      <nav className={`d-flex align-items-center mt-4 px-3 ${matches ? 'hidden justify-content-around' : ''}`}>
          <IconButton onClick={handleMenuToggle} sx={{ display: { sm: 'block', md: 'none' } }}>
            <MenuIcon />
          </IconButton>

        {matches && <img src={logoTob} alt="Logo" className="logo" />}

        {matches && (
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
        )}
      </nav>

      <Drawer anchor="left" open={menu} onClose={handleMenuToggle}>
        <List className="d-flex flex-column justify-content-around h-100">
          <div>
            <ListItem onClick={handleMenuToggle} component="a" href="#home">
              <ListItemText primary="Home" className="text-center text-dark text-bold"/>
            </ListItem>
            <ListItem onClick={handleMenuToggle} component="a" href="#about">
              <ListItemText primary="About me" className="text-center text-dark text-bold"/>
            </ListItem>
            <ListItem onClick={handleMenuToggle} component="a" href="#projects">
              <ListItemText primary="Projects" className="text-center text-dark text-bold"/>
            </ListItem>
            <ListItem onClick={handleMenuToggle} component="a" href="#skills">
              <ListItemText primary="Skills" className="text-center text-dark text-bold"/>
            </ListItem>
            <ListItem onClick={handleMenuToggle} component="a" href="#contact">
              <ListItemText primary="Contact" className="text-center text-dark text-bold"/>
            </ListItem>
          </div>
          <p className="text-center">
            Tob Developer © 2024
          </p>
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
