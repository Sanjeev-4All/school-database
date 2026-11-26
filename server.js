require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const { connectDB, isMongoConnected } = require('./src/config/db');

// Route imports
const authRoutes = require('./src/routes/authRoutes');
const dashboardRoutes = require('./src/routes/dashboardRoutes');
const studentRoutes = require('./src/routes/studentRoutes');
const staffRoutes = require('./src/routes/staffRoutes');
const classRoutes = require('./src/routes/classRoutes');
const attendanceRoutes = require('./src/routes/attendanceRoutes');
const feeRoutes = require('./src/routes/feeRoutes');
const eventRoutes = require('./src/routes/eventRoutes');
const examRoutes = require('./src/routes/examRoutes');
const libraryRoutes = require('./src/routes/libraryRoutes');
const academicRoutes = require('./src/routes/academicRoutes');
const transportRoutes = require('./src/routes/transportRoutes');
const settingRoutes = require('./src/routes/settingRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Serve Static Frontend
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/fees', feeRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/library', libraryRoutes);
app.use('/api/academics', academicRoutes);
app.use('/api/transport', transportRoutes);
app.use('/api/settings', settingRoutes);

// Health Check & Database Status
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    appName: 'school_db - Database Management System',
    mongoConnected: isMongoConnected(),
    environment: process.env.NODE_ENV || 'development',
    schoolName: process.env.SCHOOL_NAME || 'Greenfield High School',
    academicSession: process.env.ACADEMIC_SESSION || '2024/2025 Academic Session',
    currentTerm: process.env.CURRENT_TERM || 'First Term',
    timestamp: new Date().toISOString()
  });
});

// Fallback to index.html for SPA frontend routing
app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.startsWith('/api')) {
    return res.sendFile(path.join(__dirname, 'public', 'index.html'));
  }
  next();
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Application Error:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// Start Server & Connect Database
const startServer = async () => {
  // Connect to DB (or start memory fallback if offline)
  await connectDB();

  app.listen(PORT, () => {
    console.log(`
======================================================
🏫  SCHOOL_DB - DATABASE MANAGEMENT SYSTEM
======================================================
🚀  Server is running at: http://localhost:${PORT}
📊  Dashboard UI:         http://localhost:${PORT}
🔐  Auth API:             http://localhost:${PORT}/api/auth
📡  Health API:           http://localhost:${PORT}/api/health
📚  Students API:         http://localhost:${PORT}/api/students
💼  Staff API:            http://localhost:${PORT}/api/staff
💳  Fees API:             http://localhost:${PORT}/api/fees
📝  Examinations API:     http://localhost:${PORT}/api/exams
📖  Library API:          http://localhost:${PORT}/api/library/books
======================================================
    `);
  });
};

startServer();
