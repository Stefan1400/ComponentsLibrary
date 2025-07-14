const Word = require('../models/wordModel');

const getAllWords = async (req, res) => {
   
   const userId = req.user.id;
   
   try {
      const words = await Word.getAllWords(userId);
      return res.json(words);

   } catch (err) {
      console.log('500 error inside getAllWords controller: ', err);
      return res.status(500).json({ error: err });
   }
};

const addNewWord = async (req, res) => {

   const userId = req.user.id;
   const { word, meaning, known } = req.body;

   if (!word || !meaning || typeof known !== 'boolean') {
      return res.status(400).json({ message: 'sent body not valid' });
   }
   
   try {

      const newWord = await Word.addNewWord(userId, word, meaning, known);

      return res.status(201).json({ createdWord: newWord });

   } catch (err) {
      console.log('500 error adding new word: ', err);
      return res.status(500).json({ error: err });
   }
};

const editWord = async (req, res) => {
   
   const userId = req.user.id;
   const { wordId } = req.params;
   const { word, meaning, known } = req.body;

   if (!word || !meaning || typeof known !== 'boolean') {
      return res.status(400).json({ message: 'sent body not valid' });
   }
   
   try {

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
   
   const userId = req.user.id;
   const { wordId } = req.params;
   
   try {
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