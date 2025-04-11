const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const Feedback = require('../models/Feedback');
const User = require('../models/User'); // make sure this is imported to populate later

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = `media-${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// POST feedback
router.post('/', upload.array('media'), async (req, res) => {
  try {
    const { userId, userType, title, comment, rating } = req.body;

    if (!userId || !comment || !rating ) {

      return res.status(400).json({ error: 'Missing required fields' });
    }

    const userModel = userType === 'social' ? 'Social-User' : 'User';
    const mediaUrls = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

    const feedback = new Feedback({
      userId,
      userModel,
      title,
      comment,
      rating,
      mediaUrls
    });

    await feedback.save();
    res.status(201).json(feedback);
  } catch (err) {
    console.error('Failed to save feedback:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET feedbacks with user info
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 4, search = '' } = req.query;
    const query = {
      $or: [
        { comment: { $regex: search, $options: 'i' } },
        { title: { $regex: search, $options: 'i' } }
      ]
    };

    const feedbacks = await Feedback.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate('userId', 'username profilePicture name'); // ✅ works for both User and Social-User

    const total = await Feedback.countDocuments(query);

    res.json({
      feedbacks,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page)
    });
  } catch (err) {
    console.error('Failed to fetch feedbacks:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
