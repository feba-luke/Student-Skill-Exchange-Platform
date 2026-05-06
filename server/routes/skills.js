// server/routes/skills.js
const router = require('express').Router();
const db = require('../db');

// GET all skills
router.get('/', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM skill');
  res.json(rows);
});

// POST offer a skill
router.post('/offer', async (req, res) => {
  const { proficiency, availability, user_id, skill_id } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO offer (proficiency, availability, user_id, skill_id) VALUES (?,?,?,?)',
      [proficiency, availability, user_id, skill_id]
    );
    res.json({ offer_id: result.insertId });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY')
      return res.status(400).json({ error: 'You already offered this skill!' });
    res.status(500).json({ error: 'Server error' });
  }
});

// POST request a skill
router.post('/request', async (req, res) => {
  const { pref_time, goal, user_id, skill_id } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO request (pref_time, goal, user_id, skill_id) VALUES (?,?,?,?)',
      [pref_time, goal, user_id, skill_id]
    );
    res.json({ request_id: result.insertId });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY')
      return res.status(400).json({ error: 'You already requested this skill!' });
    res.status(500).json({ error: 'Server error' });
  }
});

// GET offers for a specific user
router.get('/offers/:userId', async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT s.skill_name, o.proficiency, o.availability, o.offer_id
       FROM offer o
       JOIN skill s ON o.skill_id = s.skill_id
       WHERE o.user_id = ?`,
      [req.params.userId]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET requests for a specific user
router.get('/requests/:userId', async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT s.skill_name, r.pref_time, r.goal, r.request_id
       FROM request r
       JOIN skill s ON r.skill_id = s.skill_id
       WHERE r.user_id = ?`,
      [req.params.userId]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET all users offering a specific skill
router.get('/offering/:skillId', async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT u.user_id, u.name, u.avatar, u.dept, u.year, o.proficiency, o.availability, o.offer_id
       FROM offer o
       JOIN \`user\` u ON o.user_id = u.user_id
       WHERE o.skill_id = ?`,
      [req.params.skillId]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET all users requesting a specific skill
router.get('/requesting/:skillId', async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT u.user_id, u.name, u.avatar, u.dept, u.year, r.pref_time, r.goal, r.request_id
       FROM request r
       JOIN \`user\` u ON r.user_id = u.user_id
       WHERE r.skill_id = ?`,
      [req.params.skillId]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST create a session (when someone joins)
router.post('/session/create', async (req, res) => {
  const { offer_id, request_id } = req.body;
  try {
    const [existing] = await db.query(
      'SELECT * FROM session WHERE offer_id = ? AND request_id = ?',
      [offer_id, request_id]
    );
    if (existing.length > 0)
      return res.status(400).json({ error: 'Session already exists!' });
    const [result] = await db.query(
      'INSERT INTO session (status, offer_id, request_id) VALUES (?,?,?)',
      ['Pending', offer_id, request_id]
    );
    res.json({ session_id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET all real sessions for a user from DB
router.get('/sessions/:userId', async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT 
        s.session_id, s.status, s.date, s.time, s.location, s.room, s.duration,
        sk.skill_name, sk.category,
        teacher.name AS teacher_name, teacher.avatar AS teacher_avatar, teacher.user_id AS teacher_id,
        o.offer_id, r.request_id,
        GROUP_CONCAT(DISTINCT learner.name ORDER BY learner.name SEPARATOR ', ') AS learners,
        GROUP_CONCAT(DISTINCT learner.user_id ORDER BY learner.user_id SEPARATOR ',') AS learner_ids
       FROM session s
       JOIN offer o ON s.offer_id = o.offer_id
       JOIN request r ON s.request_id = r.request_id
       JOIN skill sk ON o.skill_id = sk.skill_id
       JOIN \`user\` teacher ON o.user_id = teacher.user_id
       JOIN \`user\` learner ON r.user_id = learner.user_id
       WHERE teacher.user_id = ? OR learner.user_id = ?
       GROUP BY s.session_id`,
      [req.params.userId, req.params.userId]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE withdraw an offer
router.delete('/offer/:userId/:skillName', async (req, res) => {
  try {
    await db.query(
      `DELETE o FROM offer o
       JOIN skill s ON o.skill_id = s.skill_id
       WHERE o.user_id = ? AND s.skill_name = ?`,
      [req.params.userId, req.params.skillName]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE withdraw a request
router.delete('/request/:userId/:skillName', async (req, res) => {
  try {
    await db.query(
      `DELETE r FROM request r
       JOIN skill s ON r.skill_id = s.skill_id
       WHERE r.user_id = ? AND s.skill_name = ?`,
      [req.params.userId, req.params.skillName]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET all users with their offered skills (for community page)
router.get('/community/users', async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT u.user_id, u.name, u.avatar, u.dept, u.year,
        GROUP_CONCAT(DISTINCT s.skill_name ORDER BY s.skill_name SEPARATOR '||') AS offering,
        GROUP_CONCAT(DISTINCT r_skills.skill_name ORDER BY r_skills.skill_name SEPARATOR '||') AS requesting
       FROM \`user\` u
       LEFT JOIN offer o ON u.user_id = o.user_id
       LEFT JOIN skill s ON o.skill_id = s.skill_id
       LEFT JOIN request req ON u.user_id = req.user_id
       LEFT JOIN skill r_skills ON req.skill_id = r_skills.skill_id
       GROUP BY u.user_id`,
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET offer detail for a specific user + skill name
router.get('/offering-detail/:userId/:skillName', async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT o.offer_id, o.skill_id FROM offer o
       JOIN skill s ON o.skill_id = s.skill_id
       WHERE o.user_id = ? AND s.skill_name = ?`,
      [req.params.userId, req.params.skillName]
    );
    res.json(rows[0] || {});
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET request detail for a specific user + skill name
router.get('/request-detail/:userId/:skillName', async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT r.request_id FROM request r
       JOIN skill s ON r.skill_id = s.skill_id
       WHERE r.user_id = ? AND s.skill_name = ?`,
      [req.params.userId, req.params.skillName]
    );
    res.json(rows[0] || {});
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});
module.exports = router;