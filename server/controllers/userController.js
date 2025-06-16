// server/controllers/userController.js
const User = require('../models/userModel');

// GET all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// POST create new user
const createUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const newUser = await User.create(username, password);
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getAllUsers,
  createUser,
};
