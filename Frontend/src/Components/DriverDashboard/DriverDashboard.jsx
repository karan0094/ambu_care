import React from 'react'
import './driverDashboard.css'
import { useContext } from 'react'
import driverContext from '../../../context/driverContext.js'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from '@fortawesome/free-solid-svg-icons';

function DriverDashboard() {
  const{driver}=useContext(driverContext);
  console.log(driver);

  return (<div className='userBox'>
  {driver &&<>
   <div className='logged'>
     <FontAwesomeIcon icon={faUser} className='icon'/>
      <h2> Driver Details </h2>
     
   </div>
   <div className="userDetails">
   <div className="loggedbox">
   <div className='loggeduser username'>
   <p>Name:</p>
   <div className="name">
   <p>{driver.username} </p>
   </div>
 
</div>

<div className='loggeduser email'>
<p>Email Id:</p>
<div className="mail">
   <p>{driver.email} </p>
   </div>
</div>
<div className='loggeduser phoneNumber'>
<p>phoneNumber:</p>
   <div className="phone">
   <p>{driver.mobileNumber} </p>
   </div>
</div>
<div className='loggeduser dob'>
<p>AmbulanceType:</p>
   <div className="birth">
   <p>{driver.ambulanceType.toUpperCase()} </p>
   </div>
</div>
<div className="loggeduser ambulanceNumber">
    <p>Ambulance No:</p>
    <div className="ambNo">
      <p>{driver.ambulanceNumber}</p>
    </div>
</div>
</div>
</div>
</>
}
</div>

 )
}

export default DriverDashboard
