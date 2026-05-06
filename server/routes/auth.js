// server/routes/auth.js
const router = require('express').Router();
const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { name, email, password, dept, year } = req.body;
  if (!email.endsWith('@srmist.edu.in'))
    return res.status(400).json({ error: 'Only @srmist.edu.in emails allowed' });

  try {
    const hash = await bcrypt.hash(password, 10);
    const avatar = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
    const [result] = await db.query(
      'INSERT INTO user (name, email, password_hash, avatar, dept, year) VALUES (?,?,?,?,?,?)',
      [name, email, hash, avatar, dept || 'CSE', year || 1]
    );
    const token = jwt.sign({ id: result.insertId, name, email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: result.insertId, name, email, dept: dept || 'CSE', year: year || 1, avatar } });
  } catch (err) {
    console.error('REGISTER ERROR:', err);
    if (err.code === 'ER_DUP_ENTRY')
      return res.status(400).json({ error: 'Email already registered' });
    res.status(500).json({ error: err.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await db.query('SELECT * FROM user WHERE email = ?', [email]);
    if (!rows.length) return res.status(401).json({ error: 'User not found' });

    const match = await bcrypt.compare(password, rows[0].password_hash);
    if (!match) return res.status(401).json({ error: 'Incorrect password' });

    const user = rows[0];
    const token = jwt.sign({ id: user.user_id, name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.user_id, name: user.name, email: user.email, dept: user.dept, year: user.year, avatar: user.avatar } });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

// GET all users
router.get('/users', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT user_id, name, email, avatar, department, year, dept FROM `user`'
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});