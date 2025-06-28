const express = require('express');
const router = express.Router();
const {
   updateStats,
} = require('../controllers/statsController');

router.patch('/:userId/:stat', updateStats);

module.exports = router;
