const mongoose = require("mongoose");

const tipSchema = new mongoose.Schema({
    text: { type: String, required: true }, // The actual tip
    category: { type: String, default: "general" },
    createdAt: { type: Date, default: Date.now }
});

const Tip = mongoose.model("Tip", tipSchema);
module.exports = Tip;
