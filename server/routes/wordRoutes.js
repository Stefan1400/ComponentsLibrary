const express = require('express');
const router = express.Router();
const {
   getAllWords,
   addNewWord,
   editWord,
   deleteWord,
   search,
} = require('../controllers/wordController');

const {
   checkWordExists
} = require('../middleware/wordMiddleware');

const {
   verifyToken,
} = require('../middleware/authMiddleware');


router.get('/', verifyToken, getAllWords);

router.post('/', verifyToken, addNewWord);

router.patch('/:wordId', verifyToken, checkWordExists, editWord);

router.delete('/:wordId', verifyToken, checkWordExists, deleteWord);

router.get('/search', verifyToken, search);

module.exports = router;