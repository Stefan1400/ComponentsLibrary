const WordModel = require('../models/wordModel');

const checkWordExists = async (req, res, next) => {
   const { wordId } = req.params;
   const userId = req.user.id;

   if (!wordId) {
      return res.status(400).json({ message: 'missing wordId' });
   }

   try {

      //just adding a random comment

      const fetchedWord = await WordModel.getWordById(wordId, userId);

      if (!fetchedWord) {
         return res.status(404).json({ message: 'word doesnt exist' });
      }

      req.word = fetchedWord;
      next();

   } catch (err) {
      return res.status(404).json({ message: 'word doesnt exist' });
   }
}

module.exports = {
   checkWordExists
};