/**
 * ไฟล์ Course Routes
 * บทบาท: กำหนด endpoints สำหรับจัดการข้อมูลวิชา
 * Author: Student Course Management Team
 */

const express = require('express');
const router = express.Router();
const {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse
} = require('../controllers/courseController');

// 📖 GET endpoints - ดึงข้อมูล
router.get('/', getAllCourses); // ✅ GET /api/courses - ดึงวิชาทั้งหมด
router.get('/:id', getCourseById); // ✅ GET /api/courses/:id - ดึงวิชาตาม ID

// ➕ POST endpoint - สร้างข้อมูล
router.post('/', createCourse); // ✅ POST /api/courses - สร้างวิชาใหม่

// ✏️ PUT endpoint - แก้ไขข้อมูล
router.put('/:id', updateCourse); // ✅ PUT /api/courses/:id - แก้ไขวิชา

// 🗑️ DELETE endpoint - ลบข้อมูล
router.delete('/:id', deleteCourse); // ✅ DELETE /api/courses/:id - ลบวิชา

module.exports = router;
