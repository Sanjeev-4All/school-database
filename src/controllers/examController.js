const mongoose = require('mongoose');
const { isMongoConnected } = require('../config/db');
const memoryStore = require('../utils/memoryStore');
const Exam = require('../models/Exam');
const Grade = require('../models/Grade');
const Student = require('../models/Student');
const Setting = require('../models/Setting');

// @desc    Get all examinations
// @route   GET /api/exams
exports.getExams = async (req, res) => {
  try {
    const useMongo = isMongoConnected();
    const exams = useMongo
      ? await Exam.find().sort({ startDate: 1, title: 1 })
      : memoryStore.getExams();

    res.status(200).json({
      success: true,
      count: exams.length,
      source: useMongo ? 'mongodb' : 'in-memory-store',
      data: exams
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Schedule new examination
// @route   POST /api/exams
exports.createExam = async (req, res) => {
  try {
    const examData = req.body;
    if (!examData.title) {
      return res.status(400).json({ success: false, message: 'Exam title is required' });
    }

    if (!isMongoConnected()) {
      const created = memoryStore.createExam(examData);
      return res.status(201).json({
        success: true,
        message: 'Exam scheduled successfully',
        data: created
      });
    }

    const created = await Exam.create(examData);
    res.status(201).json({
      success: true,
      message: 'Exam scheduled in MongoDB',
      data: created
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get student grades & marks
// @route   GET /api/exams/grades
exports.getGrades = async (req, res) => {
  try {
    const { className, studentId } = req.query;
    const useMongo = isMongoConnected();

    if (!useMongo) {
      const grades = memoryStore.getGrades({ className, studentId });
      return res.status(200).json({
        success: true,
        count: grades.length,
        source: 'in-memory-store',
        data: grades
      });
    }

    const query = {};
    if (className && className !== 'all') {
      query.className = { $regex: className, $options: 'i' };
    }
    if (studentId) {
      query.studentId = studentId;
    }

    const grades = await Grade.find(query).sort({ percentage: -1 });
    res.status(200).json({
      success: true,
      count: grades.length,
      source: 'mongodb',
      data: grades
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// @desc    Record / Add student marks
// @route   POST /api/exams/grades
exports.createGrade = async (req, res) => {
  try {
    const gradeData = req.body;
    if (!gradeData.studentId || !gradeData.studentName) {
      return res.status(400).json({ success: false, message: 'Student ID and student name are required' });
    }

    if (!isMongoConnected()) {
      const created = memoryStore.createGrade(gradeData);
      return res.status(201).json({
        success: true,
        message: 'Marks recorded successfully',
        data: created
      });
    }

    const created = await Grade.create(gradeData);
    res.status(201).json({
      success: true,
      message: 'Marks recorded in MongoDB',
      data: created
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get printable student report card
// @route   GET /api/exams/report-card/:studentId
exports.getReportCard = async (req, res) => {
  try {
    const { studentId } = req.params;
    let reportCard = null;

    if (isMongoConnected()) {
      const student = await Student.findOne(mongoose.Types.ObjectId.isValid(studentId)
        ? { $or: [{ studentId }, { _id: studentId }] }
        : { studentId }
      );
      if (student) {
        const grade = await Grade.findOne({ studentId: student.studentId });
        const settings = await Setting.findOne();
        if (grade) {
          reportCard = {
            school: settings || memoryStore.settings,
            student,
            grade
          };
        }
      }
    }

    if (!reportCard) {
      reportCard = memoryStore.getReportCard(studentId);
    }

    if (!reportCard) {
      return res.status(404).json({ success: false, message: 'Student or report card not found' });
    }

    res.status(200).json({
      success: true,
      data: reportCard
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};
