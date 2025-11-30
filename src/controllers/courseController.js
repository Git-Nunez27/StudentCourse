/**
 * ไฟล์ Course Controller
 * บทบาท: จัดการ logic ของวิชา (ดึง, สร้าง, แก้ไข, ลบ)
 * Author: Student Course Management Team
 */

const supabase = require('../config/supabase');

/**
 * 📖 ดึงวิชาทั้งหมด
 * GET /api/courses
 */
const getAllCourses = async (req, res) => {
  try {
    // ✅ ค้นหาข้อมูลวิชาทั้งหมดจากตาราง courses
    const { data, error } = await supabase
      .from('courses')
      .select('*');
    
    if (error) throw error;
    
    res.status(200).json({
      success: true,
      data: data,
      message: '✅ ดึงข้อมูลวิชาสำเร็จ'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * 🔍 ดึงวิชาตาม ID
 * GET /api/courses/:id
 */
const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // ✅ ค้นหาวิชาตามรหัส
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    if (!data) {
      return res.status(404).json({
        success: false,
        message: '⚠️ ไม่พบวิชา'
      });
    }
    
    res.status(200).json({
      success: true,
      data: data,
      message: '✅ ดึงข้อมูลวิชาสำเร็จ'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * ➕ สร้างวิชาใหม่
 * POST /api/courses
 * Body: { name, description, credit }
 */
const createCourse = async (req, res) => {
  try {
    const { name, description, credit } = req.body;
    
    // ✅ ตรวจสอบช่องที่ต้องการ
    if (!name || !description || credit === undefined) {
      return res.status(400).json({
        success: false,
        message: '⚠️ ขาดข้อมูลที่จำเป็น: name, description, credit'
      });
    }
    
    // ✅ เพิ่มวิชาใหม่ลงฐานข้อมูล
    const { data, error } = await supabase
      .from('courses')
      .insert([
        {
          name,
          description,
          credit,
          created_at: new Date()
        }
      ])
      .select();
    
    if (error) throw error;
    
    res.status(201).json({
      success: true,
      data: data[0],
      message: '✅ สร้างวิชาสำเร็จ'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * ✏️ แก้ไขข้อมูลวิชา
 * PUT /api/courses/:id
 * Body: { name?, description?, credit? }
 */
const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, credit } = req.body;
    
    // ✅ สร้าง object สำหรับแก้ไขเฉพาะช่องที่ส่งมา
    const updateData = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (credit !== undefined) updateData.credit = credit;
    
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: '⚠️ ไม่มีข้อมูลที่ต้องแก้ไข'
      });
    }
    
    // ✅ แก้ไขข้อมูลวิชา
    const { data, error } = await supabase
      .from('courses')
      .update(updateData)
      .eq('id', id)
      .select();
    
    if (error) throw error;
    
    if (!data || data.length === 0) {
      return res.status(404).json({
        success: false,
        message: '⚠️ ไม่พบวิชา'
      });
    }
    
    res.status(200).json({
      success: true,
      data: data[0],
      message: '✅ แก้ไขวิชาสำเร็จ'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * 🗑️ ลบวิชา
 * DELETE /api/courses/:id
 */
const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    
    // ✅ ลบวิชา (cascade delete ลบ enrollments ด้วย)
    const { error } = await supabase
      .from('courses')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    res.status(200).json({
      success: true,
      message: '✅ ลบวิชาสำเร็จ'
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
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse
};
