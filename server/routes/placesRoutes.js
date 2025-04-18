// routes/placesRoutes.js
const express = require('express');
const router = express.Router();
const { searchPlaces, getPlaceDetails, getNearbyAttractions, getLocalExperiences } = require('../controllers/placesController');

router.get('/', searchPlaces);
router.get('/details', getPlaceDetails);
router.get('/nearby', getNearbyAttractions);
router.get("/experiences", getLocalExperiences);

module.exports = router;
