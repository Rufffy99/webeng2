function reverseGeocode(longitude, latitude) {
    return new Promise((resolve, reject) => {
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lon=${longitude}&lat=${latitude}`)
        .then(response => {
            if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(json => {
            const pos = json.address;
            
            // Process city data from various possible fields
            let city = "not defined";
            if (pos.city) {
            city = pos.city;
            } else if (pos.town) {
            city = pos.town;
            } else if (pos.village) {
            city = pos.village;
            } else if (pos.municipality) {
            city = pos.municipality;
            } else if (pos.farm) {
            city = pos.farm;
            }
            
            // Process house number data
            let houseNumber = "not defined";
            if (pos.house_number) {
            houseNumber = pos.house_number;
            } else if (pos.house_name) {
            houseNumber = `(${pos.house_name})`;
            }
            
            // Process point of interest data
            let pointOfInterest = "not defined";
            if (pos.historic) {
            pointOfInterest = pos.historic;
            } else if (pos.tourism) {
            pointOfInterest = pos.tourism;
            } else if (pos.amenity) {
            pointOfInterest = pos.amenity;
            }
            
            // Process place data
            let place = "not defined";
            if (pos.footway) {
            place = pos.footway;
            } else if (pos.locality) {
            place = pos.locality;
            } else if (pos.shop) {
            place = pos.shop;
            } else if (pos.leisure) {
            place = pos.leisure;
            }
            
            // Create a structured result object
            const result = {
            rawData: json,
            pointOfInterest,
            place,
            street: pos.road || "not defined",
            houseNumber,
            postalCode: pos.postcode || "not defined",
            city,
            suburb: pos.suburb || "not defined",
            county: pos.county || "not defined",
            state: pos.state || "not defined",
            country: pos.country || "not defined",
            countryCode: pos.country_code || "not defined"
            };
            
            resolve(result);
        })
        .catch(error => {
            console.error('Error during reverse geocoding:', error);
            reject(error);
        });
    });
}
export { reverseGeocode };