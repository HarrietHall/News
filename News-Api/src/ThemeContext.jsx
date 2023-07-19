import { createContext, useState} from "react";

export const ThemeContext = createContext()


export const ThemeProvider = props => {
    const [theme, setTheme]= useState("dark")
    console.log(theme)
    return (
         
        <ThemeContext.Provider value={{theme, setTheme}} >
        {props.children}
     
        </ThemeContext.Provider>
    )
}