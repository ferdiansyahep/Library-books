const express = require('express')
const router = express.Router();
const books = require('../controllers/bookController')

router.get('/', books.getAllBook)
router.get('/:judul', books.getBookbyJudul)
router.put('/', books.updateBook)
router.delete('/', books.deleteBook)


module.exports = router