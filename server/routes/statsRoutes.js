const express = require('express');
const router = express.Router();
const {
   getMyStats
} = require('../controllers/statsController');

router.get('/:userId', getMyStats);


module.exports = router;