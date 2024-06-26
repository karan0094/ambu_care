import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './Components/Home/Home'
import Layout from './Layout'
import About from './Components/About/About'
// import Login from './Components/Login/Login'
import Services from './Components/Services/Services'
import Forget from './Components/Forget/Forget'
import JoinUs from './Components/JoinUs/JoinUs'
import RegisterUser from './Components/RegisterUser/RegisterUser' 
import { Route,RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import User from './Components/User/User.jsx'
import Dashboard from './Components/Dashboard/Dashboard.jsx'
import Mapd from './Components/Map/Mapd.jsx'
import Book from './Components/BookAmbulanc/Book.jsx'
import UserContextProvider from '../context/UserContextProvider.jsx'
import DriverContextProvider from '../context/driverContextProvider.jsx'
import Booking from './Components/Booking/Booking.jsx'
import DriverDashboard from './Components/DriverDashboard/DriverDashboard.jsx'
import Driver from './Components/Drivers/Driver.jsx'
import Requests from './Components/Requests/Requests.jsx'
import Searching from './Components/Driversearching/Searching.jsx'
import Rides from './Components/UserRides/Rides.jsx'
import Report from './Components/ReportAccident/Report.jsx'
import CarRegistration from './Components/Carregistration/CarRegistration.jsx'
import Nearest from './Components/nearest hospitals/nearest.jsx'
const router=createBrowserRouter(
  createRoutesFromElements(
    
    <Route path='/' element={<Layout/>}>
      <Route path="" element={<Home/>}/>
      <Route path='about/' element={<About/>}/>
      {/* <Route path="Login/" element={<Login/>}/> */}
      <Route path="forget/" element={<Forget/>}/>
      <Route path="Joinus/" element={<JoinUs/>}/>
    
      <Route path="RegisterUser/" element={<RegisterUser/>}/>
      <Route path="Services/" element={<Services/>}/>
      
      {/* <userContextProvider> */}
    {/* <Route element={<UserContextProvider/>}> */}
      <Route path="user/" element={<User/>}>
      <Route path="nearestHospitals/" element={<Nearest/>}/>
        <Route path="bookambulance/" element={<Book/>}>
        
          </Route>
          <Route path="carregister" element={< CarRegistration/>}/>
          <Route path="reportaccidents" element={<Report/>}/>
          <Route path="ambulancesearchandride" element={<Searching/>}/>
          <Route path="Mapd" element={<Mapd/>}/>
        <Route path="userdashboard" element={<Dashboard/>}/>
        <Route path="rides" element={<Rides/>}/>
        </Route>
        <Route path="driver/" element={<Driver/>}>
        <Route path="bookings/" element={<Booking/>}>
          <Route path="requests" element={<Requests/>}/> 

         
          </Route>
        <Route path="driverdashboard" element={<DriverDashboard/>}/>
        </Route>
        {/* </Route> */}
      
    </Route>
 

  )
)
ReactDOM.createRoot(document.getElementById('root')).render(
  
  <DriverContextProvider>
  <UserContextProvider>
 
   <RouterProvider router={router}/>
  </UserContextProvider>
  </DriverContextProvider>
  

)
