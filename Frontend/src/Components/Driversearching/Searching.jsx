import React from 'react'
import { useState } from 'react'
function Searching(props){
 const [serviceId, setServiceId] = useState(null)

  if(props.serviceId){
    return (
    <div className="searchandRide">
    <div className='search'>
       <div className="searchimage">
        <img src="../../../assests/Driverserching.gif" alt="gif not found" />
        </div>
        <div className="searchmessage">
            <p>Finding Nearest Ambulance</p>
        </div>
    </div>
    </div>
  )
}
}

export default Searching;