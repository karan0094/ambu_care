import React, { useState } from 'react'
import './login.css'
import axios from 'axios';
import { NavLink,Navigate, redirect, useNavigate } from 'react-router-dom';
import { doUserLogin } from '../../authorization/udLogin';
import userContext from '../../../context/userContext';
import { useContext } from 'react';
function Login(props) {
  const[loginDetail,setLoginDetail]=useState({
    email:"",
    password:""
  })
  const{setVisible,setlogin}=useContext(userContext)
  const navigate =useNavigate()
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
      
     const response= await axios.post("http://localhost:5000/api/v1/users/login",loginDetail)
      const data=response.data.data;
      const userData=data
      // save the data to local storage
      doUserLogin(userData,()=>{
        setlogin(true)
        setVisible(false)
        navigate("/user/userdashboard")
        
      });
     
    
     }
     catch(e){
      console.log(e);
     }

  }

  // const redirectUser=function(){
  //   if(!user) return <Navigate to="/user/dashboard"/>
  //   return <Navigate to="/user/dashboard"/>
  // }
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

export default Login;