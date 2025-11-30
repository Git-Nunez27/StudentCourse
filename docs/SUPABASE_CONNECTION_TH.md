# 🔌 การเชื่อมต่อกับ Supabase

## 📌 บทนำ

Supabase คือ Firebase alternative ที่ใช้ PostgreSQL เป็นฐานข้อมูล ระบบนี้ใช้ Supabase ในการจัดเก็บและดึงข้อมูลนักเรียน วิชา และการลงทะเบียน

---

## 🎯 Supabase คืออะไร?

### ✅ คำนิยาม

**Supabase** คือ open-source backend-as-a-service ที่ให้:
- ✅ PostgreSQL database
- ✅ Real-time subscriptions
- ✅ Authentication
- ✅ Storage
- ✅ REST API สำเร็จรูป

### 📊 Architecture

```
┌────────────────────────────────────────────────────┐
│              Your Application (Node.js)           │
│              src/server.js                        │
└─────────────────────┬──────────────────────────────┘
                      │
                      │ (HTTP/HTTPS)
                      │
┌─────────────────────▼──────────────────────────────┐
│          @supabase/supabase-js Client             │
│          (JavaScript SDK)                         │
└─────────────────────┬──────────────────────────────┘
                      │
                      │ (API requests)
                      │
┌─────────────────────▼──────────────────────────────┐
│            Supabase Cloud (Remote)                 │
│                                                    │
│  ┌──────────────┐  ┌──────────────┐              │
│  │ PostgreSQL   │  │ Auth Service │              │
│  │ Database     │  │              │              │
│  └──────────────┘  └──────────────┘              │
│                                                    │
│  ┌──────────────┐  ┌──────────────┐              │
│  │ Storage      │  │ Real-time    │              │
│  │              │  │ Subscriptions│              │
│  └──────────────┘  └──────────────┘              │
└────────────────────────────────────────────────────┘
```

---

## 🔐 ตั้งค่า Supabase

### 📌 ขั้นตอนที่ 1: สร้าง Supabase Project

```
1. ไปที่ https://supabase.com
2. คลิก "Start your project"
3. Sign up ด้วย GitHub
4. สร้าง Project ใหม่:
   - Project name: student-course-system
   - Database password: ใส่ password แข็งแรง
   - Region: Singapore (เลือก region ใกล้เคียง)
5. กดสร้าง (รอ 1-2 นาที)
```

### 📌 ขั้นตอนที่ 2: ดึง API Keys

```
1. เปิด Supabase Dashboard
2. ไปที่ Settings → API
3. คัดลอก:
   ✅ Project URL (SUPABASE_URL)
   ✅ anon public (SUPABASE_API_KEY)
```

### 📌 ขั้นตอนที่ 3: บันทึก .env

```
สร้างไฟล์ .env ในโฟลเดอร์หลัก:

SUPABASE_URL=https://your-project.supabase.co
SUPABASE_API_KEY=your-anon-key-here
PORT=3000
NODE_ENV=development
```

---

## 🔗 Configuration - ไฟล์ supabase.js

### 📝 ตัวอย่างไฟล์ config

```javascript
/**
 * ไฟล์ Supabase Configuration
 * บทบาท: เชื่อมต่อกับ Supabase database (PostgreSQL)
 * Author: Student Course Management Team
 */

// 📦 นำเข้า Supabase client library
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// 🔑 ดึง environment variables
const supabaseUrl = process.env.SUPABASE_URL;
// ✅ URL ของ Supabase project (เช่น: https://xxxxx.supabase.co)

const supabaseKey = process.env.SUPABASE_API_KEY;
// ✅ API Key ของ Supabase (anon/public key)

// ⚠️ ตรวจสอบว่า environment variables ครบถ้วน
if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    '⚠️ Missing SUPABASE_URL or SUPABASE_API_KEY in environment variables'
  );
}

// 🔗 สร้าง Supabase client instance
// ✅ instance นี้ใช้ในการติดต่อกับ Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

// 📤 ส่งออก Supabase client ไปใช้ในไฟล์อื่น ๆ
module.exports = supabase;
```

### 📌 วิธีการใช้ในไฟล์อื่น

```javascript
// ✅ ที่ไฟล์ controller
const supabase = require('../config/supabase');

// ✅ ตอนนี้พร้อมใช้ supabase client
const { data, error } = await supabase
  .from('students')
  .select('*');
```

---

## 📊 Supabase Client Methods

### 🔷 SELECT - ดึงข้อมูล (Read)

#### ✅ ตัวอย่าง 1: ดึงทั้งหมด

```javascript
// ✅ ดึงนักเรียนทั้งหมด
const { data, error } = await supabase
  .from('students')     // ✅ ชื่อตาราง
  .select('*');         // ✅ เลือกทุกคอลัมน์

if (error) throw error;

console.log(data);  // ✅ Array ของนักเรียน
```

---

#### ✅ ตัวอย่าง 2: ดึงตาม Condition

```javascript
// ✅ ดึงนักเรียนตาม ID
const { data, error } = await supabase
  .from('students')
  .select('*')
  .eq('id', '550e8400-e29b-41d4-a716-446655440000')  // ✅ eq = equal
  .single();  // ✅ ต้องการ 1 record เท่านั้น

if (error) throw error;

console.log(data);  // ✅ Object ของนักเรียนคนนั้น
```

---

#### ✅ ตัวอย่าง 3: ค้นหา (ILIKE = case-insensitive)

```javascript
// ✅ ค้นหานักเรียนตามชื่อ
const { data, error } = await supabase
  .from('students')
  .select('*')
  .or(`fullname.ilike.%สมชาย%,email.ilike.%somchai%`)
  // ✅ ilike = case-insensitive like
  // ✅ %...% = wildcard (ข้อความสามารถอยู่ตรงกลาง)

if (error) throw error;

console.log(data);  // ✅ Array ของนักเรียนที่ค้นหาได้
```

---

#### ✅ ตัวอย่าง 4: JOIN - รวมข้อมูลจากหลายตาราง

```javascript
// ✅ ดึงการลงทะเบียนพร้อมข้อมูลนักเรียนและวิชา
const { data, error } = await supabase
  .from('enrollments')
  .select(`
    id,
    enrollment_date,
    student_id,
    course_id,
    students(id, fullname, email),      // ✅ JOIN ตาราง students
    courses(id, name, credit)           // ✅ JOIN ตาราง courses
  `)
  .eq('student_id', '550e8400-e29b-41d4-a716-446655440000');

if (error) throw error;

console.log(data);
// ผลลัพธ์:
// [
//   {
//     id: "...",
//     enrollment_date: "2025-11-30",
//     students: { id: "550e...", fullname: "สมชาย", ... },
//     courses: { id: "660e...", name: "ฐานข้อมูล", ... }
//   }
// ]
```

---

### 🔷 INSERT - เพิ่มข้อมูล (Create)

#### ✅ ตัวอย่าง 1: เพิ่มหนึ่งแถว

```javascript
// ✅ เพิ่มนักเรียนใหม่
const { data, error } = await supabase
  .from('students')
  .insert([
    {
      fullname: 'สมชาย ใจดี',
      email: 'somchai@example.com',
      major: 'IT'
      // ✅ id และ created_at จะสร้างโดยอัตโนมัติ
    }
  ])
  .select();  // ✅ ส่งกลับข้อมูลที่เพิ่ม

if (error) throw error;

console.log(data[0]);  // ✅ Object ของนักเรียนที่เพิ่ม
```

---

#### ✅ ตัวอย่าง 2: เพิ่มหลายแถว

```javascript
// ✅ เพิ่มนักเรียนหลายคนพร้อมกัน
const { data, error } = await supabase
  .from('students')
  .insert([
    { fullname: 'สมชาย ใจดี', email: 'somchai@...', major: 'IT' },
    { fullname: 'สมหญิง สวยใจ', email: 'somying@...', major: 'Business' },
    { fullname: 'สมพร เก่ง', email: 'somporn@...', major: 'IT' }
  ])
  .select();

if (error) throw error;

console.log(data);  // ✅ Array ของนักเรียน 3 คน
```

---

### 🔷 UPDATE - แก้ไขข้อมูล

#### ✅ ตัวอย่าง 1: แก้ไขตาม ID

```javascript
// ✅ แก้ไขข้อมูลนักเรียน
const { data, error } = await supabase
  .from('students')
  .update({
    fullname: 'สมชาย ใจดี (แก้ไข)',
    major: 'วิศวกรรมซอฟต์แวร์'
  })
  .eq('id', '550e8400-e29b-41d4-a716-446655440000')  // ✅ เงื่อนไข
  .select();

if (error) throw error;

console.log(data[0]);  // ✅ Object ของนักเรียนที่แก้ไข
```

---

#### ✅ ตัวอย่าง 2: แก้ไขบางคอลัมน์เท่านั้น

```javascript
// ✅ แก้ไขเฉพาะ fullname เท่านั้น
const { data, error } = await supabase
  .from('students')
  .update({
    fullname: 'สมชาย ใจดี (ปรับปรุง)'
  })
  .eq('email', 'somchai@example.com')  // ✅ ค้นหาตาม email
  .select();

if (error) throw error;

console.log(data);
```

---

### 🔷 DELETE - ลบข้อมูล

#### ✅ ตัวอย่าง 1: ลบตาม ID

```javascript
// ✅ ลบนักเรียน
const { error } = await supabase
  .from('students')
  .delete()
  .eq('id', '550e8400-e29b-41d4-a716-446655440000');

if (error) throw error;

console.log('✅ ลบสำเร็จ');
```

---

#### ✅ ตัวอย่าง 2: Cascade Delete

```
// ✅ เมื่อลบนักเรียน
DELETE FROM students WHERE id = '550e...';

// 🔗 Supabase CASCADE DELETE ทำงาน
// ✅ ลบจาก students
// ✅ ลบ enrollments ที่เกี่ยวข้องด้วยโดยอัตโนมัติ
```

---

## 🛡️ Error Handling

### 📌 ตัวอย่างการจัดการข้อผิดพลาด

```javascript
// ✅ Pattern ที่ถูกต้อง
const { data, error } = await supabase
  .from('students')
  .select('*')
  .eq('id', studentId);

if (error) {
  // ❌ เกิดข้อผิดพลาด
  console.error('Error:', error.message);
  throw error;
}

// ✅ ใช้ data
console.log(data);
```

### ❌ ตัวอย่างข้อผิดพลาดทั่วไป

#### 1. Connection Error

```javascript
// ❌ ไม่สามารถเชื่อมต่อ Supabase
{
  status: 0,
  statusText: '',
  message: 'Failed to fetch'
}

// ✅ วิธีแก้:
// - ตรวจสอบ internet connection
// - ตรวจสอบ SUPABASE_URL ถูกต้องหรือไม่
// - ตรวจสอบ SUPABASE_API_KEY ถูกต้องหรือไม่
```

---

#### 2. Foreign Key Constraint Error

```javascript
// ❌ ลงทะเบียนกับ student_id ที่ไม่มี
{
  code: "23503",
  message: "violates foreign key constraint"
}

// ✅ วิธีแก้:
// - ตรวจสอบว่า student_id มีอยู่ใน students table
const { data: student } = await supabase
  .from('students')
  .select('id')
  .eq('id', studentId)
  .single();

if (!student) {
  throw new Error('Student not found');
}
```

---

#### 3. Duplicate Key Error

```javascript
// ❌ Email ซ้ำ
{
  code: "23505",
  message: "duplicate key value violates unique constraint"
}

// ✅ วิธีแก้:
// - ตรวจสอบว่า email มีอยู่แล้วหรือไม่
const { data: existing } = await supabase
  .from('students')
  .select('id')
  .eq('email', email)
  .single();

if (existing) {
  throw new Error('Email already exists');
}
```

---

## 🔄 Data Flow Diagram

### 📊 Request → Supabase → Response

```
┌────────────────────────────────┐
│  Client Request                │
│  (Postman/Browser)             │
│  GET /api/students             │
└─────────────┬──────────────────┘
              │
              ▼
┌────────────────────────────────┐
│  Express Server (server.js)    │
│  Route: /api/students          │
└─────────────┬──────────────────┘
              │
              ▼
┌────────────────────────────────┐
│  Router (studentRoutes.js)     │
│  router.get('/')               │
└─────────────┬──────────────────┘
              │
              ▼
┌────────────────────────────────┐
│  Controller                    │
│  (studentController.js)        │
│  getAllStudents()              │
└─────────────┬──────────────────┘
              │
              ▼
┌────────────────────────────────┐
│  Supabase Client               │
│  (config/supabase.js)          │
│  supabase.from('students')     │
│          .select('*')          │
└─────────────┬──────────────────┘
              │
              ▼ (HTTPS)
┌────────────────────────────────┐
│  Supabase Cloud                │
│  PostgreSQL Database           │
│  SELECT * FROM students;       │
└─────────────┬──────────────────┘
              │
              ▼ (JSON Response)
┌────────────────────────────────┐
│  Response Data                 │
│  { data: [...], error: null }  │
└─────────────┬──────────────────┘
              │
              ▼
┌────────────────────────────────┐
│  Controller - Format Response  │
│  res.status(200).json({...})   │
└─────────────┬──────────────────┘
              │
              ▼
┌────────────────────────────────┐
│  Client Response               │
│  JSON with students data       │
└────────────────────────────────┘
```

---

## 🎯 ตัวอย่างการใช้งานจริง

### 📌 Controller Function Example

```javascript
/**
 * ดึงนักเรียนทั้งหมด
 */
const getAllStudents = async (req, res) => {
  try {
    // 1️⃣ เรียก Supabase
    const { data, error } = await supabase
      .from('students')
      .select('*');
    
    // 2️⃣ ตรวจสอบข้อผิดพลาด
    if (error) throw error;
    
    // 3️⃣ ส่งผลลัพธ์กลับ
    res.status(200).json({
      success: true,
      data: data,
      message: '✅ ดึงข้อมูลนักเรียนสำเร็จ'
    });
  } catch (error) {
    // 4️⃣ จัดการ error
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
```

---

## 📚 Supabase Query Methods Cheatsheet

| Method | ความหมาย | ตัวอย่าง |
|--------|---------|---------|
| `.from()` | เลือกตาราง | `.from('students')` |
| `.select()` | เลือกคอลัมน์ | `.select('*')` / `.select('id, name')` |
| `.insert()` | เพิ่มแถว | `.insert([{...}])` |
| `.update()` | แก้ไขแถว | `.update({name: '...'})` |
| `.delete()` | ลบแถว | `.delete()` |
| `.eq()` | equal | `.eq('id', '123')` |
| `.neq()` | not equal | `.neq('status', 'inactive')` |
| `.gt()` | greater than | `.gt('age', 18)` |
| `.lt()` | less than | `.lt('age', 65)` |
| `.gte()` | >= | `.gte('score', 80)` |
| `.lte()` | <= | `.lte('score', 100)` |
| `.like()` | pattern match | `.like('name', '%john%')` |
| `.ilike()` | case-insensitive | `.ilike('name', '%john%')` |
| `.in()` | in array | `.in('id', ['1', '2', '3'])` |
| `.is()` | null check | `.is('field', null)` |
| `.or()` | OR condition | `.or('a.eq.1,b.eq.2')` |
| `.and()` | AND condition | `.and('a.eq.1,b.eq.2')` |
| `.single()` | 1 record | `.single()` |
| `.limit()` | limit rows | `.limit(10)` |
| `.offset()` | skip rows | `.offset(20)` |
| `.order()` | sort | `.order('created_at', {ascending: false})` |

---

## 🚀 สรุป

### ✅ ขั้นตอนการเชื่อมต่อ Supabase

```
1. ✅ สร้าง Supabase Project
2. ✅ ดึง API Keys (URL, Key)
3. ✅ บันทึกใน .env
4. ✅ สร้าง config/supabase.js
5. ✅ ใช้ supabase client ในไฟล์ controller
6. ✅ เรียก .from().select() เป็นต้น
7. ✅ ส่งผลลัพธ์กลับ client
```

### ✅ Supabase Query Pattern

```javascript
const { data, error } = await supabase
  .from('table_name')
  .method(columns/conditions)
  .filter(conditions)
  .select(columns);

// ✅ ตรวจสอบ error
if (error) throw error;

// ✅ ใช้ data
return data;
```

---

**สร้างเมื่อ:** 2025-11-30  
**อัปเดตล่าสุด:** 2025-11-30  
**สถานะ:** ✅ เสร็จสมบูรณ์
