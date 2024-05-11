import { Outlet } from 'react-router-dom'
import Header from './Components/Header/Header.jsx'
import Footer from './Components/Footer/Footer.jsx'

function Layout() {
  return (
    <>
    <Header/>
    <Outlet/>
    <Footer/> 
    </>
  )
}

export default Layout;