/*
Handles:
- POST /partnerships/request → request partnership
- POST /partnerships/accept → accept partnership
- GET /partnerships → list all accepted partnerships for current user
*/

const Partnership = require('../models/Partnership');

async function request(req, res) {
  try {
    const { receiverId } = req.body;
    const id = await Partnership.requestPartnership(req.user.id, receiverId);
    res.json({ id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function accept(req, res) {
  try {
    const { userId } = req.body;
    await Partnership.acceptPartnership(req.user.id, userId);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function list(req, res) {
  try {
    const partnerships = await Partnership.getPartnerships(req.user.id);
    res.json(partnerships);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  request,
  accept,
  list,
};
