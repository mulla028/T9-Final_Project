const express = require("express");
const User = require("../models/User.js");
// const SocialUser = require("../models/SocialUser.js");
const router = express.Router();
const { getUsers, getUser, getUserProfile, updateUserProfile, deleteUserProfile, updatePassword } = require("../controllers/UserController.js");
const { authMiddleware } = require("../middlewares/authMiddleware.js");

router.route('/profile').get(authMiddleware, getUserProfile).put(authMiddleware, updateUserProfile)
router.route('/profile/:id').delete(authMiddleware, deleteUserProfile);
router.route('/password').put(authMiddleware, updatePassword);
router.get("/", getUsers);
router.get("/:id", getUser);

module.exports = router;
