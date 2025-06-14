/*
services table:
- id (int, primary key)
- title (varchar)
- description (text)
- reward (float)
- user_id (foreign key → users.id)

Export functions:
- createService({ title, description, reward, user_id })
- getServicesByUser(userId)
- getServicesByPartner(userId)
- getServiceById(id)
*/

const pool = require('../db');

async function createService({ title, description, reward, user_id }) {
  const [result] = await pool.query(
    'INSERT INTO services (title, description, reward, user_id) VALUES (?, ?, ?, ?)',
    [title, description, reward, user_id]
  );
  return { id: result.insertId, title, description, reward, user_id };
}

async function getServicesByUser(userId) {
  const [rows] = await pool.query('SELECT * FROM services WHERE user_id = ?', [userId]);
  return rows;
}

async function getServicesByPartner(userId) {
  const [rows] = await pool.query(
    `SELECT s.* FROM services s
     JOIN partnerships p ON (
       (p.user1_id = ? AND s.user_id = p.user2_id) OR
       (p.user2_id = ? AND s.user_id = p.user1_id)
     )
     WHERE p.status = 'accepted'`,
    [userId, userId]
  );
  return rows;
}

async function getServiceById(id) {
  const [rows] = await pool.query('SELECT * FROM services WHERE id = ?', [id]);
  return rows[0];
}

module.exports = {
  createService,
  getServicesByUser,
  getServicesByPartner,
  getServiceById,
};
