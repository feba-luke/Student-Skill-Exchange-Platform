// server/routes/feedback.js
const router = require('express').Router();
const db = require('../db');

// POST submit feedback
router.post('/', async (req, res) => {
  try {
    const { rating, comments, session_id, user_id } = req.body;
    const [result] = await db.query(
      'INSERT INTO feedback (rating, comments, session_id, user_id) VALUES (?,?,?,?)',
      [rating, comments, session_id, user_id]
    );
    res.json({ feedback_id: result.insertId });
  } catch (err) {
    console.error('POST feedback error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;