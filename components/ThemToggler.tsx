import React, { useContext, useEffect } from 'react'
import { ThemeContext } from '../providers/theme-provider/ThemeContext'
import {MdOutlineDarkMode, MdLightMode} from 'react-icons/md'

const ThemToggler = () => {
    const darkTheme = 'coffee';
    const lightTheme = 'bumblebee';
    const {setTheme, theme} = useContext(ThemeContext);
    const changeTheme = () => {
        console.log("Theme: ", theme)
        if(theme !== darkTheme){
            setTheme(darkTheme);
            return 
        }
        setTheme(lightTheme)
    }

    return (
        <button className='btn btn-square btn-ghost text-xl md:text-2xl' onClick={changeTheme}>{theme ===darkTheme? <MdOutlineDarkMode/> : <MdLightMode/>}</button>
    )
}

export default ThemToggler