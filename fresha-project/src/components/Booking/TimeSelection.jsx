import React, { useState, useEffect } from "react";
import { Card, Button, message, Modal } from "antd";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./TimeSelection.css";
import Navbar from "../Navbar/Navbar";

export default function TimeSelection() {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedServices, selectedProfessional, business } = location.state || {};

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [bookedSlots, setBookedSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allTimeSlots, setAllTimeSlots] = useState([]);

  // Generate slots from 09:00 to 21:00 (or based on business hours)
  const generateTimeSlots = () => {
    const slots = [];
    const openHour = parseInt((business?.open_until || "09:00").slice(0, 2));
    const closeHour = parseInt((business?.closed_till || "21:00").slice(0, 2));

    for (let hour = openHour; hour < closeHour; hour++) {
      const start = hour.toString().padStart(2, "0") + ":00";
      const end = (hour + 1).toString().padStart(2, "0") + ":00";
      slots.push(`${start} - ${end}`);
    }
    setAllTimeSlots(slots);
  };

  useEffect(() => {
    generateTimeSlots();
  }, [business]);

  useEffect(() => {
    const fetchBookedSlots = async () => {
      if (!selectedProfessional || !selectedDate) return;
      try {
        const formattedDate = selectedDate.toISOString().split("T")[0];
        const res = await axios.get("https://glowhaus-full-stack.onrender.com/api/slot/booked", {
          params: {
            team_id: selectedProfessional.id,
            selected_date: formattedDate,
          },
        });
        setBookedSlots(res.data.bookedSlots || []);
      } catch (err) {
        console.error("Error fetching booked slots:", err);
        setBookedSlots([]);
      }
    };
    fetchBookedSlots();
  }, [selectedDate, selectedProfessional]);

  const handleSlotClick = (slot) => {
    if (!bookedSlots.includes(slot)) {
      setSelectedTime(slot);
    } else {
      message.warning("Slot is already booked");
    }
  };

  const handleContinue = () => {
    if (!selectedTime) {
      message.warning("Please select a time slot.");
      return;
    }
    setIsModalOpen(true);
  };

  const handleConfirmBooking = async () => {
    try {
      const customerId = localStorage.getItem("customerId");
      if (!customerId) {
        message.error("Please login to continue.");
        navigate("/login", {
          state: {
            from: location.pathname,
            bookingData: {
              selectedServices,
              selectedProfessional,
              business,
              selectedDate,
              selectedTime,
            },
          },
        });
        return;
      }

      const payload = {
        customer_id: customerId,
        business_id: business.id,
        team_id: selectedProfessional.id,
        service_ids: selectedServices.map((s) => s.id),
        selected_date: selectedDate.toISOString(),
        time: selectedTime,
      };

      const res = await axios.post("https://glowhaus-full-stack.onrender.com/api/booking/create/booking", payload);
      if (res.status === 201 || res.data.message === "Booking created successfully") {
        message.success("Booking confirmed!");
        setBookedSlots((prev) => [...prev, selectedTime]);
        setIsModalOpen(false);
        navigate("/leave-review", {
        state: {
          businessId: business.id,
          selectedServices,
          selectedProfessional,
          selectedDate,
          selectedTime,
        },
      });
      } else {
        throw new Error("Booking failed.");
      }
    } catch (err) {
      console.error(err);
      message.error("Failed to confirm booking.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="time-selection-wrapper">
        <div className="left-section">
          <div className="breadcrumb">
            <span
              className="clickable"
              onClick={() =>
                navigate(`/business/${business.slug}/selection`, {
                  state: { selectedServices, business },
                })
              }
            >
              Services
            </span>
            <span>›</span>
            <span
              className="clickable"
              onClick={() =>
                navigate(`/business/${business.slug}/professional`, {
                  state: { selectedServices, selectedProfessional, business },
                })
              }
            >
              Professional
            </span>
            <span>›</span>
            <span className="active">Time</span>
          </div>

          <h2 className="section-title">Select date & time</h2>

          <div className="time-selection-content">
            <div className="calendar-container">
              <h3>Select a date</h3>
              <Calendar value={selectedDate} onChange={setSelectedDate} />
            </div>

            <div className="time-slots-container">
              <h3>Available Time Slots</h3>
              <div className="time-list">
                {allTimeSlots.map((slot, idx) => {
                  const isSelected = selectedTime === slot;
                  const isBooked = bookedSlots.includes(slot);
                  return (
                    <div
                      key={idx}
                      className={`time-slot ${isSelected ? "selected" : ""} ${isBooked ? "unavailable" : "available"}`}
                      onClick={!isBooked ? () => handleSlotClick(slot) : null}
                    >
                      {slot}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="right-section">
          <Card className="summary-card">
            <div className="summary-header">
              <img
                src={
                  business?.main_image
                    ? `https://glowhaus-full-stack.onrender.com${business.main_image}`
                    : "https://via.placeholder.com/60"
                }
                alt="Salon"
                className="salon-img"
              />
              <div>
                <h3>{business?.name}</h3>
                <p> ⭐ {business?.average_rating || 0} ({business?.total_reviews || 0})</p>
                <p className="location">{business?.address}</p>
              </div>
            </div>

            {selectedServices?.length > 0 && (
              <div className="summary-body">
                {selectedServices.map((service, idx) => (
                  <p key={idx}>{service.title} - BHD {service.price}</p>
                ))}
              </div>
            )}

            {selectedProfessional && (
              <div className="summary-body">
                <p><strong>Professional:</strong> {selectedProfessional.team_name}</p>
              </div>
            )}

            {selectedDate && selectedTime && (
              <div className="summary-body">
                <p><strong>Date & Time:</strong> {selectedDate.toDateString()}, {selectedTime}</p>
              </div>
            )}

            <div className="summary-total">
              <span>Total</span>
              <span>
                {selectedServices?.length > 0
                  ? `BHD ${selectedServices.reduce((sum, s) => sum + s.price, 0)}`
                  : "Free"}
              </span>
            </div>

            <Button type="primary" className="continue-btn" onClick={handleContinue}>
              Continue
            </Button>
          </Card>
        </div>

        <Modal
          title="Confirm Booking"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
          className="confirm-booking-modal"
        >
          <div className="confirmation-header">
            <i className="fa fa-check-circle" style={{ color: "green", fontSize: "24px" }}></i>
            <div>
              <h3>Almost done!</h3>
              <p>Review your booking details below.</p>
            </div>
          </div>

          <div className="confirmation-section">
            <h4>Services</h4>
            {selectedServices.map((service, idx) => (
              <div key={idx} className="confirmation-item">
                <span>{service.title}</span>
                <span>BHD {service.price}</span>
              </div>
            ))}
          </div>

          <div className="confirmation-section">
            <h4>Professional</h4>
            <p>{selectedProfessional?.team_name}</p>
          </div>

          <div className="confirmation-section">
            <h4>Date & Time</h4>
            <p>{selectedDate.toDateString()}, {selectedTime}</p>
          </div>

          <div className="modal-actions">
            <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="primary" onClick={handleConfirmBooking}>
              Confirm Booking
            </Button>
          </div>
        </Modal>
      </div>
    </>
  );
}
