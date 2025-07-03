import React from 'react';
import './Software.css';
import stylistProfile from '../../../assets/images/stylistProfile.png';
import bookingCalendar from '../../../assets/images/bookingCalendar.png';

const Software = () => {
  return (
    <section className="software-section">
      <div className="software-content">
        <h1>
          All-in-one <span className="highlight">software</span> to run your business
        </h1>
        <p className="description">
          Most loved and the top-rated booking software for salons, spas, and other beauty and wellness businesses
        </p>
        <ul className="features-list">
          <li>
            ✅ Powerful calendar with unlimited bookings, clients, locations, and much more
          </li>
          <li>
            ✅ Advanced insights providing a 360-degree view of each client, including booking behaviors, client
            preferences, preferred payment methods, marketing channels, lifetime value, and more
          </li>
          <li>
            ✅ Crafted to deliver a smooth experience that enhances your business and elevates your brand
          </li>
        </ul>
      </div>
      <div className="software-images">
        <img src={stylistProfile} alt="Stylist Profile" className="profile-image" />
        <img src={bookingCalendar} alt="Booking Calendar" className="calendar-image" />
      </div>
    </section>
  );
};

export default Software;
