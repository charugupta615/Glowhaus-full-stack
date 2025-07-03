const express = require('express');
const router = express.Router();
const sharesController = require('../controllers/sharesController');

// Log a share
router.post('/log', sharesController.logShare);

module.exports = router;
