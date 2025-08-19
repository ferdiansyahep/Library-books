const response = require('../../utils/response')
const db = require('../config/db')

exports.getAllBook = async(req,res,next)=>{
    try {
        const [rows] = await db.query('SELECT * FROM books');
        return response(200,rows,"Get All Books",res)
    } catch (error) {
        next(error)
    }
}

exports.getBookbyJudul= async(req,res,next) =>{
    try {
        const { judul } = req.params;
        const [ rows ] = await db.query('SELECT * FROM books WHERE judul = ?', [judul]);
        if(rows.length === 0){
            return response(404,null,"Book Not Found",res)
        }
        return response(200,rows[0],"Get Book by judul",res)
    } catch (error) {
        next(error)
    }
}

exports.updateBook = async(req,res,next)=>{
    try {
        const{judul, penulis, kategori, stok} = req.body;
        if(!judul || !penulis || !kategori || !stok){
            return response(404,null,"Error Vailid Input", res)
        }
        const sql = `INSERT INTO books (judul, penulis, kategori, stok) VALUES (?,?,?,?) `
        const rows = await db.query(sql,[judul,penulis,kategori,stok]);
        return response(201,{ id: rows.insertId, judul, penulis, kategori, stok },"Data Added Successfully",res);
    } catch (error) {
        next(error)
    }
}

exports.deleteBook = async(req,res,next) =>{
    try {
        const {id} = req.body
        if(!id){
            return response(404,null,"Error Not Found",res)
        }
        const [rows] = await db.query("DELETE FROM books WHERE id = ?",[id])
        if(rows.affectedRows === 0){
            return response(404,null,"Data Not Found",res)
        }
        return response(200,{ deleted: rows.affectedRows },"Data Delete Successfuly",res)
    } catch (error) {
        next(error)
    }
}