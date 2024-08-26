import React, { useState } from 'react';
import axios from 'axios';
import Arror from '../assets/images/icon-arrow.svg'

interface LocationData {
  ip: string;
  location: {
    country: string;
    region: string;
    timezone: string;
  };
  isp: string;
  // Add more relevant properties
}

const SearchApi: React.FC = () => {
  const [ipAddress, setIPAddress] = useState<string>('');
  const [locationData, setLocationData] = useState<LocationData | null>(null);

    const handleSearch = async () => {
      try {
        const apiKey = "at_hLv7ZGVwuwTzzX2yLQrgmmOHIAITB"
        const response = await axios.get(
        //   `https://api.geoapify.com/v1/ipinfo?apiKey=${apiKey}&ipAddress=${ipAddress}`
        `https://geo.ipify.org/api/v2/country?apiKey=${apiKey}&ipAddress=${ipAddress}`
        );
        setLocationData(response.data);
      } catch (error) {
        console.error('Error fetching location data:', error);
      }
    };


  return (
    <div className="space-y-10">

     <div className="text-center ">
        
      <input
        type="text"
        placeholder="Search for any IP address or domain"
        value={ipAddress}
        className="h-10 pl-5 rounded-xl md:w-2/6 sm:w-[337px] sm:-ml-3"
        onChange={(e) => setIPAddress(e.target.value)}
      />
      <button onClick={handleSearch}>
        <div className="absolute w-10 h-10 -ml-10 -mt-[27px] bg-VeryDarkGray rounded-r-xl">
          <img src={Arror} alt='arror' className="w-4 mt-2.5 ml-3"/>
        </div>
      </button>
      
     </div>


      {locationData && (
        <div className="items-center justify-around -mt-20 bg-white border md:flex md:h-24 sm:w- md:ml- md:w- rounded-xl sm:h-60 sm:ml- sm:text-center sm:space-y-3">

        <p>
          <div className="text-sm font-semibold text-DarkGray">IP Address</div>
          <div className="text-xl font-bold">{locationData.ip}</div>
        </p>
       {/* <p>Country: {locationData.location.country}</p> */}
          <hr className="hidden md:border md:h-16 md:flex" />
        <p>
          <div className="text-sm font-semibold text-DarkGray">Location</div>
          <div className="text-xl font-bold">{locationData.location.region}</div>
        </p>
          <hr className="hidden md:border md:h-16 md:flex" />
        <p>
          <div className="text-sm font-semibold text-DarkGray">TimeZone</div>
          <div className="text-xl font-bold">{locationData.location.timezone}</div>
        </p>
          <hr className="hidden md:border md:h-16 md:flex" />
        <p>
          <div className="text-sm font-semibold text-DarkGray">Isp</div>
          <div className="text-xl font-bold">{locationData.isp}</div>
        </p>

       {/* Add more relevant data as needed */}
     </div>
      )}
    </div>
  );
};

export default SearchApi;
