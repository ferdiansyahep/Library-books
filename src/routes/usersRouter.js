const express = require('express')
const router = express.Router()
const user = require('../controllers/usersController')
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

router.get('/',verifyToken, user.getAllUser)
router.get('/nama:nama',verifyToken, user.getByName)
router.get('/:id',verifyToken, user.getByid)
router.get('/email/:email',verifyToken, user.getByEmail)
router.put('/:id',verifyToken,isAdmin, user.updateUser)
router.delete('/',verifyToken,isAdmin, user.deleteUser)

module.exports = router