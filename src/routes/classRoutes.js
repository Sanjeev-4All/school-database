const express = require('express');
const router = express.Router();
const { getClasses, createClass } = require('../controllers/classController');

router.route('/')
  .get(getClasses)
  .post(createClass);

module.exports = router;

