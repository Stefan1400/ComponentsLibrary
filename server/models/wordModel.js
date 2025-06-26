// const { getAllWords, findWord, addNewWord } = require('../controllers/wordController');
const db = require('../db');

const getAllWords = async () => {
   const result = await db.query('SELECT * FROM words')
   
   return result.rows;
}

const findWord = async (word) => {
   const result = await db.query('SELECT * FROM words WHERE word = $1', [word]);

   return result.rows[0];
}

const addNewWord = async (word, meaning, status) => {

   const result = await db.query(
      'INSERT INTO words (word, status, meaning) VALUES ($1, $2, $3) RETURNING *',
      [word, meaning, status]
   );

   return result.rows[0];

}

module.exports = {
   getAllWords,
   findWord,
   addNewWord,
}