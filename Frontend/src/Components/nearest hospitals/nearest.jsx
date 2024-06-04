import React, { useState } from 'react';
import axios from 'axios';
import './Nearest.css';

function Nearest() {
  const [userLocation, setUserLocation] = useState(null);
  const [nearestHospitals, setNearestHospitals] = useState([]);
  const [error, setError] = useState(null);

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          findNearestHospitals(latitude, longitude);
        },
        (err) => {
          setError('Failed to get location: ' + err.message);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  const findNearestHospitals = async (latitude, longitude) => {
    try {
      const overpassQuery = `
        [out:json];
        node
          ["amenity"="hospital"]
          (around:7000,${latitude},${longitude});
        out body;
      `;
      const response = await axios.get('https://overpass-api.de/api/interpreter', {
        params: {
          data: overpassQuery,
        },
      });

      const hospitals = response.data.elements
        .map(hospital => {
          const distance = calculateDistance(latitude, longitude, hospital.lat, hospital.lon);
          return {
            name: hospital.tags.name || 'Unnamed Hospital',
            distance: distance,
          };
        })
        .sort((a, b) => a.distance - b.distance) // Sort by distance
        .slice(0, 10); // Limit to the 10 nearest hospitals

      setNearestHospitals(hospitals);
    } catch (err) {
      setError('Error fetching hospitals: ' + err.message);
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d * 1000; // Distance in meters
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  return (
    <div className="App">
      <h1>Nearest Hospitals Finder</h1>
      <button className='findnear' onClick={handleGetLocation}>Find Nearest Hospitals</button>
      {error && <p className="error">Error: {error}</p>}
      
      {nearestHospitals.length > 0 && (
        <div>
          <h2>Nearest Hospitals</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Distance (meters)</th>
              </tr>
            </thead>
            <tbody>
              {nearestHospitals.map((hospital, index) => (
                <tr key={index}>
                  <td>{hospital.name}</td>
                  <td>{hospital.distance.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Nearest;
