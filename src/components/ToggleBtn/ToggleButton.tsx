import React, { useState } from 'react';
import './ToggleButton.css'; // Import the CSS file

const ToggleButton = ({ initToggle, onToggle, label }) => {
  const [isToggled, setIsToggled] = useState(initToggle);

  const handleToggle = () => {
    const newToggleState = !isToggled;
    setIsToggled(newToggleState);
    onToggle(newToggleState); // Call the callback function with the new state
  };

  return (
    <div className="toggle-container">
      {/* <div className="toggle-icon">🐶</div> */}
      <span className="toggle-label">{label}</span>
      <label className="switch">
        <input type="checkbox" checked={isToggled} onChange={handleToggle} />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default ToggleButton;
