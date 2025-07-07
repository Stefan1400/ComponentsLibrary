const express = require('express');
const router = express.Router();
const {
   // updateStats,
   getMyStats
} = require('../controllers/statsController');

router.get('/:userId', getMyStats);

// router.patch('/:userId/:stat', updateStats);


module.exports = router;
