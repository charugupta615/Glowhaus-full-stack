import React from 'react';
import { Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './HeaderBusiness.css';

const HeaderBusiness = () => {
  return (
    <nav className="navbar">
      {/* Fresha Logo wrapped in Link for navigation */}
      <Link to="/" className="logo">
        Glowhaus
      </Link>
      <div className="nav-links">
        <a href="#">Pricing</a>
        <a href="#">Marketplace</a>
        <Button className="sign-up-btn">Sign up</Button>
        <MenuOutlined className="menu-icon" />
      </div>
    </nav>
  );
};

export default HeaderBusiness;
