const express = require('express');
const router = express.Router();
const controller = require('../controllers/reviewController');

router.post('/add', controller.create);
router.get('/business/:business_id', controller.getByBusinessId);
router.get('/', controller.getAll); 

module.exports = router;
