/*
leads table:
- id
- sender_id
- service_id
- status ('pending', 'sold')

Export functions:
- createLead({ sender_id, service_id })
- getLeadsForUser(userId)
- markLeadAsSold(leadId)
*/

const pool = require('../db');

async function createLead({ sender_id, service_id }) {
  const [result] = await pool.query(
    'INSERT INTO leads (sender_id, service_id, status) VALUES (?, ?, ?)',
    [sender_id, service_id, 'pending']
  );
  return result.insertId;
}

async function getLeadsForUser(userId) {
  const [rows] = await pool.query(
    `SELECT l.*, s.reward, s.user_id FROM leads l
     JOIN services s ON l.service_id = s.id
     WHERE s.user_id = ?`,
    [userId]
  );
  return rows;
}

async function markLeadAsSold(leadId) {
  await pool.query('UPDATE leads SET status = ? WHERE id = ?', ['sold', leadId]);
}

module.exports = {
  createLead,
  getLeadsForUser,
  markLeadAsSold,
};
