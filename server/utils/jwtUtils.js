const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    const payload = { id: user._id, username: user.username, email: user.email };
    return jwt.sign(
        payload,
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '7d' }
    );
};

module.exports = { generateToken };
