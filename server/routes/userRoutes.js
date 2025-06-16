// server/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  createUser,
} = require('../controllers/userController');

// GET /api/users
router.get('/', getAllUsers);

// POST /api/users
router.post('/', createUser);

module.exports = router;
