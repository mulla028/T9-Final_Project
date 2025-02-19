// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
<<<<<<< HEAD
=======
const passport = require('passport');
const { generateToken } = require('../utils/jwtUtils');
>>>>>>> 3350c9c (server added)
const User = require('../models/User');

exports.register = async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Password doesn\'t not match' });
    }

    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'User already exists!' });

        user = new User({ username, email, password });
<<<<<<< HEAD
        user.password = await bcrypt.hash(password, process.env.PASSWORD_SALT);
=======
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
>>>>>>> 3350c9c (server added)
        await user.save();

        const payload = { user: { id: user.id, username: user.username } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'User not existed. Register Now!' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid Password, Try again!' });

        const payload = { id: user.id, username: user.username };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};