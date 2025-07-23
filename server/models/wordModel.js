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

// const addToSRS = async (userId, wordId) => {
//    console.log('beginning of addToSRS model: ', userId, wordId);
   
//    const result = await db.query(
//       `INSERT INTO srs_reviews 
//          (user_id, word_id, srs_stage, next_review_at, last_reviewed_at, created_at) 
//       VALUES 
//          ($1, $2, 1, NOW(), null, NOW())
//       RETURNING *`,
//       [userId, wordId]
//    );

//    console.log('end of addToSRS model: ', result.rows[0]);

//    return result.rows[0];
// }

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

// const deleteFromSRS = async (userId, wordId) => {
//    const result = await db.query(
//       'DELETE FROM srs_reviews WHERE user_id = $1 and id = $2 RETURNING *',
//       [userId, wordId]
//    );

//    return result.rows[0];
// }

const search = async (userId, query) => {
   const result = await db.query(
      'SELECT * FROM srs_reviews WHERE user_id = $1 AND (word ILIKE $2 OR meaning ILIKE $2) ORDER BY word ASC',
      [userId, `%${query}%`]
   );

   return result.rows;
}

const bulkCreateWords = async (words) => {
   const values = [];
   const params = [];
   let paramIndex = 1;

   words.forEach((word) => {
      values.push(`($${paramIndex}, $${paramIndex + 1}, $${paramIndex + 2}, $${paramIndex + 3}, $${paramIndex + 4}, $${paramIndex + 5}, $${paramIndex + 6}, $${paramIndex + 7})`);
      params.push(
         word.userId,                      // user_id
         1,                                // srs_stage (default to 1)
         new Date(),                       // next_review_at
         null,                             // last_reviewed_at
         new Date(),                       // created_at
         word.word,                        // word
         word.meaning,                     // meaning
         word.known === true               // known (must be a boolean)
      );
      paramIndex += 8;
   });

   const query = `
      INSERT INTO srs_reviews (
         user_id,
         srs_stage,
         next_review_at,
         last_reviewed_at,
         created_at,
         word, 
         meaning, 
         known
      )
      VALUES ${values.join(', ')}
      RETURNING *
   `;

   const result = await db.query(query, params);
   return result.rows;
};


const getWordsByUserId = async (userId) => {
   const result = await db.query(
      'SELECT word FROM srs_reviews WHERE user_id = $1', 
      [userId]
   );
   
   return result.rows;
}

module.exports = {
   getAllWords,
   findWord,
   getWordById,
   addNewWord,
   // addToSRS,
   editWord,
   deleteWord,
   // deleteFromSRS,
   search,
   bulkCreateWords,
   getWordsByUserId,
}