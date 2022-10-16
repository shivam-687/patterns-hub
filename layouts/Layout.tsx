import React from 'react'
import { ToastContainer } from 'react-toastify'
import Footer from '../components/Footer'
import Navigation from '../components/Navigation'
import ThemeProvider from '../providers/theme-provider'

function Layout(props: React.PropsWithChildren<{}>) {
  return (
    <>
    <ThemeProvider>
    <Navigation/>
    <ToastContainer/>
    {
        props.children
    }
    <Footer/>
    </ThemeProvider>

    </>
  )
}

export default Layout