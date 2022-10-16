import React, { PropsWithChildren, useEffect, useState } from 'react'
import { ThemeContext } from './ThemeContext';

const ThemeProvider = (props: PropsWithChildren<{}>) => {
    const [theme, setTheme] = useState<string>('');
    
    useEffect(() => {
     const savedTheme = localStorage.getItem('theme');
     if(savedTheme){
        setTheme(savedTheme)
     }
    }, [])
    
    useEffect(() => {
    saveTheme(theme);
    }, [theme])
    

    const saveTheme = (name: string)=> {
        localStorage.setItem('theme', name)
    }

  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
        <div data-theme={theme}>
            {props.children}
        </div>
    </ThemeContext.Provider>
  )
}

export default ThemeProvider