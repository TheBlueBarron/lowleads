const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateJWT = require('../middleware/authMiddleware');

router.post('/register', userController.register);
router.post('/login', userController.login);

// Example protected route
router.get('/profile', authenticateJWT, (req, res) => {
  res.json({ message: `Welcome, ${req.user.email}` });
});

module.exports = router;
