# ERD and Use Case Diagrams

## Entity Relationship Diagram (ERD)

### Text-based ERD:

```
┌─────────────────────────────────────────────────────┐
│                    STUDENTS                         │
├─────────────────────────────────────────────────────┤
│ PK │ id: UUID                                       │
│    │ fullname: VARCHAR(255)                         │
│    │ email: VARCHAR(255) ✓ UNIQUE                   │
│    │ major: VARCHAR(255)                            │
│    │ created_at: TIMESTAMP                          │
└──────────────────────┬──────────────────────────────┘
                       │
                       │ 1:M
                       │ (One student can have)
                       │ (many enrollments)
                       │
┌──────────────────────▼──────────────────────────────┐
│                  ENROLLMENTS                        │
├─────────────────────────────────────────────────────┤
│ PK │ id: UUID                                       │
│ FK │ student_id: UUID → students(id)               │
│ FK │ course_id: UUID → courses(id)                 │
│    │ enrollment_date: TIMESTAMP                     │
│    │ UNIQUE(student_id, course_id)                 │
└──────────────────────┬──────────────────────────────┘
                       │
                       │ M:1
                       │ (Many enrollments for)
                       │ (one course)
                       │
┌──────────────────────▼──────────────────────────────┐
│                    COURSES                          │
├─────────────────────────────────────────────────────┤
│ PK │ id: UUID                                       │
│    │ name: VARCHAR(255)                            │
│    │ description: TEXT                             │
│    │ credit: INT                                   │
│    │ created_at: TIMESTAMP                         │
└─────────────────────────────────────────────────────┘

Legend:
PK = Primary Key
FK = Foreign Key
✓ = Unique Constraint
1:M = One-to-Many relationship
M:1 = Many-to-One relationship
M:M = Many-to-Many relationship (via junction table)
```

### Relationship Rules:

**1. Students → Enrollments (1:M)**
- One student can enroll in many courses
- Relationship type: One-to-Many
- Foreign key: student_id in enrollments table
- Cascade rule: ON DELETE CASCADE (delete student → delete enrollments)

**2. Courses → Enrollments (1:M)**
- One course can have many students
- Relationship type: One-to-Many
- Foreign key: course_id in enrollments table
- Cascade rule: ON DELETE CASCADE (delete course → delete enrollments)

**3. Students ↔ Courses (M:M)**
- Students and Courses have many-to-many relationship
- Implemented through ENROLLMENTS junction table
- Allows multiple students per course
- Allows multiple courses per student

---

## Use Case Diagram - Administration

```
                        ╔═════════════════════╗
                        ║  ADMINISTRATOR      ║
                        ╚════════╤════════════╝
                                 │
                    ┌────────────┼────────────┐
                    │            │            │
                    ▼            ▼            ▼
            ┌─────────────┐ ┌──────────┐ ┌──────────┐
            │   Manage    │ │ Manage   │ │ Manage   │
            │ Students    │ │ Courses  │ │Enrollment│
            └────────┬────┘ └────┬─────┘ └────┬─────┘
                     │           │             │
        ┌────────────┼───────────┼─────────────┘
        │            │           │
        ▼            ▼           ▼
    ┌────────┐  ┌────────┐  ┌─────────┐
    │ Create │  │ Create │  │  Enroll │
    │Student │  │ Course │  │ Student │
    └────────┘  └────────┘  └─────────┘
        │            │           │
        ▼            ▼           ▼
    ┌────────┐  ┌────────┐  ┌─────────┐
    │ Update │  │ Update │  │ Cancel  │
    │Student │  │ Course │  │Enrollment
    └────────┘  └────────┘  └─────────┘
        │            │           │
        ▼            ▼           ▼
    ┌────────┐  ┌────────┐  ┌─────────┐
    │ Delete │  │ Delete │  │  View   │
    │Student │  │ Course │  │All Enrol│
    └────────┘  └────────┘  └─────────┘
        │            │           │
        └────────────┼───────────┘
                     │
                     ▼
            ┌─────────────────┐
            │ Database System │
            └─────────────────┘
```

### CRUD Operations Matrix:

```
┌──────────────────┬──────────────┬──────────────┬──────────────┐
│    Resource      │    CREATE    │     READ     │    UPDATE    │
├──────────────────┼──────────────┼──────────────┼──────────────┤
│   Student        │   POST       │   GET /:id   │   PUT /:id   │
│                  │              │   GET (all)  │              │
├──────────────────┼──────────────┼──────────────┼──────────────┤
│   Course         │   POST       │   GET /:id   │   PUT /:id   │
│                  │              │   GET (all)  │              │
├──────────────────┼──────────────┼──────────────┼──────────────┤
│   Enrollment     │   POST       │   GET /:id   │     N/A      │
│                  │              │   GET (all)  │              │
└──────────────────┴──────────────┴──────────────┴──────────────┘

┌──────────────────┬──────────────┬──────────────┐
│    Resource      │    DELETE    │   SPECIAL    │
├──────────────────┼──────────────┼──────────────┤
│   Student        │   DELETE/:id │   SEARCH     │
├──────────────────┼──────────────┼──────────────┤
│   Course         │   DELETE/:id │      -       │
├──────────────────┼──────────────┼──────────────┤
│   Enrollment     │   DELETE/:id │   GET student│
│                  │              │   GET course │
└──────────────────┴──────────────┴──────────────┘
```

---

## Use Case Diagram - Student

```
                    ╔═════════════════════╗
                    ║     STUDENT         ║
                    ╚════════╤════════════╝
                             │
                    ┌────────┴────────┐
                    │                 │
                    ▼                 ▼
            ┌──────────────┐  ┌──────────────────┐
            │ View Enrolled│  │ View Course      │
            │   Courses    │  │ Details          │
            └──────────────┘  └──────────────────┘
                    │                 │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │ Database System │
                    └─────────────────┘
```

**Use Cases:**
- UC1: View my enrolled courses
- UC2: View course information (name, credits, description)
- UC3: See enrollment date

---

## Use Case Diagram - Teacher

```
                    ╔═════════════════════╗
                    ║     TEACHER         ║
                    ╚════════╤════════════╝
                             │
            ┌────────────────┼────────────────┐
            │                │                │
            ▼                ▼                ▼
    ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
    │ Create/Edit  │  │ View Course  │  │ View Enrolled│
    │   Course     │  │  Enrollment  │  │  Students    │
    └──────────────┘  └──────────────┘  └──────────────┘
            │                │                │
            └────────────────┼────────────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │ Database System │
                    └─────────────────┘
```

**Use Cases:**
- UC1: Create new course
- UC2: Update course information
- UC3: View enrolled students in my course
- UC4: View total enrollment count

---

## API Endpoint Hierarchy

```
Base URL: /api

├── /students
│   ├── GET          → Get all students
│   ├── POST         → Create student
│   ├── /search      → Search students
│   └── /:id
│       ├── GET      → Get student details
│       ├── PUT      → Update student
│       └── DELETE   → Delete student
│
├── /courses
│   ├── GET          → Get all courses
│   ├── POST         → Create course
│   └── /:id
│       ├── GET      → Get course details
│       ├── PUT      → Update course
│       └── DELETE   → Delete course
│
└── /enrollments
    ├── GET          → Get all enrollments
    ├── POST         → Create enrollment
    ├── /:id
    │   ├── GET      → Get enrollment details
    │   └── DELETE   → Delete enrollment
    ├── /student/:id → Get student's courses
    └── /course/:id  → Get course's students
```

---

## HTTP Method & Status Code Reference

### Request Methods

```
┌────────┬──────────────────────────────────────────┐
│ Method │ Purpose & Characteristics                │
├────────┼──────────────────────────────────────────┤
│ GET    │ Retrieve data (safe, no side effects)    │
│        │ Safe: YES | Idempotent: YES              │
├────────┼──────────────────────────────────────────┤
│ POST   │ Create new resource                      │
│        │ Safe: NO | Idempotent: NO                │
├────────┼──────────────────────────────────────────┤
│ PUT    │ Update entire resource                   │
│        │ Safe: NO | Idempotent: YES               │
├────────┼──────────────────────────────────────────┤
│ DELETE │ Remove resource                          │
│        │ Safe: NO | Idempotent: YES               │
└────────┴──────────────────────────────────────────┘
```

### Response Status Codes

```
┌─────┬──────────────────────┬─────────────────────────┐
│ Code│ Name                 │ Meaning                 │
├─────┼──────────────────────┼─────────────────────────┤
│ 200 │ OK                   │ Request successful      │
│ 201 │ Created              │ Resource created        │
├─────┼──────────────────────┼─────────────────────────┤
│ 400 │ Bad Request          │ Invalid input data      │
│ 404 │ Not Found            │ Resource doesn't exist  │
│ 409 │ Conflict             │ Duplicate/conflict      │
├─────┼──────────────────────┼─────────────────────────┤
│ 500 │ Server Error         │ Database/server error   │
│ 503 │ Service Unavailable  │ Server down             │
└─────┴──────────────────────┴─────────────────────────┘
```

---

## Data Flow Sequence Diagram

### Creating Student and Enrolling in Course

```
CLIENT          API SERVER        SUPABASE DB
  │                 │                  │
  │─POST /students─▶│                  │
  │  (fullname)     │                  │
  │                 │─INSERT STUDENT──▶│
  │                 │◀─STUDENT ID─────│
  │◀─201 CREATED───│                  │
  │(student_uuid)   │                  │
  │                 │                  │
  │─POST /courses──▶│                  │
  │ (name,credit)   │                  │
  │                 │─INSERT COURSE───▶│
  │                 │◀─COURSE ID──────│
  │◀─201 CREATED───│                  │
  │ (course_uuid)   │                  │
  │                 │                  │
  │─POST /enrollment│                  │
  │ (student_id,    │                  │
  │  course_id)     │                  │
  │                 │─VALIDATE────────▶│
  │                 │◀─OK────────────│
  │                 │                  │
  │                 │─INSERT──────────▶│
  │                 │ ENROLLMENT       │
  │                 │◀─OK──────────── │
  │◀─201 CREATED───│                  │
  │ (enrollment)    │                  │
```

---

## Technology Stack Diagram

```
┌─────────────────────────────────────────────────────────┐
│                  CLIENT LAYER                           │
│  (Postman / Browser / Mobile App)                       │
└────────────┬──────────────────────────────────┬─────────┘
             │                                  │
         HTTP│                                  │HTTP
          REST│                                  │REST
             │                                  │
┌────────────▼──────────────────────────────────▼─────────┐
│                  APPLICATION LAYER                      │
│  Express.js                                             │
│  ├─ Routes        (studentRoutes.js)                    │
│  ├─ Controllers   (studentController.js)               │
│  └─ Config        (supabase.js)                         │
└──────────────────┬─────────────────────────────────────┘
                   │
                   │ Supabase Client
                   │ JavaScript
                   │
┌──────────────────▼─────────────────────────────────────┐
│                  DATA LAYER                            │
│  Supabase (PostgreSQL Database)                        │
│  ├─ students table                                     │
│  ├─ courses table                                      │
│  └─ enrollments table                                  │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│              DEPLOYMENT INFRASTRUCTURE                  │
│  GitHub (Version Control) → Render (Cloud Platform)    │
│  Auto-deploy on git push                               │
└─────────────────────────────────────────────────────────┘
```

---

## System State Transitions

### Student Enrollment State Machine

```
           ┌─────────────┐
           │   START     │
           └──────┬──────┘
                  │ Create student
                  │ POST /students
                  ▼
           ┌─────────────┐
        ┌──│   NO COURSE │────┐
        │  └─────────────┘    │
        │                     │ Enroll in course
        │ Search course      │ POST /enrollments
        │ GET /students      │
        │                     │
        │                     ▼
        │              ┌──────────────┐
        │              │  ENROLLED    │
        │              │  (1+ course) │
        │              └──────┬───────┘
        │                     │ Cancel enrollment
        │ Delete student     │ DELETE /enrollments/:id
        │ DELETE /students   │
        │                     ▼
        │              ┌──────────────┐
        │              │ NO COURSE    │ (If removed from all)
        │              └──────────────┘
        │                     │
        └─────────────────────┘ Delete enrollment again
                              │ DELETE /enrollments

       ▼
    ┌─────────────┐
    │   DELETED   │
    └─────────────┘
```

---

## Deployment Flow

```
┌──────────────┐
│   Git Commit │
│ Local Dev PC │
└──────┬───────┘
       │ git push origin main
       ▼
┌──────────────────┐
│  GitHub Repo     │
└──────┬───────────┘
       │ Webhook trigger
       ▼
┌──────────────────┐
│  Render Build    │
│  1. npm install  │
│  2. npm start    │
└──────┬───────────┘
       │ Success
       ▼
┌──────────────────┐
│ Production Live  │
│ https://url/api  │
└──────────────────┘

       ▲
       │ On new push
       │ (Auto-redeploy)
       │
  [Repeat process]
```

---

## Database Index Strategy

```
Table: students
├─ PK: id (auto-indexed)
├─ Unique: email
│   └─ Index: idx_students_email
│       Purpose: Fast email lookups
│       Query: WHERE email = ?

Table: courses
├─ PK: id (auto-indexed)

Table: enrollments
├─ PK: id (auto-indexed)
├─ FK: student_id
│   └─ Index: idx_enrollments_student_id
│       Purpose: Fast student enrollments lookup
│       Query: WHERE student_id = ?
├─ FK: course_id
│   └─ Index: idx_enrollments_course_id
│       Purpose: Fast course students lookup
│       Query: WHERE course_id = ?
└─ Unique: (student_id, course_id)
    Purpose: Prevent duplicate enrollments
```

---

## API Response Format

```
SUCCESS Response:
┌──────────────────────────────────┐
│ HTTP 200/201                     │
├──────────────────────────────────┤
│ {                                │
│   "success": true,               │
│   "data": {                      │
│     "id": "uuid",                │
│     "fullname": "John",          │
│     ...                          │
│   },                             │
│   "message": "Success message"   │
│ }                                │
└──────────────────────────────────┘

ERROR Response:
┌──────────────────────────────────┐
│ HTTP 400/404/500                 │
├──────────────────────────────────┤
│ {                                │
│   "success": false,              │
│   "message": "Error description" │
│ }                                │
└──────────────────────────────────┘
```

---

**Last Updated**: 2025-11-30
**Format**: Text-based ASCII diagrams (can be converted to PNG/JPEG)
