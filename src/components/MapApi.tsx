// MapComponent.tsx
import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS

const MapComponent: React.FC = () => {
  useEffect(() => {
    // Initialize map
    const map = L.map('map-container').setView([51.505, -0.09], 13); // Default view

    // Add a tile layer (e.g., OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    // Fetch location data (e.g., from Geoapify API)
    // Extract latitude and longitude
    const latitude = 51.505;
    const longitude = -0.09;

    // Add a marker at the location
    L.marker([latitude, longitude]).addTo(map);
  }, []);

  return <div id="map-container" className="h-[400px]"  />;
};

export default MapComponent;
