const express = require('express');
const router = express.Router();
const slotsController = require('../controllers/slotsController');

// Route to get booked slots for a team member on a specific date
router.get('/booked', slotsController.getBookedSlots);

// Route to create a new booking after checking availability
router.post('/create', slotsController.createBooking);

module.exports = router;
