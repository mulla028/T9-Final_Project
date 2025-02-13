const User = require("../models/User.js");
const SocialUser = require("../models/SocialUser.js");

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

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser };