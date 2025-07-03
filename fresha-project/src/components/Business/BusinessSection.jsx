import React from 'react';
import './BusinessSection.css';

const BusinessSection = () => {
  return (
    <section className="business-section">
      {/* Left Section */}
      <div className="business-info">
        <h1 className="business-heading">Glowhaus for Business</h1>
        <p className="business-para">
          Supercharge your business for free with the world's top booking platform for salons and spas.
          Independently voted no. 1 by industry professionals.
        </p>
        <button>Find out more</button>
        
        <p className="rating">Excellent <span>5/5</span></p>
        <p className="stars">★★★★★</p>
        <p className="reviews">Over 1250 reviews on <a href="#">Capterra</a></p>
      </div>

      {/* Right Section */}
      <div className="business-preview">
        <img src="https://www.calendall.com/app/uploads/2024/11/Onlinekalender-fuer-Beautysalons-1.png" alt="Business Dashboard Preview" />
      </div>
    </section>
  );
};

export default BusinessSection;
