const express = require('express');
const passport = require('passport');
const { generateToken } = require('../utils/jwtUtils');
const { register, login } = require('../controllers/authController');
const router = express.Router();

// Registration route
router.post('/register', register);
router.post('/login', login);
// Login route
router.post('/login/admin', async (req, res) => {  // Changed this line to async
    const { email, password } = req.body;
console.log(req.path)
    try {
        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(401).json({ message: "Incorrect email or password" });
        }

        const isMatch = await admin.comparePassword(password); // Compare password asynchronously

        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect email or password" });
        }

        const token = generateToken(admin);  // Generate JWT token for the admin
        res.json({ message: "Login successful", token });

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// Google Login route
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email'], // Scopes you want to request
}));

// Facebook Login route
router.get('/facebook', passport.authenticate('facebook', {
    scope: ['email'], // Scopes you want to request
}));

// Google Callback route
router.get('/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
    const token = generateToken(req.user);
    res.redirect(`http://localhost:3000/auth/callback?token=${token}`);  // Redirect to the callback page with token
});

// Facebook Callback route
router.get('/facebook/callback', passport.authenticate('facebook', { session: false }), (req, res) => {
    const token = generateToken(req.user);
    res.redirect(`http://localhost:3000/auth/callback?token=${token}`);  // Redirect to the callback page with token
});

module.exports = router;
