const express = require('express');
const router = express.Router();
const { getAttendanceOverview, markAttendance } = require('../controllers/attendanceController');

router.get('/overview', getAttendanceOverview);
router.post('/mark', markAttendance);

module.exports = router;

