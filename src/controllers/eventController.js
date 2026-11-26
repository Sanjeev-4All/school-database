const { isMongoConnected } = require('../config/db');
const memoryStore = require('../utils/memoryStore');
const Event = require('../models/Event');

// @desc    Get upcoming events and announcements
// @route   GET /api/events
exports.getEvents = async (req, res) => {
  try {
    if (!isMongoConnected()) {
      return res.status(200).json({
        success: true,
        count: memoryStore.getEvents().length,
        data: memoryStore.getEvents()
      });
    }

    const events = await Event.find().sort({ date: 1 });
    res.status(200).json({
      success: true,
      count: events.length,
      data: events
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// @desc    Create new event / announcement
// @route   POST /api/events
exports.createEvent = async (req, res) => {
  try {
    const eventData = req.body;
    if (!eventData.title) {
      return res.status(400).json({ success: false, message: 'Title is required' });
    }

    if (!isMongoConnected()) {
      const created = memoryStore.createEvent(eventData);
      return res.status(201).json({
        success: true,
        message: 'Event/Announcement created successfully',
        data: created
      });
    }

    const created = await Event.create(eventData);
    res.status(201).json({
      success: true,
      message: 'Event/Announcement created in MongoDB',
      data: created
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

