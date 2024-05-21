import React, { useEffect,useState } from 'react'
import axios from 'axios'
import './Rides.css'
import RoutingMachine from './RoutingMachin'
import {
    MapContainer,
    Marker,
    Popup,
    TileLayer,
  } from 'react-leaflet'
  import { useList } from '@uidotdev/usehooks'
  import { useMemo } from 'react'
 import { io } from 'socket.io-client'
 import { useLocation } from 'react-router-dom'
 import { useNavigate } from 'react-router-dom'
function Rides(props){
    const socket= useMemo(()=>io("http://localhost:5000"),[])
    const location=useLocation();
    const{data}=location.state
    
    const[driverId,setDriverId]=useState(location.state.data?location.state.data.driver:undefined);
    const [latitude, setLatitude] = useState(undefined);
    const [longitude, setLongitude] = useState(undefined);
    const navigate=useNavigate();
    

    const handleClick=(driverId)=>{
        setDriverId(driverId);
    }
   useEffect(()=>{
    socket.on("connect",()=>{
        console.log("user connected",socket.id)
       
    })
    socket.emit("join_room",String(driverId));
    socket.on('Completed',data=>{
        alert(data);
        navigate("/user/bookambulance");
    })
    return ()=>{
        socket.disconnect();
      
      }

   },[socket])
  
    useEffect(()=>{
       
        socket.on("Completed",(data)=>{
            alert(data);
            navigate("/user/bookambulance")
        })
      
        socket.on("Location_changed",(driver)=>{
            console.log(driver.location);
           setLatitude(driver.location.coordinates[0]);
           setLongitude(driver.location.coordinates[1]);
        })
      
    },[socket,latitude,longitude])
    const [list1, { set:set1, push:push1, removeAt:removeAt1, insertAt:insertAt1, updateAt:updateAt1, clear:clear1 }]=useList();
    const [list2, { set:set2, push:push2, removeAt:removeAt2, insertAt:insertAt2, updateAt:updateAt2, clear:clear2 }]=useList();
    useEffect(()=>{
        const response=axios.get("http://localhost:5000/api/v1/ride/uridedetails",
        {
            headers:{
              "Authorization":`Bearer ${JSON.parse(localStorage.getItem("userData")).access}`
            
          }}
        )
        .then(res=>{
            const data=res.data.data;
            console.log(data);
            for(var i=0;i<data.length;i++){
               
                if(data[i].status==="driverassigned"){
                   
                    push1(data[i]);
                }
                else{
                    push2(data[i]);
                }
            }
           
            
        }).catch(error=>{
            console.log(error);
        })

    },[])
  
    return (
    <div className="rideMaps">
    <div className="userRides">
        <div className="currentRide">
        <>
        <h2>CurrentRides</h2>
            {list1.map((item,i)=>{
                return(
             
               
                <div key={i} className="currentRdeRequest" onClick={()=>{handleClick(item.driver)}}>
                        <div className='serviceId'>
                            <p><b>ServiceId:</b>{item._id}</p>
                        </div>
                        <div className="ambuTypeDistance">
                            <div className="ambulanceTyper">
                                <p><b>Ambulance:</b>{item.ambulanceType.toUpperCase()}</p>
                            </div>
                            {/* <div className="distance">
                              {item.distance}  
                            </div> */}
                        </div>
                        </div>
                       
                )
            })
                
            }
            </>
        </div>
        <div className="pastRide">
        <>
        <h2>Completed Rides</h2>
            {list2.map((item,i)=>{
                return(
             
               
                <div key={i} className="currentRdeRequest">
                        <div className='serviceId'>
                            <p><b>ServiceId:</b>{item._id}</p>
                        </div>
                        <div className="ambuTypeDistance">
                            <div className="ambulanceTyper">
                                <p><b>Ambulance:</b>{item.ambulanceType.toUpperCase()}</p>
                            </div>
                            {/* <div className="distance">
                              {item.distance}  
                            </div> */}
                        </div>
                        </div>
                       
                )
            })
                
            }
            </>
        </div>

    </div>
    <div className="mapper">
    <MapContainer className="container" center={[51.505,-0.09]} zoom={13} style={{ height: "500px", width:"800px" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      /> 
     {latitude && longitude && <RoutingMachine    key={`${latitude}-${longitude}`}  user={[data.userLocation.coordinates[0],data.userLocation.coordinates[1]]} driver={{lat:latitude,long:longitude}}/>
}</MapContainer>
    </div>
        </div>
  )
}

export default Rides
