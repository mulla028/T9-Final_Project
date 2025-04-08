const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    message: { type: String, required: true },
    icon: { type: String, enum: ['success', 'warning', 'info'], default: 'info' },
    relatedId: { type: mongoose.Schema.Types.ObjectId }, // optional
    isRead: { type: Boolean, default: false },
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Notification', notificationSchema);
