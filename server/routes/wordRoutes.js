const express = require('express');
const router = express.Router();
const {
   getAllWords,
   addNewWord,
} = require('../controllers/wordController');

router.get('/', getAllWords);

router.post('/', addNewWord);

module.exports = router;