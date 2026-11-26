const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      required: [true, 'Student ID is required'],
      unique: true,
      trim: true,
      index: true
    },
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      required: true
    },
    dateOfBirth: {
      type: Date
    },
    email: {
      type: String,
      trim: true,
      lowercase: true
    },
    phone: {
      type: String,
      trim: true
    },
    class: {
      type: String,
      required: [true, 'Class name is required'],
      index: true
    },
    rollNumber: {
      type: Number,
      required: true
    },
    guardian: {
      name: { type: String, required: true },
      relation: { type: String, default: 'Parent' },
      phone: { type: String, required: true },
      email: { type: String }
    },
    address: {
      street: String,
      city: String,
      state: String
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      default: 'O+'
    },
    status: {
      type: String,
      enum: ['Active', 'Suspended', 'Graduated', 'Transferred'],
      default: 'Active',
      index: true
    },
    attendanceRate: {
      type: Number,
      min: 0,
      max: 100,
      default: 95.0
    },
    performanceCategory: {
      type: String,
      enum: ['Excellent', 'Good', 'Average', 'Below Average', 'Poor'],
      default: 'Good'
    },
    feeStatus: {
      type: String,
      enum: ['Paid', 'Partial', 'Pending', 'Overdue'],
      default: 'Paid'
    },
    admissionDate: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

studentSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

module.exports = mongoose.model('Student', studentSchema);

