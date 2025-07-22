const db = require('../db');

const getDue = async (userId) => {
   const result = await db.query(
      'SELECT * FROM srs_reviews WHERE user_id = $1 AND next_review_at <= NOW()',
      [userId]
   );

   return result.rows;
}

const getWordById = async (userId, wordId) => {
   const result = await db.query(
      `SELECT * FROM srs_reviews WHERE user_id = $1 AND id = $2`,
      [userId, wordId]
   );

   return result.rows[0];
}

const updateSRS = async (wordId, userId, nextStage, nextReviewAt) => {
   console.log('values passed to updateSRS model: ', wordId, userId, nextStage, nextReviewAt);
   
   const result = await db.query(
      `UPDATE srs_reviews SET srs_stage = $1, next_review_at = $2, last_reviewed_at = NOW() WHERE user_id = $3 AND id = $4 RETURNING *`,
      [nextStage, nextReviewAt, userId, wordId]
   );

   console.log('updated result in updateSRS model: ', result.rows[0]);

   return result.rows[0];
}

module.exports = {
   getDue,
   getWordById,
   updateSRS,
}