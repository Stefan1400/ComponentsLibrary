const db = require('../db');

const getMyStats = async (userId) => {

   const result = await db.query(`
      SELECT 
         COUNT(*) AS total_words,
         COUNT(*) FILTER (WHERE known IS TRUE) AS known_words,
         COUNT(*) FILTER (WHERE known IS FALSE) AS learning_words
      FROM words
      WHERE user_id = $1
      `, [userId]
   );

   return result.rows[0];
}

module.exports = {
   getMyStats,
}