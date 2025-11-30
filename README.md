# 🎓 Student Course Management System

![Status](https://img.shields.io/badge/status-active-brightgreen)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Node](https://img.shields.io/badge/node-16+-green)
![License](https://img.shields.io/badge/license-MIT-purple)

---

## 📌 ภาษาไทย (Thai Version)

### 🎯 ภาพรวมโปรเจกต์

ระบบจัดการนักเรียนและวิชาเรียน (Student Course Management System) เป็นแอปพลิเคชัน REST API ที่สร้างจาก Express.js เพื่อจัดการ:

- 👥 **Student Management** - สร้าง อ่าน แก้ไข ลบ ค้นหานักเรียน
- 📚 **Course Management** - สร้าง อ่าน แก้ไข ลบวิชา
- ✏️ **Enrollment** - ลงทะเบียน ยกเลิก ดึงวิชาของนักเรียน

**ฐานข้อมูล:** Supabase (PostgreSQL Cloud)  
**API Design:** RESTful with 17 endpoints  
**Language:** Node.js + Express.js

### ⚡ เริ่มต้นอย่างรวดเร็ว (5 นาที)

#### 1️⃣ ติดตั้ง Dependencies
```bash
cd StudentCourse
npm install
```

#### 2️⃣ สร้างไฟล์ .env
```env
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_API_KEY=your_anon_public_key
PORT=3000
NODE_ENV=development
```

#### 3️⃣ รันเซิร์ฟเวอร์
```bash
npm start
```

✅ Server ทำงานที่ `http://localhost:3000`

### 📚 API Endpoints (17 total)

**Student (6):** GET all/by-id/search, POST, PUT, DELETE  
**Course (5):** GET all/by-id, POST, PUT, DELETE  
**Enrollment (6):** GET all/by-id/student/:id/course/:id, POST, DELETE

### 🧪 ทดสอบด้วย Postman
- Import: `postman_collection.json`
- Environment: `postman_environment.json`
- Test cases: ดู `POSTMAN_TEST_CASES_TH.md`

### 📚 เอกสาร (11 ไฟล์)
| ไฟล์ | อธิบาย |
|------|--------|
| `QUICK_START_GUIDE_TH.md` | ขั้นตอนเบื้องต้น |
| `GIT_WORKFLOW_TH.md` | Git & Branching Strategy |
| `POSTMAN_TEST_CASES_TH.md` | 10 กรณีทดสอบ |
| `ERROR_HANDLING_GUIDE_TH.md` | วิธีแก้ปัญหา |
| `API_RESPONSE_REFERENCE_TH.md` | API Reference |
| `DATABASE_KEYS_NORMALIZATION_TH.md` | ออกแบบฐานข้อมูล |
| `ROUTER_RESTFUL_TH.md` | สถาปัตยกรรม API |

---

## 📌 English Version

### 🎯 Project Overview

**Student Course Management System** is a comprehensive REST API application built with Node.js + Express and Supabase database for managing students, courses, and enrollments.

### Features
- ✅ Student Management (CRUD operations)
- ✅ Course Management (CRUD operations)
- ✅ Enrollment Management with relationships
- ✅ Search functionality for students
- ✅ RESTful API design with 17 endpoints
- ✅ Comprehensive error handling
- ✅ Supabase PostgreSQL integration
- ✅ Thai & English documentation

### Tech Stack
| Component | Details |
|-----------|---------|
| **Backend** | Node.js v16+ |
| **Framework** | Express.js v5.1.0 |
| **Database** | Supabase (PostgreSQL) |
| **Database Client** | @supabase/supabase-js v2.63.1 |
| **Middleware** | CORS, dotenv |
| **Total Dependencies** | 105 packages |

### Project Structure
```
StudentCourse/
├── src/
│   ├── server.js                    # Main entry point
│   ├── config/
│   │   └── supabase.js             # Database configuration
│   ├── controllers/
│   │   ├── studentController.js    # Student CRUD logic
│   │   ├── courseController.js     # Course CRUD logic
│   │   └── enrollmentController.js # Enrollment logic
│   └── routes/
│       ├── studentRoutes.js        # Student endpoints
│       ├── courseRoutes.js         # Course endpoints
│       └── enrollmentRoutes.js     # Enrollment endpoints
├── docs/
│   └── DEPLOYMENT.md               # Deployment guide
├── .env.example                    # Environment template
├── .gitignore                      # Git ignore file
├── GIT_WORKFLOW_TH.md              # Git workflow guide
├── postman_collection.json         # Postman collection
├── postman_environment.json        # Postman environment
├── package.json                    # Dependencies
└── README.md                       # This file
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js v16 or higher
- npm or yarn
- Supabase account (free at https://supabase.com)
- Git (for version control)

### Step 1: Clone Repository
```bash
git clone https://github.com/your-username/StudentCourse.git
cd StudentCourse
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Create .env File
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_API_KEY=your_anon_public_key
PORT=3000
NODE_ENV=development
```

### Step 4: Start the Server
```bash
npm start
```

✅ Server running at `http://localhost:3000`

---

## 📚 API Endpoints

### Student (6 endpoints)
```
GET    /api/students              # Get all students
GET    /api/students/:id          # Get student by ID
GET    /api/students/search?q=    # Search students
POST   /api/students              # Create student
PUT    /api/students/:id          # Update student
DELETE /api/students/:id          # Delete student
```

### Course (5 endpoints)
```
GET    /api/courses               # Get all courses
GET    /api/courses/:id           # Get course by ID
POST   /api/courses               # Create course
PUT    /api/courses/:id           # Update course
DELETE /api/courses/:id           # Delete course
```

### Enrollment (6 endpoints)
```
GET    /api/enrollments                     # Get all enrollments
GET    /api/enrollments/:id                 # Get enrollment by ID
GET    /api/enrollments/student/:id         # Get student's courses
GET    /api/enrollments/course/:id          # Get course's students
POST   /api/enrollments                     # Register for course
DELETE /api/enrollments/:id                 # Unregister from course
```

---

## 🧪 Testing

### Postman (Recommended)
1. Import `postman_collection.json`
2. Import `postman_environment.json`
3. Select "StudentCourse Dev" environment
4. Run collection

See `POSTMAN_TEST_CASES_TH.md` for 10 test scenarios.

### curl Example
```bash
# Create student
curl -X POST http://localhost:3000/api/students \
  -H "Content-Type: application/json" \
  -d '{"fullname":"John","email":"john@example.com","major":"IT"}'

# Get all students
curl http://localhost:3000/api/students
```

---

## 🌳 Git & GitHub

### Initial Setup
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/your-username/StudentCourse.git
git push -u origin main
```

### Branching Strategy
```
main (Production)
  ↑
develop (Development)
  ↑
  ├── feature/your-feature
  └── hotfix/critical-bug
```

### Feature Development
```bash
git checkout -b feature/your-feature
# Make changes...
git commit -m "feat: description"
git push -u origin feature/your-feature
# Create Pull Request on GitHub
```

See `GIT_WORKFLOW_TH.md` for complete Git guide.

---

## 🚀 Deployment

### Deploy to Render
1. Push code to GitHub
2. Sign up at https://render.com
3. Create Web Service
4. Select GitHub repository
5. Set environment variables
6. Deploy

See `docs/DEPLOYMENT.md` for detailed instructions.

---

## 📚 Documentation

| File | Purpose |
|------|---------|
| `QUICK_START_GUIDE_TH.md` | Quick start in 5-15 minutes |
| `GIT_WORKFLOW_TH.md` | Git workflow & branching |
| `POSTMAN_TEST_CASES_TH.md` | 10 test scenarios |
| `ERROR_HANDLING_GUIDE_TH.md` | Common errors & solutions |
| `API_RESPONSE_REFERENCE_TH.md` | Complete API reference |
| `DATABASE_KEYS_NORMALIZATION_TH.md` | Database design |
| `ROUTER_RESTFUL_TH.md` | API architecture |

---

## 🔍 Troubleshooting

| Problem | Solution |
|---------|----------|
| Server won't start | Check port 3000, run `npm start` again |
| Database error | Verify .env credentials |
| Postman 404 | Ensure server running, check URL |

See `ERROR_HANDLING_GUIDE_TH.md` for more.

---

## ✅ Status

| Component | Status |
|-----------|--------|
| REST API | ✅ Complete |
| Database | ✅ Complete |
| CRUD Operations | ✅ Complete |
| Documentation | ✅ Complete |
| Postman | ✅ Complete |
| Git Guide | ✅ Complete |
| GitHub Repo | ⏳ User Setup |
| Deployment | ⏳ User Setup |

---

**Version:** 1.0.0 | **Updated:** 2025-11-30 | **License:** MIT
