import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import Routing from './Routing';
import DragSheet from './DragSheet';
import React, {useState} from "react";
// import { searchWikipedia } from './WikipediaAPI';


const MapComponent = () => {
  const [isOpen, setOpen] = useState(false);
  const [routeInfo, setRouteInfo] = useState(null);
  const position = [52.520007, 13.404954];
  // searchWikipedia();
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