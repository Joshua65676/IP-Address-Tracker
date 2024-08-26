import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchApi from './SearchApi';

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

const HomeApi: React.FC = () => {
  const [locationData, setLocationData] = useState<LocationData | null>(null);

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const apiKey = "at_hLv7ZGVwuwTzzX2yLQrgmmOHIAITB"
        const response = await axios.get(
        // `https://geo.ipify.org/api/v2/country?apiKey=${apiKey}&ipAddress=`
        );
        setLocationData(response.data);
      } catch (error) {
        console.error('Error fetching location data:', error);
      }
    };

    fetchLocationData();
  }, []);

  return (
    <div className="space-y-10">
        <SearchApi />

      {locationData ? (
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
      ) : (
        <p>Loading location...</p>
      )
    }
    </div>
  );
};

export default HomeApi;
