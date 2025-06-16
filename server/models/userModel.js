// server/models/userModel.js
const db = require('../db');

const findAll = async () => {
  const result = await db.query('SELECT * FROM users');
  return result.rows;
};

const create = async (username, password) => {
  const result = await db.query(
    'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
    [username, password]
  );
  return result.rows[0];
};

module.exports = {
  findAll,
  create,
};
