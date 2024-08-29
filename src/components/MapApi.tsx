import { useEffect } from "react";
import icon from './SearchApi';
import { Marker, Popup, useMap } from 'react-leaflet'

const FlyToLocation: React.FC<{ locationData }> = ({ locationData }) => {
  const map = useMap();

  useEffect(() => {
    if (locationData) {
      map.flyTo([locationData.location.lat, locationData.location.lng], 13, {
        animate: true,
      });
    }
  }, [locationData, map]);

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

