const express = require('express');
const router = express.Router();
const { addToFavorites } = require('../controllers/favoriteController');
const favoriteController=require('../controllers/favouriteController');
router.post('/favorites/add', favoriteController.addToFavorites);

module.exports = router;