
const express = require("express");
const User = require("../models/User.js");
// const SocialUser = require("../models/SoicalUser.js");
const router = express.Router();

const { getUsers, getUser, createUser, updateUser, deleteUser } = require("../controllers/UserController.js");

router.get("/", getUsers);
router.get("/:id", getUser);


module.exports = router;
