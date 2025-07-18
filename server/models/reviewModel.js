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

const updateSRS = async (userId, word) => {
   const result = await db.query(
      `UPDATE TABLE srs_reviews SET srs_stage += 1, next_review_at, last_reviewed_at = NOW() WHERE user_id = $1 AND word`
   );

   return result.rows;
}

module.exports = {
   getDue,
   updateSRS,
}