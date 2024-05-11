import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { doDriverLogin } from '../../authorization/udLogin.js';
import { useContext } from 'react';
import driverContext from '../../../context/driverContext.js'
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
export default function DriverLogin(props) {
  const navigate =useNavigate()
  const[loginDetail,setLoginDetail]=useState({
    email:"",
    password:""
  })
 
  const{setDvisible,setLogin}=useContext(driverContext);
  const handleChange=(e,name)=>{
  
    let value=e.target.value
    setLoginDetail({
      ...loginDetail,
      [name]:value
    })
  }
 

  const handleSubmit=async(e)=>
  {
    e.preventDefault();
    if(loginDetail.email.trim()=='' || loginDetail.password.trim()==''){
      alert("username or password is requied")
      return

    }
    console.log(loginDetail)
    try{
      
      const response= await axios.post("http://localhost:5000/api/v1/drivers/login",loginDetail)
      const data=response.data.data;
      // save the data to local storage
      const driverData= data;
      // console.log(driverData)
      doDriverLogin(driverData,()=>{
        setLogin(true)
        setDvisible(false)
        navigate("/driver/driverdashboard")
        
      });
     
    
     }
     catch(e){
      console.log(e);
     }

  }

  
  return(props.trigger) ? (
   
    <div className="card">
    <div className="login">
    <div className="write">
        <p className="log">Login</p>
        <p className="closebutton">  <button onClick={()=>props.setTrigger(false)}>X</button></p>
    </div>
    <form onSubmit={handleSubmit}>
    <div className="userid">
   
    <input type="lemail" id="lemail" value={loginDetail.email} onChange={(e)=>handleChange(e,'email')} placeholder='Email'/>
    <label htmlFor="lemail">Email</label>
   
   
    </div>
    <div className="pass">
   
    <input type="password" id="lpassword" value={loginDetail.password} onChange={(e)=>handleChange(e,'password')} placeholder='Password'/>
    <label htmlFor="password">Password</label>
    </div>
  
    <div className="Forgrem Remf">
        <div className="Remember">
        <input type="checkbox" id="remb" />
        <label htmlFor="remb">Remember me</label>
        </div>
        <div className="forget">
        <NavLink to="/forget" className="forgoption" style={({isActive})=>{return{ fontWeight:isActive?"bold":"",color:isActive?"purple":"",};}
        }>forget Password?</NavLink>
        </div>
    </div>
    <div className="button">
        <button type="submit" >LogIn</button>
    </div>
    </form>
    </div>
    </div>
     
  
    ):
    <>
   
  </>
   
}
   

