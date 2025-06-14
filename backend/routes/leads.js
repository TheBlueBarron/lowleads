// /leads → send lead, list leads, mark sold

const express = require('express');
const router = express.Router();
const controller = require('../controllers/leadController');
const { authMiddleware } = require('../controllers/userController');

router.post('/leads', authMiddleware, controller.sendLead);
router.get('/leads', authMiddleware, controller.listLeads);
router.patch('/leads/:id/sold', authMiddleware, controller.markSold);

module.exports = router;
