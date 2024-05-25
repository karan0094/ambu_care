// import React, { useRef, useState } from 'react'
// // import {GoogleMap,useLoadScript,MarkerF} from "@react-google-maps/api"
// // import { useMemo } from "react";


// import"leaflet/dist/leaflet.css";
// import {useMapEvents,Popup,Marker,MapContainer,TileLayer} from "react-leaflet";
// import { useEffect } from 'react';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// // function Mapd() {
// //   const { isLoaded } = useLoadScript({
// //     googleMapsApiKey: "AIzaSyCV2k6el5nOmEgHN1B2S5qMEJLeKC0SsQE"
// //   });
// //   const center = useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []);

// //   return (
// //     <div className="App">
// //       {!isLoaded ? (
// //         <h1>Loading...</h1>
// //       ) : (
// //         <GoogleMap
// //           mapContainerClassName="map-container"
// //           center={center}
// //           zoom={10}
// //         />
// //       )}
// //     </div>
// //   )
// // }
// // export default Mapd;

// export default function Mapd(){
  
//   const mapRef=useRef();
//   const [position, setPosition] = useState(null)
// //   useEffect(()=>{
// //     navigator.geolocation.getCurrentPosition((response)=>{
     
// //      setLat(response.coords.latitude)
// //      setLang(response.coords.longitude)
// //     })
 
// //  },[lat,lang])
//  const map= useMapEvents({
//   click() {
//     map.locate()
//   },
//   locationfound(e) {
//     setPosition(e.latlng)
//     map.flyTo(e.latlng,map.getZoom())
//   },
// })
  
// return (
//   <>
//   <MapContainer center={[51.5072 ,79.4591232]} zoom={13} >

//   <TileLayer
//     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//   />
//   <Marker position={position}>
//     <Popup>
//     {/* <FontAwesomeIcon icon="fas fa-ambulance" /> */}
//     user's location
//     </Popup>
//   </Marker>
// </MapContainer>
//  <div className="locate">
//   <button onClick={map}>Locate Me</button>
//  </div>
// </>
  
//   )
// }

import React from 'react'
import { useState,useEffect} from 'react'
import './Mapd.css'
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import userContext from '../../../context/userContext';
import { useContext } from 'react';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from 'react-leaflet'
import LocationMarker from './LocationMarker'
import { Axios } from 'axios'
// const socket = io.connect('http://localhost:5000')
export default function Mapd() {
  const navigate=useNavigate()
  const [ambulanceType, setambulanceType] = useState(undefined)
  const {position,setPosition}=useContext(userContext);
  const {service,setService}=useState(null)
  useEffect(()=>{
    const ambulance=sessionStorage.getItem("ambulance")
    if(!ambulance) navigate("/user/booking");
    else setambulanceType(ambulance);
   })
  //  useEffect(()=>{
  //   drivers.map(driver=>{
    
      

  //   })
  //  },[drivers])
  const [toggle,setToggle]=useState(false);
   const createRide=async()=>{
      // console.log(JSON.parse(localStorage.getItem("userData")).user._id)
      const data={
        user:JSON.parse(localStorage.getItem("userData")).user._id,
        userLocation:{type:"Point",coordinates:position},
        status:"requested",
        ambulanceType:sessionStorage.getItem("ambulance")

      }
      await axios.post("http://localhost:5000/api/v1/ride/service",data,{
        headers:{
          "Authorization":`Bearer ${JSON.parse(localStorage.getItem("userData")).access}`
        
      }}).then(
        (res)=>{
          
           console.log(res.data.data._id)
           navigate("/user/ambulancesearchandride",{state:{serviceId:res.data.data._id}});
        }
      )
      .catch((error)=>{
        console.log(error);
      })
   }
  return (
  <div className='paged'>
    <div className="type">
    <h2>{ambulanceType}</h2>
    </div>
    <div className='mapped'> 
       <MapContainer className="container" center={[51.505,-0.09]} zoom={13} style={{ height: "400px", width:"1000px" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      /> 
      {toggle && <LocationMarker/>}
    </MapContainer>
    
    </div>
    <div className='locateAndBookingButton'>
      <button className="bookambu" onClick={()=>{createRide()}}> BookAmbulance</button>
      <button  id="toggle" onClick={()=>{setToggle(true)}} >LocateMe</button>
      </div>
    </div>
  )

}