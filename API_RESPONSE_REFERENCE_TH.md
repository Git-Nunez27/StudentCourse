# 📋 API Response Reference Guide

## 📌 บทนำ

ไฟล์นี้อธิบายรูปแบบ Response ของ API แต่ละ endpoint

---

## ✅ Success Responses (2xx)

### 📖 Response Structure

```json
{
  "success": true,
  "message": "สำเร็จ - คำอธิบาย",
  "data": {},
  "timestamp": "2025-01-15T10:30:45.123Z",
  "count": 1
}
```

---

## 👥 Student Endpoints

### 1️⃣ GET /api/students - ดึงนักเรียนทั้งหมด

**Response 200 OK:**
```json
{
  "success": true,
  "message": "ดึงข้อมูลนักเรียนทั้งหมด",
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "fullname": "สมชาย ใจดี",
      "email": "somchai@example.com",
      "major": "IT",
      "created_at": "2025-01-15T10:00:00Z"
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "fullname": "พิมพ์ใจ สวยงาม",
      "email": "pimchai@example.com",
      "major": "Business",
      "created_at": "2025-01-16T10:00:00Z"
    }
  ],
  "timestamp": "2025-01-17T10:30:45.123Z",
  "count": 2
}
```

---

### 2️⃣ GET /api/students/:id - ดึงนักเรียนตาม ID

**Request:**
```
GET /api/students/550e8400-e29b-41d4-a716-446655440000
```

**Response 200 OK:**
```json
{
  "success": true,
  "message": "ดึงข้อมูลนักเรียนเสร็จสมบูรณ์",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "fullname": "สมชาย ใจดี",
    "email": "somchai@example.com",
    "major": "IT",
    "created_at": "2025-01-15T10:00:00Z"
  },
  "timestamp": "2025-01-17T10:30:45.123Z"
}
```

**Response 404 Not Found:**
```json
{
  "success": false,
  "message": "⚠️ ไม่พบนักเรียน",
  "error": "NOT_FOUND",
  "timestamp": "2025-01-17T10:30:45.123Z"
}
```

---

### 3️⃣ GET /api/students/search?query=text - ค้นหานักเรียน

**Request:**
```
GET /api/students/search?query=สมชาย
```

**Response 200 OK:**
```json
{
  "success": true,
  "message": "ค้นหานักเรียนสำเร็จ",
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "fullname": "สมชาย ใจดี",
      "email": "somchai@example.com",
      "major": "IT",
      "created_at": "2025-01-15T10:00:00Z"
    }
  ],
  "timestamp": "2025-01-17T10:30:45.123Z",
  "count": 1
}
```

---

### 4️⃣ POST /api/students - สร้างนักเรียนใหม่

**Request:**
```json
{
  "fullname": "สมชาย ใจดี",
  "email": "somchai@example.com",
  "major": "IT"
}
```

**Response 201 Created:**
```json
{
  "success": true,
  "message": "สร้างนักเรียนสำเร็จ",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "fullname": "สมชาย ใจดี",
    "email": "somchai@example.com",
    "major": "IT",
    "created_at": "2025-01-15T10:00:00Z"
  },
  "timestamp": "2025-01-17T10:30:45.123Z"
}
```

**Response 400 Bad Request:**
```json
{
  "success": false,
  "message": "⚠️ ขาดข้อมูลที่จำเป็น: fullname, email, major",
  "error": "VALIDATION_ERROR",
  "timestamp": "2025-01-17T10:30:45.123Z"
}
```

**Response 409 Conflict:**
```json
{
  "success": false,
  "message": "⚠️ Email นี้มีอยู่ในระบบแล้ว",
  "error": "DUPLICATE_EMAIL",
  "timestamp": "2025-01-17T10:30:45.123Z"
}
```

---

### 5️⃣ PUT /api/students/:id - แก้ไขนักเรียน

**Request:**
```json
{
  "fullname": "สมชาย สุขหา",
  "major": "Engineering"
}
```

**Response 200 OK:**
```json
{
  "success": true,
  "message": "แก้ไขข้อมูลนักเรียนสำเร็จ",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "fullname": "สมชาย สุขหา",
    "email": "somchai@example.com",
    "major": "Engineering",
    "created_at": "2025-01-15T10:00:00Z",
    "updated_at": "2025-01-17T10:30:45.123Z"
  },
  "timestamp": "2025-01-17T10:30:45.123Z"
}
```

---

### 6️⃣ DELETE /api/students/:id - ลบนักเรียน

**Response 200 OK:**
```json
{
  "success": true,
  "message": "ลบนักเรียนสำเร็จ",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "fullname": "สมชาย ใจดี"
  },
  "timestamp": "2025-01-17T10:30:45.123Z"
}
```

---

## 📚 Course Endpoints

### 1️⃣ GET /api/courses - ดึงวิชาทั้งหมด

**Response 200 OK:**
```json
{
  "success": true,
  "message": "ดึงข้อมูลวิชาทั้งหมด",
  "data": [
    {
      "id": "660e8400-e29b-41d4-a716-446655440000",
      "name": "Database Design",
      "description": "การออกแบบฐานข้อมูล",
      "credit": 3,
      "created_at": "2025-01-15T10:00:00Z"
    },
    {
      "id": "660e8400-e29b-41d4-a716-446655440001",
      "name": "Web Development",
      "description": "การพัฒนา Web",
      "credit": 4,
      "created_at": "2025-01-16T10:00:00Z"
    }
  ],
  "timestamp": "2025-01-17T10:30:45.123Z",
  "count": 2
}
```

---

### 2️⃣ GET /api/courses/:id - ดึงวิชาตาม ID

**Response 200 OK:**
```json
{
  "success": true,
  "message": "ดึงข้อมูลวิชาเสร็จสมบูรณ์",
  "data": {
    "id": "660e8400-e29b-41d4-a716-446655440000",
    "name": "Database Design",
    "description": "การออกแบบฐานข้อมูล",
    "credit": 3,
    "created_at": "2025-01-15T10:00:00Z"
  },
  "timestamp": "2025-01-17T10:30:45.123Z"
}
```

---

### 3️⃣ POST /api/courses - สร้างวิชาใหม่

**Request:**
```json
{
  "name": "Database Design",
  "description": "การออกแบบฐานข้อมูล",
  "credit": 3
}
```

**Response 201 Created:**
```json
{
  "success": true,
  "message": "สร้างวิชาสำเร็จ",
  "data": {
    "id": "660e8400-e29b-41d4-a716-446655440000",
    "name": "Database Design",
    "description": "การออกแบบฐานข้อมูล",
    "credit": 3,
    "created_at": "2025-01-15T10:00:00Z"
  },
  "timestamp": "2025-01-17T10:30:45.123Z"
}
```

---

### 4️⃣ PUT /api/courses/:id - แก้ไขวิชา

**Request:**
```json
{
  "name": "Advanced Database Design",
  "credit": 4
}
```

**Response 200 OK:**
```json
{
  "success": true,
  "message": "แก้ไขข้อมูลวิชาสำเร็จ",
  "data": {
    "id": "660e8400-e29b-41d4-a716-446655440000",
    "name": "Advanced Database Design",
    "description": "การออกแบบฐานข้อมูล",
    "credit": 4,
    "created_at": "2025-01-15T10:00:00Z",
    "updated_at": "2025-01-17T10:30:45.123Z"
  },
  "timestamp": "2025-01-17T10:30:45.123Z"
}
```

---

### 5️⃣ DELETE /api/courses/:id - ลบวิชา

**Response 200 OK:**
```json
{
  "success": true,
  "message": "ลบวิชาสำเร็จ",
  "data": {
    "id": "660e8400-e29b-41d4-a716-446655440000",
    "name": "Database Design"
  },
  "timestamp": "2025-01-17T10:30:45.123Z"
}
```

---

## 📝 Enrollment Endpoints

### 1️⃣ GET /api/enrollments - ดึงการลงทะเบียนทั้งหมด

**Response 200 OK:**
```json
{
  "success": true,
  "message": "ดึงข้อมูลการลงทะเบียนทั้งหมด",
  "data": [
    {
      "id": "770e8400-e29b-41d4-a716-446655440000",
      "student_id": "550e8400-e29b-41d4-a716-446655440000",
      "course_id": "660e8400-e29b-41d4-a716-446655440000",
      "enrollment_date": "2025-01-15T10:00:00Z",
      "student": {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "fullname": "สมชาย ใจดี",
        "email": "somchai@example.com"
      },
      "course": {
        "id": "660e8400-e29b-41d4-a716-446655440000",
        "name": "Database Design",
        "credit": 3
      }
    }
  ],
  "timestamp": "2025-01-17T10:30:45.123Z",
  "count": 1
}
```

---

### 2️⃣ GET /api/enrollments/student/:id - ดึงวิชาของนักเรียน

**Request:**
```
GET /api/enrollments/student/550e8400-e29b-41d4-a716-446655440000
```

**Response 200 OK:**
```json
{
  "success": true,
  "message": "ดึงวิชาของนักเรียนสำเร็จ",
  "data": [
    {
      "id": "770e8400-e29b-41d4-a716-446655440000",
      "student_id": "550e8400-e29b-41d4-a716-446655440000",
      "course_id": "660e8400-e29b-41d4-a716-446655440000",
      "enrollment_date": "2025-01-15T10:00:00Z",
      "course": {
        "id": "660e8400-e29b-41d4-a716-446655440000",
        "name": "Database Design",
        "description": "การออกแบบฐานข้อมูล",
        "credit": 3
      }
    }
  ],
  "timestamp": "2025-01-17T10:30:45.123Z",
  "count": 1
}
```

---

### 3️⃣ GET /api/enrollments/course/:id - ดึงนักเรียนของวิชา

**Request:**
```
GET /api/enrollments/course/660e8400-e29b-41d4-a716-446655440000
```

**Response 200 OK:**
```json
{
  "success": true,
  "message": "ดึงนักเรียนของวิชาสำเร็จ",
  "data": [
    {
      "id": "770e8400-e29b-41d4-a716-446655440000",
      "student_id": "550e8400-e29b-41d4-a716-446655440000",
      "course_id": "660e8400-e29b-41d4-a716-446655440000",
      "enrollment_date": "2025-01-15T10:00:00Z",
      "student": {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "fullname": "สมชาย ใจดี",
        "email": "somchai@example.com",
        "major": "IT"
      }
    }
  ],
  "timestamp": "2025-01-17T10:30:45.123Z",
  "count": 1
}
```

---

### 4️⃣ POST /api/enrollments - ลงทะเบียนวิชา

**Request:**
```json
{
  "student_id": "550e8400-e29b-41d4-a716-446655440000",
  "course_id": "660e8400-e29b-41d4-a716-446655440000"
}
```

**Response 201 Created:**
```json
{
  "success": true,
  "message": "ลงทะเบียนวิชาสำเร็จ",
  "data": {
    "id": "770e8400-e29b-41d4-a716-446655440000",
    "student_id": "550e8400-e29b-41d4-a716-446655440000",
    "course_id": "660e8400-e29b-41d4-a716-446655440000",
    "enrollment_date": "2025-01-15T10:00:00Z"
  },
  "timestamp": "2025-01-17T10:30:45.123Z"
}
```

**Response 409 Conflict:**
```json
{
  "success": false,
  "message": "⚠️ นักเรียนลงทะเบียนวิชานี้แล้ว",
  "error": "DUPLICATE_ENROLLMENT",
  "timestamp": "2025-01-17T10:30:45.123Z"
}
```

---

### 5️⃣ GET /api/enrollments/:id - ดึงการลงทะเบียนตาม ID

**Response 200 OK:**
```json
{
  "success": true,
  "message": "ดึงข้อมูลการลงทะเบียนเสร็จสมบูรณ์",
  "data": {
    "id": "770e8400-e29b-41d4-a716-446655440000",
    "student_id": "550e8400-e29b-41d4-a716-446655440000",
    "course_id": "660e8400-e29b-41d4-a716-446655440000",
    "enrollment_date": "2025-01-15T10:00:00Z",
    "student": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "fullname": "สมชาย ใจดี",
      "email": "somchai@example.com"
    },
    "course": {
      "id": "660e8400-e29b-41d4-a716-446655440000",
      "name": "Database Design",
      "credit": 3
    }
  },
  "timestamp": "2025-01-17T10:30:45.123Z"
}
```

---

### 6️⃣ DELETE /api/enrollments/:id - ยกเลิกการลงทะเบียน

**Response 200 OK:**
```json
{
  "success": true,
  "message": "ยกเลิกการลงทะเบียนสำเร็จ",
  "data": {
    "id": "770e8400-e29b-41d4-a716-446655440000",
    "student_id": "550e8400-e29b-41d4-a716-446655440000",
    "course_id": "660e8400-e29b-41d4-a716-446655440000"
  },
  "timestamp": "2025-01-17T10:30:45.123Z"
}
```

---

## ❌ Error Responses (4xx, 5xx)

### General Error Format

```json
{
  "success": false,
  "message": "Error description",
  "error": "ERROR_CODE",
  "timestamp": "2025-01-17T10:30:45.123Z"
}
```

---

### Status Codes Summary

| Code | Description | Example |
|------|-------------|---------|
| 200 | ✅ Success | GET, PUT, DELETE successful |
| 201 | ✅ Created | POST successful |
| 400 | ❌ Bad Request | Missing required fields |
| 404 | ❌ Not Found | Resource doesn't exist |
| 409 | ❌ Conflict | Duplicate data |
| 500 | ❌ Server Error | Database connection error |

---

## 📊 Field Types Reference

| Field | Type | Example | Required |
|-------|------|---------|----------|
| id | UUID | 550e8400-e29b-41d4-a716-446655440000 | Auto |
| fullname | String | สมชาย ใจดี | Yes |
| email | String | somchai@example.com | Yes |
| major | String | IT | Yes |
| name | String | Database Design | Yes |
| description | String | การออกแบบฐานข้อมูล | Yes |
| credit | Number | 3, 4 | Yes |
| enrollment_date | ISO 8601 | 2025-01-15T10:00:00Z | Auto |
| timestamp | ISO 8601 | 2025-01-17T10:30:45.123Z | Auto |
| count | Number | 1, 2, 3 | Optional |

---

**สร้างเมื่อ:** 2025-01-17  
**อัปเดตล่าสุด:** 2025-01-17  
**สถานะ:** ✅ เสร็จสมบูรณ์
