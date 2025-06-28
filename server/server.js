require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const wordRoutes = require('./routes/wordRoutes');
const statsRoutes = require('./routes/statsRoutes');

app.use(express.json());
app.use(cors());
app.use('/api/users', userRoutes);
app.use('/api/words', wordRoutes);
app.use('/api/stats', statsRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));