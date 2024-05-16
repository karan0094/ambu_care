import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";

const startIcon = L.icon({
    iconUrl: "../../../assests/th.jpeg",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  
  const endIcon = L.icon({
    iconUrl: "../../../assests/user.jpeg",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
const Routing = (props) => {
  const socket= useMemo(()=>io("http://localhost:5000"),[])



  
    console.log(props);
    console.log(props.user[0],props.user[1]);
    console.log(props.driver);
    // const [position,setPosition]=useState(undefined);
  const instance = 
 
  L.Routing.control({
    waypoints: [
      L.latLng(props.user[0], props.user[1]),
      L.latLng(props.driver.lat, props.driver.long)
    ],
  
    lineOptions: {
      styles: [{ color: "#6FA1EC", weight: 4 }]
    },
    createMarker: function(i, waypoint, n) {
        // Use the custom icons for start and end markers
        if (i === 0) {
          return L.marker(waypoint.latLng, { icon: endIcon , draggable: true });
        } else if (i === n - 1) {
          return L.marker(waypoint.latLng, { icon: startIcon , draggable: true });
        } else {
          return L.marker(waypoint.latLng); // Default icon for intermediate waypoints
        }
      },
    show: false,
    addWaypoints: false,
    routeWhileDragging: true,
    draggableWaypoints: true,
    fitSelectedRoutes: true,
    showAlternatives: false,
   
  });
  
  instance.on('routesfound', function (e) {
    const routes = e.routes;
    // Assuming we only want the first route
    const summary = routes[0].summary;
    console.log(`Total distance: ${summary.totalDistance} meters`);
    console.log(`Total time: ${summary.totalTime} seconds`);
  });
  instance.on('waypointschanged',(e)=>{
    const newWayPoints=e.waypoints;
    const position=newWayPoints[1].latLng
    const id=JSON.parse(localStorage.getItem("driverData")).driver._id;
  socket.emit("locationChanged",{position,id});

    
  })
  return instance;
};

const RoutingMachine = createControlComponent(Routing);

export default RoutingMachine;
