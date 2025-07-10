const express = require('express');
const router = express.Router();
const {
   getAllWords,
   addNewWord,
   editWord,
   deleteWord,
} = require('../controllers/wordController');

router.get('/:userId', getAllWords);

router.post('/:userId', addNewWord);

router.patch('/:userId/:wordId', editWord);

router.delete('/:userId/:wordId', deleteWord);

module.exports = router;