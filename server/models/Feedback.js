const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  title: { type: String },
  comment: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  mediaUrls: [{ type: String }], 
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Feedback || mongoose.model('Feedback', FeedbackSchema);
