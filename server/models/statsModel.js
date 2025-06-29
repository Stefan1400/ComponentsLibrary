const db = require('../db');

const getMyStats = async (userId) => {

   const result = await db.query(
      'SELECT * FROM stats WHERE user_id = $1',
      [userId]
   );

   return result.rows[0];
}

const updateStats = async (userId, stat) => {
   
   const calculateCount = await db.query(
      `SELECT COUNT(*) FROM words WHERE user_id = $1`, [userId]
   );

   const count = Number(calculateCount.rows[0].count);

   await db.query(
      `UPDATE stats SET ${stat} = $1 WHERE user_id = $2`,
      [count, userId]
   )


   return count;
}

module.exports = {
   updateStats,
   getMyStats,
}