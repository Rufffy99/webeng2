import { useState } from 'react';
import Routing from "./Routing";

function RouteInformation() {
    const [routeInfo, setRouteInfo] = useState(null)
    const getRouteInfo = (info) => {
        setRouteInfo(info)
    }
    return(
        <div className='RouteData'> 
            <span>Distanz:{routeInfo.distance}</span>
        </div>
    )
}
export default RouteInformation;