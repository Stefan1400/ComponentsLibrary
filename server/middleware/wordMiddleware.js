const WordModel = require('../models/wordModel');

const checkWordExists = async (req, res, next) => {
   const { wordId, userId } = req.params;

   if (!wordId) {
      res.status(400).json({ message: 'missing wordId' });
   }

   const word = WordModel.getWordById(wordId, userId);

   if (!word) {
      res.status(404).json({ message: 'word doesnt exist' });
   }

   try {

      req.word = word;
      next();

   } catch (err) {
      res.status(404).json({ message: 'word doesnt exist' });
   }
}

module.exports = {
   checkWordExists
};