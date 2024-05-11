import React, { useEffect } from 'react'
import {useMap,Marker,Popup} from 'react-leaflet'
import { useState } from 'react';
import userContext from '../../../context/userContext';
import { useContext } from 'react';
function LocationMarker() {

    const {position,setPosition}=useContext(userContext);
    const map=useMap();
    useEffect(()=>{
        console.log("hello")
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((response)=>{
         setPosition([response.coords.latitude,response.coords.longitude])
      },(error)=>{
        alert(error)
      })
    }
    console.log(position)
},[])
    map.setView(position,13)
    return( <><Marker position={position}>
    <Popup>You are here</Popup>
    </Marker></>
  )}

export default LocationMarker
