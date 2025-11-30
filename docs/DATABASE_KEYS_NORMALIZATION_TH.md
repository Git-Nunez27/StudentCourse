# 🔑 Primary Key, Foreign Key และ Normalization

## 📚 บทนำ

ฐานข้อมูลที่ดี ต้องมีการจัดเก็บข้อมูลที่มีระเบียบและไม่ซ้ำซ้อน บทความนี้อธิบายวิธีการใช้ **Primary Key (PK)**, **Foreign Key (FK)** และ **Normalization** ในระบบนี้

---

## 🔑 Primary Key (คีย์หลัก)

### ✅ คำนิยาม
**Primary Key** คือคอลัมน์หรือชุดคอลัมน์ที่ระบุตัวตนของแต่ละแถวในตาราง ทำให้แต่ละแถว**ไม่ซ้ำกัน**

### 📌 ลักษณะสำคัญของ Primary Key
```
1. ✅ Unique        - ไม่มีค่าซ้ำกัน
2. ✅ Not Null      - ต้องมีค่าเสมอ (ไม่ว่างเปล่า)
3. ✅ Immutable     - ไม่เปลี่ยนแปลงตลอดชีวิตของข้อมูล
4. ✅ Identifiable  - ระบุตัวตนของแต่ละบันทึกได้เพียงหนึ่งเดียว
```

### 🎯 ตัวอย่างในโปรเจค

#### 📊 ตาราง Students
```sql
CREATE TABLE students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),  -- ✅ PK
  fullname VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  major VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW()
);
```

**อธิบาย:**
- `id` = Primary Key ที่เป็น UUID
- **UUID** = รหัสที่ไม่ซ้ำกัน 36 ตัวอักษร (เช่น: `550e8400-e29b-41d4-a716-446655440000`)
- **gen_random_uuid()** = ฟังก์ชันสำหรับสร้าง UUID โดยอัตโนมัติ
- ทำให้นักเรียนแต่ละคน**ไม่ซ้ำกัน**

#### ✅ ข้อดี
```
✅ ระบุตัวตน - นักเรียนแต่ละคนมี ID ไม่ซ้ำ
✅ ความเร็ว - ค้นหาข้อมูลเร็ว (indexed)
✅ ความสัมพันธ์ - อ้างอิงจากตารางอื่นได้ง่าย
```

#### ❌ หากไม่มี PK จะเกิดปัญหา
```
❌ ข้อมูลซ้ำ - สมชาย ใจดี อาจมี 2 คน เหมือนกัน
❌ ความสับสน - ไม่รู้ว่า "สมชาย" อันไหนที่ต้องการ
❌ ข้อผิดพลาด - ลบข้อมูลผิดได้ง่าย
```

---

## 🔗 Foreign Key (คีย์นอก)

### ✅ คำนิยาม
**Foreign Key** คือคอลัมน์ที่อ้างอิงถึง Primary Key ของตารางอื่น เพื่อสร้างความสัมพันธ์ระหว่างตาราง

### 📌 ลักษณะสำคัญของ Foreign Key
```
1. ✅ Reference    - อ้างอิงถึง PK ของตารางอื่น
2. ✅ Integrity    - รักษาความสัมพันธ์ให้ถูกต้อง
3. ✅ Constraint   - ป้องกันข้อมูลที่ไม่ถูกต้อง
4. ✅ Cascade      - ลบข้อมูลโดยอัตโนมัติเมื่อตาราง parent ถูกลบ
```

### 🎯 ตัวอย่างในโปรเจค

#### 📊 ตาราง Enrollments
```sql
CREATE TABLE enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,  -- ✅ FK
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,    -- ✅ FK
  enrollment_date TIMESTAMP DEFAULT NOW()
);
```

**อธิบาย:**
- `student_id` = Foreign Key ที่อ้างอิงถึง `students.id`
- `course_id` = Foreign Key ที่อ้างอิงถึง `courses.id`
- **ON DELETE CASCADE** = เมื่อลบนักเรียน ลบการลงทะเบียนของเขาด้วยโดยอัตโนมัติ

### 🌳 ความสัมพันธ์แสดงด้วยภาพ

```
┌─────────────────────────────────────────────────────────┐
│                    Students (ตาราง)                    │
├─────────────────────────────────────────────────────────┤
│ id (PK)  │ fullname        │ email           │ major    │
├──────────┼─────────────────┼─────────────────┼──────────┤
│ uuid-1   │ สมชาย ใจดี      │ somchai@...     │ IT       │ ◄─────┐
│ uuid-2   │ สมหญิง สวยใจ    │ somying@...     │ Business │ ◄──┐  │
└─────────────────────────────────────────────────────────┘    │  │
                                                                 │  │
┌────────────────────────────────────────────────────────────┐  │  │
│                  Courses (ตาราง)                          │  │  │
├────────────────────────────────────────────────────────────┤  │  │
│ id (PK)  │ name      │ description   │ credit              │  │  │
├──────────┼───────────┼───────────────┼─────────────────────┤  │  │
│ uuid-A   │ ฐานข้อมูล │ เรียน SQL...  │ 3                   │◄─┼──┤
│ uuid-B   │ เว็บไซต์  │ เรียน PHP...  │ 4                   │  │  │
└────────────────────────────────────────────────────────────┘  │  │
                                                                  │  │
┌──────────────────────────────────────────────────────────────┐ │  │
│              Enrollments (ตาราง)                           │ │  │
├──────────────────────────────────────────────────────────────┤ │  │
│ id (PK) │ student_id (FK) │ course_id (FK) │ enrollment_date │ │  │
├─────────┼─────────────────┼────────────────┼─────────────────┤ │  │
│ uuid-10 │ uuid-1          │ uuid-A         │ 2025-11-30      │─┼──┘
│ uuid-11 │ uuid-1          │ uuid-B         │ 2025-11-30      │─┼──┐
│ uuid-12 │ uuid-2          │ uuid-A         │ 2025-12-01      │ └────
└──────────────────────────────────────────────────────────────┘
   ↑
   แต่ละแถวสร้างความสัมพันธ์ระหว่าง Students และ Courses
```

### ✅ ข้อดีของ Foreign Key
```
✅ ป้องกันข้อมูลไม่ถูกต้อง - ไม่สามารถลงทะเบียนกับนักเรียนที่ไม่มี
✅ ความสัมพันธ์ - เชื่อมตาราง Students, Courses, Enrollments ได้อย่างถูกต้อง
✅ Cascade Delete - ลบอัตโนมัติ - เมื่อลบนักเรียน ลบการลงทะเบียนด้วย
✅ ความสมบูรณ์ - รักษาความสมดุลของข้อมูล
```

### ❌ หากไม่มี Foreign Key จะเกิดปัญหา
```
❌ ข้อมูลเสีย - ลงทะเบียนกับนักเรียนที่ไม่มี
❌ ความสับสน - ไม่รู้ว่า enrollment นั้นเป็นของใคร
❌ ข้อมูลกำพร่า - ถ้าลบนักเรียน ยังมี enrollment ค้างอยู่
```

---

## 🗂️ Database Normalization (การทำให้ปกติ)

### ✅ คำนิยาม
**Normalization** คือกระบวนการจัดเรียงข้อมูลในฐานข้อมูลเพื่อลดการซ้ำซ้อน (Redundancy) และเพิ่มความสมบูรณ์

### 🎯 ปัญหาที่ Normalization แก้ไข

#### ❌ ตัวอย่างข้อมูลที่ไม่ปกติ (Unnormalized)
```
┌───────────────────────────────────────────────────────────────┐
│ StudentEnrollment (ตาราง - ผิด!)                            │
├───────────────────────────────────────────────────────────────┤
│ ID  │ ชื่อ      │ อีเมล           │ วิชา    │ หน่วยกิจ │ วิชา2   │
├─────┼───────────┼─────────────────┼─────────┼─────────┼─────────┤
│ 1   │ สมชาย    │ somchai@...     │ ฐานข้อมูล │ 3   │ เว็บไซต์ │
│ 2   │ สมหญิง   │ somying@...     │ ฐานข้อมูล │ 3   │ NULL    │
│ 3   │ สมชาย    │ somchai@...     │ เว็บไซต์  │ 4   │ NULL    │
└─────┴───────────┴─────────────────┴─────────┴─────────┴─────────┘

⚠️ ปัญหา:
1. ข้อมูลซ้ำ - "สมชาย" และ "somchai@..." ซ้ำ 2 ครั้ง
2. ไม่ยืดหยุ่น - ถ้าสมชาย ลงทะเบียน 3 วิชา ต้องมี 3 แถว
3. ไม่ประหยัด - เสียพื้นที่จัดเก็บมากเกินไป
4. ยากต่อการแก้ไข - เปลี่ยนอีเมลของสมชาย ต้องเปลี่ยน 2 ที่
```

#### ✅ ตัวอย่างข้อมูลที่ปกติ (Normalized - 3NF)
```
ตาราง 1: Students
┌──────────────────────────────────────┐
│ ID  │ ชื่อ      │ อีเมล           │
├─────┼───────────┼─────────────────┤
│ 1   │ สมชาย    │ somchai@...     │
│ 2   │ สมหญิง   │ somying@...     │
└──────────────────────────────────────┘

ตาราง 2: Courses
┌──────────────────────────────────┐
│ ID  │ ชื่อวิชา  │ หน่วยกิจ       │
├─────┼───────────┼────────────────┤
│ A   │ ฐานข้อมูล │ 3              │
│ B   │ เว็บไซต์  │ 4              │
└──────────────────────────────────┘

ตาราง 3: Enrollments
┌────────────────────────────────┐
│ StudentID │ CourseID │ วันที่  │
├───────────┼──────────┼─────────┤
│ 1         │ A        │ 2025... │
│ 1         │ B        │ 2025... │
│ 2         │ A        │ 2025... │
└────────────────────────────────┘

✅ ข้อดี:
1. ✅ ไม่ซ้ำ - ข้อมูลแต่ละอย่างเก็บเพียงครั้งเดียว
2. ✅ ยืดหยุ่น - สมชาย ลงทะเบียนได้หลายวิชา
3. ✅ ประหยัด - ใช้พื้นที่จัดเก็บน้อย
4. ✅ ง่ายต่อการแก้ไข - เปลี่ยนอีเมล แค่ 1 ที่
```

---

## 📊 ระดับ Normalization (Normal Forms)

### 🔹 1NF (First Normal Form - ฟอร์มแรก)

**เงื่อนไข:**
```
1. ✅ ต้องมี Primary Key
2. ✅ คอลัมน์ต้องมีค่าเดียว (Atomic Value) - ไม่มี repeating groups
3. ✅ ไม่มีคอลัมน์ที่ซ้ำกันตลอดแถว
```

**ตัวอย่าง ❌ ไม่ใช่ 1NF:**
```sql
-- ❌ ผิด - คอลัมน์ courses มีหลายค่า
CREATE TABLE students (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  courses VARCHAR(500)  -- ❌ เช่น: "ฐานข้อมูล, เว็บไซต์, PHP"
);
```

**ตัวอย่าง ✅ ใช่ 1NF:**
```sql
-- ✅ ถูก - แต่ละคอลัมน์มีค่าเดียว
CREATE TABLE students (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  course VARCHAR(100)  -- ✅ เพียงวิชาเดียว
);

CREATE TABLE enrollments (
  student_id INT,
  course_id INT,
  FOREIGN KEY (student_id) REFERENCES students(id)
);
```

### 🔹 2NF (Second Normal Form - ฟอร์มที่สอง)

**เงื่อนไข:**
```
1. ✅ ต้องเป็น 1NF
2. ✅ ทุกคอลัมน์ที่ไม่ใช่ PK ต้องขึ้นต่อ PK ทั้งหมด (Full Dependency)
   - ไม่มีคอลัมน์ที่ขึ้นต่อเพียงส่วนหนึ่งของ PK
```

**ตัวอย่าง ❌ ไม่ใช่ 2NF:**
```sql
-- ❌ ผิด - Composite PK แต่ course_credit ขึ้นต่อ course_id เพียงอย่างเดียว
CREATE TABLE enrollments (
  student_id INT,
  course_id INT,
  course_credit INT,  -- ❌ ขึ้นต่อเพียง course_id ไม่ใช่ทั้ง (student_id, course_id)
  PRIMARY KEY (student_id, course_id)
);
```

**ตัวอย่าง ✅ ใช่ 2NF:**
```sql
-- ✅ ถูก - แยกตาราง courses ออกมา
CREATE TABLE enrollments (
  student_id INT,
  course_id INT,
  enrollment_date DATE,  -- ✅ ขึ้นต่อ (student_id, course_id)
  PRIMARY KEY (student_id, course_id)
);

CREATE TABLE courses (
  course_id INT PRIMARY KEY,
  course_name VARCHAR(100),
  course_credit INT  -- ✅ เก็บที่ตาราง courses
);
```

### 🔹 3NF (Third Normal Form - ฟอร์มที่สาม) ⭐ เป้าหมายของโปรเจค

**เงื่อนไข:**
```
1. ✅ ต้องเป็น 2NF
2. ✅ ไม่มี Transitive Dependency
   - คอลัมน์ที่ไม่ใช่ PK ต้องไม่ขึ้นต่อคอลัมน์อื่นที่ไม่ใช่ PK
```

**ตัวอย่าง ❌ ไม่ใช่ 3NF:**
```sql
-- ❌ ผิด - student_major ขึ้นต่อ student_id
--              major_building ขึ้นต่อ student_major (transitive)
CREATE TABLE students (
  student_id INT PRIMARY KEY,
  student_name VARCHAR(100),
  student_major VARCHAR(50),
  major_building VARCHAR(100)  -- ❌ Transitive Dependency
);
```

**ตัวอย่าง ✅ ใช่ 3NF (ตามโปรเจค):**
```sql
-- ✅ ถูก - แต่ละตาราง มีความสัมพันธ์ที่ชัดเจน

CREATE TABLE students (
  id UUID PRIMARY KEY,
  fullname VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  major VARCHAR(100)  -- ✅ ขึ้นต่อเพียง id เท่านั้น
);

CREATE TABLE courses (
  id UUID PRIMARY KEY,
  name VARCHAR(100),
  description TEXT,
  credit INTEGER  -- ✅ ขึ้นต่อเพียง id เท่านั้น
);

CREATE TABLE enrollments (
  id UUID PRIMARY KEY,
  student_id UUID REFERENCES students(id),  -- ✅ FK
  course_id UUID REFERENCES courses(id),    -- ✅ FK
  enrollment_date TIMESTAMP
);
```

---

## 🎯 การประยุกต์ใช้ในโปรเจค

### 📊 ตารางทั้ง 3 ตารางมี 3NF

#### ตาราง 1️⃣ Students - 3NF ✅

```sql
CREATE TABLE students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),          -- ✅ PK
  fullname VARCHAR(100) NOT NULL,                         -- ✅ ขึ้นต่อ id
  email VARCHAR(100) UNIQUE NOT NULL,                     -- ✅ ขึ้นต่อ id
  major VARCHAR(100),                                     -- ✅ ขึ้นต่อ id
  created_at TIMESTAMP DEFAULT NOW()                      -- ✅ ขึ้นต่อ id
);

-- ✅ เป็น 3NF:
-- - มี PK (id)
-- - ทุกคอลัมน์ขึ้นต่อ id เท่านั้น
-- - ไม่มี Transitive Dependency
```

#### ตาราง 2️⃣ Courses - 3NF ✅

```sql
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),          -- ✅ PK
  name VARCHAR(100) NOT NULL,                             -- ✅ ขึ้นต่อ id
  description TEXT,                                       -- ✅ ขึ้นต่อ id
  credit INTEGER NOT NULL,                                -- ✅ ขึ้นต่อ id
  created_at TIMESTAMP DEFAULT NOW()                      -- ✅ ขึ้นต่อ id
);

-- ✅ เป็น 3NF:
-- - มี PK (id)
-- - ทุกคอลัมน์ขึ้นต่อ id เท่านั้น
-- - ไม่มี Transitive Dependency
```

#### ตาราง 3️⃣ Enrollments - 3NF ✅

```sql
CREATE TABLE enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL 
    REFERENCES students(id) ON DELETE CASCADE,            -- ✅ FK
  course_id UUID NOT NULL 
    REFERENCES courses(id) ON DELETE CASCADE,             -- ✅ FK
  enrollment_date TIMESTAMP DEFAULT NOW(),
  UNIQUE(student_id, course_id)                           -- ✅ ไม่ซ้ำ
);

-- ✅ เป็น 3NF:
-- - มี PK (id)
-- - student_id, course_id ขึ้นต่อ id
-- - enrollment_date ขึ้นต่อ id
-- - ไม่มี Transitive Dependency
```

---

## 🔍 ตัวอย่างสถานการณ์จริง

### 📌 สถานการณ์: "สมชาย ลงทะเบียนฐานข้อมูล"

#### ขั้นตอน 1: ตรวจสอบ PK และ FK

```
1. ค้นหา student ID ของ "สมชาย"
   - Query: SELECT id FROM students WHERE fullname = 'สมชาย'
   - ผลลัพธ์: id = 550e8400-e29b-41d4-a716-446655440000

2. ค้นหา course ID ของ "ฐานข้อมูล"
   - Query: SELECT id FROM courses WHERE name = 'ฐานข้อมูล'
   - ผลลัพธ์: id = 660e8400-e29b-41d4-a716-446655440111

3. ตรวจสอบ FK - student_id ต้องมี PK ใน students
   - ✅ 550e8400-e29b-41d4-a716-446655440000 มีอยู่ใน students

4. ตรวจสอบ FK - course_id ต้องมี PK ใน courses
   - ✅ 660e8400-e29b-41d4-a716-446655440111 มีอยู่ใน courses
```

#### ขั้นตอน 2: สร้าง Enrollment

```sql
INSERT INTO enrollments (student_id, course_id, enrollment_date)
VALUES (
  '550e8400-e29b-41d4-a716-446655440000',   -- ✅ FK (student)
  '660e8400-e29b-41d4-a716-446655440111',   -- ✅ FK (course)
  NOW()
);

-- ✅ สำเร็จ - ทั้ง FK ตรวจสอบได้
```

#### ขั้นตอน 3: ดึงข้อมูล Enrollment (Join Query)

```sql
SELECT 
  e.id,
  s.fullname AS "ชื่อนักเรียน",
  c.name AS "ชื่อวิชา",
  c.credit AS "หน่วยกิจ",
  e.enrollment_date AS "วันที่ลงทะเบียน"
FROM enrollments e
JOIN students s ON e.student_id = s.id          -- ✅ Join ด้วย FK
JOIN courses c ON e.course_id = c.id            -- ✅ Join ด้วย FK
WHERE s.fullname = 'สมชาย';

-- ผลลัพธ์:
-- | ID | ชื่อนักเรียน | ชื่อวิชา | หน่วยกิจ | วันที่ |
-- |----|-----------|--------|---------|-----|
-- |... | สมชาย    | ฐานข้อมูล | 3      | ... |
```

---

## ⚠️ ตัวอย่าง FK Constraint ป้องกันข้อมูลไม่ถูกต้อง

### ❌ ความพยายาม 1: ลงทะเบียนกับ student_id ที่ไม่มี

```sql
INSERT INTO enrollments (student_id, course_id)
VALUES (
  'invalid-uuid-not-exist',  -- ❌ student_id นี้ไม่มีใน students
  '660e8400-e29b-41d4-a716-446655440111'
);

-- ❌ ERROR: insert or update on table "enrollments" 
--           violates foreign key constraint "enrollments_student_id_fkey"
--
-- ✅ FK ป้องกันข้อมูลไม่ถูกต้อง!
```

### ❌ ความพยายาม 2: ลงทะเบียนกับ course_id ที่ไม่มี

```sql
INSERT INTO enrollments (student_id, course_id)
VALUES (
  '550e8400-e29b-41d4-a716-446655440000',
  'invalid-uuid-not-exist'  -- ❌ course_id นี้ไม่มีใน courses
);

-- ❌ ERROR: insert or update on table "enrollments"
--           violates foreign key constraint "enrollments_course_id_fkey"
--
-- ✅ FK ป้องกันข้อมูลไม่ถูกต้อง!
```

### ✅ CASCADE DELETE - ลบอัตโนมัติ

```sql
-- ลบนักเรียน "สมชาย"
DELETE FROM students WHERE id = '550e8400-e29b-41d4-a716-446655440000';

-- ✅ ผลลัพธ์:
-- - ลบจาก students ✅
-- - CASCADE → ลบ enrollments ของ "สมชาย" ด้วยโดยอัตโนมัติ ✅

-- ตรวจสอบ:
SELECT * FROM enrollments WHERE student_id = '550e8400-e29b-41d4-a716-446655440000';
-- ผลลัพธ์: (empty - ลบไปแล้ว)
```

---

## 📈 ข้อมูลสรุป

### 🎯 เปรียบเทียบ Normalized vs Unnormalized

| เกณฑ์ | Unnormalized | Normalized (3NF) |
|------|-------------|-------------------|
| **ข้อมูลซ้ำ** | ❌ มากมาย | ✅ ไม่ซ้ำ |
| **พื้นที่จัดเก็บ** | ❌ เสีย | ✅ ประหยัด |
| **ความเร็ว** | ⚠️ ช้า (ต้องแยก) | ✅ เร็ว (ทำให้เรียบร้อย) |
| **การแก้ไข** | ❌ ยุ่งยาก | ✅ ง่าย |
| **ความสมบูรณ์** | ❌ เสี่ยง | ✅ ปลอดภัย |
| **ความสัมพันธ์** | ❌ ยากต่อการจัดการ | ✅ ชัดเจน |

### 🏆 ประโยชน์ของ 3NF

```
✅ ไม่ซ้ำซ้อน - ข้อมูลแต่ละอย่างเก็บเพียงครั้งเดียว
✅ ประหยัด - ใช้พื้นที่จัดเก็บน้อย
✅ ความเร็ว - ค้นหาและแก้ไขเร็ว
✅ ความสมบูรณ์ - ป้องกันข้อมูลไม่ถูกต้อง (FK)
✅ ความยืดหยุ่น - ขยายฟีเจอร์ง่าย
✅ ความปลอดภัย - CASCADE DELETE ลบอัตโนมัติ
```

---

## 🚀 สรุป

### ✅ โปรเจคนี้ใช้ Normalization ด้วยการ:

1. **Primary Key (PK)**
   - ✅ ใช้ UUID สำหรับแต่ละตาราง
   - ✅ ปลอดภัยและไม่ซ้ำกัน
   - ✅ ระบุตัวตนได้ชัดเจน

2. **Foreign Key (FK)**
   - ✅ enrollments.student_id → students.id
   - ✅ enrollments.course_id → courses.id
   - ✅ ป้องกันข้อมูลไม่ถูกต้อง
   - ✅ Cascade Delete เมื่อ parent ถูกลบ

3. **Third Normal Form (3NF)**
   - ✅ ไม่มี Repeating Groups (1NF)
   - ✅ ไม่มี Partial Dependency (2NF)
   - ✅ ไม่มี Transitive Dependency (3NF)
   - ✅ ข้อมูลสะอาด ไม่ซ้ำซ้อน

### 🎯 ผลลัพธ์: ฐานข้อมูลที่มีประสิทธิภาพ ปลอดภัย และประหยัด! 🎉

---

**สร้างเมื่อ:** 2025-11-30  
**อัปเดตล่าสุด:** 2025-11-30  
**สถานะ:** ✅ เสร็จสมบูรณ์
