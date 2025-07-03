const moment = require('moment');
const availabilityModel = require('../models/availabilityModel');

// Get availability for a specific team member and date
exports.getAvailability = (req, res) => {
  const { team_member_id, date } = req.params;

  availabilityModel.getAvailabilityByTeamMemberAndDate(team_member_id, date, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length > 0) {
      return res.json(result);
    } else {
      return res.status(404).json({ message: 'No available time slots for this date.' });
    }
  });
};

// Add new availability slot for a team member
exports.addAvailability = (req, res) => {
  const { team_member_id, date, time_slots } = req.body;

  if (!team_member_id || !date || !time_slots || time_slots.length === 0) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Convert each time slot into start_time and end_time in 24-hour format
  const availabilityData = time_slots.map((timeSlot) => {
    // Convert to 24-hour format using moment.js
    const start_time = moment(`${date} ${timeSlot}`, 'YYYY-MM-DD hh:mm A').format('YYYY-MM-DD HH:mm:ss');
    const end_time = moment(`${date} ${timeSlot}`, 'YYYY-MM-DD hh:mm A').add(1, 'hour').format('YYYY-MM-DD HH:mm:ss'); // 1-hour slot

    return {
      team_member_id,
      date,
      start_time,
      end_time,
      is_available: true
    };
  });

  availabilityModel.addAvailability(availabilityData, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Availability added successfully', id: result.insertId });
  });
};

// Update availability slot for a team member
exports.updateAvailability = (req, res) => {
  const { id } = req.params;
  const { start_time, end_time, is_available } = req.body;
  const availabilityData = { start_time, end_time, is_available };

  availabilityModel.updateAvailability(id, availabilityData, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Availability updated successfully' });
  });
};
