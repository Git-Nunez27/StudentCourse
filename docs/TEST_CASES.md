# API Test Cases

## Test Case Summary
Total Test Cases: 18

---

## 1. STUDENT ENDPOINTS

### TC-1.1: Get All Students
**Endpoint**: `GET /api/students`
**Expected Status**: 200
**Expected Response**: 
```json
{
  "success": true,
  "data": [...],
  "message": "Students retrieved successfully"
}
```

### TC-1.2: Create Student (Valid Data)
**Endpoint**: `POST /api/students`
**Request Body**:
```json
{
  "fullname": "John Doe",
  "email": "john@example.com",
  "major": "Computer Science"
}
```
**Expected Status**: 201
**Expected Response**: Student object with ID

### TC-1.3: Create Student (Missing Field)
**Endpoint**: `POST /api/students`
**Request Body**:
```json
{
  "fullname": "Jane Doe",
  "major": "IT"
}
```
**Expected Status**: 400
**Expected Response**: "Missing required fields: fullname, email, major"

### TC-1.4: Get Student by ID (Valid ID)
**Endpoint**: `GET /api/students/:id`
**Expected Status**: 200
**Expected Response**: Single student object

### TC-1.5: Get Student by ID (Invalid ID)
**Endpoint**: `GET /api/students/invalid-id`
**Expected Status**: 500
**Expected Response**: Error message

### TC-1.6: Update Student (Valid Data)
**Endpoint**: `PUT /api/students/:id`
**Request Body**:
```json
{
  "fullname": "John Updated",
  "email": "john.updated@example.com"
}
```
**Expected Status**: 200
**Expected Response**: Updated student object

### TC-1.7: Update Student (No Fields)
**Endpoint**: `PUT /api/students/:id`
**Request Body**: `{}`
**Expected Status**: 400
**Expected Response**: "No fields to update"

### TC-1.8: Delete Student (Valid ID)
**Endpoint**: `DELETE /api/students/:id`
**Expected Status**: 200
**Expected Response**: "Student deleted successfully"

### TC-1.9: Search Students
**Endpoint**: `GET /api/students/search?query=john`
**Expected Status**: 200
**Expected Response**: Array of matching students

### TC-1.10: Search Students (No Query)
**Endpoint**: `GET /api/students/search`
**Expected Status**: 400
**Expected Response**: "Search query is required"

---

## 2. COURSE ENDPOINTS

### TC-2.1: Get All Courses
**Endpoint**: `GET /api/courses`
**Expected Status**: 200
**Expected Response**: Array of courses

### TC-2.2: Create Course (Valid Data)
**Endpoint**: `POST /api/courses`
**Request Body**:
```json
{
  "name": "Web Development",
  "description": "Learn web development",
  "credit": 3
}
```
**Expected Status**: 201
**Expected Response**: Course object with ID

### TC-2.3: Create Course (Missing Field)
**Endpoint**: `POST /api/courses`
**Request Body**:
```json
{
  "name": "Database",
  "description": "Learn databases"
}
```
**Expected Status**: 400
**Expected Response**: "Missing required fields: name, description, credit"

### TC-2.4: Get Course by ID
**Endpoint**: `GET /api/courses/:id`
**Expected Status**: 200
**Expected Response**: Single course object

### TC-2.5: Update Course
**Endpoint**: `PUT /api/courses/:id`
**Request Body**:
```json
{
  "credit": 4
}
```
**Expected Status**: 200
**Expected Response**: Updated course object

### TC-2.6: Delete Course
**Endpoint**: `DELETE /api/courses/:id`
**Expected Status**: 200
**Expected Response**: "Course deleted successfully"

---

## 3. ENROLLMENT ENDPOINTS

### TC-3.1: Create Enrollment (Valid Data)
**Endpoint**: `POST /api/enrollments`
**Request Body**:
```json
{
  "student_id": "student-uuid",
  "course_id": "course-uuid"
}
```
**Expected Status**: 201
**Expected Response**: Enrollment object with student and course details

### TC-3.2: Create Enrollment (Student Not Found)
**Endpoint**: `POST /api/enrollments`
**Request Body**:
```json
{
  "student_id": "invalid-uuid",
  "course_id": "course-uuid"
}
```
**Expected Status**: 404
**Expected Response**: "Student not found"

### TC-3.3: Create Enrollment (Course Not Found)
**Endpoint**: `POST /api/enrollments`
**Request Body**:
```json
{
  "student_id": "student-uuid",
  "course_id": "invalid-uuid"
}
```
**Expected Status**: 404
**Expected Response**: "Course not found"

### TC-3.4: Create Enrollment (Duplicate)
**Endpoint**: `POST /api/enrollments`
**Request Body**: (Same student and course as TC-3.1)
**Expected Status**: 400
**Expected Response**: "Student is already enrolled in this course"

### TC-3.5: Get All Enrollments
**Endpoint**: `GET /api/enrollments`
**Expected Status**: 200
**Expected Response**: Array of enrollments with student and course details

### TC-3.6: Get Enrollment by ID
**Endpoint**: `GET /api/enrollments/:id`
**Expected Status**: 200
**Expected Response**: Single enrollment with details

### TC-3.7: Get Student's Courses
**Endpoint**: `GET /api/enrollments/student/:student_id`
**Expected Status**: 200
**Expected Response**: Array of courses for the student

### TC-3.8: Get Course's Students
**Endpoint**: `GET /api/enrollments/course/:course_id`
**Expected Status**: 200
**Expected Response**: Array of students in the course

### TC-3.9: Delete Enrollment
**Endpoint**: `DELETE /api/enrollments/:id`
**Expected Status**: 200
**Expected Response**: "Enrollment deleted successfully"

---

## Error Handling Test Cases

### Error Response Format
All errors follow this format:
```json
{
  "success": false,
  "message": "Error description"
}
```

### HTTP Status Codes
- **200**: Success (GET, PUT, DELETE)
- **201**: Created (POST)
- **400**: Bad Request (validation error)
- **404**: Not Found (resource doesn't exist)
- **500**: Server Error (database error)

---

## Test Execution Steps

### 1. Prerequisites
- Start the server: `npm start`
- Supabase database tables created
- Environment variables set

### 2. Execution Order
1. Test Student Creation (TC-1.2)
2. Test Course Creation (TC-2.2)
3. Test Enrollment Creation (TC-3.1)
4. Test Read Operations
5. Test Update Operations
6. Test Delete Operations
7. Test Error Cases

### 3. Data Cleanup
After testing, all created records can be deleted using the DELETE endpoints.

---

## Postman Collection Automation

The provided Postman collection includes:
- Pre-configured requests for all endpoints
- Environment variables for base URL and IDs
- Test scripts that auto-capture IDs for dependent requests
- Error handling in each request

### How to Use
1. Import `postman_collection.json` in Postman
2. Set environment variables:
   - `base_url`: http://localhost:3000/api
3. Run requests in the suggested order
4. Check response status and data

---

## Performance Considerations

### Response Times
- Get endpoints: < 100ms
- Create endpoints: < 200ms
- Update endpoints: < 200ms
- Delete endpoints: < 100ms

### Database Indexes
- Email on students table
- student_id on enrollments table
- course_id on enrollments table

These indexes improve query performance for common operations.

---

## Notes
- All timestamps use ISO 8601 format
- UUIDs are used for all primary keys
- Foreign key constraints prevent orphaned records
- UNIQUE constraint on (student_id, course_id) prevents duplicate enrollments
