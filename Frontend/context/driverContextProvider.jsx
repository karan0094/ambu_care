import React, { useState } from "react";
import driverContext from "./driverContext";
import { getCurrentDriver, isDriverLoggedIn} from "../src/authorization/udLogin";
const driverContextProvider=({children})=>{
    const [driver,setDriver]=useState(null)
   
    const[dvisible,setDvisible]=useState(false);
    const[Login,setLogin]=useState(isDriverLoggedIn);
    return(
    <driverContext.Provider value={{driver,setDriver,dvisible,setDvisible,Login,setLogin}}>
      {children}  </driverContext.Provider>
    )
}

export default driverContextProvider