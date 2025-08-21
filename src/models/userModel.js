const db = require('../config/db')

const User = {
    findAllUser: async()=>{
        const [rows] = await db.query('SELECT * FROM users')
        return rows
    },
    findByName: async(nama)=>{
        const [rows] = await db.query("SELECT * FROM users WHERE nama = ?",[nama])
        return rows[0]
    },
    findByEmail: async(email)=>{
        const [rows] = await db.query("SELECT * FROM users WHERE email = ?",[email])
        return rows[0]
    },
    findById: async(id)=>{
        const [rows] = await db.query("SELECT * FROM users WHERE id = ?",[id])
        return rows[0]
    },
    updateUser: async(id,data)=>{
        const { nama, email, password } = data;
        const [rows] = await db.query("UPDATE users SET nama = ?, email = ?, password = ? WHERE id = ?",[nama, email, password, id])
        return rows
    },
    deleteUser: async(id)=>{
        const rows = await db.query("DELETE FROM users WHERE id = ?",[id])
        return rows
    },
    create: async ({ nama, email, password }) => {
        const [rows] = await db.query( "INSERT INTO users (nama, email, password) VALUES (?, ?, ?)",[nama, email, password]);
        return { id: rows.insertId, nama, email };
      },

}

module.exports = User;