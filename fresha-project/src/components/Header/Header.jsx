import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Header.css';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLoginClick = () => {
    navigate('/landing');
  };

  const handleBusinessClick = () => {
    navigate('/for-business');
  };

  const handleDownloadClick = () => {
    navigate('/download-app');
  };

  const handleProfileClick = () => {
    navigate('/profile'); 
  };

  const handleFavoritesClick = () => {
    navigate('/favorites'); // Adjust this route as per your app
  };

  return (
    <header className="header">
      <h1 className="logo">Glowhaus</h1>
      <div className="header-buttons">
        <button className="business-btn" onClick={handleBusinessClick}>For business</button>

        <div className="dropdown-wrapper">
          <button className="menu-btn" onClick={toggleDropdown}>
            Menu
            <i className={`fas fa-chevron-down dropdown-icon ${isDropdownOpen ? 'rotate' : ''}`}></i>
          </button>
          {isDropdownOpen && (
            <ul className="dropdown-menu">
              <li onClick={handleLoginClick}>Log in</li>
              <li onClick={handleBusinessClick}>For business</li>
              <li onClick={handleDownloadClick}>Download the app</li>
              <li>Customer support</li>
              <li>English</li>
            </ul>
          )}
        </div>

        {/* Favorites Button */}
        <button className="favorites-btn" onClick={handleFavoritesClick}>
          <i className="fas fa-heart favorites-icon"></i>
          Favorites
        </button>
        
        {/* Profile Button */}
        <button className="profile-btn" onClick={handleProfileClick}>
          <i className="fas fa-user profile-icon"></i>
          Profile
        </button>
      </div>
    </header>
  );
};

export default Header;

