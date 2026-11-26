const { isMongoConnected } = require('../config/db');
const memoryStore = require('../utils/memoryStore');
const Setting = require('../models/Setting');
const Student = require('../models/Student');
const Staff = require('../models/Staff');
const ClassRoom = require('../models/ClassRoom');
const Fee = require('../models/Fee');
const Event = require('../models/Event');
const Exam = require('../models/Exam');
const LibraryBook = require('../models/LibraryBook');
const Subject = require('../models/Subject');
const Transport = require('../models/Transport');
const User = require('../models/User');

// @desc    Get school profile & system stats
// @route   GET /api/settings
exports.getSettings = async (req, res) => {
  try {
    const useMongo = isMongoConnected();

    if (!useMongo) {
      return res.status(200).json({
        success: true,
        source: 'in-memory-store',
        data: memoryStore.getSystemStats()
      });
    }

    let settings = await Setting.findOne();
    if (!settings) {
      settings = await Setting.create({});
    }

    const counts = {
      students: await Student.countDocuments(),
      staff: await Staff.countDocuments(),
      classes: await ClassRoom.countDocuments(),
      fees: await Fee.countDocuments(),
      events: await Event.countDocuments(),
      exams: await Exam.countDocuments(),
      libraryBooks: await LibraryBook.countDocuments(),
      subjects: await Subject.countDocuments(),
      transport: await Transport.countDocuments(),
      users: await User.countDocuments()
    };

    res.status(200).json({
      success: true,
      source: 'mongodb',
      data: {
        settings,
        counts,
        mongoConnected: true
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// @desc    Update school profile settings
// @route   PUT /api/settings
exports.updateSettings = async (req, res) => {
  try {
    const updateData = req.body;
    const useMongo = isMongoConnected();

    if (!useMongo) {
      const updated = memoryStore.updateSettings(updateData);
      return res.status(200).json({
        success: true,
        message: 'Settings updated successfully',
        data: updated
      });
    }

    let settings = await Setting.findOne();
    if (!settings) {
      settings = await Setting.create(updateData);
    } else {
      Object.assign(settings, updateData);
      await settings.save();
    }

    res.status(200).json({
      success: true,
      message: 'School profile updated in MongoDB',
      data: settings
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Export full database backup as JSON
// @route   GET /api/settings/backup
exports.exportBackup = async (req, res) => {
  try {
    const backupData = {
      backupTimestamp: new Date().toISOString(),
      appName: 'school_db Management System',
      students: await Student.find().catch(() => memoryStore.students),
      staff: await Staff.find().catch(() => memoryStore.staff),
      classes: await ClassRoom.find().catch(() => memoryStore.classes),
      fees: await Fee.find().catch(() => memoryStore.fees),
      events: await Event.find().catch(() => memoryStore.events),
      exams: await Exam.find().catch(() => memoryStore.exams),
      libraryBooks: await LibraryBook.find().catch(() => memoryStore.libraryBooks),
      subjects: await Subject.find().catch(() => memoryStore.subjects),
      transport: await Transport.find().catch(() => memoryStore.transport)
    };

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename=school_db_backup_${Date.now()}.json`);
    res.status(200).send(JSON.stringify(backupData, null, 2));
  } catch (error) {
    res.status(500).json({ success: false, message: 'Backup generation failed', error: error.message });
  }
};
