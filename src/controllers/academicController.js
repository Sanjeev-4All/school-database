const { isMongoConnected } = require('../config/db');
const memoryStore = require('../utils/memoryStore');
const Subject = require('../models/Subject');
const { timetableSample } = require('../seeds/seedData');

// @desc    Get all academic subjects
// @route   GET /api/academics/subjects
exports.getSubjects = async (req, res) => {
  try {
    const useMongo = isMongoConnected();
    const subjects = useMongo
      ? await Subject.find().sort({ code: 1 })
      : memoryStore.getSubjects();

    res.status(200).json({
      success: true,
      count: subjects.length,
      source: useMongo ? 'mongodb' : 'in-memory-store',
      data: subjects
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// @desc    Add / Create a new subject
// @route   POST /api/academics/subjects
exports.createSubject = async (req, res) => {
  try {
    const subjectData = req.body;
    if (!subjectData.name) {
      return res.status(400).json({ success: false, message: 'Subject name is required' });
    }

    if (!isMongoConnected()) {
      const created = memoryStore.createSubject(subjectData);
      return res.status(201).json({
        success: true,
        message: 'Subject registered successfully',
        data: created
      });
    }

    if (!subjectData.code) {
      const count = await Subject.countDocuments();
      subjectData.code = `SUB-${count + 101}`;
    }

    const created = await Subject.create(subjectData);
    res.status(201).json({
      success: true,
      message: 'Subject created in MongoDB',
      data: created
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get timetable for a class
// @route   GET /api/academics/timetable
exports.getTimetable = async (req, res) => {
  try {
    const { className = '1st Class' } = req.query;
    const timetable = memoryStore.getTimetable(className);
    res.status(200).json({
      success: true,
      data: timetable
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};
