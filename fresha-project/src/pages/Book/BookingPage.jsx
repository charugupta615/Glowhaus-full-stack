import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BookingPage.css';

const BookingPage = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="booking-page">
      {/* Combined Heading Section */}
      <div className="booking-header">
        <h1 className="booking-title">Choose an option</h1>
        <h2 className="booking-subtitle">Book</h2>
      </div>

      {/* Booking Options */}
      <div className="booking-options">
        <div className="booking-card" onClick={() => handleNavigation('/book-appointment')}>
          <h3 className="booking-heading">Book an appointment</h3>
          <p className="booking-para">Schedule services for yourself</p>
        </div>

        <div className="booking-card" onClick={() => handleNavigation('/group-appointment')}>
          <h3 className="book-heading">Group appointment</h3>
          <p className="book-para">For yourself and others</p>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
