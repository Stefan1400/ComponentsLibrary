const express = require('express');
const router = express.Router();
const {
   getAllWords,
   addNewWord,
} = require('../controllers/wordController');

router.get('/:userId', getAllWords);

router.post('/:userId', addNewWord);

module.exports = router;