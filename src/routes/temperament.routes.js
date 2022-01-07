const express = require('express');
const router = express.Router();
const { getTemp } = require('../controllers/temperament.controller');

router.get('/', getTemp);

module.exports = router;