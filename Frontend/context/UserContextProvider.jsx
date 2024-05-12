import React, { useState } from "react";
import userContext from "./userContext";
import { getCurrentUser, isUserLoggedIn } from "../src/authorization/udLogin";
const UserContextProvider=({children})=>{
    const [user,setUser]=useState(null)
    const[Visible,setVisible]=useState(false);
    const[position,setPosition]=useState([51.505,-0.09])
    const[login,setlogin]=useState(isUserLoggedIn);
    return(
    <userContext.Provider value={{user,setUser,Visible,setVisible,login,position,setPosition,setlogin}}>
      {children}  </userContext.Provider>
    )
}

export default UserContextProvider