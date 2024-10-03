import React, { useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { setCurrentPage } from "../redux/slices/navSlice";
import { useDispatch, useSelector } from 'react-redux';

// Custom marker icon
const markerIcon = new L.Icon({
  iconUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ec/RedDot.svg", // Replace with your preferred marker image
  iconSize: [25, 25],
});

const dataCenters = [
  { id: 1, name: "San Leandro", lat: 37.7258, lng: -122.1569, "Total Servers": 500, "Annual Cost": "$35.2M", "Carbon Footprint": "0.8MT CO2" }, 
  { id: 2, name: "Columbus", lat: 39.9612, lng: -82.9988, "Total Servers": 500, "Annual Cost": "$29.3M", "Carbon Footprint": "0.8MT CO2" },
  { id: 3, name: "New Jersey", lat: 39.9612, lng: -74.4057, "Total Servers": 500, "Annual Cost": "$25.6M", "Carbon Footprint": "0.8MT CO2" }, 
  { id: 4, name: "Virginia", lat: 37.4316, lng: -78.6569, "Total Servers": 500, "Annual Cost": "$22.7M", "Carbon Footprint": "0.8MT CO2" },
  { id: 5, name: "Jurupa Valley", lat: 33.9943, lng: -117.4972, "Total Servers": 500, "Annual Cost": "$27.2M", "Carbon Footprint": "0.8MT CO2" }, 
];

const MapComponent = () => {
  const darkMode = useSelector(state => state.environment.darkMode);
  const dispatch = useDispatch();
  const [hoveredCenter, setHoveredCenter] = useState(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isDivHovered, setIsDivHovered] = useState(false); // To keep track if the div is hovered

  const handleMarkerHover = (center, e) => {
    setHoveredCenter(center);
    setCursorPosition({ x: e.originalEvent.clientX, y: e.originalEvent.clientY });
  };

  const handleMouseOut = () => {
    if (!isDivHovered) {
      setHoveredCenter(null); // Only hide the div if it's not hovered
    }
  };

  const goToCenter = (page) => {
    if(page==="Home" || page==="Insights"){
      dispatch(setCurrentPage(page));
    }
   
  };

  return (
    <div className="flex w-full h-4/5">
    <MapContainer
      center={[37.0902, -95.7129]} // Centered over the United States
      zoom={5} // Zoom level closer to the US
      className="flex flex-col h-100 w-full"
      style={{ height: "100vh", width: "100%" }} // Ensuring the map fills the view
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {dataCenters.map((center) => (
        <Marker
          key={center.id}
          position={[center.lat, center.lng]}
          icon={markerIcon}
          className="cursor-pointer"
          eventHandlers={{
            mouseover: (e) => handleMarkerHover(center, e), // Capture mouse position on hover
            mouseout: handleMouseOut, // Hide div on mouse out, unless hovering over the div
          }}
        />
      ))}

      {hoveredCenter && (
        <div
          style={{
            position: 'absolute',
            top: `${cursorPosition.y}px`, // Use cursor's y-position
            left: `${cursorPosition.x}px`, // Use cursor's x-position
            transform: 'translate(-50%, -100%)', // Move the div above and centered at the cursor
            backgroundColor: darkMode ? "#333" : "#fff",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            zIndex: 1000,
            pointerEvents: 'auto', // Ensure the div can be interacted with
          }}
          className={`p-2 rounded-md shadow-md flex flex-col text-start overflow-hidden
            ${darkMode ? "darkMode-bg" : "lightMode-bg"}
            ${darkMode ? "darkMode-button" : "lightMode-button"} 
            ${darkMode ? "darkMode-border" : "lightMode-border"} 
            ${darkMode ? "darkMode-text" : "lightMode-text"}`}
          onMouseEnter={() => setIsDivHovered(true)} // Keep the div visible when hovered
          onMouseLeave={() => {
            setIsDivHovered(false);
            setHoveredCenter(null); // Hide the div when the mouse leaves it
          }}
        >
          <h6>{hoveredCenter.name}</h6>
          {Object.entries(hoveredCenter).map(([key, value], i) => (
            <div key={i}>
              {key}: <span>{value}</span>
            </div>
          ))}
          <div className="flex w-full p-2 justify-between">
            <button className={`${darkMode ? "darkMode-button" : "lightMode-button"} hover:cursor-pointer`} onClick={() => goToCenter("Home")}>Details</button>
            <button className={`${darkMode ? "darkMode-button" : "lightMode-button"} hover: cursor-pointer`} onClick={() => goToCenter("Insights")}>Insights</button>
          </div>
        </div>
      )}
    </MapContainer>
    </div>
  );
};

export default MapComponent;
