const express = require('express');
const router = express.Router();
const {
  getExams,
  createExam,
  getGrades,
  createGrade,
  getReportCard
} = require('../controllers/examController');

router.route('/')
  .get(getExams)
  .post(createExam);

router.route('/grades')
  .get(getGrades)
  .post(createGrade);

router.get('/report-card/:studentId', getReportCard);

module.exports = router;
