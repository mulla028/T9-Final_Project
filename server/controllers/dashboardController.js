const User = require('../models/User');

exports.getDashboardData = async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        res.json({ userCount });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
