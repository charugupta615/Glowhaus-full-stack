const db = require('../config/db');

// Get all booked slots for a specific team member on a specific date
exports.getBookedSlots = (team_id, selected_date, callback) => {
  const query = `
    SELECT time FROM bookings
    WHERE team_id = ? AND DATE(selected_date) = ? AND status != 'cancelled'
  `;
  db.query(query, [team_id, selected_date], (err, results) => {
    if (err) return callback(err);
    const bookedSlots = results.map(row => row.time); 
    callback(null, bookedSlots);
  });
};

// Check if a specific time slot is already booked for a given team member on a specific date
exports.isSlotBooked = (team_id, selected_date, time, callback) => {
  const query = `
    SELECT COUNT(*) AS count FROM bookings
    WHERE team_id = ? AND DATE(selected_date) = ? AND time = ? AND status != 'cancelled'
  `;
  db.query(query, [team_id, selected_date, time], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0].count > 0); // Return true if the slot is booked, else false
  });
};

// Insert a new booking into the database
exports.createBooking = (customer_id, business_id, team_id, service_ids, selected_date, time, callback) => {
  const query = `
    INSERT INTO bookings (customer_id, business_id, team_id, service_ids, selected_date, time, status)
    VALUES (?, ?, ?, ?, ?, ?, 'confirmed')
  `;
  db.query(query, [customer_id, business_id, team_id, JSON.stringify(service_ids), selected_date, time], (err, result) => {
    if (err) return callback(err);
    callback(null, result.insertId); // Return the booking ID after insertion
  });
};
