/**
 * ไฟล์ Enrollment Routes
 * บทบาท: กำหนด endpoints สำหรับจัดการข้อมูลการลงทะเบียน
 * Author: Student Course Management Team
 */

const express = require('express');
const router = express.Router();
const {
  getAllEnrollments,
  getEnrollmentById,
  createEnrollment,
  getStudentCourses,
  getCoursesStudents,
  deleteEnrollment
} = require('../controllers/enrollmentController');

// 📖 GET endpoints - ดึงข้อมูล
router.get('/', getAllEnrollments); // ✅ GET /api/enrollments - ดึงการลงทะเบียนทั้งหมด
router.get('/:id', getEnrollmentById); // ✅ GET /api/enrollments/:id - ดึงการลงทะเบียนตาม ID
router.get('/student/:student_id', getStudentCourses); // ✅ GET /api/enrollments/student/:student_id - ดึงวิชาของนักเรียน
router.get('/course/:course_id', getCoursesStudents); // ✅ GET /api/enrollments/course/:course_id - ดึงนักเรียนของวิชา

// ➕ POST endpoint - สร้างข้อมูล
router.post('/', createEnrollment); // ✅ POST /api/enrollments - สร้างการลงทะเบียนใหม่

// 🗑️ DELETE endpoint - ลบข้อมูล
router.delete('/:id', deleteEnrollment); // ✅ DELETE /api/enrollments/:id - ลบการลงทะเบียน

module.exports = router;
