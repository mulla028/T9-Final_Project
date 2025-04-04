const express = require('express');
const router = express.Router();
const { addBooking, addMultipleBookings } = require('../controllers/bookingController');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.post('/add', authMiddleware, addBooking);

router.post('/addMultiple', authMiddleware, addMultipleBookings);

module.exports = router;
