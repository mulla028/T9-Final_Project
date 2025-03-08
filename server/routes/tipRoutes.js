const express = require("express");
const router = express.Router();
const tipController = require("../controllers/tipController");
const { verifyAdmin } = require("../middlewares/authMiddleware"); // Ensures only admins can modify

// Public: Get all eco-friendly tips
router.get("/", tipController.getAllTips);

// Admin-only: Create a new tip
router.post("/", verifyAdmin, tipController.createTip);

// Admin-only: Update an existing tip
router.put("/:tipId", verifyAdmin, tipController.updateTip);

// Admin-only: Delete a tip
router.delete("/:tipId", verifyAdmin, tipController.deleteTip);

module.exports = router;
