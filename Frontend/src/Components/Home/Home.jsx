import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./home.css";
import axios from "axios";
import iconLoader from "../../../assests/Icon.jsx";
//import "./homeScript.js";
import { LocateFixed } from "lucide-react";
import { useNavigate,useLocation } from "react-router-dom";
import { useState } from "react";
import userContext from "../../../context/userContext.js";
function Home() {
const navigate=useNavigate();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [location, setLocation] = useState({ lat: null, lng: null });
  const {user}=useContext(userContext);
  const [placeName, setPlaceName] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const locateMe = ()=>{
    setLoading(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(latitude+"  "+longitude);
          setLocation({ lat:latitude, lng:longitude });
          getPlaceName(latitude, longitude);
        },
        (error) => {
          setError(error.message);
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
      setLoading(false);
    }
  };
  const getPlaceName = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      const place = response.data.display_name;
      setQuery(place);
      setPlaceName(place);
    } catch (error) {
      setError('Failed to fetch place name');
    }
    setLoading(false);
  };

  const handleSearch=async()=>{
    // navigate("/user/ambulancesearchandride",{state:{serviceId}});
    if(user){
    
        // console.log(JSON.parse(localStorage.getItem("userData")).user._id)
        console.log(location.lat+"  "+location.lng);
        const data={
          user:JSON.parse(localStorage.getItem("userData")).user._id,
          userLocation:{type:"Point",coordinates:[location.lat,location.lng]},
          status:"requested",
          ambulanceType:'als'
  
        }
        await axios.post("http://localhost:5000/api/v1/ride/service",data,{
          headers:{
            "Authorization":`Bearer ${JSON.parse(localStorage.getItem("userData")).access}`
          
        }}).then(
          (res)=>{
            
             console.log(res.data.data._id)
             navigate("/user/ambulancesearchandride",{state:{serviceId:res.data.data._id}});
          }
        )
        .catch((error)=>{
          console.log(error);
        })
     }
     else{
        alert("User is not logged in");
     }

  }


  const handleInputChange = async (e) => {
      const value = e.target.value;
      setQuery(value);

      if (value.length > 2) {
          try {
              const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
                  params: {
                      q: value,
                      format: 'json',
                      addressdetails: 1,
                      limit: 5,
                      countrycodes: 'in'
                  }
              });
           
              setSuggestions(response.data);
          } catch (error) {
              console.error('Error fetching location suggestions:', error);
          }
      } else {
          setSuggestions([]);
      }
  };

  const handleSuggestionClick = (suggestion) => {
      setQuery(suggestion.display_name);
      setSuggestions([]);
      setLocation({
        lat: suggestion.lat,
        lng: suggestion.lon
    });
  };

  return (
    <section className="Home_Section">
      <div className="main_content">
        <div className="hero_sec"></div>
        <div className="form_entry">
       
            <div className="search-container">
           <div className="containerText">
           <div className="loc" onClick={locateMe}> <LocateFixed color="#050505" /></div>
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Enter a location"
                
           />
           </div>
            <ul className="suggestions">
                {suggestions.map((suggestion) => (
                    <li key={suggestion.place_id} onClick={() => handleSuggestionClick(suggestion)}>
                        {suggestion.display_name}
                    </li>
                ))}
            </ul>
        </div>
        <div className="searchbtn" onClick={handleSearch}>
            <input
              type="button"
              className="searchbtn"
              value="Search Ambulance"
            />
            </div>
        
        </div>
      </div>
    </section>
  );
}

export default Home;
