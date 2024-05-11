import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruckMedical } from '@fortawesome/free-solid-svg-icons';
import './Serve.css'
function Services() {

  return (
    <>
  
  <div class="cont">
        <h1>Our Ambulance Services</h1>
        <div class="rown">
            <div class="services">
            <FontAwesomeIcon icon={faTruckMedical} className="icon"/>
                <h2>Basic Life Support(BLS)</h2>
                <p>BLS ambulance are equipped with basic medical equipment </p>
            </div>
            <div class="services">
            <FontAwesomeIcon icon={faTruckMedical} className="icon"/>
                <h2>Patient Transfer</h2>
                <p>Use to transfer patient who require non-emergency medical transportation</p>
            </div>
            <div class="services">
            <FontAwesomeIcon icon={faTruckMedical} className="icon" />
                <h2>Advance Life Support</h2>
                <p>equipped with advance medical equipment such as cardiac monitor and ventilators</p>
            </div>
            <div class="services">
            <FontAwesomeIcon icon={faTruckMedical} className="icon"/>
                <h2>Dead Body</h2>
                <p>Dead Bodyambulaces are used to transport deceased patient to funeral homes</p>
            </div>
        </div>
    </div>
    </>
  )
}

export default Services


















