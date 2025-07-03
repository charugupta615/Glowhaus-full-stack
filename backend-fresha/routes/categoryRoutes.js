const express = require('express');
const router = express.Router();
const controller = require('../controllers/categoryController');

router.get('/display', controller.getAll);
router.post('/create', controller.create);
router.put('/update/:id', controller.update);
router.delete('/delete/:id', controller.delete);

module.exports = router;