const express = require('express');
const router = express.Router();
const { verifyAdmin } = require('../middlewares/authMiddleware');
const Privacy = require('../models/Privacy');

router.get('/', async (req, res) => {
    try {
        const latest = await Privacy.findOne().sort({ updatedAt: -1 });
        if (!latest) return res.status(404).json({ message: 'No Privacy Policy found.' });

        res.status(200).json({ privacy: latest });
    } catch (error) {
        res.status(500).json({ message: 'Failed to load Privacy Policy.' });
    }
});


router.post('/', verifyAdmin, async (req, res) => {
    const { content } = req.body;
    if (!content) return res.status(400).json({ message: 'Missing content field' });

    try {
        const policy = await Privacy.create({ content });
        res.status(201).json({ message: 'Privacy Policy created', policy });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create Privacy Policy.' });
    }

});


module.exports = router;
