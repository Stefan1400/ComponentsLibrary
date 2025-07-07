const db = require('../db');

// const getMyStats = async (userId) => {

//    const result = await db.query(
//       'SELECT * FROM stats WHERE user_id = $1',
//       [userId]
//    );

//    return result.rows[0];
// }

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

// const updateStats = async (userId, stat) => {

//    switch (stat) {
//       case 'total_words':
//          query = 'SELECT COUNT(*) FROM words WHERE user_id = $1';
//          break;
//       case 'known_words':
//          query = 'SELECT COUNT(*) FROM words WHERE user_id = $1 AND known = true';
//          break;
//       case 'learning_words':
//          query = 'SELECT COUNT(*) FROM words WHERE user_id = $1 AND known = false';
//          break;
//       default:
//          throw new Error('invalid stat');
//    }

//    const result = await db.query(query, [userId]);
//    const count = Number(result.rows[0].count);

//    await db.query(
//       `UPDATE stats SET ${stat} = $1 WHERE user_id = $2`,
//       [count, userId]
//    )


//    return count;
// }

module.exports = {
   // updateStats,
   getMyStats,
}