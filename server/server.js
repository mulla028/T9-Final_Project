require('dotenv').config();
const express = require('express');
const passport = require('./config/passport');
const connectDB = require('./config/db');
const cors = require('cors');
const auth = require('./routes/authRoutes');
const user = require('./routes/userRoutes');
const AdminRoutes = require("./routes/adminRoute");
const places = require('./routes/placesRoutes');
const tipRoutes = require('./routes/tipRoutes');
const sendPasswordReset = require("./controllers/passwordResetController");
const Users = require("./controllers/userController");
const { REDIRECT_URL } = require('./utils/general');
const bookingRoutes = require('./routes/bookingRoutes');
const carbonRoutes = require('./routes/carbonRoutes');
const feedbackRoute = require('./routes/feedbackRoute');
const path = require('path');

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors({ origin: REDIRECT_URL || 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(passport.initialize());

// Define Routes
app.use('/api/auth', auth);
app.use('/api/users', user);
app.use('/api/Admin', AdminRoutes);
app.use('/api/places', places);
app.use('/api/tips', tipRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/carbon', carbonRoutes);
app.use('/api/feedback', feedbackRoute);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Send email for password reset
app.post('/api/passwordResetEmail', async (req, res) => {
    const { email } = req.body;
    try {
        await sendPasswordReset.sendPasswordReset(email);
        res.status(200).send({ email });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Send reset password
app.post('/api/resetPassword', async (req, res) => {
    const { id, password } = req.body;
    try {
        await sendPasswordReset.resetPassword(id, password);
        res.status(200).send({ id });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Visitor Count Tracking
let visitorCount = 0;
app.use((req, res, next) => {
    visitorCount++;
    next();
});

app.get('/api/visitors', (req, res) => {
    res.json({ count: visitorCount });
});

// Get the user itinerary details for a specific day
app.post('/api/itinerary', async (req, res) => {
    const { id, day } = req.body; // You can destructure both at once

    try {
        const itinerary = await Users.getItineraryForDay(id, day);
        try {
            const itinerary = await Users.getItineraryForDay(id, day);

            if (itinerary) {
                // Successfully found the itinerary
                res.send({ itinerary });
            } else {
                // If no itinerary found, return a 404 with a message
                res.status(404).send({ message: "Itinerary not found" });
            }
        } catch (error) {
            // Handle unexpected errors
            res.status(500).send({ message: error.message });
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Get all user itineraries
app.post('/api/itineraries', async (req, res) => {
    const { id } = req.body; // You can destructure both at once

    try {
        const itinerary = await Users.getItineraries(id);
        if (itinerary) {
            // Successfully found the itinerary
            res.send({ itinerary });
        } else {
            // If no itinerary found, return a 404 with a message
            res.status(404).send({ message: "Itineraries not found" });
        }
    } catch (error) {
        // Handle unexpected errors
        res.status(500).send({ message: error.message });
    }
});



// Set the user itinerary details for a specific day, including transport
app.post('/api/setItinerary', async (req, res) => {
    const { id, day, newItinerary, transportMode } = req.body;

    // Map the frontend travel mode values to match the schema
    const mapTravelMode = (mode) => {
        const modeMap = {
            "DRIVING": "drive",
            "BICYCLING": "bike",
            "WALKING": "walk",
            "TRANSIT": "public transport"
        };
        return modeMap[mode] || "drive"; // Default to "drive" if the mode is unrecognized
    };

    const mappedMode = mapTravelMode(transportMode);

    try {
        const response = await Users.updateUserItineraryForDay(id, Number(day), newItinerary, mappedMode);
        res.status(200).json({ message: response });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
