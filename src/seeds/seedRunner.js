require('dotenv').config();
const mongoose = require('mongoose');
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
} = require('./seedData');

const runSeeder = async () => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/school_db';

  try {
    console.log(`Connecting to MongoDB at: ${mongoURI}...`);
    await mongoose.connect(mongoURI, { serverSelectionTimeoutMS: 5000 });
    console.log('Connected to MongoDB. Resetting collections...');

    await Student.deleteMany({});
    await Staff.deleteMany({});
    await ClassRoom.deleteMany({});
    await Fee.deleteMany({});
    await Event.deleteMany({});
    await Exam.deleteMany({});
    await LibraryBook.deleteMany({});
    await Subject.deleteMany({});
    await Transport.deleteMany({});
    await Grade.deleteMany({});
    await BookLending.deleteMany({});
    await Setting.deleteMany({});
    await User.deleteMany({});

    console.log('Inserting seed records...');
    await Student.insertMany(studentsData);
    await Staff.insertMany(staffData);
    await ClassRoom.insertMany(classesData);
    await Fee.insertMany(feeInvoicesData);
    await Event.insertMany(eventsData);
    await Exam.insertMany(examsData);
    await LibraryBook.insertMany(libraryBooksData);
    await Subject.insertMany(subjectsData);
    await Transport.insertMany(transportData);
    await Grade.insertMany(gradesData);
    await BookLending.insertMany(bookLendingsData);
    await Setting.create(settingsData);

    console.log('Creating default Super Admin user...');
    await User.create({
      name: 'Admin User',
      email: 'admin@greenfield.edu',
      password: 'admin123',
      role: 'Super Admin',
      department: 'Administration'
    });

    console.log('🎉 Seed completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
    process.exit(1);
  }
};

runSeeder();
