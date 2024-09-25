import React, { useEffect, useState } from 'react';
import './Profile.css'; // Make sure to create a corresponding CSS file
import { getStoredUser } from '../../utils/storage';

const Profile: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  const handleSettingClick = () => {
    window.open('https://www.fincake.co/user/profile', '_blank');
  };
  const handleLoginClick = () => {
    window.open('https://www.fincake.co/auth/login', '_blank');
  }

  useEffect(() => {
    getStoredUser().then((user) => setUser(user))
  }, [])

  if (!user) {
    return (
      <div className="login-container">
        <button className="login-button" onClick={handleLoginClick}>
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="user-profile">
      <div className="user-header">
        <div className="user-info">
          <h2>{user.name}</h2>
          <p className="user-email">{user.email}</p>
        </div>
      </div>
      <div className="user-menu">
        <div className="menu-item">
          <span>Name</span>
          <span className="menu-item-value">{user.name}</span>
        </div>
        <div className="menu-item">
          <span>Email</span>
          <span className="menu-item-value">{user.email}</span>
        </div>
        <div onClick={handleSettingClick} className="menu-item">
          <span>Setting</span>
          <span className="menu-item-action"> {'>'} </span>
        </div>
        {/* <div className="menu-item">
          <span>Favorites</span>
        </div> */}
        {/* <div className="menu-item">
          <span>BigGo Assistant instructions</span>
        </div> */}
        <div className="menu-item">
          <span>Rate Fincake</span>
        </div>
      </div>
      <div className="sign-out">
        <span>Sign out</span>
      </div>
    </div>
  );
};

export default Profile;
