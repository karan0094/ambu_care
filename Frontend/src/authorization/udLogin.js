import axios from "axios";



// is user LoggedIn
export const isUserLoggedIn = () => {
  const data = localStorage.getItem("userData");
  
  if (data == null) return false ;
  return true;
};

//is driver logged in
export const isDriverLoggedIn = () => {
  // console.log(localStorage.getItem("driverData"));
  const data = localStorage.getItem("driverData");
  if (data == null) return false;
 
  return true;
};
// doLogin
export const doDriverLogin = (data, next) => {
  localStorage.setItem("driverData", JSON.stringify(data));
  next();
};

export const doUserLogin=(data, next)=>{
  localStorage.setItem("userData",JSON.stringify(data));
  next();
}

// doLogout
export const driverLogout = async(next) => {
    // console.log(typeof  localStorage.getItem("driverData"))
  // console.log(JSON.parse(localStorage.getItem("driverData")).accessToken)
  
    const response=await axios.post("http://localhost:5000/api/v1/drivers/logout",{},{
      headers:{
       "Authorization":`Bearer ${JSON.parse(localStorage.getItem("driverData")).accessToken}` 
      }
    }).then((res)=>{
      localStorage.removeItem("driverData");
    next();    
    }).catch((error)=>{
     
      localStorage.removeItem("driverData");
      next();
    })
    
   
 
  
};



export const userLogout=async(next)=>{
   
    const response=await axios.post("http://localhost:5000/api/v1/users/logout",{},{
      headers:{
        "Authorization":`Bearer ${JSON.parse(localStorage.getItem("userData")).access}`
      
    }}).then((response)=>{
      localStorage.removeItem("userData");
      next();
    }).catch((error)=>{
      localStorage.removeItem("userData");
      console.log(error)
      next();
    })
  
 
}
// get currentUser

export const getCurrentUser = () => {
  if (isUserLoggedIn()) {
    return JSON.parse(localStorage.getItem("userData")).user;
  } else {
    return undefined;
  }
};

//getCurrentDriver

export const getCurrentDriver = () => {
  if (isDriverLoggedIn()) {
    return JSON.parse(localStorage.getItem("driverData")).driver;
  }
};

