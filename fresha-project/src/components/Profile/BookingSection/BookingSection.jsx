import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { message } from 'antd';
import './BookingSection.css';

const BookingsSection = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch bookings from the backend when the component mounts
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const customerId = localStorage.getItem("customerId");
        const response = await axios.get(`https://glowhaus-full-stack.onrender.com/api/booking/customer/${customerId}`);
        setBookings(response.data.bookings || []);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        message.error("Failed to fetch bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Handle canceling the booking
  const handleCancelBooking = async (bookingId) => {
    try {
      console.log("Attempting to cancel booking with ID:", bookingId);
      
      const response = await axios.delete(`https://glowhaus-full-stack.onrender.com/api/booking/${bookingId}`);
      
      if (response.data?.message === "Booking cancelled successfully") {
        message.success("Booking canceled successfully!");

        setBookings((prevBookings) => prevBookings.filter((booking) => booking.id !== bookingId));
      } else {
        throw new Error(response.data?.message || "Failed to cancel booking");
      }
    } catch (error) {
      console.error("Error canceling booking:", error.response?.data || error.message);
      message.error(error.response?.data?.error || "Failed to cancel booking. Please try again.");
    }
  };

  if (loading) {
    return <p>Loading bookings...</p>;
  }

  return (
    <div>
      <div className="bookings-header">
        <h2>Your Bookings</h2>
      </div>

      {bookings.length > 0 ? (
        bookings.map((booking, index) => (
          <div key={index} className="booking-card">
            <h3>{booking.business?.name || "Unknown Business"}</h3>
            <p>
              <strong>Service(s):</strong>{" "}
              {booking.services.map((service) => service.service_name).join(", ")}
            </p>
            <p>
              <strong>Professional:</strong> {booking.team?.team_name || "N/A"}
            </p>
            <p>
              <strong>Date & Time:</strong>{" "}
              {new Date(booking.selected_date).toDateString()} - {booking.time || "N/A"}
            </p>
            <p>
              <strong>Total:</strong> BHD{" "}
              {booking.services.reduce((total, s) => total + (s.price || 0), 0)}
            </p>
            <button
              className="cancel-booking-btn"
              onClick={() => handleCancelBooking(booking.id)}
            >
              Cancel Booking
            </button>
          </div>
        ))
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default BookingsSection;
