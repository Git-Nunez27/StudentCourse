# Architecture & Use Cases

## System Architecture

### High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                          │
│  (Postman, Web Browser, Mobile App, Third-party Systems)    │
└────────────────────────┬──────────────────────────────────────┘
                         │ HTTP/REST
                         │
┌────────────────────────▼──────────────────────────────────────┐
│                    API GATEWAY LAYER                          │
│         (CORS, Request Validation, Rate Limiting)            │
└────────────────────────┬──────────────────────────────────────┘
                         │
┌────────────────────────▼──────────────────────────────────────┐
│                    APPLICATION LAYER                          │
│                   (Express.js Server)                        │
│  ┌──────────────────────────────────────────────────────┐    │
│  │          ROUTE LAYER (Routing Logic)                │    │
│  │  • /api/students                                    │    │
│  │  • /api/courses                                     │    │
│  │  • /api/enrollments                                 │    │
│  └──────────────┬───────────────────────────────────────┘    │
│                 │                                            │
│  ┌──────────────▼───────────────────────────────────────┐    │
│  │        CONTROLLER LAYER (Business Logic)            │    │
│  │  • studentController.js                             │    │
│  │  • courseController.js                              │    │
│  │  • enrollmentController.js                          │    │
│  │  - Request validation                               │    │
│  │  - Error handling                                   │    │
│  │  - Response formatting                              │    │
│  └──────────────┬───────────────────────────────────────┘    │
│                 │                                            │
│  ┌──────────────▼───────────────────────────────────────┐    │
│  │        SERVICE LAYER (Database Queries)             │    │
│  │  • supabase.js (Database client)                    │    │
│  │  - CRUD operations                                  │    │
│  │  - Data validation                                  │    │
│  └──────────────┬───────────────────────────────────────┘    │
└────────────────┼──────────────────────────────────────────────┘
                 │
┌────────────────▼──────────────────────────────────────────────┐
│                    DATA LAYER                                  │
│                 (Supabase/PostgreSQL)                         │
│  ┌────────────────────────────────────────────────────┐      │
│  │         Database Tables                           │      │
│  │  • students (id, fullname, email, major, ...)    │      │
│  │  • courses (id, name, description, credit, ...) │      │
│  │  • enrollments (id, student_id, course_id, ...) │      │
│  └────────────────────────────────────────────────────┘      │
└─────────────────────────────────────────────────────────────────┘
```

---

## MVC Architecture

```
REQUEST
   │
   ▼
┌─────────────────┐      ┌─────────────────┐      ┌──────────────┐
│   ROUTE LAYER   │─────▶│ CONTROLLER      │─────▶│   SERVICE    │
│                 │      │ (Business Logic)│      │ (Database)   │
│ Receives HTTP   │      │                 │      │              │
│ requests and    │      │ • Validation    │      │ • Queries    │
│ routes them to  │      │ • Error handling│      │ • CRUD ops   │
│ controllers     │      │ • Format output │      │              │
└────────┬────────┘      └────────┬────────┘      └──────┬───────┘
         │                        │                      │
         │                        │                      │
         └────────────────────────┼──────────────────────┘
                                  │
                          RESPONSE/DATA FLOW
                                  │
                                  ▼
                          RETURNS TO CLIENT
                          (JSON Response)
```

---

## Use Case Diagrams

### System Actors
1. **Student**: Views enrolled courses
2. **Teacher**: Manages courses and enrollments
3. **Administrator**: Full system management

### Use Cases

#### USE CASE 1: Student Views Enrolled Courses

```
        ┌─────────────────┐
        │    Student      │
        └────────┬────────┘
                 │
                 │ views
                 │
         ┌───────▼────────────┐
         │ View Enrolled       │
         │ Courses            │
         └────────┬────────────┘
                  │
                  │ includes
                  │
         ┌────────▼───────────────┐
         │ Get Student Details    │
         └────────────────────────┘

REST: GET /api/enrollments/student/:student_id
```

**Flow**:
1. Student requests their enrolled courses
2. System fetches student from database
3. System retrieves all enrollments for that student
4. System returns courses with enrollment details

---

#### USE CASE 2: Administrator Manages Students

```
        ┌─────────────────┐
        │ Administrator   │
        └────────┬────────┘
                 │
    ┌────────────┼────────────┬──────────────┐
    │            │            │              │
 Create      Read        Update           Delete
    │            │            │              │
    ▼            ▼            ▼              ▼
  Add New    View All    Edit Details   Remove
  Student    Students    of Student     Student

REST Endpoints:
POST   /api/students           - Create
GET    /api/students           - Read All
GET    /api/students/:id       - Read One
PUT    /api/students/:id       - Update
DELETE /api/students/:id       - Delete
```

**Detailed Flow for Create**:
1. Admin submits student form (name, email, major)
2. System validates data
3. System checks for duplicate email
4. System creates record in database
5. System returns confirmation with student ID

---

#### USE CASE 3: Teacher Manages Courses

```
        ┌──────────────┐
        │   Teacher    │
        └──────┬───────┘
               │
    ┌──────────┼──────────┬────────────┐
    │          │          │            │
Create    Publish    View         Update
Course    Course     Enrollments   Course

REST Endpoints:
POST   /api/courses        - Create
GET    /api/courses        - View All
GET    /api/courses/:id    - View Details
PUT    /api/courses/:id    - Update
GET    /api/enrollments/course/:id - View Enrollments
```

---

#### USE CASE 4: Enrollment Management

```
        ┌─────────────────┐
        │ Administrator   │
        └────────┬────────┘
                 │
    ┌────────────┼────────────┐
    │            │            │
Enroll     View          Cancel
Student    Enrollment    Enrollment
    │            │            │
    ▼            ▼            ▼
  POST       GET/GET        DELETE
  Create     Retrieved       Remove

REST Endpoints:
POST   /api/enrollments                    - Create
GET    /api/enrollments                    - View All
GET    /api/enrollments/:id                - View Single
GET    /api/enrollments/student/:id        - Student's Courses
GET    /api/enrollments/course/:id         - Course's Students
DELETE /api/enrollments/:id                - Cancel
```

**Detailed Flow for Enrollment**:
1. Admin selects student and course
2. System validates both exist
3. System checks no duplicate enrollment
4. System creates enrollment record
5. System returns confirmation with details

---

## API Communication Flow

### Example: Create Student and Enroll in Course

```
CLIENT                          SERVER                      DATABASE
  │                               │                            │
  │─────POST /students────────────▶│                            │
  │                                │──validate data──▶          │
  │                                │◀─────return─────          │
  │                                │───insert student─────────▶│
  │                                │◀────student id────────────│
  │◀───201 + student object────────│                            │
  │ {id: "uuid", name: "..."}      │                            │
  │                                │                            │
  │─────POST /courses─────────────▶│                            │
  │                                │───insert course───────────▶│
  │                                │◀────course id─────────────│
  │◀───201 + course object────────│                            │
  │ {id: "uuid", name: "..."}      │                            │
  │                                │                            │
  │─────POST /enrollments─────────▶│                            │
  │ {student_id, course_id}        │──validate both────────────▶│
  │                                │◀──validation result───────│
  │                                │───insert enrollment───────▶│
  │                                │◀──enrollment id───────────│
  │◀───201 + enrollment object────│                            │
```

---

## Error Handling Flow

```
REQUEST RECEIVED
      │
      ▼
┌──────────────────┐
│  VALIDATE INPUT  │
└────────┬─────────┘
         │
    ┌────▼────┐
    │          │
   Valid    Invalid
    │          │
    ▼          ▼
┌────────┐  ┌──────────────┐
│EXECUTE │  │ RETURN ERROR │
│QUERY   │  │ 400: Bad Req │
└────┬───┘  └──────────────┘
     │
   ┌─┴─┐
Success Error
   │    │
   ▼    ▼
┌────┐ ┌──────────────┐
│SEND│ │ RETURN ERROR │
│DATA│ │ 500: Server  │
└────┘ └──────────────┘
```

**Error Response Example**:
```json
{
  "success": false,
  "message": "Student not found"
}
```

---

## Data Flow Diagrams

### Student Creation Flow

```
1. REQUEST VALIDATION
   ├─ Check: fullname exists?
   ├─ Check: email exists?
   ├─ Check: major exists?
   └─ Check: email format valid?

2. BUSINESS LOGIC
   ├─ Check for duplicate email
   └─ Generate UUID for new student

3. DATABASE OPERATION
   ├─ INSERT into students table
   └─ Return created student object

4. RESPONSE FORMATTING
   ├─ Status: 201 Created
   └─ Body: Student object with ID
```

### Enrollment Creation Flow

```
1. REQUEST VALIDATION
   ├─ student_id exists in request?
   └─ course_id exists in request?

2. BUSINESS LOGIC
   ├─ Student exists in database?
   │   └─ If NO: Return 404
   ├─ Course exists in database?
   │   └─ If NO: Return 404
   └─ Enrollment already exists?
       └─ If YES: Return 400

3. DATABASE OPERATION
   ├─ INSERT into enrollments table
   ├─ JOIN with students table
   └─ JOIN with courses table

4. RESPONSE FORMATTING
   ├─ Status: 201 Created
   └─ Body: Complete enrollment details
```

---

## RESTful API Design Principles

### 1. Resource-Based URLs
```
✅ CORRECT
GET    /api/students              - Collection
POST   /api/students              - Create
GET    /api/students/:id          - Single resource
PUT    /api/students/:id          - Update
DELETE /api/students/:id          - Delete

❌ INCORRECT
GET  /api/getAllStudents
POST /api/createStudent
GET  /api/getStudent?id=123
```

### 2. HTTP Methods
```
GET    - Retrieve data (safe, idempotent)
POST   - Create new resource
PUT    - Update entire resource
PATCH  - Partial update
DELETE - Remove resource
```

### 3. Status Codes
```
200 - OK (successful GET, PUT, DELETE)
201 - Created (successful POST)
400 - Bad Request (invalid data)
404 - Not Found (resource doesn't exist)
409 - Conflict (duplicate enrollment)
500 - Server Error (database error)
```

### 4. Response Format
```json
{
  "success": true/false,
  "data": {},
  "message": "Human readable message"
}
```

---

## Technology Stack Rationale

| Component | Technology | Reason |
|-----------|-----------|--------|
| Runtime | Node.js | Event-driven, efficient, JavaScript |
| Framework | Express.js | Lightweight, flexible, large ecosystem |
| Database | Supabase | PostgreSQL, easy to use, real-time, free tier |
| Client | Postman | API testing, automation, collaboration |
| Deployment | Render | Simple deployment, free tier, auto-scaling |
| Version Control | Git/GitHub | Distributed, collaboration, backup |

---

## Scalability Considerations

### Current Capacity
- Single instance can handle ~1000 req/sec
- Database supports millions of records
- Suitable for: Small to medium institutions

### Future Scaling
1. **Horizontal**: Add multiple server instances behind load balancer
2. **Vertical**: Increase server resources (CPU, RAM)
3. **Database**: Enable replication, read replicas for reads
4. **Caching**: Add Redis for frequently accessed data
5. **CDN**: Distribute static content globally

---

## Security Considerations

### Current Implementation
- ✅ CORS enabled (configurable)
- ✅ Supabase provides authentication layer
- ✅ Input validation in controllers
- ✅ SQL injection prevention (using ORM)

### Future Enhancements
- Add JWT authentication
- Rate limiting
- API key management
- HTTPS enforcement
- Data encryption
- Audit logging

---

**Last Updated**: 2025-11-30
