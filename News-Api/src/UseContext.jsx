import { createContext, useState} from "react";

export const LayoutContext = createContext();

export const LayoutProvider = props => {
    const [layout, setLayout]= useState("")
    return (
        <LayoutContext.Provider value={{layout, setLayout}} >
        {props.children}
        </LayoutContext.Provider>
    )
}

export const ThemeContext = createContext()


export const ThemeProvider = props => {
    const [theme, setTheme]= useState("")
    return (
        <ThemeContext.Provider value={{theme, setTheme}} >
        {props.children}
        </ThemeContext.Provider>
    )
}

import { createContext, useState} from "react";

export const UserContext = createContext();

export const UserProvider = props => {
    const [user, setUser]= useState("")
    return (
        <UserContext.Provider value={{user, setUser}} >
        {props.children}
        </UserContext.Provider>
    )
}