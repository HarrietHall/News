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

