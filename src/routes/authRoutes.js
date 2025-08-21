const express = require("express");
const router = express.Router();
const auth = require("../controllers/authController");
const { register,login} = require("../controllers/authController");
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

router.post("/register", register);
router.post("/login", login);
router.get("/me",verifyToken, auth.me); // protected route

module.exports = router;
