const express = require('express');
const router = express.Router();
const { getSubjects, createSubject, getTimetable } = require('../controllers/academicController');

router.get('/subjects', getSubjects);
router.post('/subjects', createSubject);
router.get('/timetable', getTimetable);

module.exports = router;
