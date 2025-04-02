

const Admin = require("../models/Admin");
const mongoose = require("mongoose");
const User = require("../models/User.js");
const SocialUser = require("../models/SocialUser.js");
const bcrypt = require("bcryptjs");

const createUser = async (req, res) => {
    const user = req.body;
    const newUser = new User(user);
    try {
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};


const updateUser = async (req, res) => {
    const { id: _id } = req.params;
    let { password, ...userData } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).json({ message: "No user with that ID" });
    }

    try {
       
        if (password) {
            const salt = await bcrypt.genSalt(10);
            userData.password = await bcrypt.hash(password, salt);
        }

        const updatedUser = await User.findByIdAndUpdate(_id, userData, { new: true });

        res.json(updatedUser);
    } catch (error) {
        console.error("Update user error:", error);
        res.status(500).json({ message: "An error has occurred" });
    }
};
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "The ID is invalid" });
        }

        const objectId = new mongoose.Types.ObjectId(id);

        const deletedUser = await User.findByIdAndDelete(objectId);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User successfully deleted." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Get all admins
const getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find({});
        res.json(admins);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Delete an admin by ID
const deleteAdmin = async (req, res) => {
    try {
        const admin = await Admin.findByIdAndDelete(req.params.id);
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.json({ message: "Admin deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};


module.exports = { getAllAdmins, deleteAdmin , createUser, updateUser, deleteUser};