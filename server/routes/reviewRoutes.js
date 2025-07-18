const express = require('express');
const router = express.Router();
const {
   getDue,
   updateSRS,
} = require('../controllers/reviewController');
const {
   verifyToken,
} = require('../middleware/authMiddleware');

router.get('/due', verifyToken, getDue);

router.patch('/update', verifyToken, updateSRS);

module.exports = router;