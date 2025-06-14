/*
partnerships table:
- id
- user1_id
- user2_id
- status ('pending', 'accepted')

Export functions:
- requestPartnership(senderId, receiverId)
- acceptPartnership(user1Id, user2Id)
- getPartnerships(userId)
*/

const pool = require('../db');

async function requestPartnership(senderId, receiverId) {
  const [result] = await pool.query(
    'INSERT INTO partnerships (user1_id, user2_id, status) VALUES (?, ?, ?)',
    [senderId, receiverId, 'pending']
  );
  return result.insertId;
}

async function acceptPartnership(user1Id, user2Id) {
  await pool.query(
    `UPDATE partnerships SET status = 'accepted' WHERE 
     ((user1_id = ? AND user2_id = ?) OR (user1_id = ? AND user2_id = ?))`,
    [user1Id, user2Id, user2Id, user1Id]
  );
}

async function getPartnerships(userId) {
  const [rows] = await pool.query(
    `SELECT * FROM partnerships WHERE (user1_id = ? OR user2_id = ?) AND status = 'accepted'`,
    [userId, userId]
  );
  return rows;
}

module.exports = {
  requestPartnership,
  acceptPartnership,
  getPartnerships,
};
