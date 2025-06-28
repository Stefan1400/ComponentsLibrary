const db = require('../db');

const getMyStats = async (userId) => {

   const result = await db.query(
      'SELECT * FROM stats WHERE user_id = $1',
      [userId]
   );

   return result.rows[0];
}

const updateStats = async (userId, stat, action) => {

   const operation = action === 'increment' ? '+' : '-';
   
   const result = await db.query(
      `UPDATE stats SET ${stat} = ${stat} ${operation} 1 WHERE user_id = $1 RETURNING *`,
      [userId]
   );

   return result.rows[0];
}

module.exports = {
   updateStats,
   getMyStats,
}