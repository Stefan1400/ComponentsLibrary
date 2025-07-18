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

console.log('after routes in routes');

module.exports = router;