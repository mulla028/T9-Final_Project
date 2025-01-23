// models/SocialUser.js
const mongoose = require('mongoose');

const socialUserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    provider: { type: String, required: true }, // e.g., 'google', 'facebook'
    providerId: { type: String, required: true }, // Social media ID
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Social-User', socialUserSchema);
