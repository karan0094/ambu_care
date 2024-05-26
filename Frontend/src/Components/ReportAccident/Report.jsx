// import React from 'react'
// import { useState } from 'react';
// import './Report.css'
// import axios from 'axios'
// function Report() {
//     const [location, setLocation] = useState('');
//     const [carNumber, setCarNumber] = useState('');
//     const [carNumberError, setCarNumberError] = useState('');
//     const [suggestions, setSuggestions] = useState([]);
//     const [query, setQuery] = useState('');
//     console.log(JSON.parse(localStorage.getItem("userData")).access)
  
//     const handleInputChange = async (e) => {
//       const value = e.target.value;
//       setQuery(value);

//       if (value.length > 2) {
//           try {
//               const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
//                   params: {
//                       q: value,
//                       format: 'json',
//                       addressdetails: 1,
//                       limit: 5,
//                       countrycodes: 'in'
//                   }
//               });
           
//               setSuggestions(response.data);
//           } catch (error) {
//               console.error('Error fetching location suggestions:', error);
//           }
//       } else {
//           setSuggestions([]);
//       }
//   };
    
//   const handleSuggestionClick = (suggestion) => {
//     setQuery(suggestion.display_name);
//     setSuggestions([]);
   
// };
  
//     const handleSubmit =async (e) => {
//       e.preventDefault();
  
//       // Car number validation (simple example)
//       if (!/^[A-Z]{2}\d{2}[A-Z]{2}\d{4}$/.test(carNumber)) {
//         setCarNumberError('Please enter a valid car number (e.g., AB12CD3456)');
//         return;
//       }
  
//       // Handle form submission (e.g., send data to backend)
//       // console.log('Location:', location);
//       // console.log('Car Number:', carNumber);
      
//       const response=await axios.post("http://localhost:5000/api/v1/users/reportaccidents",{
//         location,
//         carNumber,
//         userEmail:JSON.parse(localStorage.getItem("userData")).user.email
//       }, {headers:{
//         "Authorization":`Bearer ${JSON.parse(localStorage.getItem("userData")).access}`
      
//       }}).then(res=>{
//         console.log(res.data);
//       })
//       .catch(error=>{
//         console.log(error);
//       })
//     };
  
//     return (
//       <div className="user-form-container">
//         <h2>Report Accident</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="location">Location:</label>
//             <input
//               type="text"
//               id="location"
//               value={location}
//               onChange={(e) => setLocation(e.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="carNumber">Car Number:</label>
//             <input
//               type="text"
//               id="carNumber"
//               value={carNumber}
//               onChange={(e) => setCarNumber(e.target.value)}
//               required
//             />
//             {carNumberError && <p className="error-message">{carNumberError}</p>}
//           </div>
//           <button className='repobut' type="submit">Submit</button>
//         </form>
//       </div>
//     );
//   };


// export default Report

import React, { useState } from 'react';
import './Report.css';
import axios from 'axios';

function Report() {
    const [location, setLocation] = useState('');
    const [carNumber, setCarNumber] = useState('');
    const [carNumberError, setCarNumberError] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [query, setQuery] = useState('');

    const userData = JSON.parse(localStorage.getItem("userData"));
    const accessToken = userData.access;
    const userEmail = userData.user.email;

    const handleInputChange = async (e) => {
        const value = e.target.value;
        setQuery(value);
        setLocation(value);

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
        setLocation(suggestion.display_name);
        setQuery(suggestion.display_name);
        setSuggestions([]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!/^[A-Z]{2}\d{2}[A-Z]{2}\d{4}$/.test(carNumber)) {
            setCarNumberError('Please enter a valid car number (e.g., AB12CD3456)');
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/v1/users/reportaccidents", {
                location,
                carNumber,
                userEmail
            }, {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            });

            console.log(response.data);
        } catch (error) {
            console.error('Error reporting accident:', error);
        }
    };

    return (
        <div className="user-form-container">
            <h2>Report Accident</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="location">Location:</label>
                    <input
                        type="text"
                        id="location"
                        value={query}
                        onChange={handleInputChange}
                        required
                    />
                    {suggestions.length > 0 && (
                        <ul className="suggestions-list">
                            {suggestions.map((suggestion) => (
                                <li
                                    key={suggestion.place_id}
                                    onClick={() => handleSuggestionClick(suggestion)}
                                >
                                    {suggestion.display_name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="carNumber">Car Number:</label>
                    <input
                        type="text"
                        id="carNumber"
                        value={carNumber}
                        onChange={(e) => setCarNumber(e.target.value)}
                        required
                    />
                    {carNumberError && <p className="error-message">{carNumberError}</p>}
                </div>
                <button className='repobut' type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Report;
