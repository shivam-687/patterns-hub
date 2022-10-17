import React, { useContext, useEffect } from 'react'
import { ThemeContext } from '../providers/theme-provider/ThemeContext'
import {MdOutlineDarkMode, MdLightMode} from 'react-icons/md'

const ThemToggler = () => {
    const darkTheme = 'coffee';
    const lightTheme = 'bumblebee';
    const {setTheme, theme, saveTheme} = useContext(ThemeContext);
    const changeTheme = () => {
        let th = theme;
        if(th === lightTheme){
            setTheme(darkTheme);
            // console.log("Dark Theme: ", theme)
            return 
        }else{
            setTheme(lightTheme)
            
        }
        // console.log("Theme: ", theme)
    }
    

    return (
        <button className='btn btn-square btn-ghost text-xl md:text-2xl' onClick={changeTheme}>{theme ===darkTheme? <MdOutlineDarkMode/> : <MdLightMode/>}</button>
    )
}

export default ThemToggler