const express = require('express');
const router = express.Router();
const { getTransportRoutes, createTransportRoute } = require('../controllers/transportController');

router.route('/')
  .get(getTransportRoutes)
  .post(createTransportRoute);

module.exports = router;
