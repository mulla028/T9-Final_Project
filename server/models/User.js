// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
<<<<<<< HEAD
    itinerary : [ { type : Object } ],
=======
    // favorites: [{ type: Object }],
    // history: [{ type: Object }]
>>>>>>> 3350c9c (server added)
});

module.exports = mongoose.model('User', userSchema);


