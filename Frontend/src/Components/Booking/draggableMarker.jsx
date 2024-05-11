import {
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    useMap
  } from 'react-leaflet'
import L from 'leaflet'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruckMedical } from '@fortawesome/free-solid-svg-icons';
import { useState,useRef ,useMemo } from 'react';



function setIcon(_iconSize){
    return L.icon({
        iconUrl:"../../../assests/ambu.png",
        iconSize:[_iconSize]

    })

}


export function DraggableMarker(props) {
    // const [draggable, setDraggable] = useState(prop)
    const [position, setPosition] = useState(props.center)
    const markerRef = useRef(null)
    const map=useMap();
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current
          if (marker != null) {
            setPosition(marker.getLatLng())
          }
        },
      }),
      [],
    )
   
    map.setView(position,13)
    return (
      <Marker icon={setIcon(28)}
        draggable={props.value}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef}>
        <Popup minWidth={90}>
          <p>Your Location</p>
        </Popup>
      </Marker>
    )
  }