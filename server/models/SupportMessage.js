const mongoose = require('mongoose');

const supportMessageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    attachments: { type: [String], default: [] },
}, { timestamps: true });

module.exports = mongoose.model('SupportMessage', supportMessageSchema);
