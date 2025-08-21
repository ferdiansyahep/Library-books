const express = require('express')
const router = express.Router();
const books = require('../controllers/bookController')
const { verifyToken, isAdmin } = require("../middlewares/authMiddleware");

router.get('/', books.getAllBook)
router.get('/:judul', books.getBookbyJudul)
router.put('/',verifyToken,isAdmin, books.updateBook)
router.delete('/', books.deleteBook)


module.exports = router