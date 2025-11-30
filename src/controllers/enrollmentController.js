/**
 * ไฟล์ Enrollment Controller
 * บทบาท: จัดการ logic ของการลงทะเบียน (ดึง, สร้าง, ลบ, ค้นหาความสัมพันธ์)
 * Author: Student Course Management Team
 */

const supabase = require('../config/supabase');

/**
 * 📖 ดึงการลงทะเบียนทั้งหมด (พร้อม student และ course info)
 * GET /api/enrollments
 */
const getAllEnrollments = async (req, res) => {
  try {
    // ✅ ดึงข้อมูลการลงทะเบียนพร้อมข้อมูล student และ course ที่เกี่ยวข้อง
    const { data, error } = await supabase
      .from('enrollments')
      .select(`
        id,
        enrollment_date,
        student_id,
        course_id,
        students(id, fullname, email),
        courses(id, name, credit)
      `);
    
    if (error) throw error;
    
    res.status(200).json({
      success: true,
      data: data,
      message: '✅ ดึงข้อมูลการลงทะเบียนสำเร็จ'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * 🔍 ดึงการลงทะเบียนตาม ID
 * GET /api/enrollments/:id
 */
const getEnrollmentById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // ✅ ดึงการลงทะเบียนตามรหัสพร้อมข้อมูลที่เกี่ยวข้อง
    const { data, error } = await supabase
      .from('enrollments')
      .select(`
        id,
        enrollment_date,
        student_id,
        course_id,
        students(id, fullname, email),
        courses(id, name, credit)
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    if (!data) {
      return res.status(404).json({
        success: false,
        message: '⚠️ ไม่พบการลงทะเบียน'
      });
    }
    
    res.status(200).json({
      success: true,
      data: data,
      message: '✅ ดึงข้อมูลการลงทะเบียนสำเร็จ'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * ➕ สร้างการลงทะเบียนใหม่
 * POST /api/enrollments
 * Body: { student_id, course_id }
 */
const createEnrollment = async (req, res) => {
  try {
    const { student_id, course_id } = req.body;
    
    // ✅ ตรวจสอบช่องที่ต้องการ
    if (!student_id || !course_id) {
      return res.status(400).json({
        success: false,
        message: '⚠️ ขาดข้อมูลที่จำเป็น: student_id, course_id'
      });
    }
    
    // ✅ ตรวจสอบว่านักเรียนมีอยู่
    const { data: student } = await supabase
      .from('students')
      .select('id')
      .eq('id', student_id)
      .single();
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: '⚠️ ไม่พบนักเรียน'
      });
    }
    
    // ✅ ตรวจสอบว่าวิชามีอยู่
    const { data: course } = await supabase
      .from('courses')
      .select('id')
      .eq('id', course_id)
      .single();
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: '⚠️ ไม่พบวิชา'
      });
    }
    
    // ✅ ตรวจสอบว่าลงทะเบียนแล้วหรือไม่
    const { data: existingEnrollment } = await supabase
      .from('enrollments')
      .select('id')
      .eq('student_id', student_id)
      .eq('course_id', course_id)
      .single();
    
    if (existingEnrollment) {
      return res.status(400).json({
        success: false,
        message: '⚠️ นักเรียนลงทะเบียนวิชานี้แล้ว'
      });
    }
    
    // ✅ สร้างการลงทะเบียนใหม่
    const { data, error } = await supabase
      .from('enrollments')
      .insert([
        {
          student_id,
          course_id,
          enrollment_date: new Date()
        }
      ])
      .select(`
        id,
        enrollment_date,
        student_id,
        course_id,
        students(id, fullname, email),
        courses(id, name, credit)
      `);
    
    if (error) throw error;
    
    res.status(201).json({
      success: true,
      data: data[0],
      message: '✅ สร้างการลงทะเบียนสำเร็จ'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * 📚 ดึงรายวิชาที่นักเรียนลงทะเบียน
 * GET /api/enrollments/student/:student_id
 */
const getStudentCourses = async (req, res) => {
  try {
    const { student_id } = req.params;
    
    // ✅ ตรวจสอบว่านักเรียนมีอยู่
    const { data: student } = await supabase
      .from('students')
      .select('id')
      .eq('id', student_id)
      .single();
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: '⚠️ ไม่พบนักเรียน'
      });
    }
    
    // ✅ ดึงวิชาทั้งหมดที่นักเรียนลงทะเบียน
    const { data, error } = await supabase
      .from('enrollments')
      .select(`
        id,
        enrollment_date,
        courses(id, name, description, credit)
      `)
      .eq('student_id', student_id);
    
    if (error) throw error;
    
    // ✅ แปลงข้อมูลให้เป็นรูปแบบที่ง่ายต่อการใช้งาน
    const courses = data.map(enrollment => ({
      ...enrollment.courses,
      enrollment_date: enrollment.enrollment_date
    }));
    
    res.status(200).json({
      success: true,
      data: courses,
      message: '✅ ดึงวิชาของนักเรียนสำเร็จ'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * 👥 ดึงรายชื่อนักเรียนที่ลงทะเบียนวิชา
 * GET /api/enrollments/course/:course_id
 */
const getCoursesStudents = async (req, res) => {
  try {
    const { course_id } = req.params;
    
    // ✅ ตรวจสอบว่าวิชามีอยู่
    const { data: course } = await supabase
      .from('courses')
      .select('id')
      .eq('id', course_id)
      .single();
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: '⚠️ ไม่พบวิชา'
      });
    }
    
    // ✅ ดึงนักเรียนทั้งหมดที่ลงทะเบียนวิชานี้
    const { data, error } = await supabase
      .from('enrollments')
      .select(`
        id,
        enrollment_date,
        students(id, fullname, email, major)
      `)
      .eq('course_id', course_id);
    
    if (error) throw error;
    
    // ✅ แปลงข้อมูลให้เป็นรูปแบบที่ง่ายต่อการใช้งาน
    const students = data.map(enrollment => ({
      ...enrollment.students,
      enrollment_date: enrollment.enrollment_date
    }));
    
    res.status(200).json({
      success: true,
      data: students,
      message: '✅ ดึงนักเรียนของวิชาสำเร็จ'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * 🗑️ ลบการลงทะเบียน
 * DELETE /api/enrollments/:id
 */
const deleteEnrollment = async (req, res) => {
  try {
    const { id } = req.params;
    
    // ✅ ลบการลงทะเบียน
    const { error } = await supabase
      .from('enrollments')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    res.status(200).json({
      success: true,
      message: '✅ ลบการลงทะเบียนสำเร็จ'
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
  getAllEnrollments,
  getEnrollmentById,
  createEnrollment,
  getStudentCourses,
  getCoursesStudents,
  deleteEnrollment
};
