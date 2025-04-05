const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    location: { type: String, default: '' },
    phoneNumber: { type: String, default: '' },
    profilePicture: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now },
    itinerary: [
        {
            day: { type: Number, required: true },
            date: { type: Date },
            stay: {
                placeId: { type: String }, // Google Places ID (Optional if no stay)
                placeName: { type: String },
                location: { type: String },
                phone: { type: String },
                checkIn: { type: Date },
                checkOut: { type: Date },
                guests: { type: Number, min: 1 },
                email: { type: String },
                totalPrice: { type: Number },
                package: { type: String },
                preferences: { type: String },
            },

            experiences: [
                {
                    placeId: { type: String }, // Google Places ID
                    name: { type: String, required: false },
                    location: { type: String }, // Optional city/country
                    time: { type: String },
                    paid: { type: Boolean, default: false }, // Whether it's booked/paid
                    date: { type: Date },
                }
            ],

            transport: {
                mode: {
                    type: String,
                    enum: ["drive", "bike", "walk", "public transport"],
                    required: false
                }
            }
        }
    ]
});

module.exports = mongoose.model('User', userSchema);
