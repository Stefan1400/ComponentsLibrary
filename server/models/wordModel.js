const db = require('../db');

const getAllWords = async (userId) => {
   const result = await db.query(
      'SELECT * FROM words WHERE user_id = $1', 
      [userId]
   );
   
   return result.rows;
}

const findWord = async (word, userId) => {
   const result = await db.query(
      'SELECT * FROM words WHERE word = $1 AND user_id = $2', 
      [word, userId]
   );

   return result.rows[0];
}

const getWordById = async (wordId, userId) => {
   const result = await db.query(
      'SELECT * FROM words WHERE id = $1 AND user_id = $2',
      [wordId, userId]
   );

   return result.rows[0];
}

const addNewWord = async (userId, word, meaning, known) => {

   const result = await db.query(
      'INSERT INTO words (user_id, word, meaning, known) VALUES ($1, $2, $3, $4) RETURNING *',
      [userId, word, meaning, known]
   );

   return result.rows[0];

}

const editWord = async (userId, wordId, word, meaning, known) => {
   const result = await db.query(
      'UPDATE words SET word = $1, meaning = $2, known = $3 WHERE user_id = $4 AND id = $5 RETURNING *',
      [word, meaning, known, userId, wordId]
   );

   if (!result) {
      return res.status(400).json({ message: 'result is invalid' });
   }

   return result.rows[0];
}

const deleteWord = async (userId, wordId) => {
   const result = await db.query(
      'DELETE FROM words WHERE user_id = $1 AND id = $2 RETURNING *',
      [userId, wordId]
   );

   return result.rows[0];
}

const search = async (userId, query) => {
   const result = await db.query(
      'SELECT * FROM words WHERE user_id = $1 AND (word ILIKE $2 OR meaning ILIKE $2) ORDER BY word ASC',
      [userId, `%${query}%`]
   );

   return result.rows[0];
}

module.exports = {
   getAllWords,
   findWord,
   getWordById,
   addNewWord,
   editWord,
   deleteWord,
   search,
}