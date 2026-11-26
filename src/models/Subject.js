const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    department: {
      type: String,
      default: 'General'
    },
    targetClasses: [{
      type: String // e.g. ['1st Class', '2nd Class', '3rd Class', ...]
    }],
    teacherName: {
      type: String,
      default: 'Unassigned'
    },
    weeklyPeriods: {
      type: Number,
      default: 5
    },
    syllabusProgress: {
      type: Number,
      min: 0,
      max: 100,
      default: 75
    },
    description: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Subject', subjectSchema);
