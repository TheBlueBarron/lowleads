// Express routes: /register, /login, /profile → use userController

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile', userController.authMiddleware, userController.profile);

module.exports = router;
