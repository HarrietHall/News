import { createContext, useState} from "react";

export const ThemeContext = createContext()


export const ThemeProvider = props => {
    const [theme, setTheme]= useState("")
    return (
        <ThemeContext.Provider value={{theme, setTheme}} >
        {props.children}
        </ThemeContext.Provider>
    )
}