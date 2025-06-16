const User = require('../models/userModel');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers();
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

const createUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const newUser = await User.createUser(username, password);
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

const updateUser = async (req, res) => {

   const { id } = req.params;
   const { username, password } = req.body;

   try {
      const updated = await User.updateUser(id, { username, password });

      if (!updated) {
         return res.status(404).json({ error: "user not found" });
      }

      res.json(updated);
   } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Server error' });
   }
}

const deleteUser = async (req, res) => {

  const { id } = req.params;

  console.log('id checker in controller: ', id);

  try {

    console.log('id checker (before) in controller: ', id);

    const deleted = await User.deleteUser(id);

    console.log('deleted checker (after) in controller: ', deleted);

    if (!deleted) {
      return res.status(404).json({ error: 'user doesnt exist' });
    }

    console.log('deleted checker in controller: ', deleted);

    res.json(deleted);

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser
};
