const Booking = require('../models/bookingModel');
const db = require('../config/db');

exports.createBooking = (req, res) => {
  const { customer_id, business_id, team_id, service_ids, selected_date, time } = req.body;

  if (!customer_id || !business_id || !team_id || !service_ids || !selected_date || !time) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  Booking.isSlotBooked(team_id, selected_date, time, (err, isBooked) => {
    if (err) return res.status(500).json({ error: err.message });
    if (isBooked) {
      return res.status(409).json({ error: 'This slot is already booked' });
    }

    // Create the booking and set its status to 'confirmed'
    Booking.createBooking(customer_id, business_id, team_id, service_ids, selected_date, time, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      // Update status to 'confirmed' after the booking creation
      const booking_id = result;
      Booking.updateBookingStatus(booking_id, 'confirmed', (err) => {
        if (err) {
          return res.status(500).json({ error: 'Failed to update status to confirmed' });
        }

        return res.status(201).json({ message: 'Booking created successfully', bookingId: booking_id });
      });
    });
  });
};


// Get booked slots for a team on a specific date
exports.getBookedSlots = (req, res) => {
  const { team_id, selected_date } = req.query;

  // Log the received parameters
  console.log('Received team_id:', team_id);
  console.log('Received selected_date:', selected_date);

  // Update the query to exclude cancelled and pending bookings
  const query = `
    SELECT * FROM bookings 
    WHERE team_id = ? 
      AND DATE(selected_date) = ? 
      AND status != 'cancelled'
  `;

  // Assuming you're using a MySQL client like `mysql2`
  db.query(query, [team_id, selected_date], (err, results) => {
    if (err) {
      console.log('Error fetching booked slots:', err);
      return res.status(500).json({ error: err.message });
    }

    // Log the results
    console.log('Booked slots found:', results);
    return res.status(200).json({ bookedSlots: results });
  });
};


// Get all bookings for a customer
exports.getBookingsByCustomer = (req, res) => {
  const customer_id = req.params.customer_id;

  Booking.getBookingsByCustomer(customer_id, (err, bookings) => {
    if (err) {
      console.error('Error fetching bookings:', err);
      return res.status(500).json({ error: err.message });
    }
    return res.status(200).json({ bookings });
  });
};

// Get a booking by ID
exports.getBookingById = (req, res) => {
  const booking_id = req.params.booking_id;

  Booking.getBookingById(booking_id, (err, booking) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    return res.status(200).json({ booking });
  });
};

// Get all bookings
exports.getAllBookings = (req, res) => {
  Booking.getAllBookings((err, bookings) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.status(200).json({ bookings });
  });
};

// Update booking status
exports.updateBookingStatus = (req, res) => {
  const booking_id = req.params.booking_id;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: 'Status is required' });
  }

  Booking.updateBookingStatus(booking_id, status, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.status(200).json({ message: 'Booking status updated successfully' });
  });
};

// Cancel a booking
exports.cancelBooking = (req, res) => {
  const booking_id = req.params.booking_id;

  Booking.cancelBooking(booking_id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!result) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    return res.status(200).json({ message: 'Booking cancelled successfully' });
  });
};

// Delete all bookings for a specific customer
exports.deleteAllBookingsByCustomer = (req, res) => {
  const customer_id = req.params.customer_id;

  Booking.deleteAllBookingsByCustomer(customer_id, (err, deletedCount) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    return res.status(200).json({
      message: 'All bookings deleted successfully',
      deletedCount: deletedCount,
    });
  });
};
exports.getBookingsByTeam = (req, res) => {
  const teamId = req.params.team_id;

  Booking.getBookingsByTeam(teamId, (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch bookings', details: err });

    const updatedResult = result.map(booking => ({
      ...booking,
      services: booking.services ? booking.services.split(', ') : [],
    }));

    res.json(updatedResult);
  });
};

