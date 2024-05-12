import React, { useContext } from 'react'
import {NavLink,  useNavigate} from 'react-router-dom'
import DriverLogin from '../DriverLogin/DriverLogin'
import UserLogin from '../Login/UserLogin'
import './Head.css'
import driverContext from '../../../context/driverContext'
import { userLogout,driverLogout} from '../../authorization/udLogin'
import userContext from '../../../context/userContext'

function Header() {
  const{Visible,setVisible,user,login,setlogin}=useContext(userContext)
  const{dvisible,setDvisible,driver,setLogin,Login}=useContext(driverContext);
 
  
  const navigate=useNavigate()
 
  const logoutDriver=function(){
    driverLogout(()=>{
      setLogin(false)
    })
    return navigate("/")
  }
  
  const logoutUser=function(){
    userLogout(()=>{
      setlogin(false)
    })
    return navigate("/")
  }
  return (
    <>
    <div className="navbar">
    <div className="logo">
      <img src="assests\_d6e5f5c7-a831-4072-af67-91f232e506db.jpg" alt="load your logo"/>
    </div> 
    <div className="options">
      
        <li >
          <NavLink to="/" className="navoption" style={({isActive})=>{return{ fontWeight:isActive?"bold":"",};}
        }>Home </NavLink>
        
        </li>
       
        <li> <NavLink to="/JoinUs" className="navoption" style={({isActive})=>{return{ fontWeight:isActive?"bold":""};}
        }>JoinUs </NavLink></li>
        
        
        <li> <NavLink to="/Services" className="navoption" style={({isActive})=>{return{ fontWeight:isActive?"bold":"",color:isActive?"#C70039":"",};}
        }>Services </NavLink></li>

<li> <NavLink to="/RegisterUser" className="navoption" style={({isActive})=>{return{ fontWeight:isActive?"bold":"",color:isActive?"#C70039":"",};}
        }>Register </NavLink></li>
       
         
       
        {login && 
        <>
        {user &&
        <li>
          <button className="Driverl">
            {user.username}
          </button>
        </li>
        }
        <li>
        
          <button className="Userl"onClick={logoutUser}>
            Logout
          </button>
        </li>
        
        
        </>
          
        }
        {
          (!login && !Login) && <>
        
        <li>
          <button className="Driverl" onClick={()=>setDvisible(true)}>DriverLogin</button>
          <DriverLogin trigger={dvisible} setTrigger={setDvisible}>
           
          </DriverLogin>
        </li>
        
        <li>
          <button className='Userl' onClick={()=>setVisible(true)}>UserLogin</button>
          <UserLogin trigger={Visible} setTrigger={setVisible}>
           
          </UserLogin>
        </li>
          
          
          
          </>
        }
        {
          Login &&  <>
          { driver &&
            <li>
            <button className="Driverl">
             {driver.username}
            </button>
            
          </li>
          }
          <li>
            <button className='Userl' onClick={logoutDriver}>
              logout
            </button>
          </li>
          
          
          </>
        }
       
   
    </div>
    </div>
    </>
  )

}

export default Header
