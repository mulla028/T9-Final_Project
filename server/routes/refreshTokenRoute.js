const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

router.post('/refresh-token', async (req, res) => {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) return res.status(401).json({ message: 'Refresh Token required' });

    try {
        const decodedUser = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const newAccessToken = jwt.sign({ id: decodedUser.id, username: decodedUser.username, email: decodedUser.email }, process.env.JWT_SECRET, { expiresIn: '15m' });
        res.json({ accessToken: newAccessToken });
    } catch (error) {
        console.error("Error refreshing token:", error);
        res.status(401).json({ message: 'Invalid Refresh Token' });
    }
});

module.exports = router;