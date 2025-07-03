// const Slot = require('../models/slotModel');


// // Get booked slots for a specific team and date
// exports.getBookedSlots = (req, res) => {
//   const { team_id, selected_date } = req.query;

//   if (!team_id || !selected_date) {
//     return res.status(400).json({ error: 'Team ID and selected date are required' });
//   }

//   Slot.getBookedSlots(team_id, selected_date, (err, bookedSlots) => {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }
//     res.status(200).json({ bookedSlots });
//   });
// };

// // Create a new booking, checking slot availability first
// exports.createBooking = (req, res) => {
//   const { customer_id, business_id, team_id, service_ids, selected_date, time } = req.body;

//   if (!customer_id || !business_id || !team_id || !service_ids || !selected_date || !time) {
//     return res.status(400).json({ error: 'All fields are required' });
//   }

//   // Check if the selected slot is already booked
//   Slot.isSlotBooked(team_id, selected_date, time, (err, isBooked) => {
//     if (err) return res.status(500).json({ error: err.message });

//     if (isBooked) {
//       return res.status(409).json({ error: 'This slot is already booked' });
//     }

//     // If the slot is available, proceed with booking
//     Slot.createBooking(customer_id, business_id, team_id, service_ids, selected_date, time, (err, bookingId) => {
//       if (err) return res.status(500).json({ error: err.message });
//       res.status(201).json({ message: 'Booking created successfully', bookingId });
//     });
//   });
// };








const Slot = require('../models/slotModel');

// Function to validate time format (24-hour format)
const isValidTimeFormat = (time) => {
  const regex = /^([01]?[0-9]|2[0-3]):([0-5]?[0-9])$/;
  return regex.test(time);
};

// Function to validate time format (AM/PM format)
const isValidAMPMTimeFormat = (time) => {
  const regex = /^([0]?[1-9]|1[0-2]):([0-5]?[0-9])\s([APap][Mm])$/;
  return regex.test(time);
};

// Get booked slots for a specific team and date
exports.getBookedSlots = (req, res) => {
  const { team_id, selected_date } = req.query;

  if (!team_id || !selected_date) {
    return res.status(400).json({ error: 'Team ID and selected date are required' });
  }

  Slot.getBookedSlots(team_id, selected_date, (err, bookedSlots) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ bookedSlots });
  });
};

// Check if a specific time slot is already booked for a given team member on a specific date
exports.isSlotBooked = (team_id, selected_date, time, callback) => {
  // Validate the time format before proceeding
  if (!isValidTimeFormat(time) && !isValidAMPMTimeFormat(time)) {
    return callback(new Error('Invalid time format. Please use "HH:mm" or "hh:mm A".'));
  }

  const query = `
    SELECT COUNT(*) AS count FROM bookings
    WHERE team_id = ? AND selected_date = ? AND time = ? AND status != 'cancelled'
  `;
  db.query(query, [team_id, selected_date, time], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0].count > 0); // Return true if the slot is booked, else false
  });
};

// Create a new booking, checking slot availability first
exports.createBooking = (req, res) => {
  const { customer_id, business_id, team_id, service_ids, selected_date, time } = req.body;

  if (!customer_id || !business_id || !team_id || !service_ids || !selected_date || !time) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Validate the time format before proceeding
  if (!isValidTimeFormat(time) && !isValidAMPMTimeFormat(time)) {
    return res.status(400).json({ error: 'Invalid time format. Please use "HH:mm" or "hh:mm A".' });
  }

  // Check if the selected slot is already booked
  Slot.isSlotBooked(team_id, selected_date, time, (err, isBooked) => {
    if (err) return res.status(500).json({ error: err.message });

    if (isBooked) {
      return res.status(409).json({ error: 'This slot is already booked' });
    }

    // If the slot is available, proceed with booking
    Slot.createBooking(customer_id, business_id, team_id, service_ids, selected_date, time, (err, bookingId) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Booking created successfully', bookingId });
    });
  });
};
