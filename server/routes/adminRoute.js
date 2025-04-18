
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");
const { verifyAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();
const { createUser, updateUser, deleteUser } = require("../controllers/adminController.js");
const { generateToken } = require("../utils/jwtUtils");

router.post("/login/admin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({ message: "Email or password is incorrect" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Email or password is incorrect" });
    }

    const refreshToken = generateToken(admin);
    const accessToken = jwt.sign(
      { id: admin._id, email: admin.email, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", role: "admin", accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.get("/", verifyAdmin, async (req, res) => {
  try {
    const admins = await Admin.find({});
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});
router.post("/", createUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);
module.exports = router;

