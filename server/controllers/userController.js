const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SALT_ROUNDS = 10;
const activeTokens = new Set();

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
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const newUser = await User.createUser(username, hashedPassword);
    const token = jwt.sign({id: newUser.id}, process.env.JWT_SECRET, {expiresIn: '1h'});
    activeTokens.add(token);
    res.status(201).json({ user: newUser, token });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {

    // check if username / password is valid
    if (!username || !password) {
      return res.status(401).json({ error: 'no password found' });
    }

    // retrieve the entire user from the db using just the username
    const retrievedUser = await User.loginUser(username);

    if (!retrievedUser) {
      return res.status(401).json({ error: 'user doesnt exist' });
    }

    const retrievedPassword = retrievedUser.password;
    const passwordMatches = await bcrypt.compare(password, retrievedPassword);

    if (!passwordMatches) {
      return res.status(401).json({ error: 'incorrect password' });
    }

    const token = jwt.sign({id: retrievedUser.id}, process.env.JWT_SECRET, {expiresIn: '1h'});
    activeTokens.add(token);
    
    return res.status(200).json({ loggedinUser: retrievedUser, token });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
}

const updateUser = async (req, res) => {

   const { id } = req.params;
   const { username, password } = req.body;

   try { 
    
    if (password) {
       password = await bcrypt.hash(password, SALT_ROUNDS);
     }
    
    const updated = await User.updateUser(id, { username, hashedPassword });

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
  loginUser,
  updateUser,
  deleteUser
};
