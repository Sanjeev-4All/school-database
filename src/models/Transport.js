const mongoose = require('mongoose');

const transportSchema = new mongoose.Schema(
  {
    routeNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true // e.g. "ROUTE-01"
    },
    routeName: {
      type: String,
      required: true,
      trim: true // e.g. "Central Station to Campus via Palm Avenue"
    },
    vehicleNumber: {
      type: String,
      required: true,
      trim: true // e.g. "BUS-01 (KJA-423-LK)"
    },
    driverName: {
      type: String,
      required: true,
      trim: true
    },
    driverPhone: {
      type: String,
      required: true,
      trim: true
    },
    capacity: {
      type: Number,
      required: true,
      default: 40
    },
    enrolledStudentsCount: {
      type: Number,
      default: 0
    },
    pickupStops: [{
      stopName: String,
      pickupTime: String,
      dropoffTime: String
    }],
    monthlyFee: {
      type: Number,
      default: 25000
    },
    status: {
      type: String,
      enum: ['Active', 'Maintenance', 'Standby'],
      default: 'Active'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Transport', transportSchema);
