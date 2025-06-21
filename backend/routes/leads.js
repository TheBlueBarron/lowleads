// /leads → send lead, list leads, mark sold

const express = require('express');
const router = express.Router();
const controller = require('../controllers/leadController');
const authenticateJWT = require('../middleware/authMiddleware');

router.post('/leads', authenticateJWT, controller.sendLead);
router.get('/leads', authenticateJWT, controller.listLeads);
router.patch('/leads/:id/sold', authenticateJWT, controller.markSold);

module.exports = router;
