const User = require('../models/userModel')
const response = require('../../utils/response')

exports.getAllUser = async(req,res,next)=>{
    try {   
        const users = await User.findAllUser()
        return response(200,users,"Get All Users",res)
    } catch (error) {
        next(error)
    }
}

exports.getByName = async (req,res,next)=>{
    try {
        const {nama} = req.params
        const rows = await User.findByName(nama);
        if(!rows)return response(404,null,"User Tidak di Temukan",res)
      
        return response(200,rows,"get user by name",res)
    } catch (error) {
        next(error)
    }
}
exports.getByid = async (req,res,next)=>{
    try {
        const {id} = req.params
        const rows = await User.findById(id);
        if(!rows)return response(404,null,"User Tidak di Temukan",res)
      
        return response(200,rows,"get user by name",res)
    } catch (error) {
        next(error)
    }
}
exports.getByEmail = async (req,res,next)=>{
    try {
        const {email} = req.params
        const rows = await User.findByEmail(email);
        if(!rows)return response(404,null,"User Tidak di Temukan",res)
      
        return response(200,rows,"get user by email",res)
    } catch (error) {
        next(error)
    }
}

exports.updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body;

        if (!id || !data || Object.keys(data).length === 0) {
            return response(400, null, "Data wajib diisi lengkap", res);
        }
        const { nama, email, password } = data;
        if (!nama || !email || !password) {
            return response(400, null, "Semua field (nama, email, password) wajib diisi", res);
        }

        const rows = await User.updateUser(id, data); // pakai await

        if (rows.affectedRows === 0) {
            return response(404, null, "User dengan ID tersebut tidak ditemukan", res);
        }

        return response(200, rows, "Data berhasil diupdate", res);
    } catch (error) {
        next(error);
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
      const { id } = req.body;
      if (!id) {
        return response(404, null, "Error Not Found", res);
      }
  
      const result = await User.deleteUser(id); // jangan destructuring dulu
      // kalau pakai mysql2: result = [rows]
      const rows = result[0]; // ambil rows dari array pertama
  
      if (rows.affectedRows === 0) {
        return response(404, null, "Id Not Found", res);
      }
  
      return response(200, { delete: rows.affectedRows }, "Delete User Successfully", res);
    } catch (error) {
      next(error);
    }
  };
  