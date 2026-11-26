const express = require('express');
const router = express.Router();
const {
  getBooks,
  createBook,
  getLendings,
  issueBook,
  returnBook
} = require('../controllers/libraryController');

router.route('/books')
  .get(getBooks)
  .post(createBook);

router.route('/lendings')
  .get(getLendings);

router.post('/issue', issueBook);
router.post('/return/:id', returnBook);

module.exports = router;
