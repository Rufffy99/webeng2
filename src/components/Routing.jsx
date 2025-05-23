import React, { useEffect } from 'react';
import L from 'leaflet';
import { useMap } from 'react-leaflet';
import 'leaflet-routing-machine';
import "../css/Style.css";

const Routing = ({ setOpen, setRouteInfo }) => {
  const map = useMap();

  useEffect(() => {
    const current = new L.LatLng(52.520007, 13.404954);
    L.circleMarker(current, { radius: 8, color: 'blue' }).addTo(map);
  
    const routeControl = L.Routing.control({
      show: true,
      fitSelectedRoutes: false,
      plan: false,
      routeWhileDragging: true,
      showAlternatives: true,
      altLineOptions: {
        styles: [{ color: 'blue', opacity: 0.8, weight: 5 }],
      },
      lineOptions: {
        styles: [{ color: 'blue', opacity: 0.5, weight: 5 }],
      },
    }).addTo(map);
  
    map.on('click', (e) => {
      const destination = e.latlng;
      routeControl.setWaypoints([current, destination]);
      setOpen(true);
    });
  
    routeControl.on('routesfound', async ({ routes, waypoints }) => {
      const summary = routes[0];
      const distance = summary.totalDistance / 1000;
      const duration = Math.round(summary.totalTime / 60);
      const destination = waypoints?.[1]?.latLng;
  
      setRouteInfo({
        distance: distance.toFixed(2),
        duration,
        destination: `${destination.lat.toFixed(5)}, ${destination.lng.toFixed(5)}`
      });
      await 3;
      setTimeout(() => {
        const container = document.querySelector('.leaflet-routing-container');
        const target = document.getElementById('leaflet-routing-wrapper');
        if (container && target && !target.contains(container)) {
          target.appendChild(container);
        }
      }, 100);
    });
  
    return () => {
      map.off('click');
      map.removeControl(routeControl);
    };
  }, [map, setOpen, setRouteInfo]);
  
  

  return null;
};

export default Routing;
