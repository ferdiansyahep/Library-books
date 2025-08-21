const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const User = require('../models/userModel')


// REGISTER
exports.register = async (req, res, next) => {
    try {
        const { nama, email, password } = req.body;
        if (!nama || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Simpan ke DB
        await db.query("INSERT INTO users (nama, email, password) VALUES (?, ?, ?)", 
            [nama, email, hashedPassword]);

        res.status(201).json({ message: "User successfully registered" });
    } catch (error) {
        next(error);
    }
};

// LOGIN
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Cari user
        const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        if (rows.length === 0) {
            return res.status(401).json({ message: "Email not found" });
        }

        const user = rows[0];

        // Cek password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Password salah" });
        }

        // Buat JWT
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: "1h" }
          );

        res.json({ message: "Login successful", token });
    } catch (error) {
        next(error);
    }
};
exports.me = async (req, res, next) => {
    try {
      // req.user.id didapat dari JWT payload lewat verifyToken
      const user = await User.findById(req.user.id); 
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.json({ user });
    } catch (err) {
      next(err);
    }
  };