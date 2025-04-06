const express = require('express');
const router = express.Router();
const { contactSupport } = require('../controllers/supportController');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.post('/contact', authMiddleware, contactSupport);

module.exports = router;
