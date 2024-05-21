import React from 'react'
import { useState } from 'react';
import './Report.css'
function Report() {
    const [location, setLocation] = useState('');
    const [carNumber, setCarNumber] = useState('');
    const [carNumberError, setCarNumberError] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      // Car number validation (simple example)
      if (!/^[A-Z]{2}\d{2}[A-Z]{2}\d{4}$/.test(carNumber)) {
        setCarNumberError('Please enter a valid car number (e.g., AB12CD3456)');
        return;
      }
  
      // Handle form submission (e.g., send data to backend)
      console.log('Location:', location);
      console.log('Car Number:', carNumber);
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
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
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
  };


export default Report
