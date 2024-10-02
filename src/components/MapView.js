import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Custom marker icon
const markerIcon = new L.Icon({
  iconUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ec/RedDot.svg", // Replace with your preferred marker image
  iconSize: [25, 25],
});


const dataCenters = [
  { id: 1, name: "San Leandro", lat: 37.7258, lng: -122.1569 }, 
  {id: 2, name: "Columbus", lat: 39.9612, lng: -82.9988},
  { id: 3, name: "New Jersey", lat: 39.9612, lng: -74.4057 }, 
  { id: 4, name: "Virgina", lat: 37.4316, lng: -78.6569 },
  { id: 5, name: "Jarupa Valley", lat: 33.9943, lng: -117.4972 }, 
];

const MapComponent = () => {
  const [selectedCenter, setSelectedCenter] = useState(null);

  // Action when clicking on a data center
  const handleMarkerClick = (dataCenter) => {
    setSelectedCenter(dataCenter);
    alert(`Data Center clicked: ${dataCenter.name}`);
  };

  return (
    <MapContainer center={[50, -120]} zoom={2} className="flex flex-col h-100 w-full">
      {/* OpenStreetMap TileLayer */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {dataCenters.map((center) => (
        <Marker
          key={center.id}
          position={[center.lat, center.lng]}
          icon={markerIcon}
          eventHandlers={{
            click: () => handleMarkerClick(center),
          }}
        >
          <Popup>{center.name}</Popup>
          <Tooltip>{center.name}</Tooltip>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;

