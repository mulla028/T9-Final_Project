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

const { CALLBACK_URL } = process.env;  // Using environment variable directly

const app = express();


connectDB()
    .then(() => console.log("✅ Database connected successfully"))
    .catch((err) => {
        console.error("❌ Database connection error:", err);
        process.exit(1); // Exit process if DB fails to connect
    });


const allowedOrigins = [CALLBACK_URL || 'http://localhost:3000'];  
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("CORS Policy Error: Not Allowed by CORS"));
        }
    },
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-auth-token"  // Allow x-auth-token header
}));

// ✅ Middleware
app.use(express.json());
app.use(passport.initialize());

// ✅ Define Routes
app.use('/api/auth', auth);
app.use('/api/Users', User);
app.use('/api/Admin', AdminRoutes);
app.use('/api/places', places);

// ✅ Handle CORS Preflight Requests
app.options('*', cors());

// ✅ Password Reset Routes
app.post('/api/passwordResetEmail', async (req, res) => {
    const { email } = req.body;
    try {
        await sendPasswordReset.sendPasswordReset(email);
        res.status(200).json({ success: true, message: "Password reset email sent!", email });
    } catch (error) {
        console.error("❌ Error sending password reset email:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

app.post('/api/resetPassword', async (req, res) => {
    const { id, password } = req.body;
    try {
        await sendPasswordReset.resetPassword(id, password);
        res.status(200).json({ success: true, message: "Password reset successfully!", id });
    } catch (error) {
        console.error("❌ Error resetting password:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// ✅ Visitor Count Tracking
let visitorCount = 0;
app.use((req, res, next) => {
    visitorCount++;
    next();
});

app.get('/api/visitors', (req, res) => {
    res.json({ count: visitorCount });
});

// ✅ Test Route to Check API Working
app.get('/api/test', (req, res) => {
    res.json({ message: "🚀 API is working correctly!" });
});

// ✅ 404 Error Handling - If no route matches
app.use((req, res) => {
    res.status(404).json({ success: false, message: "❌ Route not found" });
});

// ✅ Global Error Handler Middleware
app.use((err, req, res, next) => {
    console.error("❌ Server Error:", err);
    res.status(500).json({ success: false, message: "❌ Internal Server Error" });
});

// ✅ Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
