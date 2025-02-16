// routes/placesRoutes.js
const express = require('express');
const router = express.Router();
const { searchPlaces, getPlaceDetails } = require('../controllers/placesController');

router.get('/', searchPlaces);
router.get('/details', getPlaceDetails);

module.exports = router;
