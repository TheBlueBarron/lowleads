// /services routes → create, get user’s services, get partner services

const express = require('express');
const router = express.Router();
const controller = require('../controllers/serviceController');
const { authMiddleware } = require('../controllers/userController');

router.post('/services', authMiddleware, controller.createService);
router.get('/services', authMiddleware, controller.getServices);
router.get('/partner-services', authMiddleware, controller.getPartnerServices);

module.exports = router;
