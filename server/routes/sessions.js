// server/routes/sessions.js
const router = require('express').Router();
const db = require('../db');

// GET sessions for a user
router.get('/:userId', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT s.*, u.name AS partner_name, sk.skill_name
      FROM session s
      JOIN offer o ON s.offer_id = o.offer_id
      JOIN user u ON o.user_id = u.user_id
      JOIN skill sk ON o.skill_id = sk.skill_id
      WHERE o.user_id = ? OR (
        SELECT user_id FROM request WHERE request_id = s.request_id
      ) = ?
    `, [req.params.userId, req.params.userId]);
    res.json(rows);
  } catch (err) {
    console.error('GET sessions error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST create a session
router.post('/', async (req, res) => {
  try {
    const { date, time, duration, status, offer_id, request_id, location, room } = req.body;
    const [result] = await db.query(
      'INSERT INTO session (date, time, duration, status, offer_id, request_id, location, room) VALUES (?,?,?,?,?,?,?,?)',
      [date, time, duration, status || 'Pending', offer_id, request_id, location, room || null]
    );
    res.json({ session_id: result.insertId });
  } catch (err) {
    console.error('POST session error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;