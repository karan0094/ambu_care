import React from 'react'
import { useState, useMemo, useEffect } from 'react'
import io from "socket.io-client"
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
function Searching(){
 
  const navigate=useNavigate();
  const socket= useMemo(()=>io("http://localhost:5000"),[])
  const location=useLocation();
  const{serviceId}=location.state;
  useEffect(()=>{
    socket.on("connect",()=>{
      console.log("user connected",socket.id)
  })
  socket.emit("join_room",serviceId);
  return ()=>{
    socket.disconnect();
  
  }
  },[])

  useEffect(()=>{
   
   
    socket.on("Ride_Assigned",data=>{
        navigate("/user/rides",{state:{data}});
    })
    socket.on("Cancelled",data=>{
      console.log("yaha tak aaya hu")
      alert(data);
      setTimeout(()=>{navigate("/user/bookambulance")},1000);
      //display the message and redirect after 3 seconds back to the page
    })
  }
    ,[socket])

  if(serviceId){
    return (
    <div className="searchandRide">
    <div className='search'>
       <div className="searchimage">
        <img src="../../../assests/Driverserching.gif" alt="gif not found" />
        </div>
        <div className="searchmessage">
            <p>Finding Nearest Ambulance</p>
        </div>
    </div>
    </div>
  )
}
}

export default Searching;