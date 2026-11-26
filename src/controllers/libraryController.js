const { isMongoConnected } = require('../config/db');
const memoryStore = require('../utils/memoryStore');
const LibraryBook = require('../models/LibraryBook');
const BookLending = require('../models/BookLending');

// @desc    Get all library books
// @route   GET /api/library/books
exports.getBooks = async (req, res) => {
  try {
    const useMongo = isMongoConnected();
    const books = useMongo
      ? await LibraryBook.find().sort({ title: 1 })
      : memoryStore.getLibraryBooks();

    res.status(200).json({
      success: true,
      count: books.length,
      source: useMongo ? 'mongodb' : 'in-memory-store',
      data: books
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Add new book to library catalogue
// @route   POST /api/library/books
exports.createBook = async (req, res) => {
  try {
    const bookData = req.body;
    if (!bookData.title || !bookData.author) {
      return res.status(400).json({ success: false, message: 'Book title and author are required' });
    }

    if (!isMongoConnected()) {
      const created = memoryStore.createLibraryBook(bookData);
      return res.status(201).json({
        success: true,
        message: 'Book added to catalogue successfully',
        data: created
      });
    }

    if (!bookData.isbn) {
      bookData.isbn = `9789785432${Math.floor(100 + Math.random() * 900)}`;
    }
    if (!bookData.availableCopies) {
      bookData.availableCopies = bookData.totalCopies || 5;
    }

    const created = await LibraryBook.create(bookData);
    res.status(201).json({
      success: true,
      message: 'Book added to MongoDB catalogue',
      data: created
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get all book lending records
// @route   GET /api/library/lendings
exports.getLendings = async (req, res) => {
  try {
    const useMongo = isMongoConnected();
    const lendings = useMongo
      ? await BookLending.find().sort({ createdAt: -1 })
      : memoryStore.getBookLendings();

    res.status(200).json({
      success: true,
      count: lendings.length,
      source: useMongo ? 'mongodb' : 'in-memory-store',
      data: lendings
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// @desc    Issue book to a student
// @route   POST /api/library/issue
exports.issueBook = async (req, res) => {
  try {
    const { bookTitle, isbn, studentId, studentName, className, dueDate } = req.body;

    if (!studentId || !studentName || (!bookTitle && !isbn)) {
      return res.status(400).json({ success: false, message: 'Student information and book details are required' });
    }

    if (!isMongoConnected()) {
      const lending = memoryStore.issueBook({ bookTitle, isbn, studentId, studentName, className, dueDate });
      return res.status(201).json({
        success: true,
        message: `Book "${lending.bookTitle}" successfully issued to ${studentName}`,
        data: lending
      });
    }

    // MongoDB decrement copy and create lending
    const book = await LibraryBook.findOne({ $or: [{ title: bookTitle }, { isbn }] });
    if (book && book.availableCopies > 0) {
      book.availableCopies -= 1;
      await book.save();
    }

    const lending = await BookLending.create({
      bookTitle: bookTitle || book?.title,
      isbn: isbn || book?.isbn || 'N/A',
      studentId,
      studentName,
      className: className || '1st Class',
      dueDate: dueDate || new Date(Date.now() + 14 * 86400000),
      status: 'Issued'
    });

    res.status(201).json({
      success: true,
      message: `Book "${lending.bookTitle}" issued to ${studentName}`,
      data: lending
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Return an issued book
// @route   POST /api/library/return/:id
exports.returnBook = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isMongoConnected()) {
      const updated = memoryStore.returnBook(id);
      if (!updated) {
        return res.status(404).json({ success: false, message: 'Lending record not found or already returned' });
      }
      return res.status(200).json({
        success: true,
        message: 'Book marked as returned successfully',
        data: updated
      });
    }

    const lending = await BookLending.findById(id);
    if (!lending) {
      return res.status(404).json({ success: false, message: 'Lending record not found' });
    }

    lending.status = 'Returned';
    lending.returnDate = new Date();
    await lending.save();

    // Increment available book copies
    const book = await LibraryBook.findOne({ $or: [{ title: lending.bookTitle }, { isbn: lending.isbn }] });
    if (book && book.availableCopies < book.totalCopies) {
      book.availableCopies += 1;
      await book.save();
    }

    res.status(200).json({
      success: true,
      message: 'Book marked as returned successfully',
      data: lending
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};
