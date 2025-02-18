const Admin = require("../models/Admin");

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

module.exports = { getAllAdmins, deleteAdmin };
