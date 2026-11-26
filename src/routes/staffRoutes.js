const express = require('express');
const router = express.Router();
const { getStaff, createStaff } = require('../controllers/staffController');

router.route('/')
  .get(getStaff)
  .post(createStaff);

module.exports = router;

