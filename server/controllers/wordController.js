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

      // const nextReviewAt = new Date();
      // nextReviewAt.setDate(nextReviewAt.getDate() + 1);

      const addedWord = await Word.addNewWord(userId, 1, word, meaning, known);


      if (!addedWord) {
         return res.status(404).json({ message: 'word was not correctly added to srs_reviews' });
      }

      return res.status(201).json(addedWord);

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

      // const deletedSRS = await Word.deleteFromSRS(userId, wordId);

      // if (!deletedSRS) {
      //    return res.status(400).json({ message: 'word was not deleted from srs' });
      // }

      return res.status(200).json(deletedWord);
   } catch (err) {
      console.log('500 error deleting word: ', err);
      return res.status(500).json({ error: err });
   }
};

const search = async (req, res) => {
   
   const userId = req.user.id;
   const query = req.query.query || '';
   
   try {

      if (!query || typeof query !== 'string') {
         return res.status(400).json({ message: 'search query not valid' });
      }

      const searched = await Word.search(userId, query);

      if (!searched || searched.length === 0) {
         return res.json({ message: 'searched word / meaning was not found' });
      }

      return res.json(searched);
   } catch (err) {
      console.log('500 error inside search backend', err);
      return res.status(500).json({ error: err });
   }
};

const bulkCreateWords = async (req, res) => {
   try {
      const { words } = req.body;
      const userId = req.user.id; // Assuming you have user ID from auth middleware

      if (!words || !Array.isArray(words) || words.length === 0) {
         return res.status(400).json({ message: 'No words provided for migration' });
      }

      // Validate each word has required fields
      for (const word of words) {
         if (!word.word || !word.meaning || typeof word.known !== 'boolean') {
            return res.status(400).json({ 
               message: 'Each word must have word, meaning, and known fields' 
            });
         }
      }

      // Check for duplicates within the batch and against existing words
      const existingWords = await Word.getWordsByUserId(userId);
      const existingWordsList = existingWords.map(w => w.word.toLowerCase().trim());
      
      const wordsToInsert = [];
      const duplicates = [];

      for (const word of words) {
         const normalizedWord = word.word.toLowerCase().trim();
         
         // Check if word already exists in user's collection
         if (existingWordsList.includes(normalizedWord)) {
            duplicates.push(word.word);
            continue;
         }

         // Check if word is duplicate within the batch
         if (wordsToInsert.some(w => w.word.toLowerCase().trim() === normalizedWord)) {
            duplicates.push(word.word);
            continue;
         }

         wordsToInsert.push({
            word: word.word.trim(),
            meaning: word.meaning.trim(),
            known: word.known,
            userId: userId
         });
      }

      // Insert non-duplicate words
      let insertedWords = [];
      if (wordsToInsert.length > 0) {
         insertedWords = await Word.bulkCreateWords(wordsToInsert);
      }

      res.status(200).json({
         message: 'Migration completed',
         inserted: insertedWords.length,
         duplicates: duplicates.length,
         duplicateWords: duplicates
      });

   } catch (err) {
      console.error('Error in bulk word creation:', err);
      res.status(500).json({ message: 'Failed to migrate words' });
   }
};



module.exports = {
   getAllWords,
   addNewWord,
   editWord,
   deleteWord,
   search,
   bulkCreateWords,
};