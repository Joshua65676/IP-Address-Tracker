import { useEffect } from "react";
// import React  from "react";
import icon from './SearchApi';
import { Marker, Popup, useMap } from 'react-leaflet'

const FlyToLocation: React.FC<{ locationData: LocationData }> = ({ locationData }) => {
  const map = useMap();

  useEffect(() => {
    if (locationData) {
      map.flyTo([locationData.location.lat, locationData.location.lng], 13, {
        animate: true,
      });
    }
  }, [locationData, map]);

  return null;

   return(
       <div className="">
         <Marker icon={icon}  position={[locationData.location.lat, locationData.location.lng]}>
            <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
         </Marker>
       </div>
   )
};
export default FlyToLocation;





// export default function MarkerPosition({locationData}) {
//   const position = [locationData.location.lat, locationData.location.lng]
//   const map = useMap()

//   useEffect(() => {
//     map.flyTo(position, 13, {
//       animate: true,
//     })
//   }, )
//   return (
//     <div>
//       <Marker icon={icon}  position={position}>
//          <Popup>
//            A pretty CSS3 popup. <br /> Easily customizable.
//          </Popup>
//        </Marker>
//     </div>
//   )
// }
