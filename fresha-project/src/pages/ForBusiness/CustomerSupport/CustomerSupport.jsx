import React from 'react';
import './CustomerSupport.css';
import { FaArrowRight } from 'react-icons/fa';

const CustomerSupport = () => {
  return (
    <div className="support-container">
      <h1>You are never alone,<br /> award winning customer support 24/7</h1>
      <div className="support-cards">
        {/* Help Center Card */}
        <div className="support-card">
          <h2>Help Center</h2>
          <p>Explore and learn with our help center knowledge base.</p>
          <a href="/help-center">
            Go to help center <FaArrowRight />
          </a>
        </div>
        {/* Contact Us Card */}
        <div className="support-card">
          <h2>Contact us</h2>
          <p>Contact us via email and phone and one of our team will be there to help.</p>
          <a href="/contact">
            Contact us <FaArrowRight />
          </a>
        </div>
      </div>
    </div>
  );
};

export default CustomerSupport;
