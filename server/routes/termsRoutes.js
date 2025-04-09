const express = require('express');
const router = express.Router();
const { verifyAdmin } = require('../middlewares/authMiddleware');
const Terms = require('../models/Terms');

router.get('/', async (req, res) => {
    try {
        const latest = await Terms.findOne().sort({ updatedAt: -1 });
        if (!latest) return res.status(404).json({ message: 'No Terms found.' });

        res.status(200).json({ terms: latest });
    } catch (error) {
        res.status(500).json({ message: 'Failed to load Terms of Service.' });
    }
});


router.post('/', verifyAdmin, async (req, res) => {
    const { content } = req.body;
    if (!content) return res.status(400).json({ message: 'Missing content field' });

    try {
        const terms = await Terms.create({ content });
        res.status(201).json({ message: 'Terms created', terms });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create Terms.' });
    }

});


module.exports = router;
