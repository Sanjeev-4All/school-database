const mongoose = require('mongoose');

const subjectMarkSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  marksObtained: { type: Number, required: true, min: 0, max: 100 },
  maxMarks: { type: Number, default: 100 },
  grade: { type: String, default: 'A' },
  remarks: String
});

const gradeSchema = new mongoose.Schema(
  {
    examTitle: {
      type: String,
      required: true,
      default: 'First Term Assessment 2024/2025'
    },
    term: {
      type: String,
      default: 'First Term'
    },
    academicYear: {
      type: String,
      default: '2024/2025'
    },
    studentId: {
      type: String,
      required: true,
      index: true
    },
    studentName: {
      type: String,
      required: true
    },
    className: {
      type: String,
      required: true,
      index: true
    },
    rollNumber: Number,
    subjects: [subjectMarkSchema],
    totalMarksObtained: {
      type: Number,
      default: 0
    },
    totalMaxMarks: {
      type: Number,
      default: 500
    },
    percentage: {
      type: Number,
      default: 0
    },
    overallGrade: {
      type: String,
      enum: ['A+', 'A', 'B', 'C', 'D', 'F'],
      default: 'A'
    },
    classRank: Number,
    teacherRemarks: {
      type: String,
      default: 'Consistent academic performance and active classroom participation.'
    },
    attendancePercentage: {
      type: Number,
      default: 95
    }
  },
  {
    timestamps: true
  }
);

gradeSchema.pre('save', function () {
  if (this.subjects && this.subjects.length > 0) {
    this.totalMarksObtained = this.subjects.reduce((sum, s) => sum + (s.marksObtained || 0), 0);
    this.totalMaxMarks = this.subjects.reduce((sum, s) => sum + (s.maxMarks || 100), 0);
    this.percentage = this.totalMaxMarks > 0
      ? Math.round((this.totalMarksObtained / this.totalMaxMarks) * 100)
      : 0;

    if (this.percentage >= 90) this.overallGrade = 'A+';
    else if (this.percentage >= 80) this.overallGrade = 'A';
    else if (this.percentage >= 70) this.overallGrade = 'B';
    else if (this.percentage >= 60) this.overallGrade = 'C';
    else if (this.percentage >= 50) this.overallGrade = 'D';
    else this.overallGrade = 'F';
  }
});

module.exports = mongoose.model('Grade', gradeSchema);
