import React from 'react';
import './Header.css';

const Header = ({ personal }) => {
  if (!personal) return null;

  return (
    <div className="header">
      <div className="header-content">
        <div className="header-info">
          <h1 className="name">{personal.name}</h1>
          <p className="role">{personal.role}</p>
          <p className="age-location">
            {personal.age} years old - {personal.location}
          </p>
        </div>
        <div className="header-image">
          <div className="profile-placeholder">
            <span>Photo</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;


