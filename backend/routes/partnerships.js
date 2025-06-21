// /partnerships → send, accept, list partnerships

const express = require('express');
const router = express.Router();
const controller = require('../controllers/partnershipController');
const authenticateJWT = require('../middleware/authMiddleware');

router.post('/partnerships/request', authenticateJWT, controller.request);
router.post('/partnerships/accept', authenticateJWT, controller.accept);
router.get('/partnerships', authenticateJWT, controller.list);

module.exports = router;
