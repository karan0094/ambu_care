
import React from 'react'
import { useState } from 'react';
import './Register.css'

import axios from 'axios'
import { Navigate, redirect } from 'react-router-dom';
export default function RegisterUser() {
  const[registered,setRegistered]=useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phoneNumber:'',
    dob:'',
    password: '',
  });
  const[temp,conf]=useState("");
  const handleCchange=(e)=>{
    conf(e.target.value);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };         
 const checkValidation=()=>{
  if(formData.username.trim()=='' ||formData.password.trim()=='' ||formData.phoneNumber.trim()=='' ||formData.email.trim()==''){
    alert("fill out all fields");
  return true;
  }
  if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)==false){
    alert("Invalid email");
    return true;
  }
  if(formData.phoneNumber.charAt(0)=='0' || formData.phoneNumber.length<10){
    alert("invalid phone number")
    return true;

  }
  if(formData.password!==temp){
    console.log(formData.password,temp)
    alert("confpassword and password should be same");
    return true;
  }
}

  const handleSubmit = async(e) => {
    if(checkValidation()==true) return;
    
    e.preventDefault();
   try{
    // alert("submitted");
   
    const url = 'http://localhost:5000/api/v1/users/register'
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    };
    const response= await fetch(url, requestOptions)
    if(response.ok)  {
      setRegistered(true)
      const jData =await response.json();
      const data=jData.data
      console.log(data);y
   }
   }
   catch(e){
    alert(e);
   }
  };
  if(registered){
    return <Navigate to="/"/>
  }
 
  return (
    
    <div className="contain">
    <div className="centered">
      <div className="signup-container">
        <h2 className="title">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username" className="label">Username</label>
            <input type="text" id="username" name="username" className="input" value={formData.username} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="label">Email</label>
            <input type="email" id="email" name="email" className="input" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber" className="label">Phone Number</label>
            <input type="tel" id="phoneNumber" name="phoneNumber" className="input" value={formData.phoneNumber} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="dob" className="label">Date Of Birth</label>
            <input type="date" id="dateid" name="dob" className="input" value={formData.date} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="label">Password</label>
            <input type="password" id="password" name="password" className="input" value={formData.password} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword" className="label">Confirm Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" className="input" value={formData.confirmPassword} onChange={handleCchange} required />
          </div>
          <button type="submit" className="submit-btn">Sign Up</button>
        </form>
      </div>
    </div>
  </div>

  )
}
