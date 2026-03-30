import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MapView = () => {
  const indiaCenter = [22.9734, 78.6569];
  const zoomLevel = 5;

  const markers = [
    { position: [28.6139, 77.2090], title: "New Delhi", desc: "Capital of India. Visit Red Fort and India Gate." },
    { position: [27.1751, 78.0421], title: "Agra", desc: "Home to the magnificent Taj Mahal." },
    { position: [26.9124, 75.7873], title: "Jaipur", desc: "The Pink City. Palaces and Forts." },
    { position: [19.0760, 72.8777], title: "Mumbai", desc: "City of Dreams. Gateway of India." },
    { position: [15.2993, 74.1240], title: "Goa", desc: "Pristine beaches and vibrant nightlife." },
    { position: [10.8505, 76.2711], title: "Kerala", desc: "God's Own Country. Serene backwaters." },
    { position: [31.6200, 74.8765], title: "Amritsar", desc: "Golden Temple and Wagah Border." },
  ];

  return (
    <MapContainer 
      center={indiaCenter} 
      zoom={zoomLevel} 
      scrollWheelZoom={false} 
      style={{ height: '100%', width: '100%', zIndex: 1 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((item, idx) => (
        <Marker key={idx} position={item.position}>
          <Popup>
            <strong>{item.title}</strong><br />
            {item.desc}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
