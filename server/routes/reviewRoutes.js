const express = require('express');
const router = express.Router();
const {
   getDue,
} = require('../controllers/reviewController');
const {
   verifyToken,
} = require('../middleware/authMiddleware');

router.get('/due', verifyToken, getDue);

module.exports = router;