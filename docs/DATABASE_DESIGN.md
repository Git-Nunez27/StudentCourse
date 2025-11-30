# Database Design & Architecture

## Database Schema

### 1. STUDENTS Table

**Purpose**: Store student information

```sql
CREATE TABLE students (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  fullname VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  major VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Fields**:
| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier (auto-generated) |
| fullname | VARCHAR(255) | NOT NULL | Student's full name |
| email | VARCHAR(255) | UNIQUE, NOT NULL | Student's email (must be unique) |
| major | VARCHAR(255) | NOT NULL | Student's major/field of study |
| created_at | TIMESTAMP | DEFAULT NOW() | Record creation timestamp |

**Index**:
```sql
CREATE INDEX idx_students_email ON students(email);
```

---

### 2. COURSES Table

**Purpose**: Store course information

```sql
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  credit INT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Fields**:
| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| name | VARCHAR(255) | NOT NULL | Course name |
| description | TEXT | NOT NULL | Detailed course description |
| credit | INT | NOT NULL | Credit hours/units |
| created_at | TIMESTAMP | DEFAULT NOW() | Record creation timestamp |

---

### 3. ENROLLMENTS Table

**Purpose**: Store student course enrollments (many-to-many relationship)

```sql
CREATE TABLE enrollments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  enrollment_date TIMESTAMP DEFAULT NOW(),
  UNIQUE(student_id, course_id)
);
```

**Fields**:
| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| student_id | UUID | FOREIGN KEY, NOT NULL | Reference to students table |
| course_id | UUID | FOREIGN KEY, NOT NULL | Reference to courses table |
| enrollment_date | TIMESTAMP | DEFAULT NOW() | Date of enrollment |
| UNIQUE(sid, cid) | CONSTRAINT | - | Prevents duplicate enrollments |

**Index**:
```sql
CREATE INDEX idx_enrollments_student_id ON enrollments(student_id);
CREATE INDEX idx_enrollments_course_id ON enrollments(course_id);
```

---

## Entity Relationship Diagram (ERD)

```
┌─────────────────────────────────┐
│         STUDENTS                │
├─────────────────────────────────┤
│ 🔑 id (UUID)                    │
│ • fullname (VARCHAR)            │
│ • email (VARCHAR) ✓ UNIQUE      │
│ • major (VARCHAR)               │
│ • created_at (TIMESTAMP)        │
└─────────────────┬───────────────┘
                  │
                  │ (1:M)
                  │
        ┌─────────▼──────────┐
        │   ENROLLMENTS      │
        ├────────────────────┤
        │ 🔑 id (UUID)       │
        │ 🔗 student_id (FK) │
        │ 🔗 course_id (FK)  │
        │ • enrollment_date  │
        │ ✓ UNIQUE(sid,cid)  │
        └─────────┬──────────┘
                  │
                  │ (M:1)
                  │
┌─────────────────▼──────────┐
│      COURSES               │
├────────────────────────────┤
│ 🔑 id (UUID)               │
│ • name (VARCHAR)           │
│ • description (TEXT)       │
│ • credit (INT)             │
│ • created_at (TIMESTAMP)   │
└────────────────────────────┘

Legend:
🔑 = Primary Key
🔗 = Foreign Key
✓ = Unique Constraint
1:M = One-to-Many
M:1 = Many-to-One
```

---

## Relationships

### 1. Students ↔ Enrollments (1:M)
- **Cardinality**: One student can have many enrollments
- **Foreign Key**: enrollments.student_id → students.id
- **Constraint**: ON DELETE CASCADE (delete student → delete enrollments)

### 2. Courses ↔ Enrollments (1:M)
- **Cardinality**: One course can have many enrollments
- **Foreign Key**: enrollments.course_id → courses.id
- **Constraint**: ON DELETE CASCADE (delete course → delete enrollments)

### 3. Students ↔ Courses (M:M)
- **Relationship**: Through ENROLLMENTS (junction/bridge table)
- **Access**: SELECT courses FROM students WHERE student_id = ?
- **Access**: SELECT students FROM courses WHERE course_id = ?

---

## Database Design Principles

### 1. Primary Keys
**Why**: Uniquely identify each record
- Type: UUID (Universally Unique Identifier)
- Auto-generated by database
- Advantage over sequential IDs:
  - Distributed system friendly
  - No ID collision across replicas
  - Privacy (not predictable)

### 2. Foreign Keys
**Why**: Maintain referential integrity
- Prevent orphaned records
- Enforce relationships
- ON DELETE CASCADE: Remove dependent records automatically

Example:
```sql
-- If student is deleted, all their enrollments are deleted
DELETE FROM students WHERE id = 'student-uuid';
-- Result: enrollments with that student_id are also deleted
```

### 3. Unique Constraints
**Why**: Prevent duplicate data
- Email uniqueness: No two students with same email
- (student_id, course_id) uniqueness: Student can't enroll twice in same course

---

## Database Normalization

### 1NF (First Normal Form)
**Requirement**: Atomic values only (no repeating groups)

✅ **Correct**:
```sql
-- Each field has single value
INSERT INTO students (fullname, email, major) 
VALUES ('John Doe', 'john@example.com', 'Computer Science');
```

❌ **Incorrect**:
```sql
-- Repeating group in single field
INSERT INTO students (fullname, email, majors) 
VALUES ('John', 'john@example.com', 'CS, Math, Physics');
```

### 2NF (Second Normal Form)
**Requirement**: Meet 1NF + all non-key attributes depend on entire primary key

✅ **Correct Design**:
```
students(id, fullname, email, major)
courses(id, name, description, credit)
enrollments(id, student_id, course_id, enrollment_date)
```

❌ **Incorrect Design** (violates 2NF):
```
bad_enrollments(id, student_id, course_id, 
                student_fullname, course_name)
-- student_fullname depends only on student_id, not entire key
```

### 3NF (Third Normal Form)
**Requirement**: Meet 2NF + no transitive dependencies

✅ **Correct**:
```
students(id, fullname, email, major)
-- No transitive dependencies
```

❌ **Incorrect** (violates 3NF):
```
bad_students(id, fullname, email, major, major_dept, dept_location)
-- major_dept and dept_location depend on major, not on student id
-- Solution: Create separate majors/departments table
```

---

## Query Examples

### Get All Courses for a Student
```sql
SELECT c.id, c.name, c.credit, e.enrollment_date
FROM courses c
JOIN enrollments e ON c.id = e.course_id
WHERE e.student_id = 'student-uuid'
ORDER BY e.enrollment_date DESC;
```

### Get All Students in a Course
```sql
SELECT s.id, s.fullname, s.email, s.major, e.enrollment_date
FROM students s
JOIN enrollments e ON s.id = e.student_id
WHERE e.course_id = 'course-uuid'
ORDER BY s.fullname;
```

### Get Course Enrollment Count
```sql
SELECT c.id, c.name, COUNT(e.id) as enrollment_count
FROM courses c
LEFT JOIN enrollments e ON c.id = e.course_id
GROUP BY c.id, c.name
ORDER BY enrollment_count DESC;
```

### Find Duplicate Emails
```sql
SELECT email, COUNT(*) as count
FROM students
GROUP BY email
HAVING COUNT(*) > 1;
```

---

## Performance Optimization

### Indexes
```sql
-- Speed up email searches
CREATE INDEX idx_students_email ON students(email);

-- Speed up enrollment queries by student
CREATE INDEX idx_enrollments_student_id ON enrollments(student_id);

-- Speed up enrollment queries by course
CREATE INDEX idx_enrollments_course_id ON enrollments(course_id);

-- Composite index for common queries
CREATE INDEX idx_enrollments_composite 
ON enrollments(student_id, course_id);
```

### Query Optimization
1. Use indexes on foreign keys
2. Select only needed columns
3. Use LIMIT for large result sets
4. Avoid N+1 queries (use joins)

---

## Data Integrity

### Constraints in Place
1. **PRIMARY KEY**: Unique record identification
2. **FOREIGN KEY**: Referential integrity
3. **UNIQUE**: No duplicate emails
4. **NOT NULL**: Required fields
5. **ON DELETE CASCADE**: Clean data removal

### Validation at Application Level
1. Email format validation
2. Credit range validation (1-6)
3. Fullname length validation
4. Duplicate enrollment check

---

## Backup & Recovery

### Supabase Backup Strategy
1. **Automatic daily backups** (retention: 7 days)
2. **Point-in-time recovery** (up to 7 days)
3. **Manual backups** (create via Supabase dashboard)

### Restore Process
1. Supabase → Settings → Backups
2. Click "Restore" on desired backup
3. Database rolled back to that timestamp

---

## Future Enhancements

### Suggested Additions
1. **users table** - Authentication (teachers, students, admins)
2. **grades table** - Track student performance
3. **schedule table** - Course timing and location
4. **prerequisites table** - Course dependencies
5. **audit_log table** - Track all changes

### Extended ERD
```
users (id, email, password, role, created_at)
students (id, user_id, major, ...) -- Links to users
courses (id, name, instructor_id, ...) -- Links to users (teacher)
prerequisites (id, course_id, required_course_id)
schedule (id, course_id, day, time, location)
grades (id, enrollment_id, grade, gpa_points)
audit_log (id, table_name, action, old_data, new_data, timestamp)
```

---

## Summary

**Current Design:**
- ✅ Normalized to 3NF
- ✅ Proper foreign key constraints
- ✅ Unique constraints to prevent duplicates
- ✅ Cascading deletes for data consistency
- ✅ Indexes for performance
- ✅ Suitable for medium-scale application

**Safety Measures:**
- ✅ Referential integrity
- ✅ Data validation
- ✅ Automatic timestamps
- ✅ Backup capabilities

---

**Last Updated**: 2025-11-30
