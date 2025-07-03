import React from 'react';
import './Market.css';
import appPreview from '../../../assets/images/appPreview.webp';

const Market = () => {
  return (
    <section className="market-section">
      <div className="market-images">
        <img src={appPreview} alt="App Preview" />
        <img
          src="https://th.bing.com/th/id/OIP.36SZzut5VoT1kvwfSo0bNAAAAA?rs=1&pid=ImgDetMain"
          alt="App Preview"
        />
      </div>
      <div className="market-content">
        <h1>
          The most popular <span className="highlight">marketplace</span> to grow your business
        </h1>
        <p className="market-description">
          Promote your business and reach new clients on the world’s largest beauty and wellness marketplace
        </p>
        <ul className="market-list">
          <li>✅ Increase your online visibility by listing your business on Fresha marketplace</li>
          <li>✅ Reach millions of clients looking to book their next appointment today</li>
          <li>✅ Free up time and get your clients self-booking online 24/7</li>
        </ul>
      </div>
    </section>
  );
};

export default Market;