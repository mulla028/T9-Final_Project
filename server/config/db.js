// config/db.js
const mongoose = require('mongoose');
const Tip = require('../models/Tip');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('✅ MongoDB connected');

        // Call seed function after connection is established
        await seedEcoTips();
    } catch (err) {
        console.error('❌ MongoDB connection error:', err.message);
        process.exit(1);
    }
};

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

