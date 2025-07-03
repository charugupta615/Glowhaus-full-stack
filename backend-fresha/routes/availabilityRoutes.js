const express = require('express');
const router = express.Router();
const availabilityController = require('../controllers/availabilityController');

// Get availability for a specific team member and date
router.get('/team/:team_member_id/date/:date', availabilityController.getAvailability);

// Add new availability slot
router.post('/add', availabilityController.addAvailability);

// Update availability slot
router.put('/update/:id', availabilityController.updateAvailability);

module.exports = router;
