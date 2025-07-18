const db = require('../db');

const getDue = async (userId) => {
   const result = await db.query(
      'SELECT * FROM srs_reviews WHERE user_id = $1 AND next_review_at <= DATE.now()',
      [userId]
   );

   return result.rows[0];
}

module.exports = {
   getDue,
}