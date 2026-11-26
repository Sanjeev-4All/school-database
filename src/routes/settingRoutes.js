const express = require('express');
const router = express.Router();
const { getSettings, updateSettings, exportBackup } = require('../controllers/settingController');

router.route('/')
  .get(getSettings)
  .put(updateSettings);

router.get('/backup', exportBackup);

module.exports = router;
