const express = require('express');
const router = express.Router();
const {
  createServiceType,
  getServiceTypesByBusiness,
  updateServiceType,
  deleteServiceType,
} = require('../controllers/serviceTypeController');

router.post('/create', createServiceType);
router.get('/business/:business_id', getServiceTypesByBusiness);
router.put('/update/:id', updateServiceType);
router.delete('/delete/:id', deleteServiceType);

module.exports = router;

