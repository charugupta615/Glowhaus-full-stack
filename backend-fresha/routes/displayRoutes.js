const express = require('express');
const router = express.Router();
const controller = require('../controllers/displayController');

router.get('/display', controller.display);

module.exports = router;