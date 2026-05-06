const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();


app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

app.use('/api/auth',     require('./routes/auth'));
app.use('/api/skills',   require('./routes/skills'));
app.use('/api/sessions', require('./routes/sessions'));
app.use('/api/feedback', require('./routes/feedback'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
}).on('error', (err) => {
  console.error('Server error:', err);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
});