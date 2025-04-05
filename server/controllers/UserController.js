



const mongoose = require("mongoose");
const User = require("../models/User.js");
const SocialUser = require("../models/SocialUser.js");
const bcrypt = require("bcryptjs");

const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getUsers = async (req, res) => {
    try {
        let user = await User.find({});
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get the user itinerary details for a specific day
const getItineraryForDay = async (userId, day) => {
    const numericDay = Number(day); // Ensure day is a Number
    try {
        const user = await User.findOne(
            { _id: userId, "itinerary.day": numericDay }, 
            { "itinerary.$": 1 } // Projection to return only the matching itinerary day
        );
        return user ? user.itinerary[0] : null;
    } catch (error) {
        console.error("Error fetching itinerary:", error);
        throw error;
    }
}


// Get all user itineraries
const getItineraries = async (userId) => {
    try {
        const user = await User.findOne(
            { _id: userId }, 
        );
        return user ? user.itinerary : null;
    } catch (error) {
        console.error("Error fetching itineraries:", error);
        throw error;
    }
}
const updateUserItineraryForDay = async (userId, day, newItinerary, newTransportMode) => {
    try {
        const result = await User.updateOne(
            { _id: userId, "itinerary.day": day },
            { 
                $set: { 
                    "itinerary.$.stay": newItinerary.stay,
                    "itinerary.$.experiences": newItinerary.experiences,
                    "itinerary.$.transport.mode": newTransportMode // Update transport mode
                }
            }
        );

        if (result.matchedCount === 0) {
            // If no matching day found, add a new itinerary entry with the transport mode
            await User.updateOne(
                { _id: userId },
                { $push: { itinerary: { day, experiences: newItinerary.experiences, transport: { mode: newTransportMode } } } }
            );
        }

        return { success: true, message: "Itinerary updated with transport mode" };
    } catch (error) {
        console.error("Error updating itinerary:", error);
        throw error;
    }
};

module.exports = { getUsers, getUser, getItineraryForDay, getItineraries, updateUserItineraryForDay };


