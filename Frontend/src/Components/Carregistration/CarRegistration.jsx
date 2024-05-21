import React from 'react'
import './car.css'
import { useState } from 'react';
import axios from 'axios';
function CarRegistration() {
    const [email, setEmail] = useState('');
    const [carNumber, setCarNumber] = useState('');

    const handleSubmit = async(e) => {
      e.preventDefault();
      const response=await axios.post("http://localhost:5000/api/v1/users/carregister",{
        user:JSON.parse(localStorage.getItem("userData")).user._id,
        carNumber:carNumber,
        guardianEmail:email
      },
      {
          headers:{
            "Authorization":`Bearer ${JSON.parse(localStorage.getItem("userData")).access}`
          
        }}
      ).then(res=>{
         alert("car registered");
      }).catch(error=>{
        alert(error);
      })
    };
  return (
    <div className="form-container">
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="email">Guardian Email ID:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="carNumber">Car Number:</label>
        <input
          type="text"
          id="carNumber"
          value={carNumber}
          onChange={(e) => setCarNumber(e.target.value)}
          required
        />
      </div>
      <button className ="carbut" type="submit">Submit</button>
    </form>
    </div>
  )
}

export default CarRegistration
