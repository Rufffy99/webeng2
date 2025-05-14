import "leaflet-routing-machine";
import L from "leaflet";
import { useMap } from "react-leaflet";
import { useEffect } from "react";
import "../css/Style.css";


function Routing() {
  const map = useMap();
  const targetIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconSize: [25, 41],  
    iconAnchor: [12, 41],    
  });

  let targetMarker = null;
  useEffect(() => {
    const current = new L.LatLng(52.520007, 13.404954); // Berlin
    L.circleMarker(current, { radius: 8, color: "blue" }).addTo(map); 
    let target = null;

    const routeControl = L.Routing.control({
      show: false,
      fitSelectedRoutes: false,
      plan: false,
      routeWhileDragging: true,
      lineOptions: {
        styles: [
          {
            color: "blue",
            opacity: 0.5,
            weight: 5,
          },
        ],
      },
    }).addTo(map);

    map.on("click", function (e) {
      target = e.latlng;
      if (targetMarker) {
        map.removeLayer(targetMarker);
      }
      targetMarker = L.marker(target, { icon: targetIcon }).addTo(map);
     
      routeControl.setWaypoints([current, target]);

    });

    routeControl.on("routesfound", function (e) {
      const summary = e.routes[0].summary;
      const distance = summary.totalDistance / 1000;
      const minutes = Math.round((summary.totalTime % 3600) / 60);
      console.log(`Total distance: ${distance} km and total time ca: ${minutes} minutes`);
    
    });

  }, [map]);
  return null;
}

export default Routing;
