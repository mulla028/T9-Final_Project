const Tip = require("../models/Tip");

// 📌 Get all tips (public)
exports.getAllTips = async (req, res) => {
    try {
        const tips = await Tip.find();
        res.status(200).json(tips);
    } catch (error) {
        res.status(500).json({ error: "Error fetching eco-friendly tips" });
    }
};

// 📌 Create a new tip (admin only)
exports.createTip = async (req, res) => {
    try {
        const { text, category } = req.body;
        if (!text) return res.status(400).json({ error: "Tip text is required" });

        const newTip = new Tip({ text, category });
        await newTip.save();

        res.status(201).json(newTip);
    } catch (error) {
        res.status(500).json({ error: "Error creating eco-friendly tip" });
    }
};

// 📌 Update a tip (admin only)
exports.updateTip = async (req, res) => {
    try {
        const { tipId } = req.params;
        const updatedData = req.body;

        const updatedTip = await Tip.findByIdAndUpdate(tipId, updatedData, { new: true });
        if (!updatedTip) return res.status(404).json({ message: "Tip not found" });

        res.status(200).json(updatedTip);
    } catch (error) {
        res.status(500).json({ error: "Error updating eco-friendly tip" });
    }
};

// 📌 Delete a tip (admin only)
exports.deleteTip = async (req, res) => {
    try {
        const { tipId } = req.params;
        const deletedTip = await Tip.findByIdAndDelete(tipId);
        if (!deletedTip) return res.status(404).json({ message: "Tip not found" });

        res.status(200).json({ message: "Tip deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting eco-friendly tip" });
    }
};
