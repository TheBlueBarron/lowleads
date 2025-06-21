// /services routes → create, get user’s services, get partner services

const express = require('express');
const router = express.Router();
const controller = require('../controllers/serviceController');
const authenticateJWT = require('../middleware/authMiddleware'); // ✅ correct import

router.post('/services', authenticateJWT, controller.createService);
router.get('/services', authenticateJWT, controller.getServices);
router.get('/partner-services', authenticateJWT, controller.getPartnerServices);

module.exports = router;
