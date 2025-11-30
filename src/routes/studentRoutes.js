/**
 * ไฟล์ Student Routes
 * บทบาท: กำหนด endpoints สำหรับจัดการข้อมูลนักเรียน
 * Author: Student Course Management Team
 */

const express = require('express');
const router = express.Router();
const {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  searchStudents
} = require('../controllers/studentController');

// 📖 GET endpoints - ดึงข้อมูล
router.get('/', getAllStudents); // ✅ GET /api/students - ดึงนักเรียนทั้งหมด
router.get('/search', searchStudents); // ✅ GET /api/students/search?query= - ค้นหานักเรียน
router.get('/:id', getStudentById); // ✅ GET /api/students/:id - ดึงนักเรียนตาม ID

// ➕ POST endpoint - สร้างข้อมูล
router.post('/', createStudent); // ✅ POST /api/students - สร้างนักเรียนใหม่

// ✏️ PUT endpoint - แก้ไขข้อมูล
router.put('/:id', updateStudent); // ✅ PUT /api/students/:id - แก้ไขนักเรียน

// 🗑️ DELETE endpoint - ลบข้อมูล
router.delete('/:id', deleteStudent); // ✅ DELETE /api/students/:id - ลบนักเรียน

module.exports = router;
