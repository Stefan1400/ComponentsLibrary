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

router.patch('/:wordId', verifyToken, updateSRS);

module.exports = router;