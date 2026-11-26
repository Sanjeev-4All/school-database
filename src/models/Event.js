const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    type: {
      type: String,
      enum: ['Exam', 'Meeting', 'Holiday', 'Academic', 'Announcement', 'Celebration'],
      default: 'Academic'
    },
    date: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date
    },
    time: {
      type: String,
      default: '09:00 AM'
    },
    targetAudience: {
      type: String,
      enum: ['All', 'Students', 'Teachers', 'Parents'],
      default: 'All'
    },
    description: {
      type: String,
      default: ''
    },
    priority: {
      type: String,
      enum: ['High', 'Medium', 'Low'],
      default: 'Medium'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Event', eventSchema);

