const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'userModel' // 🔥 dynamic reference to User or Social-User
  },
  userModel: {
    type: String,
    required: true,
    enum: ['User', 'Social-User'] // must match model names
  },
  title: { type: String },
  comment: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  mediaUrls: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Feedback || mongoose.model('Feedback', FeedbackSchema);
