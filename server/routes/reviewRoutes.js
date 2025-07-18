const express = require('express');
const router = express.Router();
const {
   getDue,
} = require('../controllers/reviewController');
const {
   verifyToken,
} = require('../middleware/authMiddleware');

const {
   checkWordExists,
} = require('../middleware/wordMiddleware');

router.get('/due', checkWordExists, getDue);

module.exports = router;