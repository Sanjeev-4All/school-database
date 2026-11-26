const { isMongoConnected } = require('../config/db');
const memoryStore = require('../utils/memoryStore');
const ClassRoom = require('../models/ClassRoom');

// @desc    Get all classes
// @route   GET /api/classes
exports.getClasses = async (req, res) => {
  try {
    if (!isMongoConnected()) {
      return res.status(200).json({
        success: true,
        count: memoryStore.getClasses().length,
        source: 'in-memory-store',
        data: memoryStore.getClasses()
      });
    }

    const classes = await ClassRoom.find().sort({ sequenceOrder: 1, name: 1 });
    res.status(200).json({
      success: true,
      count: classes.length,
      source: 'mongodb',
      data: classes
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// @desc    Create new class
// @route   POST /api/classes
exports.createClass = async (req, res) => {
  try {
    const classData = req.body;
    if (!classData.name) {
      return res.status(400).json({ success: false, message: 'Class name is required' });
    }

    if (!isMongoConnected()) {
      const newClass = memoryStore.createClass(classData);
      return res.status(201).json({
        success: true,
        message: 'Class created successfully',
        data: newClass
      });
    }

    const created = await ClassRoom.create(classData);
    res.status(201).json({
      success: true,
      message: 'Class created in MongoDB',
      data: created
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

