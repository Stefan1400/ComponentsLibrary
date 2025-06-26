const Word = require('../models/wordModel');

const getAllWords = async (req, res) => {
   try {

      const words = await Word.getAllWords();
      res.json(words);

   } catch (err) {
      console.log('500 error inside getAllWords controller: ', err);
      res.status(500).json({ error: err });
   }
}

const addNewWord = async (req, res) => {
   
   const { word, meaning, status } = req.body;
   
   try {

      if (!word || !meaning || !status) {
         return res.status(404).json({ error: 'word, meaning, or status are invalid' });
      }

      const wordExists = await Word.findWord(word);

      if (wordExists) {
         return res.status(409).json({ message: 'word already exists' });
      }

      const newWord = await Word.addNewWord(word, meaning, status);

      return res.status(201).json({ createdWord: newWord });

   } catch (err) {
      console.log('500 error adding new word: ', err);
      return res.status(500).json({ error: err });
   }
}

module.exports = {
   getAllWords,
   addNewWord,
}