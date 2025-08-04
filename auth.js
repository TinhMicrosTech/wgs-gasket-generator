import express from 'express';
import jwt from 'jsonwebtoken';
import pool from '../db.js';
import bcrypt from 'bcrypt';

const router = express.Router();
const JWT_SECRET = 'your_secret_key';

// Đăng ký
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  try {
    await pool.query('INSERT INTO users (username, password) VALUES (?,?)', [username, hash]);
    res.json({ success: true });
  } catch (e) {
    res.status(409).json({ error: 'User exists' });
  }
});

// Đăng nhập
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const [rows] = await pool.query('SELECT * FROM users WHERE username=?', [username]);
  if (!rows[0]) return res.status(401).json({ error: 'User not found' });
  const match = await bcrypt.compare(password, rows[0].password);
  if (!match) return res.status(401).json({ error: 'Wrong password' });
  const token = jwt.sign({ id: rows[0].id, username }, JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
});

export default router;