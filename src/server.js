/**
 * ไฟล์ main server
 * บทบาท: สร้าง Express app, ตั้งค่า middleware, เชื่อมต่อ routes
 * Author: Student Course Management Team
 */

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Middleware - การตั้งค่าค่ากลางของ application
app.use(cors()); // ✅ อนุญาต cross-origin requests
app.use(express.json()); // ✅ แปลง JSON body เป็น object
app.use(express.urlencoded({ extended: true })); // ✅ แปลง URL-encoded body

// 🔗 Routes - เส้นทาง API
const studentRoutes = require('./routes/studentRoutes');
const courseRoutes = require('./routes/courseRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes');

// 📍 API Routes - เมาท์ routes ไปยัง path
app.use('/api/students', studentRoutes); // ✅ http://localhost:3000/api/students
app.use('/api/courses', courseRoutes); // ✅ http://localhost:3000/api/courses
app.use('/api/enrollments', enrollmentRoutes); // ✅ http://localhost:3000/api/enrollments

// 🏥 Health check endpoint - ตรวจสอบว่า server ยังคงทำงานอยู่
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date()
  });
});

// 📍 Root endpoint - ข้อมูลหลักของ API
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Student Course Management System API',
    version: '1.0.0',
    endpoints: {
      students: '/api/students',
      courses: '/api/courses',
      enrollments: '/api/enrollments',
      health: '/health'
    }
  });
});

// ⚠️ 404 Not Found - จัดการ URL ที่ไม่มี route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

// 🔴 Error handling middleware - จัดการข้อผิดพลาด
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: err.message
  });
});

// 🚀 Start server - เริ่มต้น server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Visit http://localhost:${PORT} for more information`);
});

module.exports = app;
