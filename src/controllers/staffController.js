const { isMongoConnected } = require('../config/db');
const memoryStore = require('../utils/memoryStore');
const Staff = require('../models/Staff');

// @desc    Get all staff/teachers
// @route   GET /api/staff
exports.getStaff = async (req, res) => {
  try {
    const { role, department, search } = req.query;

    if (!isMongoConnected()) {
      const staffList = memoryStore.getStaff({ role, department, search });
      return res.status(200).json({
        success: true,
        count: staffList.length,
        source: 'in-memory-store',
        data: staffList
      });
    }

    const query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { designation: { $regex: search, $options: 'i' } },
        { department: { $regex: search, $options: 'i' } }
      ];
    }
    if (role && role !== 'all') {
      query.role = role;
    }
    if (department && department !== 'all') {
      query.department = department;
    }

    const staff = await Staff.find(query).sort({ role: 1, name: 1 });
    res.status(200).json({
      success: true,
      count: staff.length,
      source: 'mongodb',
      data: staff
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// @desc    Create new staff member
// @route   POST /api/staff
exports.createStaff = async (req, res) => {
  try {
    const staffData = req.body;
    if (!staffData.name || !staffData.email || !staffData.designation) {
      return res.status(400).json({ success: false, message: 'Name, email, and designation are required' });
    }

    if (!isMongoConnected()) {
      const newStaff = memoryStore.createStaff(staffData);
      return res.status(201).json({
        success: true,
        message: 'Staff member added successfully',
        data: newStaff
      });
    }

    if (!staffData.staffId) {
      const count = await Staff.countDocuments();
      staffData.staffId = `TCH-${String(count + 1).padStart(3, '0')}`;
    }

    const staff = await Staff.create(staffData);
    res.status(201).json({
      success: true,
      message: 'Staff member added to MongoDB',
      data: staff
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

