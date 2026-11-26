const mongoose = require('mongoose');

const classRoomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Class name is required'],
      unique: true,
      trim: true
    },
    sequenceOrder: {
      type: Number,
      default: 1
    },
    gradeLevel: {
      type: String,
      enum: ['Primary', 'Middle School', 'Secondary', 'Junior Secondary', 'Senior Secondary', 'Elementary', 'High School'],
      default: 'Primary'
    },
    section: {
      type: String,
      default: 'A'
    },
    roomNumber: {
      type: String,
      default: 'Room 101'
    },
    capacity: {
      type: Number,
      default: 40
    },
    enrolledCount: {
      type: Number,
      default: 0
    },
    classTeacher: {
      type: String,
      default: 'Unassigned'
    },
    classTeacherId: {
      type: String
    },
    academicYear: {
      type: String,
      default: '2024/2025'
    },
    subjects: [{
      type: String
    }],
    attendanceRate: {
      type: Number,
      default: 95.0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('ClassRoom', classRoomSchema);

