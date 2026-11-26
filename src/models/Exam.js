const mongoose = require('mongoose');

const examSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    term: {
      type: String,
      default: 'First Term'
    },
    academicYear: {
      type: String,
      default: '2024/2025'
    },
    targetClasses: [{
      type: String
    }],
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: ['Scheduled', 'Ongoing', 'Completed'],
      default: 'Scheduled'
    },
    subjects: [{
      name: String,
      date: Date,
      duration: String,
      maxScore: { type: Number, default: 100 }
    }],
    description: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Exam', examSchema);

