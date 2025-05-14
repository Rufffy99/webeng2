import { MapContainer, TileLayer } from 'react-leaflet'
import LocationMarker from './Marker'
import 'leaflet/dist/leaflet.css'
import Routing from './Routing'
import RouteInformation from './RouteInformation';

function MapComponent() {
  const position = [52.520007, 13.404954]
  return (
    <MapContainer
      center={position}
      zoom={10}
      style={{ height: '100vh', width: '100vw' }}
      className="map"
    >
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    
    <Routing /> 
    <RouteInformation />
    </MapContainer>
  

  )
}

export default MapComponent
