require('dotenv').config();
const express = require('express');
const cors = require('cors');
const analyzeRoute = require('./src/routes/analyze');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use(analyzeRoute);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
