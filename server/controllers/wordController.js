const Word = require('../models/wordModel');

const getAllWords = async (req, res) => {
   
   const { userId } = req.params;
   
   try {

      if (!userId) {
         return res.status(400).json({ message: 'userId inside getAllWords server doesnt exist' });
      }

      const words = await Word.getAllWords(userId);
      res.json(words);

   } catch (err) {
      console.log('500 error inside getAllWords controller: ', err);
      res.status(500).json({ error: err });
   }
};

const addNewWord = async (req, res) => {

   const { userId } = req.params;
   
   const { word, meaning, known } = req.body;
   
   try {

      if (!word || !meaning || known === undefined) {
         return res.status(400).json({ error: 'word, meaning, or known are invalid' });
      }

      const wordExists = await Word.findWord(word, userId);

      if (wordExists) {
         return res.status(409).json({ message: 'word already exists' });
      }

      const newWord = await Word.addNewWord(userId, word, meaning, known);

      return res.status(201).json({ createdWord: newWord });

   } catch (err) {
      console.log('500 error adding new word: ', err);
      return res.status(500).json({ error: err });
   }
};

const editWord = async (req, res) => {
   
   const { userId, wordId } = req.params;
   const { word, meaning, known } = req.body;

   const data = {userId, wordId, word, meaning, known};
   
   try {

      console.log('checking if data exists in controller: ', userId, wordId, word, meaning, known);

      for (const [key, value] of Object.entries(data)) {
         if (!value && value !== false) {
            return res.status(400).json({ message: `given ${key} is not valid` });
         }
      }

      const wordSame = await Word.findWord(word, userId);

      if (wordSame && wordSame.word === word && wordSame.meaning === meaning && wordSame.known === known) {
         return res.json({ message: 'no changes made' });
      }

      const editedWord = await Word.editWord(userId, wordId, word, meaning, known);

      if (!editedWord) {
         return res.status(400).json({ message: 'word was not correctly edited' });
      }

      return res.status(200).json(editedWord);

   } catch (err) {
      console.log('500 error edit word controller: ', err);
      return res.status(500).json({ error: err });
   }
};

const deleteWord = async (req, res) => {
   
   const { userId, wordId } = req.params;
   
   try {
      if (!userId || !wordId) {
         return res.status(400).json({ message: 'userId or wordId are invalid' });
      }
      
      const deletedWord = await Word.deleteWord(userId, wordId);

      if (!deletedWord) {
         return res.status(400).json({ message: 'word was not deleted' });
      }

      return res.status(200).json(deletedWord);
   } catch (err) {
      console.log('500 error deleting word: ', err);
      return res.status(500).json({ error: err });
   }
};

module.exports = {
   getAllWords,
   addNewWord,
   editWord,
   deleteWord,
};