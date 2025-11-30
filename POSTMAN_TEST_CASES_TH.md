# 🧪 Postman Test Cases - ทดสอบ API ทั้งหมด

## 📋 บทนำ

ไฟล์นี้อธิบายการทดสอบ API ด้วย Postman พร้อมคำอธิบายสำหรับแต่ละ Test Case, Expected Output และ Error Handling

---

## 📂 Postman Setup

### 🔧 ขั้นตอนที่ 1: Import Collection

```
1. เปิด Postman
2. คลิก "File" → "Import"
3. เลือกไฟล์ postman_collection.json
4. คลิก "Import"
```

### 🔧 ขั้นตอนที่ 2: สร้าง Environment

```
1. คลิก "Environments" (ด้านซ้าย)
2. คลิก "+" (Create New Environment)
3. ชื่อ: "StudentCourse Dev"
4. เพิ่ม Variables:
```

| Variable | Initial Value | Current Value |
|----------|--------------|---------------|
| `base_url` | `http://localhost:3000/api` | `http://localhost:3000/api` |
| `supabase_url` | `https://your-project.supabase.co` | `https://your-project.supabase.co` |
| `supabase_key` | `your-anon-key` | `your-anon-key` |
| `student_id` | (empty) | (auto-set by tests) |
| `course_id` | (empty) | (auto-set by tests) |
| `enrollment_id` | (empty) | (auto-set by tests) |

### 🔧 ขั้นตอนที่ 3: เลือก Environment

```
1. ที่มุมบนขวา ให้ dropdown "No Environment"
2. เลือก "StudentCourse Dev"
```

---

## 🚀 Test Cases - Students API

### 📌 Test 1: GET /api/students - ดึงนักเรียนทั้งหมด

**Endpoint:** `GET {{base_url}}/students`

**Headers:** 
```
Content-Type: application/json
```

**Body:** (ไม่มี)

**Expected Output (Status: 200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "fullname": "John Doe",
      "email": "john@example.com",
      "major": "Computer Science",
      "created_at": "2025-11-30T10:00:00Z"
    }
  ],
  "message": "✅ ดึงข้อมูลนักเรียนสำเร็จ"
}
```

**Postman Test Script:**
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response body contains data array", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.success).to.eql(true);
    pm.expect(jsonData.data).to.be.an('array');
});

pm.test("Response has required fields", function () {
    var jsonData = pm.response.json();
    jsonData.data.forEach(function (student) {
        pm.expect(student).to.have.property('id');
        pm.expect(student).to.have.property('fullname');
        pm.expect(student).to.have.property('email');
        pm.expect(student).to.have.property('major');
    });
});
```

**Error Cases:**
- ❌ Server Error (500) → ตรวจสอบ Supabase credentials
- ❌ Connection Error → ตรวจสอบ localhost:3000 กำลังทำงาน

---

### 📌 Test 2: POST /api/students - สร้างนักเรียนใหม่

**Endpoint:** `POST {{base_url}}/students`

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "fullname": "สมชาย ใจดี",
  "email": "somchai@example.com",
  "major": "IT"
}
```

**Expected Output (Status: 201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "fullname": "สมชาย ใจดี",
    "email": "somchai@example.com",
    "major": "IT",
    "created_at": "2025-11-30T10:00:00Z"
  },
  "message": "✅ สร้างนักเรียนสำเร็จ"
}
```

**Postman Test Script:**
```javascript
pm.test("Status code is 201", function () {
    pm.response.to.have.status(201);
});

pm.test("Response contains created student", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.success).to.eql(true);
    pm.expect(jsonData.data.fullname).to.eql("สมชาย ใจดี");
    pm.expect(jsonData.data.email).to.eql("somchai@example.com");
});

// ✅ บันทึก student_id สำหรับ test ถัดไป
pm.test("Save student_id for next tests", function () {
    var jsonData = pm.response.json();
    pm.environment.set("student_id", jsonData.data.id);
});
```

**Error Cases:**

| Error | Status | ความหมาย | วิธีแก้ |
|-------|--------|---------|--------|
| Missing fullname | 400 | ไม่ได้ส่ง fullname | ต้องส่ง fullname |
| Invalid email | 400 | email ไม่ถูก format | ส่ง email ที่ถูก |
| Duplicate email | 409 | email ซ้ำ | ใช้ email ใหม่ |
| Server error | 500 | Database error | ตรวจสอบ Supabase |

---

### 📌 Test 3: GET /api/students/:id - ดึงนักเรียนตาม ID

**Endpoint:** `GET {{base_url}}/students/{{student_id}}`

**Headers:**
```
Content-Type: application/json
```

**Body:** (ไม่มี)

**Expected Output (Status: 200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "fullname": "สมชาย ใจดี",
    "email": "somchai@example.com",
    "major": "IT",
    "created_at": "2025-11-30T10:00:00Z"
  },
  "message": "✅ ดึงข้อมูลนักเรียนสำเร็จ"
}
```

**Postman Test Script:**
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response contains correct student", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.data.id).to.eql(pm.environment.get("student_id"));
});

pm.test("Student data is not empty", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.data.fullname).to.not.be.empty;
    pm.expect(jsonData.data.email).to.not.be.empty;
});
```

**Error Cases:**

| Error | Status | ความหมาย | วิธีแก้ |
|-------|--------|---------|--------|
| Invalid ID format | 400 | ID ไม่ใช่ UUID | ใช้ UUID ที่ถูกต้อง |
| Student not found | 404 | ไม่พบนักเรียน | ตรวจสอบ ID มีอยู่ |
| Server error | 500 | Database error | ตรวจสอบ Supabase |

---

### 📌 Test 4: GET /api/students/search?query= - ค้นหานักเรียน

**Endpoint:** `GET {{base_url}}/students/search?query=สมชาย`

**Headers:**
```
Content-Type: application/json
```

**Body:** (ไม่มี)

**Expected Output (Status: 200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "fullname": "สมชาย ใจดี",
      "email": "somchai@example.com",
      "major": "IT",
      "created_at": "2025-11-30T10:00:00Z"
    }
  ],
  "message": "✅ ค้นหาสำเร็จ"
}
```

**Postman Test Script:**
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Search returns array", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.data).to.be.an('array');
});

pm.test("Search results match query", function () {
    var jsonData = pm.response.json();
    jsonData.data.forEach(function (student) {
        var query = "สมชาย";
        var found = student.fullname.includes(query) || student.email.includes(query);
        pm.expect(found).to.be.true;
    });
});
```

**Error Cases:**

| Error | Status | ความหมาย | วิธีแก้ |
|-------|--------|---------|--------|
| Missing query | 400 | ไม่ได้ส่ง query | ส่ง ?query=คำค้นหา |
| Empty result | 200 | ไม่พบข้อมูล | ค้นหา query ต่างนอก |

---

### 📌 Test 5: PUT /api/students/:id - แก้ไขนักเรียน

**Endpoint:** `PUT {{base_url}}/students/{{student_id}}`

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "fullname": "สมชาย ใจดี (แก้ไข)",
  "major": "วิศวกรรมซอฟต์แวร์"
}
```

**Expected Output (Status: 200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "fullname": "สมชาย ใจดี (แก้ไข)",
    "email": "somchai@example.com",
    "major": "วิศวกรรมซอฟต์แวร์",
    "created_at": "2025-11-30T10:00:00Z"
  },
  "message": "✅ แก้ไขนักเรียนสำเร็จ"
}
```

**Postman Test Script:**
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Student data updated correctly", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.data.fullname).to.eql("สมชาย ใจดี (แก้ไข)");
    pm.expect(jsonData.data.major).to.eql("วิศวกรรมซอฟต์แวร์");
});

pm.test("Email unchanged after update", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.data.email).to.eql("somchai@example.com");
});
```

**Error Cases:**

| Error | Status | ความหมาย | วิธีแก้ |
|-------|--------|---------|--------|
| No fields to update | 400 | ไม่มีข้อมูลส่ง | ส่งอย่างน้อย 1 field |
| Student not found | 404 | ไม่พบนักเรียน | ตรวจสอบ ID |
| Invalid email | 400 | email ไม่ถูก format | ส่ง email ที่ถูก |

---

### 📌 Test 6: DELETE /api/students/:id - ลบนักเรียน

**Endpoint:** `DELETE {{base_url}}/students/{{student_id}}`

**Headers:**
```
Content-Type: application/json
```

**Body:** (ไม่มี)

**Expected Output (Status: 200 OK):**
```json
{
  "success": true,
  "message": "✅ ลบนักเรียนสำเร็จ"
}
```

**Postman Test Script:**
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Delete success message", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.success).to.eql(true);
    pm.expect(jsonData.message).to.include("สำเร็จ");
});

// ✅ ตรวจสอบว่าลบจริงๆ ด้วยการดึง
pm.test("Verify student is deleted", function () {
    // Note: จะสร้าง API call อื่นเพื่อตรวจสอบ
    pm.sendRequest({
        url: pm.environment.get("base_url") + "/students/" + pm.environment.get("student_id"),
        method: "GET",
        header: {
            "Content-Type": "application/json"
        }
    }, function (err, response) {
        pm.expect(response.code).to.eql(404);
    });
});
```

**Error Cases:**

| Error | Status | ความหมาย | วิธีแก้ |
|-------|--------|---------|--------|
| Student not found | 404 | ไม่พบนักเรียน | ตรวจสอบ ID |
| Cascade delete | 200 | ลบ enrollments ด้วย | ลบสำเร็จ |

---

## 🚀 Test Cases - Courses API

### 📌 Test 7: GET /api/courses - ดึงวิชาทั้งหมด

**Endpoint:** `GET {{base_url}}/courses`

**Expected Output (Status: 200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "660e8400-e29b-41d4-a716-446655440111",
      "name": "ฐานข้อมูล",
      "description": "เรียน SQL...",
      "credit": 3,
      "created_at": "2025-11-30T10:00:00Z"
    }
  ],
  "message": "✅ ดึงข้อมูลวิชาสำเร็จ"
}
```

**Postman Test Script:**
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response contains courses array", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.data).to.be.an('array');
});

pm.test("Courses have required fields", function () {
    var jsonData = pm.response.json();
    jsonData.data.forEach(function (course) {
        pm.expect(course).to.have.property('id');
        pm.expect(course).to.have.property('name');
        pm.expect(course).to.have.property('credit');
    });
});
```

---

### 📌 Test 8: POST /api/courses - สร้างวิชาใหม่

**Endpoint:** `POST {{base_url}}/courses`

**Body:**
```json
{
  "name": "ฐานข้อมูล",
  "description": "เรียน SQL, PostgreSQL, Supabase",
  "credit": 3
}
```

**Expected Output (Status: 201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "660e8400-e29b-41d4-a716-446655440111",
    "name": "ฐานข้อมูล",
    "description": "เรียน SQL, PostgreSQL, Supabase",
    "credit": 3,
    "created_at": "2025-11-30T10:00:00Z"
  },
  "message": "✅ สร้างวิชาสำเร็จ"
}
```

**Postman Test Script:**
```javascript
pm.test("Status code is 201", function () {
    pm.response.to.have.status(201);
});

pm.test("Course created with correct data", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.data.name).to.eql("ฐานข้อมูล");
    pm.expect(jsonData.data.credit).to.eql(3);
});

pm.test("Save course_id for next tests", function () {
    var jsonData = pm.response.json();
    pm.environment.set("course_id", jsonData.data.id);
});
```

**Error Cases:**

| Error | Status | ความหมาย | วิธีแก้ |
|-------|--------|---------|--------|
| Missing name | 400 | ไม่ได้ส่ง name | ต้องส่ง name |
| Missing credit | 400 | ไม่ได้ส่ง credit | ต้องส่ง credit |

---

## 📝 Test Cases - Enrollments API

### 📌 Test 9: POST /api/enrollments - สร้างการลงทะเบียน

**Endpoint:** `POST {{base_url}}/enrollments`

**Body:**
```json
{
  "student_id": "{{student_id}}",
  "course_id": "{{course_id}}"
}
```

**Expected Output (Status: 201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "770e8400-e29b-41d4-a716-446655440222",
    "student_id": "550e8400-e29b-41d4-a716-446655440000",
    "course_id": "660e8400-e29b-41d4-a716-446655440111",
    "enrollment_date": "2025-11-30T10:00:00Z",
    "students": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "fullname": "สมชาย ใจดี",
      "email": "somchai@example.com"
    },
    "courses": {
      "id": "660e8400-e29b-41d4-a716-446655440111",
      "name": "ฐานข้อมูล",
      "credit": 3
    }
  },
  "message": "✅ สร้างการลงทะเบียนสำเร็จ"
}
```

**Postman Test Script:**
```javascript
pm.test("Status code is 201", function () {
    pm.response.to.have.status(201);
});

pm.test("Enrollment created with correct data", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.data.student_id).to.eql(pm.environment.get("student_id"));
    pm.expect(jsonData.data.course_id).to.eql(pm.environment.get("course_id"));
});

pm.test("Student and course data included", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.data.students).to.have.property('fullname');
    pm.expect(jsonData.data.courses).to.have.property('name');
});

pm.test("Save enrollment_id for next tests", function () {
    var jsonData = pm.response.json();
    pm.environment.set("enrollment_id", jsonData.data.id);
});
```

**Error Cases:**

| Error | Status | ความหมาย | วิธีแก้ |
|-------|--------|---------|--------|
| Student not found | 404 | ไม่พบนักเรียน | ใช้ student_id ที่มีจริง |
| Course not found | 404 | ไม่พบวิชา | ใช้ course_id ที่มีจริง |
| Duplicate enrollment | 409 | ลงทะเบียนแล้ว | ใช้ course ต่างนอก |

---

### 📌 Test 10: GET /api/enrollments/student/:id - ดึงวิชาของนักเรียน

**Endpoint:** `GET {{base_url}}/enrollments/student/{{student_id}}`

**Expected Output (Status: 200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "660e8400-e29b-41d4-a716-446655440111",
      "name": "ฐานข้อมูล",
      "credit": 3,
      "enrollment_date": "2025-11-30T10:00:00Z"
    }
  ],
  "message": "✅ ดึงวิชาของนักเรียนสำเร็จ"
}
```

**Postman Test Script:**
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response is array of courses", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.data).to.be.an('array');
});

pm.test("Each course has required fields", function () {
    var jsonData = pm.response.json();
    jsonData.data.forEach(function (course) {
        pm.expect(course).to.have.property('name');
        pm.expect(course).to.have.property('credit');
    });
});
```

---

## 📊 Test Execution Order

```
1. POST /api/students          → สร้างนักเรียน (รับ student_id)
   ↓
2. POST /api/courses           → สร้างวิชา (รับ course_id)
   ↓
3. POST /api/enrollments       → ลงทะเบียน (รับ enrollment_id)
   ↓
4. GET /api/students           → ตรวจสอบรายการ
   ↓
5. GET /api/students/:id       → ตรวจสอบ detail
   ↓
6. GET /api/students/search    → ตรวจสอบค้นหา
   ↓
7. GET /api/courses            → ตรวจสอบรายการ
   ↓
8. GET /api/enrollments/student/:id → ตรวจสอบวิชาของนักเรียน
   ↓
9. PUT /api/students/:id       → แก้ไขข้อมูล
   ↓
10. DELETE /api/students/:id   → ลบนักเรียน (ลบ enrollment ด้วย)
```

---

## ✅ Best Practices สำหรับ Testing

### 📌 1. ใช้ Environment Variables

```javascript
// ✅ ถูก - ใช้ environment variables
GET {{base_url}}/students

// ❌ ผิด - hardcode URL
GET http://localhost:3000/api/students
```

### 📌 2. บันทึก Response Data

```javascript
// ✅ ถูก - บันทึก ID สำหรับใช้ต่อไป
pm.test("Save student_id", function () {
    var jsonData = pm.response.json();
    pm.environment.set("student_id", jsonData.data.id);
});

// ❌ ผิด - ไม่บันทึกข้อมูล
```

### 📌 3. ทดสอบ Error Cases

```javascript
// ✅ ทดสอบทั้ง success และ error
pm.test("Valid student should return 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Invalid student should return 404", function () {
    pm.response.to.have.status(404);
});
```

### 📌 4. ทดสอบ Data Validation

```javascript
// ✅ ตรวจสอบข้อมูลที่ส่งกลับ
pm.test("Student data is valid", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.data.email).to.be.a('string');
    pm.expect(jsonData.data.credit).to.be.a('number');
});
```

---

## 🎯 Running Tests

### ✅ วิธีรัน Test ใน Postman

```
1. เปิด Collection "Student Course Management System API"
2. คลิก "Run" (ด้านขวา)
3. เลือก Environment "StudentCourse Dev"
4. คลิก "Run Student Course Management System API"
5. รอให้ test ทั้งหมดรันเสร็จ
```

### ✅ ตรวจสอบผลลัพธ์

```
✅ Pass  - Test สำเร็จ (สีเขียว)
❌ Fail  - Test ไม่สำเร็จ (สีแดง)
⚠️ Warn  - มี warning (สีเหลือง)
```

---

**สร้างเมื่อ:** 2025-11-30  
**อัปเดตล่าสุด:** 2025-11-30  
**สถานะ:** ✅ เสร็จสมบูรณ์
