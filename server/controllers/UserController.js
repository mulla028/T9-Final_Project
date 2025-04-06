const bcrypt = require('bcryptjs');
const User = require("../models/User.js");
const SocialUser = require("../models/SocialUser.js");
const mongoose = require('mongoose');

const getUsers = async (req, res) => {
    try {
        let user = await User.find({});
        user = user.concat(await SocialUser.find({}));
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


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
    const user = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No user with that id');
    const updatedUser = await User.findByIdAndUpdate(_id, { ...user, _id }, { new: true });
    res.json(updatedUser);
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No user with that id');
        await User.findByIdAndRemove(id);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get user profile
const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user.id).select('-password');
    if (user) res.json(user);
    else {
        res.status(404).json({ message: 'User not found' });
    }
};

// Update user profile
const updateUserProfile = async (req, res) => {
    const user = await User.findById(req.user.id);
    if (user) {
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        user.location = req.body.location || user.location;
        user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
        if (req.body.profilePicture) user.profilePicture = req.body.profilePicture;
        const updatedUser = await user.save();
        res.json(updatedUser);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

// Delete user profile
const deleteUserProfile = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No user with that id');
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Update password
const updatePassword = async (req, res) => {
    const { password, newPassword, confirmPassword } = req.body;
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid Password, Try again!' });
        if (newPassword !== confirmPassword) return res.status(400).json({ message: 'Passwords do not match' });
        user.password = await bcrypt.hash(newPassword, process.env.PASSWORD_SALT);
        await user.save();
        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error("Error updating password:", error);
        return res.status(500).json({ message: 'Server error' });
    }
}

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

const deleteUserItineraryForDay = async (userId, day) => {
    try {
        const result = await User.updateOne(
            { _id: userId },
            { $pull: { itinerary: { day: day } } } // Remove itinerary entry for the given day
        );

        if (result.modifiedCount === 0) {
            return { success: false, message: "No itinerary found for the specified day" };
        } 
        else {
            //Sort the days
            const user = await User.findOne({ _id: userId });
            user.itinerary.sort((a, b) => {
                const getDate = (entry) => entry.date || entry.stay?.checkIn || entry.experiences?.[0]?.date || "";
                return new Date(getDate(a)) - new Date(getDate(b));
              });
        
               // Re-number days
               user.itinerary.forEach((entry, index) => {
                 entry.day = index + 1;
               })

               await user.save();
         } 

        return { success: true, message: "Itinerary deleted successfully" };
    } catch (error) {
        console.error("Error deleting itinerary:", error);
        throw error;
    }
};

module.exports = { 
  getUsers, 
  getUser, 
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
  updatePassword,
  createUser, 
  updateUser, 
  deleteUser, 
  getItineraryForDay, 
  getItineraries, 
  updateUserItineraryForDay, 
  deleteUserItineraryForDay };
