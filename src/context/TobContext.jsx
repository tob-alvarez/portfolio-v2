import { createContext, useState } from "react";

export const TobContext = createContext();

// eslint-disable-next-line react/prop-types
const Provider = ({ children }) => {

    const [darkMode, setDarkMode] = useState(false);

    const changeDarkMode = () =>{
        setDarkMode(!darkMode)
    }

    return (
        <TobContext.Provider
            value={{
                darkMode,
                changeDarkMode
            }}
        >
        {children}
        </TobContext.Provider>
    );
    };
    
    export default Provider;