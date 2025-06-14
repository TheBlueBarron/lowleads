// /partnerships → send, accept, list partnerships

const express = require('express');
const router = express.Router();
const controller = require('../controllers/partnershipController');
const { authMiddleware } = require('../controllers/userController');

router.post('/partnerships/request', authMiddleware, controller.request);
router.post('/partnerships/accept', authMiddleware, controller.accept);
router.get('/partnerships', authMiddleware, controller.list);

module.exports = router;
