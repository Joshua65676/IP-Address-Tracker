import { useEffect } from "react";
// import React  from "react";
import icon from './SearchApi';
import { Marker, Popup, useMap } from 'react-leaflet'

export default function MarkerPosition({locationData}) {
  const position = [locationData.location.lat, locationData.location.lng]
  const map = useMap()

  useEffect(() => {
    map.flyTo(position, 13, {
      animate: true,
    })
  }, )
  return (
    <div>
      <Marker icon={icon}  position={position}>
         <Popup>
           A pretty CSS3 popup. <br /> Easily customizable.
         </Popup>
       </Marker>
    </div>
  )
}
