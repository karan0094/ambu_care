import React from 'react'
import './JoinUs.css'
import { useState,useRef } from 'react';
import {useNavigate} from "react-router-dom"

export default function JoinUs() {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    middleName: '',
    lastName: '',
    mobileNumber: '',
    email: '',
    ambulanceNumber: '',
    ambulanceType: '',
    organizationAffiliated: '',
    password:''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const[temp,conf]=useState("");
  const handleCchange=(e)=>{
    conf(e.target.value);
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
     // alert("submitted");
    
     const url = 'http://localhost:5000/api/v1/drivers/register'
     const requestOptions = {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(formData)
     };
     const response= await fetch(url, requestOptions)
     if(response.ok)  {
      navigate("/")
      //  setRegistered(true)
      
    }
  }
  catch(error){
    alert(error);
  }
};
  const section=useRef();
  const scrollHandler=(eleRef)=>{
    window.scrollTo({top:eleRef.current.offsetTop,behaviour:"smooth"});
  }
  return (
    <div className='joinus'>
      <div className="community">
        <div className="slogan">
        <h1 >Join As An Ambulance Service Driver</h1>
        <h3>Be a Saver</h3>

        <button className='Jobutton' onClick={()=>scrollHandler(section)}>Join us</button>
        </div>
        <div className="ambuphoto">
        <img src="../assests/Join.png" alt="" />
        </div>
      </div>
      <form className="form-contain"  ref={section} onSubmit={handleSubmit}>
      <div className="form-group">
        <label>User Name:</label>
        <input type="text" name="username" value={formData.username} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>First Name:</label>
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Middle Name:</label>
        <input type="text" name="middleName" value={formData.middleName} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Last Name:</label>
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Mobile Number:</label>
        <input type="text" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Ambulance Number:</label>
        <input type="text" name="ambulanceNumber" value={formData.ambulanceNumber} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Ambulance Type:</label>
        <input type="text" name="ambulanceType" value={formData.ambulanceType} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Organization Ambulance Affiliated With:</label>
        <input type="text" name="organizationAffiliated" value={formData.organizationAffiliated} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input type="text" name="password" value={formData.password} onChange={handleChange} />
      </div>
      <div className="form-group">
            <label htmlFor="confirmPassword" className="label">Confirm Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" className="input" value={formData.confirmPassword} onChange={handleCchange} required />
          </div>

      <button id='button' type="submit">Submit</button>
    </form>
      </div>

     
  )
}
