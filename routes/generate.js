const express = require('express');
const router = express.Router();

const { generateIdea } = require('../controller/generate');

router.post('/generate', generateIdea);

module.exports = router;
