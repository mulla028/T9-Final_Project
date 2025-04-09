const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: { type: String },
  comment: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  mediaUrls: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Feedback || mongoose.model('Feedback', FeedbackSchema);
