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
        //   `https://api.geoapify.com/v1/ipinfo?apiKey=${apiKey}&ipAddress=${ipAddress}`
        `https://geo.ipify.org/api/v2/country?apiKey=${apiKey}&ipAddress=`
        );
        setLocationData(response.data);
      } catch (error) {
        console.error('Error fetching location data:', error);
      }
    };

    fetchLocationData();
  }, []);

  return (
    <div className="">
        <SearchApi />

      {locationData ? (
        <div>
          <h1>Your Location:</h1>
          <p>IP Address: {locationData.ip}</p>
          <p>Country: {locationData.location.country}</p>
          <p>City: {locationData.location.region}</p>
          <p>TimeZone: {locationData.location.timezone}</p>
          <p>Isp: {locationData.isp}</p>
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
