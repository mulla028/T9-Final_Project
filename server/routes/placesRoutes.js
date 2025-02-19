// routes/placesRoutes.js
const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const { searchPlaces, getPlaceDetails } = require('../controllers/placesController');

router.get('/', searchPlaces);
router.get('/details', getPlaceDetails);
=======
const { searchPlaces, getPlaceDetails, getNearbyAttractions } = require('../controllers/placesController');

router.get('/', searchPlaces);
router.get('/details', getPlaceDetails);
router.get('/nearby', getNearbyAttractions);
>>>>>>> 3bec758 (adding booking feature files)

module.exports = router;
