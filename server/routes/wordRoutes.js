const express = require('express');
const router = express.Router();
const {
   getAllWords,
   addNewWord,
   editWord,
   deleteWord,
} = require('../controllers/wordController');

const {
   checkWordExists
} = require('../middleware/wordMiddleware');

const {
   verifyToken,
} = require('../middleware/authMiddleware');

console.log('before verifyToken in routes');

// router.use(verifyToken);

console.log('after verifyToken in routes');

router.get('/', verifyToken, getAllWords);

router.post('/', verifyToken, addNewWord);

router.patch('/:wordId', verifyToken, checkWordExists, editWord);

router.delete('/:wordId', verifyToken, checkWordExists, deleteWord);

module.exports = router;