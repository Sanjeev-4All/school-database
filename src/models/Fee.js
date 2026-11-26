const mongoose = require('mongoose');

const feeSchema = new mongoose.Schema(
  {
    invoiceNumber: {
      type: String,
      required: true,
      unique: true,
      index: true
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
      required: true
    },
    feeType: {
      type: String,
      enum: ['Tuition Fee', 'Lab & Tech Fee', 'Transport Fee', 'Books & Uniform', 'Examination Fee'],
      default: 'Tuition Fee'
    },
    term: {
      type: String,
      default: 'First Term'
    },
    academicYear: {
      type: String,
      default: '2024/2025'
    },
    totalAmount: {
      type: Number,
      required: true
    },
    paidAmount: {
      type: Number,
      default: 0
    },
    balance: {
      type: Number,
      default: 0
    },
    dueDate: {
      type: Date
    },
    status: {
      type: String,
      enum: ['Paid', 'Partial', 'Pending', 'Overdue'],
      default: 'Pending',
      index: true
    },
    paymentMethod: {
      type: String,
      enum: ['Bank Transfer', 'Credit Card', 'Cash', 'Mobile Money', 'Online Gateway', 'Pending'],
      default: 'Pending'
    },
    paidDate: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

feeSchema.pre('save', function () {
  this.balance = Math.max(0, this.totalAmount - this.paidAmount);
  if (this.balance === 0) {
    this.status = 'Paid';
  } else if (this.paidAmount > 0) {
    this.status = 'Partial';
  }
});

module.exports = mongoose.model('Fee', feeSchema);
