// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { generateToken } = require('../utils/jwtUtils');

exports.register = async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Password doesn\'t not match' });
    }

    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'User already exists!' });

        user = new User({ username, email, password });
        user.password = await bcrypt.hash(password, process.env.PASSWORD_SALT);
        await user.save();

        const refreshToken = generateToken(user);
        const payload = { id: user._id, username: user.username };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, accessToken) => {
            if (err) throw err;
            res.json({ accessToken, refreshToken });
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

        const refreshToken = generateToken(user);
        const payload = { id: user._id, username: user.username };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, accessToken) => {
            if (err) throw err;
            res.json({ accessToken, refreshToken });
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};