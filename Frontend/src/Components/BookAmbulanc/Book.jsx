import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruckMedical } from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from 'react-router-dom';
import Mapd from "../Map/Mapd.jsx"
import './Book.css'
function Book() {
    const[ambulanceType,setAmbulanceType]=useState(null)
    const navigate=useNavigate();
    function clickedBook(ambulance){
        setAmbulanceType(ambulance);
        console.log(ambulanceType)
        sessionStorage.setItem("ambulance",ambulance)
        navigate("/user/Mapd")
    }
  return (
  
        
  
  
  <div className="cont">
        <h1>Our Ambulance Services</h1>
        <div className="rown">
            <div className="services">
            <FontAwesomeIcon icon={faTruckMedical} className="icon"/>
                <h2>Basic Life Support(BLS)</h2>
                <p>BLS ambulance are equipped with basic medical equipment </p>
                <button className="bookAmbulance" onClick={()=>clickedBook("Bls")}>Book Now</button>
            </div>
            <div className="services">
            <FontAwesomeIcon icon={faTruckMedical} className="icon"/>
                <h2>Patient Transfer</h2>
                <p>Use to transfer patient who require non-emergency medical transportation</p>
                <button className="bookAmbulance" onClick={()=>clickedBook("PatientTransfer")}>Book Now</button>
            </div>
            <div className="services">
            <FontAwesomeIcon icon={faTruckMedical} className="icon" />
                <h2>Advance Life Support</h2>
                <p>equipped with advance medical equipment such as cardiac monitor and ventilators</p>
                <button className="bookAmbulance" onClick={()=>clickedBook("ALs")}>Book Now</button>
            </div>
            <div className="services">
            <FontAwesomeIcon icon={faTruckMedical} className="icon"/>
                <h2>Dead Body</h2>
                <p>Dead Bodyambulaces are used to transport deceased patient to funeral homes</p>
                <button className="bookAmbulance" onClick={()=>clickedBook("deadBody")}>Book Now</button>
            </div>
        </div>
    </div>
   
  )
}

export default Book


















