require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
const userRoutes = require('./routes/userRoutes');
const wordRoutes = require('./routes/wordRoutes');
const statsRoutes = require('./routes/statsRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

app.use(express.json());
app.use(cors());
app.use('/api/users', userRoutes);
app.use('/api/words', wordRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/review', reviewRoutes);

app.get('/api/ping', async (req, res) => {
   try {
      await pool.query('SELECT 1');

   } catch (err) {
      console.log('Ping: DB not ready', err);
      return res.status(200).json({ ok: true, dbReady: false });
   }

   return res.status(200).json({ ok: true, dbReady: true });
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));