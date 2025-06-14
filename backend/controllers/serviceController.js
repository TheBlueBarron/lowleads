/*
Handles:
- POST /services → create service
- GET /services → get user’s services
- GET /partner-services → get partner services for user
Only authenticated users may create or access services.
*/

const Service = require('../models/Service');

async function createService(req, res) {
  try {
    const { title, description, reward } = req.body;
    const service = await Service.createService({
      title,
      description,
      reward,
      user_id: req.user.id,
    });
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getServices(req, res) {
  try {
    const services = await Service.getServicesByUser(req.user.id);
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getPartnerServices(req, res) {
  try {
    const services = await Service.getServicesByPartner(req.user.id);
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createService,
  getServices,
  getPartnerServices,
};
