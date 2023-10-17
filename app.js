require('dotenv').config();
const express = require('express');
const app = express();

const generateRouter = require('./routes/generate');

const port = process.env.PORT || 3000; // Set your preferred port

app.use(express.json());

app.use('/api', generateRouter);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
