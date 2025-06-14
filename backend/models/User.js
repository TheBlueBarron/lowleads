/*
users table:
- id (int, primary key, auto-increment)
- name (varchar)
- email (varchar, unique)
- password_hash (varchar)
- balance (float, default 0)

Export functions:
- createUser({ name, email, password_hash })
- getUserByEmail(email)
- getUserById(id)
- updateBalance(userId, amount)
*/

const pool = require('../db');

async function createUser({ name, email, password_hash }) {
  const [result] = await pool.query(
    'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
    [name, email, password_hash]
  );
  return { id: result.insertId, name, email, balance: 0 };
}

async function getUserByEmail(email) {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
}

async function getUserById(id) {
  const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0];
}

async function updateBalance(userId, amount) {
  await pool.query('UPDATE users SET balance = balance + ? WHERE id = ?', [amount, userId]);
}

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  updateBalance,
};
