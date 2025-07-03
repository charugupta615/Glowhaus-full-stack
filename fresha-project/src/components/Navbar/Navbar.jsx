import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Navbar.css';

const Navbar = () => {
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

  return (
    <header className="navbar">
      {/* Fresha Logo with Link to home page */}
      <Link to="/" className="logo">
        Glowhaus
      </Link>

      {/* Search Filters */}
      <div className="filter-wrapper">
        <div className="filter-bar">
          <div className="filter-section">
            <i className="fas fa-search" aria-hidden="true"></i>
            <input type="text" placeholder="All treatments and venues" />
          </div>
          <div className="filter-section">
            <i className="fas fa-map-marker-alt" aria-hidden="true"></i>
            <input type="text" placeholder="Current location" />
          </div>
          <div className="filter-section">
            <i className="far fa-calendar" aria-hidden="true"></i>
            <input type="text" placeholder="Any date" />
          </div>
          <div className="filter-section">
            <i className="far fa-clock" aria-hidden="true"></i>
            <input type="text" placeholder="Any time" />
          </div>
        </div>
      </div>

      {/* Menu Dropdown */}
      <div className="menu-wrapper">
        <button className="menu-btn" onClick={toggleDropdown}>
          Menu <i className={`fas fa-chevron-down ${isDropdownOpen ? 'rotate' : ''}`}></i>
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
    </header>
  );
};

export default Navbar;
