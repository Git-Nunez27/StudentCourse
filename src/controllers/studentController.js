/**
 * ไฟล์ Student Controller
 * บทบาท: จัดการ logic ของนักเรียน (ดึง, สร้าง, แก้ไข, ลบ)
 * Author: Student Course Management Team
 */

const supabase = require('../config/supabase');

/**
 * 📖 ดึงนักเรียนทั้งหมด
 * GET /api/students
 */
const getAllStudents = async (req, res) => {
  try {
    // ✅ ค้นหาข้อมูลนักเรียนทั้งหมดจากตาราง students
    const { data, error } = await supabase
      .from('students')
      .select('*');
    
    if (error) throw error;
    
    res.status(200).json({
      success: true,
      data: data,
      message: '✅ ดึงข้อมูลนักเรียนสำเร็จ'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * 🔍 ดึงนักเรียนตาม ID
 * GET /api/students/:id
 */
const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // ✅ ค้นหานักเรียนตามรหัส
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    if (!data) {
      return res.status(404).json({
        success: false,
        message: '⚠️ ไม่พบนักเรียน'
      });
    }
    
    res.status(200).json({
      success: true,
      data: data,
      message: '✅ ดึงข้อมูลนักเรียนสำเร็จ'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * ➕ สร้างนักเรียนใหม่
 * POST /api/students
 * Body: { fullname, email, major }
 */
const createStudent = async (req, res) => {
  try {
    const { fullname, email, major } = req.body;
    
    // ✅ ตรวจสอบช่องที่ต้องการ
    if (!fullname || !email || !major) {
      return res.status(400).json({
        success: false,
        message: '⚠️ ขาดข้อมูลที่จำเป็น: fullname, email, major'
      });
    }
    
    // ✅ เพิ่มนักเรียนใหม่ลงฐานข้อมูล
    const { data, error } = await supabase
      .from('students')
      .insert([
        {
          fullname,
          email,
          major,
          created_at: new Date()
        }
      ])
      .select();
    
    if (error) throw error;
    
    res.status(201).json({
      success: true,
      data: data[0],
      message: '✅ สร้างนักเรียนสำเร็จ'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * ✏️ แก้ไขข้อมูลนักเรียน
 * PUT /api/students/:id
 * Body: { fullname?, email?, major? }
 */
const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullname, email, major } = req.body;
    
    // ✅ สร้าง object สำหรับแก้ไขเฉพาะช่องที่ส่งมา
    const updateData = {};
    if (fullname) updateData.fullname = fullname;
    if (email) updateData.email = email;
    if (major) updateData.major = major;
    
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: '⚠️ ไม่มีข้อมูลที่ต้องแก้ไข'
      });
    }
    
    // ✅ แก้ไขข้อมูลนักเรียน
    const { data, error } = await supabase
      .from('students')
      .update(updateData)
      .eq('id', id)
      .select();
    
    if (error) throw error;
    
    if (!data || data.length === 0) {
      return res.status(404).json({
        success: false,
        message: '⚠️ ไม่พบนักเรียน'
      });
    }
    
    res.status(200).json({
      success: true,
      data: data[0],
      message: '✅ แก้ไขนักเรียนสำเร็จ'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * 🗑️ ลบนักเรียน
 * DELETE /api/students/:id
 */
const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    
    // ✅ ลบนักเรียน (cascade delete ลบ enrollments ด้วย)
    const { error } = await supabase
      .from('students')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    
    res.status(200).json({
      success: true,
      message: '✅ ลบนักเรียนสำเร็จ'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * 🔎 ค้นหานักเรียนตามชื่อหรืออีเมล
 * GET /api/students/search?query=
 */
const searchStudents = async (req, res) => {
  try {
    const { query } = req.query;
    
    // ✅ ตรวจสอบว่ามีคำค้นหา
    if (!query) {
      return res.status(400).json({
        success: false,
        message: '⚠️ ต้องระบุคำค้นหา'
      });
    }
    
    // ✅ ค้นหาด้วย ilike (case-insensitive like)
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .or(`fullname.ilike.%${query}%,email.ilike.%${query}%`);
    
    if (error) throw error;
    
    res.status(200).json({
      success: true,
      data: data,
      message: '✅ ค้นหาสำเร็จ'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// 📤 ส่งออก functions ทั้งหมด
module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  searchStudents
};
