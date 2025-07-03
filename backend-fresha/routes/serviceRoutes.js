const express = require('express');
const router = express.Router();
const {
  createService,
  getServicesByType,
  getServicesByBusiness,
  getAllServices,
  updateService,
  deleteService,
} = require('../controllers/serviceController');

router.post('/create', createService);
router.get('/display', getAllServices);
router.get('/type/:service_type_id', getServicesByType);
router.get('/business/:business_id', getServicesByBusiness); 
router.put('/update/:id', updateService);
router.delete('/delete/:id', deleteService);

module.exports = router;
