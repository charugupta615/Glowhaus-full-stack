import React from 'react';
import './DownloadApp.css';
import bookingCalendar from '../../assets/images/bookingCalendar.png';
import appPreview from '../../assets/images/appPreview.webp';
import greenSpot from '../../assets/images/greenSpot.webp';
import purpleSpot from '../../assets/images/purpleSpot.webp';
import Navbar from '../../components/Navbar/Navbar';

const DownloadApp = () => {
  return (
    <>
    <Navbar/>
    <div className="download-app-container">
      <h1 className="download-title">Download our mobile apps</h1>
      <p className="download-subtitle">
        Book unforgettable beauty and wellness experiences with our mobile app, or run your business with our powerful, award-winning iOS and Android booking platform.
      </p>
      
      <div className="app-section">
        <div className="app-card1 customer-app">
          <h2 className="app-head">Booking app for customers</h2>
          <p>
            Book unforgettable beauty and wellness experiences with the Fresha mobile app - the best way to discover top-rated salons and spas.
          </p>
          <div className="app-links">
            <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer" className="store-link">Google Play</a>
            <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer" className="store-link">App Store</a>
          </div>
          <div className="app-images">
            <img src={appPreview} alt="App Preview" className="app-image" />
            <img src="https://th.bing.com/th/id/OIP.iVT8onjjn8mo3L9LM_SUgQHaHa?w=180&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="QR Code" className="qr-code" />
          </div>
        </div>
        
        <div className="app-card1 professional-app">
          <h2 className="app-head">Booking app for professionals</h2>
          <p>
            Get started with Fresha for professionals and never miss an opportunity to connect with customers and build your business.
          </p>
          <div className="app-links">
            <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer" className="store-link">Google Play</a>
            <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer" className="store-link">App Store</a>
          </div>
          <div className="app-images">
            <img src={bookingCalendar} alt="Booking Calendar" className="app-image" />
            <img src="https://th.bing.com/th/id/OIP.iVT8onjjn8mo3L9LM_SUgQHaHa?w=180&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="QR Code" className="qr-code" />
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default DownloadApp;
