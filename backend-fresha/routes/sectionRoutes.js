const express = require('express');
const router = express.Router();
const controller = require('../controllers/sectionController');

// New Display Route for frontend (recommended structure)
router.get('/display', controller.getSectionsWithBusiness);

router.get('/all', controller.getAll);
router.post('/create', controller.create);
router.put('/update/:id', controller.update);
router.delete('/delete/:id', controller.delete);

// Manage section-salon relationships
router.post('/:sectionId/business/:businessId', controller.addBusiness);
router.delete('/:sectionId/business/:businessId', controller.removeBusiness);

module.exports = router;
