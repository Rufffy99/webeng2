import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import Routing from './Routing';
import DragSheet from './DragSheet';
import React, {useState, useEffect} from "react";
import { reverseGeocode } from './ReverseGeocoding';

const MapComponent = () => {
  const [isOpen, setOpen] = useState(false);
  const [routeInfo, setRouteInfo] = useState(null);
  const position = [52.520007, 13.404954]

  useEffect(() => {
    if (routeInfo && routeInfo.destination) {
      const [lat, lng] = routeInfo.destination.split(',').map(s => parseFloat(s));
      // Note: reverseGeocode expects (longitude, latitude)
      reverseGeocode(lng, lat).then(result => {
        console.log('Reverse geocoding result:', result);
      }).catch(err => {
        console.error('Reverse geocoding error:', err);
      });
    }
  }, [routeInfo]);

  return (
    <>
   <DragSheet isOpen={isOpen} setOpen={setOpen} routeInfo={routeInfo}/>
    <MapContainer
      center={position}
      zoom={10}
      style={{ height: '100vh', width: '100vw' }}
      className="map"
    >
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Routing setOpen={setOpen} setRouteInfo={setRouteInfo}/>
    </MapContainer> 
    </>
  )
}
export default MapComponent