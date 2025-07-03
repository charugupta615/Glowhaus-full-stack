import React from "react";
import "./MobileApps.css";
import bookingCalendar from "../../../assets/images/bookingCalendar.png";
import appPreview from "../../../assets/images/appPreview.webp";

const MobileApps = () => {
  return (
    <section className="apps-section">
      <h2 className="apps-heading">Download our mobile apps</h2>
      <p className="apps-subtext">
        Book unforgettable beauty and wellness experiences with our mobile app, or
        run your business with our award-winning iOS and Android app
      </p>
      <div className="app-container">
        {/* Customer App Card */}
        <div className="app-card">
          <div className="app-content">
            <div className="app-icon"></div>
            <h3 className="app-title">Booking app for customers</h3>
            <p className="app-description">
              Instantly book beauty and wellness experiences near you
            </p>
            <div className="app-buttons">
              <button className="app-store">App Store</button>
              <button className="google-play">Google Play</button>
            </div>
          </div>
          {/* Customer App Image */}
          <div className="app-image">
          <img src={appPreview} alt="App Preview" />
          </div>
        </div>
        {/* Business App Card */}
        <div className="app-card">
          <div className="app-content">
            <div className="app-icon"></div>
            <h3 className="app-title">Business app for professionals</h3>
            <p className="app-description">
              Simple, flexible and powerful software to run your business on the go
            </p>
            <div className="app-buttons">
              <button className="app-store">App Store</button>
              <button className="google-play">Google Play</button>
            </div>
          </div>
          {/* Business App Image */}
          <div className="app-image">
          <img src={bookingCalendar} alt="Booking Calendar" className="calendar-image" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileApps;
