const { isMongoConnected } = require('../config/db');
const memoryStore = require('../utils/memoryStore');
const Fee = require('../models/Fee');
const { dashboardOverview } = require('../seeds/seedData');

// @desc    Get fee transactions & invoices
// @route   GET /api/fees
exports.getFees = async (req, res) => {
  try {
    const { status } = req.query;

    if (!isMongoConnected()) {
      const fees = memoryStore.getFees({ status });
      return res.status(200).json({
        success: true,
        count: fees.length,
        source: 'in-memory-store',
        data: fees
      });
    }

    const query = {};
    if (status && status !== 'all') {
      query.status = status;
    }

    const fees = await Fee.find(query).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: fees.length,
      source: 'mongodb',
      data: fees
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// @desc    Generate / Create fee invoice
// @route   POST /api/fees
exports.createFee = async (req, res) => {
  try {
    const feeData = req.body;
    if (!feeData.studentName || !feeData.totalAmount) {
      return res.status(400).json({ success: false, message: 'Student name and total amount are required' });
    }

    if (!isMongoConnected()) {
      const created = memoryStore.createFee(feeData);
      return res.status(201).json({
        success: true,
        message: 'Fee invoice generated successfully',
        data: created
      });
    }

    if (!feeData.invoiceNumber) {
      const count = await Fee.countDocuments();
      feeData.invoiceNumber = `INV-2024-${String(count + 1).padStart(3, '0')}`;
    }

    feeData.balance = Math.max(0, Number(feeData.totalAmount) - (Number(feeData.paidAmount) || 0));
    feeData.status = feeData.balance === 0 ? 'Paid' : feeData.paidAmount > 0 ? 'Partial' : 'Pending';

    const created = await Fee.create(feeData);
    res.status(201).json({
      success: true,
      message: 'Fee invoice created in MongoDB',
      data: created
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Record fee payment
// @route   POST /api/fees/pay
exports.recordPayment = async (req, res) => {
  try {
    const { invoiceNumber, amount, method } = req.body;

    if (!invoiceNumber || !amount) {
      return res.status(400).json({ success: false, message: 'Invoice number and amount are required' });
    }

    if (!isMongoConnected()) {
      const updated = memoryStore.recordPayment(invoiceNumber, amount, method);
      if (!updated) {
        return res.status(404).json({ success: false, message: 'Invoice not found' });
      }
      return res.status(200).json({
        success: true,
        message: 'Payment recorded successfully',
        data: updated
      });
    }

    const fee = await Fee.findOne({ invoiceNumber });
    if (!fee) {
      return res.status(404).json({ success: false, message: 'Invoice not found' });
    }

    fee.paidAmount += Number(amount);
    fee.balance = Math.max(0, fee.totalAmount - fee.paidAmount);
    fee.status = fee.balance === 0 ? 'Paid' : 'Partial';
    fee.paymentMethod = method || 'Bank Transfer';
    fee.paidDate = new Date();
    await fee.save();

    res.status(200).json({
      success: true,
      message: 'Payment recorded successfully in MongoDB',
      data: fee
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

