const express = require('express');
const router = express.Router();
const { getFees, createFee, recordPayment } = require('../controllers/feeController');

router.route('/')
  .get(getFees)
  .post(createFee);

router.post('/pay', recordPayment);

module.exports = router;

