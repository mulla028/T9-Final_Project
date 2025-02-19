// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
<<<<<<< HEAD
<<<<<<< HEAD
    itinerary : [ { type : Object } ],
=======
    // favorites: [{ type: Object }],
    // history: [{ type: Object }]
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

module.exports = mongoose.model('User', userSchema);


