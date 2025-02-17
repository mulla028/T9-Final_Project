// migrations/addItineraryToSocial.js
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const mongoose = require('mongoose');
const SocialUser = require('../models/SocialUser');

async function addItineraryToSocialUsers() {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined in environment variables');
        }

        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Add itinerary to social users
        const socialResult = await mongoose.connection.db.collection('social-users').updateMany(
            { itinerary: { $exists: false } },
            { $set: { itinerary: [] } }
        );

        console.log(`Added itinerary to ${socialResult.modifiedCount} social users`);

        await mongoose.connection.close();
        console.log('MongoDB connection closed');
    } catch (error) {
        console.error('Migration failed:', error);
        if (mongoose.connection.readyState !== 0) {
            await mongoose.connection.close();
        }
        process.exit(1);
    }
}

addItineraryToSocialUsers();