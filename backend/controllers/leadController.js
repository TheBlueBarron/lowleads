/*
Handles:
- POST /leads → send new lead to a partner's service
- GET /leads → list leads received for user's services
- PATCH /leads/:id/sold → mark lead as sold
  - Transfers reward from service owner to lead sender
  - Updates balances in users table
*/

const Lead = require('../models/Lead');
const User = require('../models/User');

async function sendLead(req, res) {
  try {
    const { serviceId } = req.body;
    const id = await Lead.createLead({ sender_id: req.user.id, service_id: serviceId });
    res.json({ id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function listLeads(req, res) {
  try {
    const leads = await Lead.getLeadsForUser(req.user.id);
    res.json(leads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function markSold(req, res) {
  try {
    const leadId = req.params.id;
    const leads = await Lead.getLeadsForUser(req.user.id);
    const lead = leads.find(l => l.id == leadId);
    if (!lead) return res.status(404).json({ error: 'Lead not found' });
    if (lead.status === 'sold') return res.status(400).json({ error: 'Already sold' });

    await Lead.markLeadAsSold(leadId);
    await User.updateBalance(req.user.id, -lead.reward);
    await User.updateBalance(lead.sender_id, lead.reward);

    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  sendLead,
  listLeads,
  markSold,
};
