const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    const payload = user.role
        ? { id: user._id, email: user.email, role: "admin" }
        : { id: user._id, username: user.username, email: user.email };
    return jwt.sign(
        payload,
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '7d' },
    );
};

const generateAccessToken = (user) => {
    const payload = user.role
        ? { id: user._id, email: user.email, role: "admin" }
        : { id: user._id, username: user.username, email: user.email };
    return jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
};

module.exports = { generateToken, generateAccessToken };
