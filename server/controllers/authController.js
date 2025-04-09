// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { generateToken, generateAccessToken } = require('../utils/jwtUtils');

exports.register = async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }

    try {
        let existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });

        await newUser.save();
        console.log("User saved successfully:", newUser);

        const refreshToken = generateToken(newUser);
        const accessToken = generateAccessToken(newUser);
        res.json({ message: "User registered successfully", accessToken, refreshToken });
    } catch (err) {
        console.error("Server Error:", err);
        res.status(500).json({ message: "Internal server error, please try again." });
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
        const accessToken = generateAccessToken(user);
        res.json({ message: "User signed in successfully", accessToken, refreshToken });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};