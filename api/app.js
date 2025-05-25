const express = require('express');
require('dotenv').config();
const app = express();

// In api/app.js
const cors = require('cors');
app.use(cors());

const schoolRoutes = require('./routes/schools');



app.use(express.json());
app.use('/', schoolRoutes);

const PORT = process.env.PORT || 3000;

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
