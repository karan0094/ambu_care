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
import RoutingMachine from './Routing';
import { DraggableMarker } from './draggableMarker';
import { useList } from "@uidotdev/usehooks";
function Booking() {
  
  const socket= useMemo(()=>io("http://localhost:5000"),[])

  const [latitude, setLatitude] = useState(undefined);
  const [longitude, setLongitude] = useState(undefined);
  const navigate=useNavigate();
  const [canAcceptRide,setCanAcceptRide]=useState(0||parseInt(sessionStorage.getItem("canAcceptRide")));
  const [list, { set, push, removeAt, insertAt, updateAt, clear }] = useList([]);
  const [draggable,setDraggable]=useState(true);
  const [toggle,setToggle]=useState(false);
  // const [distance,setDistance]=useState(190);
  const[complete,setComplete]=useState(localStorage.getItem('complete')?Number(localStorage.getItem('complete')):0);
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
    socket.emit("locationChanged",{position:{lat:latitude,lng:longitude},id})
  }
 useEffect(
  
 ()=>{
  if(latitude && longitude){
  gpsUpdate(latitude,longitude)
 }
}
,[latitude,longitude]);

  function togglef(){
     setToggle(true);
     localStorage.setItem("canAcceptRide",1);
     setCanAcceptRide(1);
  }
  useEffect(()=>{
      
      const currentOngoingRide=axios.get("http://localhost:5000/api/v1/ride/dridedetails",
      {
        headers:{
          "Authorization":`Bearer ${JSON.parse(localStorage.getItem("driverData")).accessToken}`
        
      }}
      ).then(function(response){
          const rideArray=response.data.data;
          if(!localStorage.getItem("currentUserDetails") && rideArray.length>0){

            for(var i=0;i<rideArray.length;i++){
                       if(i.status==="driverAssigned" ){
                        localStorage.setItem("currentUserDetails",JSON.stringify(i));
                        localStorage.setItem("currentRide",1);
                        localStorage.setItem("canAcceptRide",0);
                      }
          }
        }
      })
      .catch((error)=>{
        console.log(error)
      })
    
        //Make an api call fetch the details of user 
        //get the dlocation details of current Ride 
    
  },[])

  useEffect(()=>{
  socket.on("connect",()=>{
      console.log("user connected",socket.id)
  })
  socket.on("cancelledByUser",(data)=>{
    localStorage.removeItem("currentUserDetails");
    localStorage.removeItem("canAcceptRide");
    localStorage.removeItem("complete")
    localStorage.removeItem("currentRide")
    alert(data);
    navigate("/driver/bookings")
  })
   
    
  
    return ()=>{
      socket.disconnect();
    }
  },[socket])
  useEffect(()=>{
    console.log(JSON.parse(localStorage.getItem("driverData")).driver)
  
   
    const event=JSON.parse(localStorage.getItem("driverData")).driver._id+JSON.parse(localStorage.getItem("driverData")).driver.ambulanceType
    console.log(event)
    if(localStorage.getItem("canAcceptRide")==="1"){ 
      socket.on(event,(data)=>{
         console.log(data);
         push(data);
       }
     )
     }
  },[socket])
  // const distancebtw=(currentDistance)=>{
  //   setDistance(currentDistance);
  // }
  const handleComplete=(service)=>{
    // if(distance>50){
    //   alert('patient is not near you');
    // }
    console.log(service);
    setComplete(0);
    localStorage.setItem("currentRide",0);
    localStorage.setItem("complete",0);
    localStorage.removeItem("currentUserDetails")
    socket.emit("rideCompleted",service._id);
  }
  const handleAccept=value=>()=>{
    
    if(localStorage.getItem("canAcceptRide")!=="1"){
      alert("First complete your Ride or click on canAcceptRide")
    }
    else{
      
      localStorage.setItem("currentRide",1);
    
    localStorage.setItem("currentUserDetails",JSON.stringify(list[value.index]));
    socket.emit("join_room",JSON.parse(localStorage.getItem("currentUserDetails")).user);
    const data={serviceId:value.id,driver:JSON.parse(localStorage.getItem("driverData")).driver._id};
    removeAt(value.index);
    socket.emit('requestAccepted',data);
    setComplete(1);
    localStorage.setItem("complete",1);
    localStorage.setItem("canAcceptRide",0)
  }}
  const handleDecline=value=>()=>{
    socket.emit("rejected",value.id);
    removeAt(value.index);
  }
  return (
    <div className='bookingpage'>
      <div className="requestContainer">
        {list.map((item,i)=>{
   return (     
   <div key={i} className="request">
          <div className="service">
            <p><b>ServiceId: </b>{item._id.substring(0,6)+"..."}</p>
          <p><b>Distance: </b>{Math.floor(item.calculated)>1000? (Math.floor(item.calculated/1000))+"Km":Math.floor(item.calculated)+"meter"}</p>
          <p><b>AmbulanceType: </b> {item.ambulanceType}</p>
          </div>
          <div className='acceptreject'>
            <button id='accept' onClick={handleAccept({id:item._id,index:i})}>Accept</button>
            <button id='reject' onClick={handleDecline({index:i,id:item._id})}> Reject</button>

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
      {toggle && latitude && longitude &&localStorage.getItem("currentRide")!=="1" &&  <DraggableMarker value={draggable} center={[latitude,longitude]}/>}
      {complete && latitude && longitude && localStorage.getItem("currentRide")==="1"  && <RoutingMachine user={[JSON.parse(localStorage.getItem("currentUserDetails")).userLocation.coordinates[0],JSON.parse(localStorage.getItem("currentUserDetails")).userLocation.coordinates[1]]} 
    
        driver={{lat:latitude,long:longitude}} />}
     
    </MapContainer>
    
    </div>
        
    {!complete? <button className='accept' onClick={()=>{dragger(); togglef();  }} >
             <p>Click To Accept Bookings</p>
        </button>:  <></>
      }
          { complete ? <button className='completed' onClick={()=>{handleComplete(JSON.parse(localStorage.getItem("currentUserDetails")))}}>
           <p>Complete Ride</p>
         </button >:<></>
          }
        </div>
       
       
      
    </div>
  )
}

export default Booking
