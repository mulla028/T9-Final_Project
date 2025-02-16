require('dotenv').config();
const express = require('express');
const passport = require('./config/passport');
const connectDB = require('./config/db');
const cors = require('cors');
const auth = require('./routes/authRoutes');
const User = require('./routes/userRoute');
const AdminRoutes = require("./routes/adminRoute");
const places = require('./routes/placesRoutes');
const sendPasswordReset = require("./controllers/passwordResetController");

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// Define Routes
app.use('/api/auth', auth);
app.use('/api/Users', User);
app.use('/api/Admin', AdminRoutes);
app.use('/api/places', places);

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

// Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
