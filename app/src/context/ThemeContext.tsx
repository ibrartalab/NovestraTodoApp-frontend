import type React from "react";
import { createContext, useState } from "react";

type color = "bg-gray-50" | "bg-black";
type textColor = "text-balck" | "text-white"

interface ThemeContextType{
    theme:color,
    text:textColor,
    setTheme: React.Dispatch<React.SetStateAction<color>>,
    setText: React.Dispatch<React.SetStateAction<textColor>>
}

interface ThemeContextProviderType{
    children: React.ReactNode
}

const ThemeContext = createContext<ThemeContextType>({
    theme:'bg-gray-50',
    text:'text-balck',
    setTheme: () => {},
    setText: () => {}
})

const ThemeContextProvider = ({children}: ThemeContextProviderType) => {
    const [theme,setTheme] = useState<color>('bg-gray-50');
    const [text,setText] = useState<textColor>('text-balck');

    return(
        <ThemeContext.Provider value={{theme,text,setText,setTheme}}>
            {children}
        </ThemeContext.Provider>
    )
};

export {ThemeContext}

export default ThemeContextProvider