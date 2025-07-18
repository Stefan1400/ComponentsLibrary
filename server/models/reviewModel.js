const db = require('../db');

const getDue = async (userId) => {
   const result = await db.query(
      `SELECT r.*, w.word, w.meaning
      FROM srs_reviews r 
      JOIN words w ON r.word_id = w.id
      WHERE r.user_id = $1 AND r.next_review_at <= NOW()
      ORDER BY r.next_review_at ASC `,
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

const updateSRS = async (userId, wordId, nextStage, nextReviewAt) => {
   const result = await db.query(
      `UPDATE srs_reviews SET srs_stage = $1, next_review_at = $2, last_reviewed_at = NOW() WHERE user_id = $3 AND id = $4 RETURNING *`,
      [nextStage, nextReviewAt, userId, wordId]
   );

   return result.rows[0];
}

module.exports = {
   getDue,
   getWordById,
   updateSRS,
}