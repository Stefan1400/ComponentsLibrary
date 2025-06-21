const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  createUser,
  loginUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

router.get('/', getAllUsers);

router.post('/register', createUser);

router.post('/login', loginUser);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

module.exports = router;
