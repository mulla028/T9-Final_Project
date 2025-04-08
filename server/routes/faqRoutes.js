const express = require('express');
const router = express.Router();
const { verifyAdmin } = require('../middlewares/authMiddleware');
const Faq = require('../models/Faq');

router.get('/', async (req, res) => {
    try {
        const faqs = await Faq.find().sort({ createdAt: -1 });
        if (!faqs) return res.status(404).json({ message: 'No FAQs found.' });

        res.status(200).json({ faqs });
    } catch (error) {
        res.status(500).json({ message: 'Failed to load FAQs.' });
    }
});


router.post('/', verifyAdmin, async (req, res) => {
    const { question, answer, category } = req.body;
    if (!question || !answer) return res.status(400).json({ message: 'Missing fields' });

    try {
        const newFaq = await Faq.create({ question, answer, category });
        return res.status(201).json({ message: 'FAQ created', faq: newFaq });
    } catch (err) {
        return res.status(500).json({ message: 'Failed to create FAQ.' });
    }

});


module.exports = router;
