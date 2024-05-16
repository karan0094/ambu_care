import React from 'react'
import { isUserLoggedIn } from '../../authorization/udLogin'
import { NavLink, Navigate, Outlet } from 'react-router-dom'
import { useState } from 'react'


import './User.css'

function User() {
    
    
    const [isOpen, setisOpen] = useState(true)
    const toggle=function(){
      setisOpen(!isOpen)
    }
    console.log(isUserLoggedIn())
    if(isUserLoggedIn()==true){
    
    return <div className='sidep'> 
   
    <div className='sidec'> 
    <div className='sidetoggle'> 
  <button className={isOpen?'toggle-button slidetoggle':'toggle-button '} onClick={toggle}>
      ☰
    </button>
      
  </div>
    <div className={isOpen ? 'sidebar open' : 'sidebar'}>
    
    <ul>
   <li><NavLink to="/user/userdashboard" className="navoption" style={({isActive})=>{return{ fontWeight:isActive?"bold":"",};}
        }>UserDetails</NavLink></li> 
    <li> <NavLink to="/user/bookambulance" className="navoption" style={({isActive})=>{return{ fontWeight:isActive?"bold":"",};}
        }>Book Ambulance </NavLink></li>
        <li>
     <NavLink to="/user/NearHospitals" className="navoption" style={({isActive})=>{return{ fontWeight:isActive?"bold":"",};}
        }>Nearest Hospitals </NavLink></li>
     <li><NavLink to="/user/Emergency" className="navoption" style={({isActive})=>{return{ fontWeight:isActive?"bold":"",};}
        }>Emergency Contacts </NavLink>
    </li>
    <li><NavLink to="/user/rides" className="navoption" style={({isActive})=>{return{ fontWeight:isActive?"bold":"",};}
        }>Ambulances Ride </NavLink>
    </li>
   
    </ul>
  </div>
  </div>
      <div className='pages'>
    <Outlet/>
    </div>
  
    </div>

  }
  else{
     return <Navigate to={"/"}/>;
  }
  
}

export default User
