// routes/authRoutes.js
const express = require('express');
const passport = require('passport');
const { generateToken } = require('../utils/jwtUtils');
const { register, login } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// Google Login Route
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email'], // Scopes you want to request
}));

// Facebook Login Route
router.get('/facebook', passport.authenticate('facebook', {
    scope: ['email'], // Scopes you want to request
}));

// Callback Route for Google
router.get('/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
    const token = generateToken(req.user);
    res.redirect(`http://localhost:3000/auth/callback?token=${token}`); // Redirect to the new callback page
});

// Callback Route for Facebook
router.get('/facebook/callback', passport.authenticate('facebook', { session: false }), (req, res) => {
    const token = generateToken(req.user);
    res.redirect(`http://localhost:3000/auth/callback?token=${token}`); // Redirect to the new callback page
});


module.exports = router;
