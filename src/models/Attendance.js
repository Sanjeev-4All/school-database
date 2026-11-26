const mongoose = require('mongoose');

const ATTENDANCE_STATUSES = Object.freeze(['Present', 'Late', 'Absent', 'Excused']);
const WEEK_DAYS = Object.freeze(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

const attendanceRecordSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: [true, 'Student ID is required'],
    trim: true
  },
  studentName: {
    type: String,
    required: [true, 'Student name is required'],
    trim: true
  },
  rollNumber: {
    type: Number,
    min: [1, 'Roll number must be a positive number']
  },
  status: {
    type: String,
    enum: {
      values: ATTENDANCE_STATUSES,
      message: 'Invalid attendance status'
    },
    default: 'Present'
  },
  remarks: {
    type: String,
    trim: true,
    maxlength: [500, 'Remarks cannot exceed 500 characters'],
    default: ''
  }
});

const attendanceSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: [true, 'Attendance date is required'],
      trim: true,
      match: [DATE_PATTERN, 'Date must use YYYY-MM-DD format'],
      index: true
    },
    className: {
      type: String,
      required: [true, 'Class name is required'],
      trim: true,
      index: true
    },
    dayOfWeek: {
      type: String,
      enum: {
        values: WEEK_DAYS,
        message: 'Invalid day of week'
      },
      default: 'Mon'
    },
    records: {
      type: [attendanceRecordSchema],
      default: []
    },
    summary: {
      total: { type: Number, default: 0, min: 0 },
      present: { type: Number, default: 0, min: 0 },
      late: { type: Number, default: 0, min: 0 },
      absent: { type: Number, default: 0, min: 0 },
      excused: { type: Number, default: 0, min: 0 },
      rate: { type: Number, default: 0, min: 0, max: 100 }
    }
  },
  {
    timestamps: true
  }
);

attendanceSchema.index({ date: 1, className: 1 }, { unique: true });

attendanceSchema.pre('validate', function calculateSummary(next) {
  const records = Array.isArray(this.records) ? this.records : [];
  const present = records.filter(record => record.status === 'Present').length;
  const late = records.filter(record => record.status === 'Late').length;
  const absent = records.filter(record => record.status === 'Absent').length;
  const excused = records.filter(record => record.status === 'Excused').length;
  const total = records.length;
  const attendanceCount = present + late;

  this.summary = {
    total,
    present,
    late,
    absent,
    excused,
    rate: total > 0 ? Math.round((attendanceCount / total) * 100) : 0
  };
  next();
});

const Attendance = mongoose.models.Attendance || mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;

