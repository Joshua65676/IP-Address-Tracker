import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Arror from '../assets/images/icon-arrow.svg'
import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import icon from './SearchApi';
import FlyToLocation from './MapApi';
// import SearchApi from './SearchApi';

interface LocationData {
  ip: string;
  location: {
    country: string;
    region: string;
    city: string;
    postalCode: number,
    timezone: string;
    lat: number,
    lng: number,
  };
  domais: string;
  as: string;
  isp: string;
  // Add more relevant properties
}

// const FlyToLocation: React.FC<{ locationData: LocationData }> = ({ locationData }) => {
//   const map = useMap();

//   useEffect(() => {
//     if (locationData) {
//       map.flyTo([locationData.location.lat, locationData.location.lng], 13, {
//         animate: true,
//       });
//     }
//   }, [locationData, map]);

//   return null;
// };


const HomeApi: React.FC = () => {
  const [ipAddress, setIPAddress] = useState<string>('');
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  // const position = [locationData.location.lat, locationData.location.lng]
  // const map = useMap()

  // useEffect(() => {
  //   map.flyTo(position, 13, {
  //     animate: true,
  //   })
  // }, )

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const apiKey = "at_hLv7ZGVwuwTzzX2yLQrgmmOHIAITB"
        const response = await axios.get(
        `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress&domain=`
        // `https://geo.ipify.org/api/v2/country,city?apiKey={apikey}&ipAddress=8.8.8.8`
        );
        setLocationData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching location data:', error);
      }
    };

    fetchLocationData();
  }, []);

    //  Search Click
  const handleSearch = async () => {
    try {
      const apiKey = "at_hLv7ZGVwuwTzzX2yLQrgmmOHIAITB"
      const response = await axios.get(
      `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress&domain=${ipAddress}`
    //   `https://geo.ipify.org/api/v2/country?apiKey=${apiKey}&domain=${ipAddress}&apiKey=${apiKey}ddress}`
      );
      setLocationData(response.data);

      // if (response.length > 0) {
      //   const { lat, lon } = response[0].geometry;
      //   setLocationData({ location: { lat, lng: lon } });
      // }

      console.log(response.data);
    } catch (error) {
      console.error('Error fetching location data:', error);
    }
  };
  

  return (
    <div className=''>
    
     <div className="relative space-y-10 md:-mb-14 sm:-mb-44" style={{zIndex:10000}}>
     
     {/* button search */}
     <div className="text-center ">
      <input
        type="text"
        placeholder="Search for any IP address or domain"
        value={ipAddress}
        className="h-10 pl-5 rounded-xl md:w-2/6 sm:w-[337px] sm:-ml-3"
        onChange={(e) => setIPAddress(e.target.value)}
      />
      <button onClick={handleSearch}>
        <div className="absolute w-10 h-10 -ml-10 -mt-[27px] bg-black rounded-r-xl hover:bg-VeryDarkGray">
          <img src={Arror} alt='arror' className="w-4 mt-2.5 ml-3"/>
        </div>
      </button>
     </div>
      
      {
          locationData ? (
           
        <div className="items-center justify-around -mt-20 bg-white border md:flex md:h-24 sm:w- md:ml- md:w- rounded-xl sm:h-72 sm:ml- sm:text-center sm:space-y-5 sm:p-5">

           <p>
             <div className="text-sm font-semibold text-DarkGray">IP Address</div>
             <div className="text-xl font-bold">{locationData.ip}</div>
           </p>
          {/* <p>Country: {locationData.location.country}</p> */}
             <hr className="hidden md:border md:h-16 md:flex" />
           <p>
             <div className="text-sm font-semibold text-DarkGray">Location</div>
             <div className="text-xl font-bold">{locationData.location.region}, {locationData.location.country} {locationData.location.postalCode}</div>
           </p>
             <hr className="hidden md:border md:h-16 md:flex" />
           <p>
             <div className="text-sm font-semibold text-DarkGray">TimeZone</div>
             <div className="text-xl font-bold">UTC{locationData.location.timezone}</div>
           </p>
             <hr className="hidden md:border md:h-16 md:flex" />
           <p>
             <div className="text-sm font-semibold text-DarkGray">Isp</div>
             <div className="text-xl font-bold">{locationData.isp}</div>
           </p>

          {/* Add more relevant data as needed */}
        </div>
       )
       : (
        <p>Loading location...</p>
       )
      }
    </div>
    
    <div className='w-screen -mb-10' style={{height: "550px", width: "100%", marginLeft: "-50px"}}>
      {locationData ? (
     <MapContainer
       center={[locationData.location.lat, locationData.location.lng]}
       zoom={13}
       scrollWheelZoom={true}
       style={{height: "100%", width: "100%"}}
       >
       <TileLayer
         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
       />
       <Marker icon={icon}  position={[locationData.location.lat, locationData.location.lng]}>
         <Popup>
           A pretty CSS3 popup. <br /> Easily customizable.
         </Popup>
       </Marker>
       {/* <MarkerPosition locationData={locationData}/> */}
       <FlyToLocation locationData={locationData} />
     </MapContainer>
      ) : (
        <p>Loading map...</p>
      )}
     </div>
    </div>
  );
};

export default HomeApi;

