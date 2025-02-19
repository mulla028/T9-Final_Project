// models/SocialUser.js
const mongoose = require('mongoose');

const socialUserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    provider: { type: String, required: true }, // e.g., 'google', 'facebook'
    providerId: { type: String, required: true }, // Social media ID
    createdAt: { type: Date, default: Date.now },
<<<<<<< HEAD
<<<<<<< HEAD
    itinerary : [{ type : Object }],
=======
>>>>>>> 3350c9c (server added)
=======

    itinerary: [
        {
            day: { type: Number, required: true }, // Day index (Day 1, Day 2, ...)

            stay: {
                placeId: { type: String }, // Google Places ID (Optional if no stay)
                placeName: { type: String },
                location: { type: String },
                checkIn: { type: Date },
                checkOut: { type: Date },
                guests: { type: Number, min: 1 }
            },

            experiences: [
                {
                    placeId: { type: String }, // Google Places ID
                    name: { type: String, required: true },
                    location: { type: String }, // Optional city/country
                    time: { type: String },
                    paid: { type: Boolean, default: false }, // Whether it's booked/paid
                }
            ],

            transport: {
                mode: {
                    type: String,
                    enum: ["drive", "bike", "walk", "public transport"],
                    required: true
                }
            }
        }
    ]
>>>>>>> 3bec758 (adding booking feature files)
});

module.exports = mongoose.model('Social-User', socialUserSchema);
