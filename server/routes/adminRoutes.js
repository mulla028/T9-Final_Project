const express = require('express');
const { login } = require('../controllers/adminController');
const { getDashboardData } = require('../controllers/dashboardController');
const adminAuthMiddleware = require('../middlewares/adminAuthMiddleware');

const router = express.Router();

router.post('/login', login);
router.get('/dashboard', adminAuthMiddleware, getDashboardData);

module.exports = router;
