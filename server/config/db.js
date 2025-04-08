// config/db.js
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const sanitizeHtml = require('sanitize-html');
const Tip = require('../models/Tip');
const FAQ = require('../models/Faq');
const Terms = require('../models/Terms');
const Privacy = require('../models/Privacy');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('✅ MongoDB connected');

        // Call seed functions after connection is established
        await seedEcoTips();
        await seedFAQs();
        await seedLegalData();
    } catch (err) {
        console.error('❌ MongoDB connection error:', err.message);
        process.exit(1);
    }
};

// 🌱 Seed FAQs (Prevents Duplicates)
const seedFAQs = async () => {
    try {
        const faqs = [
            { question: "What is the best time to visit?", answer: "The best time to visit is during the spring and fall seasons.", category: "General" },
            { question: "How can I book a tour?", answer: "You can book a tour through our website or contact us directly.", category: "Booking" },
            { question: "What should I pack for my trip?", answer: "Pack light and include essentials like sunscreen, comfortable shoes, and a reusable water bottle.", category: "Packing" },
            { question: "Are there any age restrictions for tours?", answer: "Most tours are suitable for all ages, but some may have specific age requirements.", category: "General" },
            { question: "What is your cancellation policy?", answer: "Cancellations made 48 hours in advance will receive a full refund.", category: "Booking" }
        ];

        for (const faq of faqs) {
            const exists = await FAQ.findOne({ question: faq.question });
            if (!exists) {
                await FAQ.create(faq);
                console.log(`🌱 Added FAQ: ${faq.question}`);
            }
        }

        console.log('✅ FAQs check completed!');
    } catch (error) {
        console.error('❌ Error seeding FAQs:', error);
    }
};

// 🌱 Seed Terms and Conditions and Privacy Policy
const seedLegalData = async () => {
    try {
        const rawPrivacyHtml = fs.readFileSync(path.join(__dirname, '../privacy.txt'), 'utf-8');
        const rawTermsHtml = fs.readFileSync(path.join(__dirname, '../terms.txt'), 'utf-8');

        const cleanPrivacyHtml = sanitizeHtml(rawPrivacyHtml, {
            allowedTags: [
                'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
                'p', 'strong', 'em', 'ul', 'ol', 'li',
                'a', 'br', 'hr', 'blockquote'
            ],
            allowedAttributes: {
                a: ['href', 'name', 'target'],
            },
            allowedSchemes: ['http', 'https', 'mailto'],
        });

        const cleanTermsHtml = sanitizeHtml(rawTermsHtml, {
            allowedTags: [
                'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
                'p', 'strong', 'em', 'ul', 'ol', 'li',
                'a', 'br', 'hr', 'blockquote'
            ],
            allowedAttributes: {
                a: ['href', 'name', 'target'],
            },
            allowedSchemes: ['http', 'https', 'mailto'],
        });

        await Terms.deleteMany({}); // Clear existing terms
        await Privacy.deleteMany({}); // Clear existing privacy policy
        await Terms.create({ content: cleanTermsHtml });
        await Privacy.create({ content: cleanPrivacyHtml });

        console.log('✅ Terms and Privacy added!');
    } catch (error) {
        console.error('❌ Error seeding Terms and Privacy:', error);
    }
}


// 🌱 Seed Eco-Friendly Tips (Prevents Duplicates)
const seedEcoTips = async () => {
    try {
        const tips = [
            { text: "Carry a reusable water bottle to reduce plastic waste.", category: "general" },
            { text: "Choose eco-certified hotels that use renewable energy.", category: "hotel" },
            { text: "Support local businesses and artisans when traveling.", category: "cultural" },
            { text: "Use public transportation, biking, or walking instead of renting a car.", category: "outdoor" },
            { text: "Respect wildlife and never feed or disturb animals in their natural habitat.", category: "outdoor" },
            { text: "Say no to single-use plastics like straws and cutlery.", category: "restaurant" },
            { text: "Turn off hotel lights, AC, and TV when leaving the room.", category: "eco-stay" },
            { text: "Choose tour operators that prioritize sustainability.", category: "general" },
            { text: "Choose farm-to-table dining options to reduce your carbon footprint.", category: "restaurant" },
            { text: "Opt for direct flights to reduce your carbon footprint.", category: "general" },
            { text: "Pack light! Heavier luggage means higher fuel consumption.", category: "general" },
            { text: "Stay at locally-owned eco-lodges to support the community.", category: "eco-stay" },
            { text: "Carry a cloth bag for shopping instead of using plastic bags.", category: "general" },
            { text: "Participate in beach or trail clean-ups during your travels.", category: "outdoor" },
            { text: "Eat at restaurants that source ingredients from local farmers.", category: "cultural" },
            { text: "Limit water usage in hotels by reusing towels and bedsheets.", category: "hotel" }
        ];

        for (const tip of tips) {
            const exists = await Tip.findOne({ text: tip.text });
            if (!exists) {
                await Tip.create(tip);
                console.log(`🌱 Added tip: ${tip.text}`);
            }
        }

        console.log('✅ Eco-friendly tips check completed!');
    } catch (error) {
        console.error('❌ Error seeding eco-friendly tips:', error);
    }
};

module.exports = connectDB;

