# 🔗 ความสัมพันธ์ระหว่างตารางข้อมูล (Entity Relationship Diagram)

## 📌 บทนำ

ฐานข้อมูล Student Course Management System ประกอบด้วย **3 ตาราง** ที่เชื่อมต่อด้วย **Foreign Keys** เพื่อ **รักษาความสมบูรณ์ของข้อมูล** และ **ป้องกันข้อมูลไม่ถูกต้อง**

---

## 🎯 Entity Relationship Diagram (ERD)

```
┌────────────────────────────────────────────────────────────────────────────┐
│                       STUDENT COURSE MANAGEMENT SYSTEM                    │
└────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────┐        ┌──────────────────────────────┐
│       STUDENTS (นักเรียน)   │        │     COURSES (วิชา)          │
├─────────────────────────────┤        ├──────────────────────────────┤
│ 🔑 id (UUID, PK)            │        │ 🔑 id (UUID, PK)            │
│ 👤 fullname (VARCHAR)       │        │ 📚 name (VARCHAR)           │
│ 📧 email (VARCHAR, UNIQUE)  │        │ 📝 description (TEXT)       │
│ 🎓 major (VARCHAR)          │        │ 💯 credit (INTEGER)         │
│ ⏰ created_at (TIMESTAMP)   │        │ ⏰ created_at (TIMESTAMP)   │
└─────────────────────────────┘        └──────────────────────────────┘
           △                                        △
           │ (1 : Many)                             │ (1 : Many)
           │                                        │
           └────────────────┬──────────────────────┘
                            │
                   ┌────────▼────────┐
                   │  ENROLLMENTS    │
                   │ (การลงทะเบียน)  │
                   └────────┬────────┘
                            │
                   ┌────────▼────────────────┐
                   │ 🔑 id (UUID, PK)       │
                   │ 👤 student_id (FK) ◀──┤ (อ้างอิง students.id)
                   │ 📚 course_id (FK) ◀───┤ (อ้างอิง courses.id)
                   │ ⏰ enrollment_date     │
                   │ 🚫 UNIQUE (s_id,c_id) │
                   └────────────────────────┘


🔑 = Primary Key (ระบุตัวตน)
FK = Foreign Key (อ้างอิงถึงตารางอื่น)
◀── = ความสัมพันธ์ (Relationship)
```

---

## 📊 ความสัมพันธ์ระหว่างตาราง (Relationships)

### 🔗 One-to-Many (1 : Many) - หนึ่งต่อหลาย

#### 📌 Students (1) : Enrollments (Many)
```
นักเรียนหนึ่งคน สามารถลงทะเบียนหลายวิชา

┌──────────────────────────────┐
│ Students (ตาราง)            │
├──────────────────────────────┤
│ id: 550e...0000 (PK)         │◄─── สมชาย
│ fullname: สมชาย ใจดี         │
│ email: somchai@...           │
│ major: IT                    │
└──────────────────────────────┘
         │ (1)
         │ (1 : Many)
         │
    ┌────▼──────────────────────┐
    │                           │
    ▼                           ▼
┌──────────────────────┐  ┌──────────────────────┐
│ Enrollments (1)      │  │ Enrollments (2)      │
├──────────────────────┤  ├──────────────────────┤
│ id: 770e...0001      │  │ id: 770e...0002      │
│ student_id: 550e..0  │  │ student_id: 550e..0  │
│ course_id: 660e...A  │  │ course_id: 660e...B  │
│ (ฐานข้อมูล)          │  │ (เว็บไซต์)           │
└──────────────────────┘  └──────────────────────┘
```

#### 📌 Courses (1) : Enrollments (Many)
```
วิชาหนึ่งวิชา สามารถมีนักเรียนหลายคนลงทะเบียน

┌──────────────────────────────┐
│ Courses (ตาราง)             │
├──────────────────────────────┤
│ id: 660e...A (PK)            │◄─── ฐานข้อมูล
│ name: ฐานข้อมูล               │
│ credit: 3                    │
└──────────────────────────────┘
         │ (1)
         │ (1 : Many)
         │
    ┌────▼──────────────────────┐
    │                           │
    ▼                           ▼
┌──────────────────────┐  ┌──────────────────────┐
│ Enrollments (1)      │  │ Enrollments (2)      │
├──────────────────────┤  ├──────────────────────┤
│ id: 770e...0001      │  │ id: 770e...0003      │
│ student_id: 550e..0  │  │ student_id: 880e..1  │
│ course_id: 660e...A  │  │ course_id: 660e...A  │
│ (สมชาย)               │  │ (สมหญิง)             │
└──────────────────────┘  └──────────────────────┘
```

#### 📌 Many-to-Many (M : N) - หลายต่อหลาย
```
นักเรียนหลายคน ลงทะเบียนวิชาหลายวิชา
วิชาหลายวิชา มีนักเรียนหลายคนลงทะเบียน

        STUDENTS
         (ตาราง)
         
    ┌─────┬─────┬──────┐
    │ PK  │ FK  │ Name │
    ├─────┼─────┼──────┤
    │ 1   │ 100 │ สมชาย
    │ 2   │ 200 │ สมหญิง
    │ 3   │ 300 │ สมพร
    └─────┴─────┴──────┘
         △      △      △
         │      │      │
    ┌────┼──────┼──────┼─────┐
    │    │      │      │     │
   (A) (B)    (C)    (D)   (E)  ← Enrollment records
    │    │      │      │     │
    ▼    ▼      ▼      ▼     ▼
   ENROLLMENTS (ตาราง)
┌──────┬──────────┬──────────┐
│ ID   │ studentID│ courseID │
├──────┼──────────┼──────────┤
│ A    │ 1        │ α        │ ← สมชาย ลงทะเบียน ฐานข้อมูล
│ B    │ 1        │ β        │ ← สมชาย ลงทะเบียน เว็บไซต์
│ C    │ 2        │ α        │ ← สมหญิง ลงทะเบียน ฐานข้อมูล
│ D    │ 3        │ β        │ ← สมพร ลงทะเบียน เว็บไซต์
│ E    │ 3        │ γ        │ ← สมพร ลงทะเบียน PHP
└──────┴──────────┴──────────┘
    △    △      △
    │    │      │
    ├────┼──────┘
    │    │
    ▼    ▼
  COURSES (ตาราง)
┌─────┬──────────┬─────┐
│ PK  │ FK       │ Name│
├─────┼──────────┼─────┤
│ α   │ 100      │ ฐานข้อมูล
│ β   │ 200      │ เว็บไซต์
│ γ   │ 300      │ PHP
└─────┴──────────┴─────┘
```

---

## 🔐 Primary Key (PK) และ Foreign Key (FK)

### 📌 Students - Primary Key

```sql
CREATE TABLE students (
  🔑 id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  -- ↑ Primary Key
  -- - ไม่ซ้ำกัน (UNIQUE)
  -- - ไม่ว่างเปล่า (NOT NULL)
  -- - ใช้ UUID (36 ตัวอักษร)
  -- - ระบุตัวตนของนักเรียนแต่ละคน
  
  fullname VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  major VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW()
);
```

**ข้อมูลตัวอย่าง:**
```
id                                    | fullname      | email
550e8400-e29b-41d4-a716-446655440000  | สมชาย ใจดี   | somchai@...
660e8400-e29b-41d4-a716-446655440111  | สมหญิง สวยใจ | somying@...
770e8400-e29b-41d4-a716-446655440222  | สมพร เก่ง    | somporn@...
```

---

### 📌 Courses - Primary Key

```sql
CREATE TABLE courses (
  🔑 id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  -- ↑ Primary Key
  -- - ไม่ซ้ำกัน (UNIQUE)
  -- - ไม่ว่างเปล่า (NOT NULL)
  -- - ใช้ UUID (36 ตัวอักษร)
  -- - ระบุตัวตนของวิชาแต่ละวิชา
  
  name VARCHAR(100) NOT NULL,
  description TEXT,
  credit INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**ข้อมูลตัวอย่าง:**
```
id                                    | name          | credit
880e8400-e29b-41d4-a716-446655440333  | ฐานข้อมูล     | 3
990e8400-e29b-41d4-a716-446655440444  | เว็บไซต์      | 4
aa0e8400-e29b-41d4-a716-446655440555  | PHP           | 3
```

---

### 📌 Enrollments - Primary Key + Foreign Keys

```sql
CREATE TABLE enrollments (
  🔑 id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  -- ↑ Primary Key
  
  🔗 student_id UUID NOT NULL 
    REFERENCES students(id) ON DELETE CASCADE,
  -- ↑ Foreign Key ที่อ้างอิงถึง students.id
  -- - ต้องมีค่า (NOT NULL)
  -- - ต้องมีอยู่ใน students.id
  -- - CASCADE DELETE: ลบอัตโนมัติเมื่อ students ถูกลบ
  
  🔗 course_id UUID NOT NULL 
    REFERENCES courses(id) ON DELETE CASCADE,
  -- ↑ Foreign Key ที่อ้างอิงถึง courses.id
  -- - ต้องมีค่า (NOT NULL)
  -- - ต้องมีอยู่ใน courses.id
  -- - CASCADE DELETE: ลบอัตโนมัติเมื่อ courses ถูกลบ
  
  enrollment_date TIMESTAMP DEFAULT NOW(),
  UNIQUE(student_id, course_id)
  -- ↑ ไม่ให้มีการลงทะเบียนซ้ำ (ไม่สามารถลงทะเบียนวิชาเดียวกันได้ 2 ครั้ง)
);
```

**ข้อมูลตัวอย่าง:**
```
id                          | student_id              | course_id               | enrollment_date
bb0e8400-e29b-41d4-a716... | 550e8400-e29b-41d4-...  | 880e8400-e29b-41d4-...  | 2025-11-30
cc0e8400-e29b-41d4-a716... | 550e8400-e29b-41d4-...  | 990e8400-e29b-41d4-...  | 2025-11-30
dd0e8400-e29b-41d4-a716... | 660e8400-e29b-41d4-...  | 880e8400-e29b-41d4-...  | 2025-12-01
```

---

## 🔗 ความสัมพันธ์ผ่าน Foreign Key

### 📌 การเชื่อมข้อมูล (JOIN)

#### ✅ ตัวอย่าง 1: ดึงวิชาของนักเรียนคนหนึ่ง

```sql
SELECT 
  s.fullname AS "ชื่อนักเรียน",
  c.name AS "ชื่อวิชา",
  c.credit AS "หน่วยกิจ"
FROM students s
JOIN enrollments e ON s.id = e.student_id      -- ✅ FK: student_id
JOIN courses c ON e.course_id = c.id           -- ✅ FK: course_id
WHERE s.fullname = 'สมชาย';
```

**กระบวนการ JOIN:**
```
Step 1: ค้นหา students.id ของ "สมชาย"
        students.id = 550e8400-e29b-41d4-a716-446655440000

Step 2: ค้นหา enrollments.student_id = 550e8400-e29b-41d4-a716-446655440000
        enrollments.id = [bb0e..., cc0e...]
        enrollments.course_id = [880e..., 990e...]

Step 3: ค้นหา courses.id ที่ตรงกับ enrollments.course_id
        courses.id = [880e..., 990e...]
        
ผลลัพธ์:
| ชื่อนักเรียน | ชื่อวิชา | หน่วยกิจ |
| สมชาย      | ฐานข้อมูล | 3       |
| สมชาย      | เว็บไซต์  | 4       |
```

---

#### ✅ ตัวอย่าง 2: ดึงนักเรียนของวิชาหนึ่ง

```sql
SELECT 
  s.fullname AS "ชื่อนักเรียน",
  s.major AS "สาขา",
  e.enrollment_date AS "วันที่ลงทะเบียน"
FROM courses c
JOIN enrollments e ON c.id = e.course_id       -- ✅ FK: course_id
JOIN students s ON e.student_id = s.id        -- ✅ FK: student_id
WHERE c.name = 'ฐานข้อมูล'
ORDER BY s.fullname;
```

**ผลลัพธ์:**
```
| ชื่อนักเรียน | สาขา | วันที่ลงทะเบียน |
| สมชาย      | IT  | 2025-11-30     |
| สมหญิง     | Bus | 2025-12-01     |
```

---

## 🛡️ Referential Integrity (ความสมบูรณ์ของข้อมูล)

### 📌 Foreign Key Constraints - ป้องกันข้อมูลไม่ถูกต้อง

#### ❌ ตัวอย่าง 1: ลงทะเบียนกับ student_id ที่ไม่มี

```sql
-- ❌ ไม่สามารถลงทะเบียนได้ เพราะ student_id ไม่มี
INSERT INTO enrollments (student_id, course_id, enrollment_date)
VALUES (
  'invalid-uuid-xxx',  -- ❌ student_id ไม่มีใน students
  '880e8400-e29b-41d4-a716-446655440333',
  NOW()
);

-- ❌ ERROR:
-- insert or update on table "enrollments" violates 
-- foreign key constraint "enrollments_student_id_fkey"
-- Key (student_id)=(invalid-uuid-xxx) is not present in table "students".
```

**✅ ป้องกันได้:**
- ไม่สามารถเพิ่มข้อมูลเสีย ลงไปใน enrollments
- ปลอดภัยและสะอาด

---

#### ❌ ตัวอย่าง 2: ลบนักเรียนที่มีการลงทะเบียน

```sql
-- ✅ ลบนักเรียน
DELETE FROM students 
WHERE id = '550e8400-e29b-41d4-a716-446655440000';

-- ✅ ผลกระทบ CASCADE DELETE:
-- 1. ลบจาก students ✅
-- 2. CASCADE → ลบ enrollments ที่ student_id = 550e8400-... ด้วยโดยอัตโนมัติ
-- 3. ไม่มีข้อมูลเสีย (orphan records) ที่ค้างอยู่

-- ✅ ตรวจสอบ
SELECT * FROM enrollments 
WHERE student_id = '550e8400-e29b-41d4-a716-446655440000';
-- ผลลัพธ์: (empty)
```

**✅ CASCADE DELETE ป้องกันได้:**
- ข้อมูล orphan (ข้อมูลค้างซาก)
- ข้อมูลสอบสาย
- ความสัมพันธ์ขาดหาย

---

#### ❌ ตัวอย่าง 3: UNIQUE Constraint - ไม่ให้ลงทะเบียนซ้ำ

```sql
-- ✅ ลงทะเบียนครั้งแรก
INSERT INTO enrollments (student_id, course_id, enrollment_date)
VALUES (
  '550e8400-e29b-41d4-a716-446655440000',
  '880e8400-e29b-41d4-a716-446655440333',
  NOW()
);
-- ✅ สำเร็จ

-- ❌ ลองลงทะเบียนวิชาเดียวกันครั้งที่ 2
INSERT INTO enrollments (student_id, course_id, enrollment_date)
VALUES (
  '550e8400-e29b-41d4-a716-446655440000',  -- ← เดิม
  '880e8400-e29b-41d4-a716-446655440333',  -- ← เดิม
  NOW()
);

-- ❌ ERROR:
-- duplicate key value violates unique constraint 
-- "enrollments_student_id_course_id_key"
// Detail: Key (student_id, course_id)=(550e8400-..., 880e8400-...) already exists.
```

**✅ UNIQUE Constraint ป้องกันได้:**
- ลงทะเบียนวิชาเดียวกันซ้ำ
- ข้อมูลที่เหมือนกัน

---

## 📈 ความสัมพันธ์ปกติวิภาคต่างๆ (Cardinality)

| Cardinality | สัญลักษณ์ | ความหมาย | ตัวอย่าง |
|-------------|----------|---------|---------|
| 1:1 | —— | หนึ่งต่อหนึ่ง | Account ↔ User |
| 1:N | —→ | หนึ่งต่อหลาย | Students → Enrollments |
| N:1 | ←— | หลายต่อหนึ่ง | Enrollments ← Students |
| M:N | ——→ | หลายต่อหลาย | Students ↔ Courses |

**โปรเจคนี้ใช้:** **1:N** และ **M:N (ผ่าน Junction Table)**

```
Students (1) ──→ Enrollments (N)
Courses (1)  ──→ Enrollments (N)
Students (M) ←→ Courses (N)  [ผ่าน Enrollments]
```

---

## 🎯 สรุป

### ✅ ความสัมพันธ์ในโปรเจค

| ตาราง | ประเภท PK | ประเภท FK | ความสัมพันธ์ |
|------|----------|---------|-----------|
| **Students** | UUID (PK) | ไม่มี | Parent |
| **Courses** | UUID (PK) | ไม่มี | Parent |
| **Enrollments** | UUID (PK) | 2 FK | Child |

### ✅ ข้อดี

```
✅ ไม่ซ้ำซ้อน - ใช้ Foreign Key แทนการเก็บข้อมูลซ้ำ
✅ ประหยัด - เก็บพื้นที่น้อย
✅ ความสมบูรณ์ - CASCADE DELETE ปลอดภัย
✅ Integrity - UNIQUE ป้องกันลงทะเบียนซ้ำ
✅ ความเร็ว - JOIN ค้นหาข้อมูลได้เร็ว
✅ ยืดหยุ่น - ขยายฟีเจอร์ได้ง่าย
```

---

**สร้างเมื่อ:** 2025-11-30  
**อัปเดตล่าสุด:** 2025-11-30  
**สถานะ:** ✅ เสร็จสมบูรณ์
