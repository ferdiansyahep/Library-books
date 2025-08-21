const jwt = require('jsonwebtoken');

// cek apakah sudah login
exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: "Token tidak ada" });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Token tidak valid" });
        req.user = user; // simpan payload user ke request
        next();
    });
};

// cek apakah admin
exports.isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: "Hanya admin yang bisa mengakses" });
    }
    next();
};
