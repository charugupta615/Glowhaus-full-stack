const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/BookingController');

router.get('/admin/all', bookingController.getAllBookings);

// Route to create a new booking
router.post('/create/booking', bookingController.createBooking);

// Route to get all bookings for a customer
router.get('/customer/:customer_id', bookingController.getBookingsByCustomer);

// Route to get a booking by ID
router.get('/:booking_id', bookingController.getBookingById);

// Route to update booking status (e.g., 'confirmed', 'completed')
router.put('/:booking_id/status', bookingController.updateBookingStatus);

// Route to cancel a booking
router.delete('/:booking_id', bookingController.cancelBooking);
router.delete('/customer/:customer_id', bookingController.deleteAllBookingsByCustomer);
router.get('/slots/booked', bookingController.getBookedSlots);
router.get('/team/:team_id', bookingController.getBookingsByTeam);

module.exports = router;
