import React from 'react'
import { isDriverLoggedIn } from '../../authorization/udLogin'
import { NavLink, Navigate, Outlet } from 'react-router-dom'
import { useState } from 'react'
// import userContext from "../../context/userContext";



function Driver() {
   
    
    const [isOpen, setisOpen] = useState(true)
    const toggle=function(){
      setisOpen(!isOpen)
    }
    // const[isLog,setisLog]=useState(true)
    
    
    if(isDriverLoggedIn()==true){
      // useEffect(()=>{
      //   setLogin(true)
      // },[])
    
    return <div className='sidep'> 
   
    <div className='sidec'> 
    <div className='sidetoggle'> 
  <button className={isOpen?'toggle-button slidetoggle':'toggle-button '} onClick={toggle}>
      ☰
    </button>
      
  </div>
    <div className={isOpen ? 'sidebar open' : 'sidebar'}>
    
    <ul>
   <li><NavLink to="/driver/driverdashboard" className="navoption" style={({isActive})=>{return{ fontWeight:isActive?"bold":"",};}
        }>DriverDetails</NavLink></li> 
    <li> <NavLink to="/driver/bookings" className="navoption" style={({isActive})=>{return{ fontWeight:isActive?"bold":"",};}
        }>Bookings </NavLink></li>
        <li>
     <NavLink to="/driver/NearHospitals" className="navoption" style={({isActive})=>{return{ fontWeight:isActive?"bold":"",};}
        }>Booking History </NavLink></li>
     
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

export default Driver