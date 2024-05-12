import React, { useContext, useEffect, useState } from 'react'
import './Dashboard.css'
import userContext from '../../../context/userContext'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from '@fortawesome/free-solid-svg-icons';

function Dashboard() {
  // const [user,setUser]=useState(undefined)
  // useEffect(()=>{
  //   setUser(getCurrentDetail())
  // },[user])

  const {user}=useContext(userContext)

  return (<div className='userBox'>
   {user &&<>
    <div className='logged'>
      <FontAwesomeIcon icon={faUser} className='icon'/>
       <h2> User Details </h2>
      
    </div>
    <div className="userDetails">
    <div className="loggedbox">
    <div className='loggeduser username'>
    <p>Name:</p>
    <div className="name">
    <p>{user.username} </p>
    </div>
  
 </div>

 <div className='loggeduser email'>
 <p>Email Id:</p>
 <div className="mail">
    <p>{user.email} </p>
    </div>
 </div>
 <div className='loggeduser phoneNumber'>
 <p>phoneNumber:</p>
    <div className="phone">
    <p>{user.phoneNumber} </p>
    </div>
 </div>
 <div className='loggeduser dob'>
 <p>Birth Date:</p>
    <div className="birth">
    <p>{user.dob} </p>
    </div>
 </div>
 </div>
 </div>
 </>
}
 </div>

  )
}

export default Dashboard

