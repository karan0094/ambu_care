import React, { useState } from 'react';
import './App.css'; // Assuming you have your CSS file

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="side">
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Services</a>
        <a href="#">Contact</a>
      </div>
      <div className="content">
        <button onClick={toggleSidebar}>Toggle Sidebar</button>
        <p>Main Content Goes Here</p>
      </div>
    </div>
  );
}

export default Sidebar;
