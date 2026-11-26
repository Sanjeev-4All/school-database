const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/school_db';
  
  try {
    console.log(`🔌 Attempting to connect to MongoDB at: ${mongoURI.replace(/:([^:@]{4})[^:@]*@/, ':****@')}...`);
    
    // Connect with a 4 second server selection timeout
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 4000
    });

    isConnected = true;
    console.log(`✅ MongoDB Connected Successfully: ${mongoose.connection.host}/${mongoose.connection.name}`);

    // Auto-seed if database is empty
    await checkAndSeedDatabase();

    return true;
  } catch (error) {
    isConnected = false;
    console.warn(`⚠️  MongoDB Connection Notice:`);
    console.warn(`   Could not establish direct connection to MongoDB (${error.message}).`);
    console.log(`ℹ️  Running in Resilient InMemory Mode with full seed data.`);
    console.log(`   To use real MongoDB: Make sure MongoDB is running locally, or set MONGODB_URI in .env to your MongoDB Atlas cluster.`);
    return false;
  }
};

const isMongoConnected = () => isConnected;

// Helper to auto-seed initial data when MongoDB is empty
async function checkAndSeedDatabase() {
  try {
    const Student = require('../models/Student');
    const Staff = require('../models/Staff');
    const ClassRoom = require('../models/ClassRoom');
    const Fee = require('../models/Fee');
    const Event = require('../models/Event');
    const Exam = require('../models/Exam');
    const LibraryBook = require('../models/LibraryBook');
    const Subject = require('../models/Subject');
    const Transport = require('../models/Transport');
    const Grade = require('../models/Grade');
    const BookLending = require('../models/BookLending');
    const Setting = require('../models/Setting');
    const User = require('../models/User');
    const {
      studentsData,
      staffData,
      classesData,
      feeInvoicesData,
      eventsData,
      examsData,
      libraryBooksData,
      subjectsData,
      transportData,
      bookLendingsData,
      gradesData,
      settingsData
    } = require('../seeds/seedData');

    // Ensure default Super Admin user exists
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log('👤 Creating default Super Admin user (admin@greenfield.edu / admin123)...');
      await User.create({
        name: 'Admin User',
        email: 'admin@greenfield.edu',
        password: 'admin123',
        role: 'Super Admin',
        department: 'Administration'
      });
      console.log('✅ Default Super Admin created.');
    }

    const studentCount = await Student.countDocuments();
    if (studentCount === 0) {
      console.log('🌱 Populating initial school database records into MongoDB...');
      await Student.insertMany(studentsData);
      await Staff.insertMany(staffData);
      await ClassRoom.insertMany(classesData);
      await Fee.insertMany(feeInvoicesData);
      await Event.insertMany(eventsData);
      console.log('✅ Initial seed data populated into MongoDB successfully.');
    }

    if (await Exam.countDocuments() === 0) {
      await Exam.insertMany(examsData);
    }

    if (await LibraryBook.countDocuments() === 0) {
      await LibraryBook.insertMany(libraryBooksData);
    }

    if (await Subject.countDocuments() === 0) {
      await Subject.insertMany(subjectsData);
    }

    if (await Transport.countDocuments() === 0) {
      await Transport.insertMany(transportData);
    }

    if (await Grade.countDocuments() === 0) {
      await Grade.insertMany(gradesData);
    }

    if (await BookLending.countDocuments() === 0) {
      await BookLending.insertMany(bookLendingsData);
    }

    if (await Setting.countDocuments() === 0) {
      await Setting.create(settingsData);
    }
  } catch (err) {
    console.error('Error during auto-seeding:', err.message);
  }
}

module.exports = { connectDB, isMongoConnected };
