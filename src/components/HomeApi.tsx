import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Arror from '../assets/images/icon-arrow.svg'
import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer } from 'react-leaflet'
import FlyToLocation from './MapApi';
// import dotenv from 'dotenv'

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


const HomeApi: React.FC = () => {
  const [ipAddress, setIPAddress] = useState<string>('');
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  // dotenv.config();

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const apiKey = import.meta.env.VITE_API_KEY;
        const response = await axios.get(
        `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress&domain=`
        );
        setLocationData(response.data);
      } catch (error) {
        console.error('Error fetching location data:', error);
      }
    };

    fetchLocationData();
  }, []);

    //  Search Click
  const handleSearch = async () => {
    try {
      const apiKey = import.meta.env.VITE_API_KEY;
      const response = await axios.get(
      `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress&domain=${ipAddress}`
      );
      setLocationData(response.data);

    } catch (error) {
      console.error('Error fetching location data:', error);
    }
  };
  

  return (
    <div className=''>
    
     <div className="relative space-y-10 md:-mb-14 sm:-mb-48 z-[10000]">
     
     {/* button search */}
     <div className="text-center sm:ml-2 xm:ml-5">
      <input
        type="text"
        placeholder="Search for any IP address or domain"
        value={ipAddress}
        className="h-10 pl-5 rounded-xl md:w-2/6 sm:w-[311px] sm:-ml-6"
        onChange={(e) => setIPAddress(e.target.value)}
      />
      <button onClick={handleSearch}>
        <div className="absolute w-10 h-10 -ml-10 lg:-mt-[27px] sm:-mt-[26.5px] xm:-mt-[26.5px] bg-black rounded-r-xl hover:bg-VeryDarkGray">
          <img src={Arror} alt='arror' className="w-4 mt-2.5 ml-3"/>
        </div>
      </button>
     </div>
         {/* Location Data Source */}
      {
          locationData ? (
           
        <div className="items-center justify-around -mt-20 bg-white border md:flex md:h-24 sm:w- md:ml- md:w- rounded-xl sm:h-72 sm:ml- sm:text-center sm:space-y-5 sm:p-5">
           <p>
             <div className="text-sm font-semibold text-DarkGray">IP Address</div>
             <div className="text-xl font-bold">{locationData.ip}</div>
           </p>
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
        <p className='text-lg font-semibold text-white'>Loading location...</p>
       )
      }
    </div>
                  {/* Map Container */}
    <div className='ml-1 lg:-mb-10 md:w-[] md:h-[470px] sm:h-[440px] sm:mb-32 xm:mb-32'>
      {locationData ? (
     <MapContainer
       center={[locationData.location.lat, locationData.location.lng]}
       zoom={13}
       scrollWheelZoom={true}
       className="md:w-[1494px] sm:w-[390px] sm:h-[150px] xm:w-[450px] sm:mb-40"
       style={{height: "150%", width: "500p", marginLeft: "-50px"}}
       >
       <TileLayer
         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
       />
       <FlyToLocation locationData={locationData} />
     </MapContainer>
      ) : (
        <div className='lg:flex sm:hidden xm:hidden lg:ml-[640px]'>
          <p className='text-lg font-semibold text-white'>Loading map...</p>
        </div>
      )}
     </div>
    </div>
  );
};

export default HomeApi;

