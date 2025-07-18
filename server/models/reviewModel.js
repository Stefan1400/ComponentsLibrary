const db = require('../db');

const getDue = async (userId) => {
   const result = await db.query(
      'SELECT * FROM srs_reviews WHERE user_id = $1 AND next_review_at <= NOW() ORDER BY next_review_at ASC',
      [userId]
   );

   return result.rows;
}

module.exports = {
   getDue,
}