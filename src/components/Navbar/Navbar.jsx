import { useContext, useState } from "react";
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
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import logoTob from "../../assets/tobPNG.png";
import "./Navbar.css";
import { TobContext } from "../../context/TobContext";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const matches = useMediaQuery('(min-width:900px)');
  const handleMenuToggle = () => {
    setMenu(!menu);
  };
  const { darkMode, changeDarkMode } = useContext(TobContext);
  const textColor = darkMode ? "text-dark" : "text-white";

  return (
    <>
      <nav 
        className={`d-flex align-items-center py-4 px-3 ${matches ? 'hidden justify-content-around' : ''}`}
        style={{
          backgroundColor: darkMode ? 'white' : '#1d2a35'
        }}
      >
          <IconButton onClick={handleMenuToggle} sx={{ display: { sm: 'block', md: 'none' } }}>
            <MenuIcon htmlColor={darkMode ? 'black' : 'white'}/>
          </IconButton>

        {matches && <img src={logoTob} alt="Logo" className="logo" />}

        {matches && (
          <div className="d-flex justify-content-center align-items-center gap-3">
            <ListItemButton component="a" href="#home">
              <ListItemText primary="Home" className={`text-center ${textColor} text-bold`}/>
            </ListItemButton>
            <ListItemButton component="a" href="#about">
              <ListItemText primary="About me" className={`text-center ${textColor} text-bold`}/>
            </ListItemButton>
            <ListItemButton component="a" href="#projects">
              <ListItemText primary="Projects" className={`text-center ${textColor} text-bold`}/>
            </ListItemButton>
            <ListItemButton component="a" href="#skills">
              <ListItemText primary="Skills" className={`text-center ${textColor} text-bold`}/>
            </ListItemButton>
            <ListItemButton component="a" href="#contact">
              <ListItemText primary="Contact" className={`text-center ${textColor} text-bold`}/>
            </ListItemButton>
            <ListItemButton component="button" className={`text-center ${textColor} text-bold`}>
              {darkMode ? <><DarkModeOutlinedIcon onClick={changeDarkMode}/></> : <><WbSunnyOutlinedIcon onClick={changeDarkMode}/></>}
            </ListItemButton>
          </div>
        )}
      </nav>

      <Drawer anchor="left" open={menu} onClose={handleMenuToggle}>
        <List className="d-flex flex-column justify-content-around h-100 align-items-center" sx={{
          backgroundColor: darkMode ? 'white' : '#15202b',
          color: darkMode ? 'black': 'white'
        }}>
          <div>
            <ListItem onClick={handleMenuToggle} component="a" href="#home">
              <ListItemText primary="Home" className={`text-center ${textColor} text-bold`}/>
            </ListItem>
            <ListItem onClick={handleMenuToggle} component="a" href="#about">
              <ListItemText primary="About me" className={`text-center ${textColor} text-bold`}/>
            </ListItem>
            <ListItem onClick={handleMenuToggle} component="a" href="#projects">
              <ListItemText primary="Projects" className={`text-center ${textColor} text-bold`}/>
            </ListItem>
            <ListItem onClick={handleMenuToggle} component="a" href="#skills">
              <ListItemText primary="Skills" className={`text-center ${textColor} text-bold`}/>
            </ListItem>
            <ListItem onClick={handleMenuToggle} component="a" href="#contact">
              <ListItemText primary="Contact" className={`text-center ${textColor} text-bold`}/>
            </ListItem>
            <ListItem className={`text-center d-flex justify-content-center`} sx={{cursor: 'pointer'}}>
              {darkMode ? <><DarkModeOutlinedIcon onClick={changeDarkMode}/></> : <><WbSunnyOutlinedIcon onClick={changeDarkMode}/></>}
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
