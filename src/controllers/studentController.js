const mongoose = require('mongoose');
const { isMongoConnected } = require('../config/db');
const memoryStore = require('../utils/memoryStore');
const Student = require('../models/Student');

const STUDENT_NOT_FOUND_MESSAGE = 'Student not found';

function buildStudentQuery({ search, className, status }) {
  const query = {};

  if (search) {
    query.$or = [
      { firstName: { $regex: search, $options: 'i' } },
      { lastName: { $regex: search, $options: 'i' } },
      { studentId: { $regex: search, $options: 'i' } }
    ];
  }

  if (className && className !== 'all') {
    query.class = className;
  }

  if (status && status !== 'all') {
    query.status = status;
  }

  return query;
}

function studentIdFilter(id) {
  if (mongoose.Types.ObjectId.isValid(id)) {
    return { $or: [{ studentId: id }, { _id: id }] };
  }
  return { studentId: id };
}

function sendStudentNotFound(res) {
  return res.status(404).json({
    success: false,
    message: STUDENT_NOT_FOUND_MESSAGE
  });
}

// @desc    Get all students with filters
// @route   GET /api/students
exports.getStudents = async (req, res) => {
  try {
    const { search, className, status } = req.query;

    if (!isMongoConnected()) {
      const students = memoryStore.getStudents({ search, className, status });
      return res.status(200).json({
        success: true,
        count: students.length,
        source: 'in-memory-store',
        data: students
      });
    }

    const query = buildStudentQuery({ search, className, status });
    const students = await Student.find(query).sort({ studentId: -1 });

    res.status(200).json({
      success: true,
      count: students.length,
      source: 'mongodb',
      data: students
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// @desc    Get single student by ID
// @route   GET /api/students/:id
exports.getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isMongoConnected()) {
      const student = memoryStore.getStudentById(id);
      if (!student) {
        return sendStudentNotFound(res);
      }
      return res.status(200).json({ success: true, data: student });
    }

    const student = await Student.findOne(studentIdFilter(id));
    if (!student) {
      return sendStudentNotFound(res);
    }

    res.status(200).json({ success: true, data: student });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// @desc    Create new student
// @route   POST /api/students
exports.createStudent = async (req, res) => {
  try {
    const studentData = req.body;

    if (!studentData.firstName || !studentData.lastName || !studentData.class) {
      return res.status(400).json({
        success: false,
        message: 'First name, last name, and class are required'
      });
    }

    if (!isMongoConnected()) {
      const newStudent = memoryStore.createStudent(studentData);
      return res.status(201).json({
        success: true,
        message: 'Student registered successfully',
        data: newStudent
      });
    }

    // Generate student ID if not provided
    if (!studentData.studentId) {
      const count = await Student.countDocuments();
      studentData.studentId = `STU-2024-${String(count + 1).padStart(3, '0')}`;
    }

    const student = await Student.create(studentData);
    res.status(201).json({
      success: true,
      message: 'Student registered successfully in MongoDB',
      data: student
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update student
// @route   PUT /api/students/:id
exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isMongoConnected()) {
      const updated = memoryStore.updateStudent(id, req.body);
      if (!updated) {
        return sendStudentNotFound(res);
      }
      return res.status(200).json({
        success: true,
        message: 'Student updated successfully',
        data: updated
      });
    }

    const student = await Student.findOneAndUpdate(
      studentIdFilter(id),
      req.body,
      { new: true, runValidators: true }
    );

    if (!student) {
      return sendStudentNotFound(res);
    }

    res.status(200).json({
      success: true,
      message: 'Student updated successfully',
      data: student
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete student
// @route   DELETE /api/students/:id
exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isMongoConnected()) {
      const deleted = memoryStore.deleteStudent(id);
      if (!deleted) {
        return sendStudentNotFound(res);
      }
      return res.status(200).json({ success: true, message: 'Student record removed' });
    }

    const student = await Student.findOneAndDelete(studentIdFilter(id));
    if (!student) {
      return sendStudentNotFound(res);
    }

    res.status(200).json({ success: true, message: 'Student record removed from MongoDB' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};
