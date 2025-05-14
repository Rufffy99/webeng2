import { Marker, useMapEvents } from 'react-leaflet';
import { useState } from 'react';
import L from 'leaflet'

function LocationMarker() {
    const [position, setPosition] = useState(null);

    useMapEvents({
        click(e) {
        const { latlng } = e;
        setPosition(latlng);
        },
    });
  
    return position === null ? null : (
      <Marker position={position} icon={L.icon({ iconUrl:  'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png' })}>

      </Marker>
    )
  }

  export default LocationMarker;