const db = require('../db');

const getAllWords = async (userId) => {
   const result = await db.query(
      'SELECT * FROM srs_reviews WHERE user_id = $1', 
      [userId]
   );
   
   return result.rows;
}

const findWord = async (word, userId) => {
   const result = await db.query(
      'SELECT * FROM srs_reviews WHERE word = $1 AND user_id = $2', 
      [word, userId]
   );

   return result.rows[0];
}

const getWordById = async (wordId, userId) => {
   const result = await db.query(
      'SELECT * FROM srs_reviews WHERE id = $1 AND user_id = $2',
      [wordId, userId]
   );

   return result.rows[0];
}

const addNewWord = async (userId, srs_stage, word, meaning, known) => {

   const result = await db.query(
      `
      INSERT INTO srs_reviews 
         (user_id, srs_stage, next_review_at, last_reviewed_at, created_at, word, meaning, known) 
      VALUES 
         ($1, $2, NOW(), NULL, NOW(), $3, $4, $5) RETURNING *`,
      [userId, srs_stage, word, meaning, known]
   );

   return result.rows[0];
}

const editWord = async (userId, wordId, word, meaning, known) => {
   const result = await db.query(
      'UPDATE srs_reviews SET word = $1, meaning = $2, known = $3 WHERE user_id = $4 AND id = $5 RETURNING *',
      [word, meaning, known, userId, wordId]
   );

   // return result.rows[0];
   return result.rows.length > 0 ? result.rows[0] : null;
}

const deleteWord = async (userId, wordId) => {
   const result = await db.query(
      'DELETE FROM srs_reviews WHERE user_id = $1 AND id = $2 RETURNING *',
      [userId, wordId]
   );

   return result.rows[0];
}

const search = async (userId, query) => {
   const result = await db.query(
      'SELECT * FROM srs_reviews WHERE user_id = $1 AND (word ILIKE $2 OR meaning ILIKE $2) ORDER BY word ASC',
      [userId, `%${query}%`]
   );

   return result.rows;
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