const express = require('express');
const router = express.Router();
const { addBooking } = require('../controllers/bookingController');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.post('/add', authMiddleware, addBooking);

module.exports = router;
