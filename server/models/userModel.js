const db = require('../db');

const getAllUsers = async () => {
  const result = await db.query('SELECT * FROM users');
  return result.rows;
};

const createUser = async (username, password) => {
  const result = await db.query(
    'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
    [username, password]
  );
  return result.rows[0];
};

const loginUser = async (username) => {
  const result = await db.query(
    'SELECT * FROM users WHERE username = $1',
    [username]
  )
  return result.rows[0];
};

const findPassword = async (userId, password) => {
  const result = await db.query(
    `SELECT * FROM users WHERE id = $1 AND password = $2`,
    [userId, password]
  );

  return result.rows[0];
}

const getUserById = async (userId) => {
  const result = await db.query(
    'SELECT * FROM users WHERE id = $1',
    [userId]
  );

  return result.rows[0];
}

const updateUser = async (id, { username, password }) => {
   const result = await db.query(
      'UPDATE users SET username = $1, password = $2 WHERE id = $3 RETURNING *', 
      [username, password, id]
   );
   return result.rows[0];
};

const deleteUser = async (userId) => {
  const result = await db.query(
    'DELETE FROM users WHERE id = $1 RETURNING *',
    [userId]
  );

  return result.rows[0];
}

module.exports = {
  getAllUsers,
  createUser,
  loginUser,
  findPassword,
  getUserById,
  updateUser,
  deleteUser,
};
