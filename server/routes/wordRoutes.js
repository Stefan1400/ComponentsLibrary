const express = require('express');
const router = express.Router();
const {
   getAllWords,
   addNewWord,
   deleteWord,
} = require('../controllers/wordController');

router.get('/:userId', getAllWords);

router.post('/:userId', addNewWord);

router.delete('/:userId/:wordId', deleteWord);

module.exports = router;