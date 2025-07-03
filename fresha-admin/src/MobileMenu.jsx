// MobileMenu.jsx
import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import './styles/MobileMenu.css';

function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { label: 'Dashboards', to: '/' },
    { label: 'Sales', to: '/sales' },
    { label: 'Salons', to: '/salons' },
    { label: 'Clients', to: '/clients' },
    { label: 'Catalog', to: '/catalog' },
    { label: 'Calendar', to: '/calendar' },
    { label: 'Bookings', to: '/bookings' },
    { label: 'Teams', to: '/teams' },
    { label: 'Settings', to: '/settings' },
  ];

  return (
    <div className="mobile-menu-container">
      <button className="menu-button" onClick={toggleMenu}>
        <Menu size={24} />
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`dropdown-item ${location.pathname === item.to ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default MobileMenu;
