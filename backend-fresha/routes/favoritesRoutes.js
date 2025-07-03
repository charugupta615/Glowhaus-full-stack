const express = require('express');
const router = express.Router();
const favoritesController = require('../controllers/favoritesController');

router.post('/add', favoritesController.addFavorite);
router.get('/display/:customer_id', favoritesController.getFavoritesByCustomer);
router.delete('/remove', favoritesController.removeFavorite);

module.exports = router;
