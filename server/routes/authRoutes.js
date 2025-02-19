<<<<<<< HEAD
=======
// routes/authRoutes.js
>>>>>>> 3350c9c (server added)
const express = require('express');
const passport = require('passport');
const { generateToken } = require('../utils/jwtUtils');
const { register, login } = require('../controllers/authController');
const router = express.Router();
<<<<<<< HEAD
const { CALLBACK_URL } = require('../utils/general');

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
=======

router.post('/register', register);
router.post('/login', login);
>>>>>>> 3350c9c (server added)

// Google Login Route
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email'], // Scopes you want to request
}));

// Facebook Login Route
router.get('/facebook', passport.authenticate('facebook', {
    scope: ['email'], // Scopes you want to request
}));

<<<<<<< HEAD

// Callback Route for Google
router.get('/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
    const token = generateToken(req.user);
    res.redirect(`${CALLBACK_URL}/auth/callback?token=${token}`); // Redirect to the new callback page
=======
// Callback Route for Google
router.get('/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
    const token = generateToken(req.user);
    res.redirect(`http://localhost:3000/auth/callback?token=${token}`); // Redirect to the new callback page
>>>>>>> 3350c9c (server added)
});

// Callback Route for Facebook
router.get('/facebook/callback', passport.authenticate('facebook', { session: false }), (req, res) => {
    const token = generateToken(req.user);
<<<<<<< HEAD
    res.redirect(`${CALLBACK_URL}/auth/callback?token=${token}`); // Redirect to the new callback page
=======
    res.redirect(`http://localhost:3000/auth/callback?token=${token}`); // Redirect to the new callback page
>>>>>>> 3350c9c (server added)
});


module.exports = router;
