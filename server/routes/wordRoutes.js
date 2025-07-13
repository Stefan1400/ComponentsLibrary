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
   verifyUserOwnership
} = require('../middleware/authMiddleware');



router.use(verifyToken, verifyUserOwnership);

router.get('/:userId', getAllWords);

router.post('/:userId', addNewWord);

router.patch('/:userId/:wordId', checkWordExists, editWord);

router.delete('/:userId/:wordId', checkWordExists, deleteWord);

module.exports = router;