/*
Handles user registration, login, and profile fetch:
- POST /register → hash password, insert user, return JWT
- POST /login → validate password, return JWT
- GET /profile → get user info using JWT
Uses bcrypt and jsonwebtoken.
*/

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existing = await User.getUserByEmail(email);
    if (existing) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const password_hash = await bcrypt.hash(password, 10);
    const user = await User.createUser({ name, email, password_hash });
    const token = jwt.sign({ id: user.id }, JWT_SECRET);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.getUserByEmail(email);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: user.id }, JWT_SECRET);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function profile(req, res) {
  try {
    const user = await User.getUserById(req.user.id);
    if (!user) return res.status(404).json({ error: 'Not found' });
    delete user.password_hash;
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = { id: decoded.id };
    next();
  } catch {
    res.status(401).json({ error: 'Unauthorized' });
  }
}

module.exports = {
  register,
  login,
  profile,
  authMiddleware,
};
