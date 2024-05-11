import React,{useEffect, useState,useMemo} from 'react'
import './Booking.css'
import {useNavigate,Outlet} from 'react-router-dom';
import axios  from 'axios';
import io from "socket.io-client"
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from 'react-leaflet'
import { DraggableMarker } from './draggableMarker';
import { useList } from "@uidotdev/usehooks";
function Booking() {
  const socket= useMemo(()=>io("http://localhost:5000"),[])
  const [latitude, setLatitude] = useState(51.505);
  const [longitude, setLongitude] = useState(-0.09);
  const navigate=useNavigate();
  const [canAcceptRide,setCanAcceptRide]=useState(0);
  const [list, { set, push, removeAt, insertAt, updateAt, clear }] = useList([{_id:"123123jkjkl1j",ambulanceType:"Als",calculated:'78 km'}]);
  const [draggable,setDraggable]=useState(true);
  const [toggle,setToggle]=useState(false);
  useEffect(()=>{
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position)=>{
       setLatitude(position.coords.latitude)
       setLongitude(position.coords.longitude) 
      },(error)=>{
        alert("position not given",error)

      })
    }
  },[])
  function dragger(){
    setDraggable(false);
  }
  const gpsUpdate=(latitude,longitude)=>{
    const id=JSON.parse(localStorage.getItem("driverData")).driver._id;
    socket.emit("locationChanged",{latitude,longitude,id})
  }
 useEffect(
  
 ()=>{
  gpsUpdate(latitude,longitude)
 }
,[latitude,longitude]);

  function togglef(){
     setToggle(true);
  }

  useEffect(()=>{
  socket.on("connect",()=>{
      console.log("user connected",socket.id)
  })
   console.log(JSON.parse(localStorage.getItem("driverData")).driver)
   const event=JSON.parse(localStorage.getItem("driverData")).driver._id+JSON.parse(localStorage.getItem("driverData")).driver.ambulanceType
   console.log(event)
   if(localStorage.getItem("canAcceptRide")==1){ 
   socket.on(event,(data)=>{
      console.log(data);
      add(data);
    })
  }
    return ()=>{
      socket.disconnect();
    }
  },[socket])
  const handleAccept=value=>()=>{
    if(localStorage.getItem("canAcceptRide")==1){
      alert("First complete your Ride or click on canAcceptRide")
    }
    else{
    const data={serviceId:value.id,driver:JSON.parse(localStorage.getItem("driverData")).driver._id};
    removeAt(value.index);
    socket.emit('requestAccepted',data);
    setCanAcceptRide(0);
    localStorage.setItem("canAcceptRide",canAcceptRide)
  }}
  const handleDecline=value=>()=>{
    console.log(value);
    removeAt(value);
  }
  return (
    <div className='bookingpage'>
      <div className="requestContainer">
        {list.map((item,i)=>{
   return (     
   <div key={i} className="request">
          <div className="service">
            <p><b>ServiceId: </b>{item._id}</p>
          
         
          <p><b>Distance: </b>{item.calculated}</p>
          <p><b>AmbulanceType: </b> {item.ambulanceType}</p>
          </div>
          <div className='acceptreject'>
            <button id='accept' onClick={handleAccept({id:item._id,index:i})}>Accept</button>
            <button id='reject' onClick={handleDecline(i)}> Reject</button>

          </div>
       
        </div>
   )
})}
      </div>
    <div className='acceptbooking'>
          <div className='driverMap'> 
       <MapContainer className="containera" center={[51.505,-0.09]} zoom={13} style={{ height: "450px", width:"800px" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      /> 
      {toggle && latitude && longitude &&  <DraggableMarker value={draggable} center={[latitude,longitude]}/>}
    </MapContainer>
    
    </div>
        
          <button className='accept' onClick={()=>{dragger(); togglef(); ()=>{setCanAcceptRide(1) }; ()=>{ localStorage.setItem("canAcceptRide",canAcceptRide)}}} >
          Click To Accept Bookings
        </button>
      
        </div>
       
      
    </div>
  )
}

export default Booking
