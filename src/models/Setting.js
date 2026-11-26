const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema(
  {
    schoolName: {
      type: String,
      default: 'Greenfield High School'
    },
    motto: {
      type: String,
      default: 'Excellence in Knowledge & Character'
    },
    academicSession: {
      type: String,
      default: '2024/2025 Academic Session'
    },
    currentTerm: {
      type: String,
      default: 'First Term'
    },
    principalName: {
      type: String,
      default: 'Dr. (Mrs.) Victoria Adebayo, Ph.D.'
    },
    email: {
      type: String,
      default: 'info@greenfield.edu'
    },
    phone: {
      type: String,
      default: '+234 802 345 6789'
    },
    address: {
      type: String,
      default: '12 Greenfield Boulevard, Victoria Island, Lagos'
    },
    website: {
      type: String,
      default: 'https://greenfield.edu'
    },
    currency: {
      type: String,
      default: '₦'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Setting', settingSchema);
