// server/server.js
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json()); // Parses incoming JSON requests
app.use(cors());
// Example: Import user routes (you'll create this later)
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
