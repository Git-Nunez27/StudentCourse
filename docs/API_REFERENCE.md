# API Reference Documentation

## Base URL
```
Local: http://localhost:3000/api
Production: https://your-service-name.onrender.com/api
```

---

## Table of Contents

1. [Health Check](#health-check)
2. [Students API](#students-api)
3. [Courses API](#courses-api)
4. [Enrollments API](#enrollments-api)
5. [Error Handling](#error-handling)
6. [Response Formats](#response-formats)

---

## Health Check

### Server Health Status

Check if the API is running and responsive.

**Request**:
```http
GET /health
Host: localhost:3000
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2025-11-30T10:30:45.123Z"
}
```

---

## Students API

### 1. Get All Students

Retrieve a list of all students in the system.

**Request**:
```http
GET /api/students
```

**Query Parameters**: None

**Response** (200 OK):
```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "fullname": "John Doe",
      "email": "john@example.com",
      "major": "Computer Science",
      "created_at": "2025-11-30T08:00:00.000Z"
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "fullname": "Jane Smith",
      "email": "jane@example.com",
      "major": "Information Technology",
      "created_at": "2025-11-30T08:15:00.000Z"
    }
  ],
  "message": "Students retrieved successfully"
}
```

---

### 2. Get Student by ID

Retrieve a specific student by their ID.

**Request**:
```http
GET /api/students/:id
```

**Path Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | UUID | Student's unique identifier |

**Example**:
```http
GET /api/students/550e8400-e29b-41d4-a716-446655440000
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "fullname": "John Doe",
    "email": "john@example.com",
    "major": "Computer Science",
    "created_at": "2025-11-30T08:00:00.000Z"
  },
  "message": "Student retrieved successfully"
}
```

**Error** (404 Not Found):
```json
{
  "success": false,
  "message": "Student not found"
}
```

---

### 3. Search Students

Search for students by name or email.

**Request**:
```http
GET /api/students/search?query=john
```

**Query Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| query | string | Yes | Search term (matches name or email) |

**Example Queries**:
- `?query=john` - Search by name
- `?query=john@example.com` - Search by email

**Response** (200 OK):
```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "fullname": "John Doe",
      "email": "john@example.com",
      "major": "Computer Science",
      "created_at": "2025-11-30T08:00:00.000Z"
    }
  ],
  "message": "Search completed successfully"
}
```

**Error** (400 Bad Request):
```json
{
  "success": false,
  "message": "Search query is required"
}
```

---

### 4. Create Student

Add a new student to the system.

**Request**:
```http
POST /api/students
Content-Type: application/json

{
  "fullname": "Alice Johnson",
  "email": "alice@example.com",
  "major": "Mathematics"
}
```

**Request Body**:
| Field | Type | Required | Constraints |
|-------|------|----------|------------|
| fullname | string | Yes | Non-empty, max 255 chars |
| email | string | Yes | Valid email format, unique |
| major | string | Yes | Non-empty, max 255 chars |

**Response** (201 Created):
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440002",
    "fullname": "Alice Johnson",
    "email": "alice@example.com",
    "major": "Mathematics",
    "created_at": "2025-11-30T10:30:00.000Z"
  },
  "message": "Student created successfully"
}
```

**Error** (400 Bad Request):
```json
{
  "success": false,
  "message": "Missing required fields: fullname, email, major"
}
```

---

### 5. Update Student

Modify an existing student's information.

**Request**:
```http
PUT /api/students/:id
Content-Type: application/json

{
  "fullname": "John Updated",
  "email": "john.new@example.com",
  "major": "Software Engineering"
}
```

**Path Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | UUID | Student's unique identifier |

**Request Body** (all fields optional):
| Field | Type | Constraints |
|-------|------|------------|
| fullname | string | max 255 chars |
| email | string | valid format, unique |
| major | string | max 255 chars |

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "fullname": "John Updated",
    "email": "john.new@example.com",
    "major": "Software Engineering",
    "created_at": "2025-11-30T08:00:00.000Z"
  },
  "message": "Student updated successfully"
}
```

**Error** (400 Bad Request):
```json
{
  "success": false,
  "message": "No fields to update"
}
```

---

### 6. Delete Student

Remove a student from the system.

**Request**:
```http
DELETE /api/students/:id
```

**Path Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | UUID | Student's unique identifier |

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Student deleted successfully"
}
```

**Note**: Deleting a student also deletes all their enrollments (CASCADE).

---

## Courses API

### 1. Get All Courses

Retrieve all available courses.

**Request**:
```http
GET /api/courses
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": [
    {
      "id": "650e8400-e29b-41d4-a716-446655440000",
      "name": "Web Development",
      "description": "Learn modern web development",
      "credit": 3,
      "created_at": "2025-11-30T08:00:00.000Z"
    },
    {
      "id": "650e8400-e29b-41d4-a716-446655440001",
      "name": "Database Design",
      "description": "Learn database concepts",
      "credit": 4,
      "created_at": "2025-11-30T08:15:00.000Z"
    }
  ],
  "message": "Courses retrieved successfully"
}
```

---

### 2. Get Course by ID

Retrieve a specific course.

**Request**:
```http
GET /api/courses/:id
```

**Path Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | UUID | Course's unique identifier |

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "id": "650e8400-e29b-41d4-a716-446655440000",
    "name": "Web Development",
    "description": "Learn modern web development",
    "credit": 3,
    "created_at": "2025-11-30T08:00:00.000Z"
  },
  "message": "Course retrieved successfully"
}
```

---

### 3. Create Course

Add a new course.

**Request**:
```http
POST /api/courses
Content-Type: application/json

{
  "name": "Mobile Development",
  "description": "Learn mobile app development",
  "credit": 4
}
```

**Request Body**:
| Field | Type | Required | Constraints |
|-------|------|----------|------------|
| name | string | Yes | Non-empty, max 255 chars |
| description | string | Yes | Non-empty, text |
| credit | integer | Yes | Positive number (1-6) |

**Response** (201 Created):
```json
{
  "success": true,
  "data": {
    "id": "650e8400-e29b-41d4-a716-446655440002",
    "name": "Mobile Development",
    "description": "Learn mobile app development",
    "credit": 4,
    "created_at": "2025-11-30T10:30:00.000Z"
  },
  "message": "Course created successfully"
}
```

---

### 4. Update Course

Modify course information.

**Request**:
```http
PUT /api/courses/:id
Content-Type: application/json

{
  "name": "Advanced Web Development",
  "credit": 4
}
```

**Request Body** (all fields optional):
| Field | Type | Constraints |
|-------|------|------------|
| name | string | max 255 chars |
| description | string | text |
| credit | integer | positive number |

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "id": "650e8400-e29b-41d4-a716-446655440000",
    "name": "Advanced Web Development",
    "description": "Learn modern web development",
    "credit": 4,
    "created_at": "2025-11-30T08:00:00.000Z"
  },
  "message": "Course updated successfully"
}
```

---

### 5. Delete Course

Remove a course.

**Request**:
```http
DELETE /api/courses/:id
```

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Course deleted successfully"
}
```

**Note**: Deleting a course removes all associated enrollments.

---

## Enrollments API

### 1. Get All Enrollments

Retrieve all student-course enrollments with details.

**Request**:
```http
GET /api/enrollments
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": [
    {
      "id": "750e8400-e29b-41d4-a716-446655440000",
      "enrollment_date": "2025-11-30T09:00:00.000Z",
      "student_id": "550e8400-e29b-41d4-a716-446655440000",
      "course_id": "650e8400-e29b-41d4-a716-446655440000",
      "students": {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "fullname": "John Doe",
        "email": "john@example.com"
      },
      "courses": {
        "id": "650e8400-e29b-41d4-a716-446655440000",
        "name": "Web Development",
        "credit": 3
      }
    }
  ],
  "message": "Enrollments retrieved successfully"
}
```

---

### 2. Get Enrollment by ID

Retrieve a specific enrollment.

**Request**:
```http
GET /api/enrollments/:id
```

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "id": "750e8400-e29b-41d4-a716-446655440000",
    "enrollment_date": "2025-11-30T09:00:00.000Z",
    "student_id": "550e8400-e29b-41d4-a716-446655440000",
    "course_id": "650e8400-e29b-41d4-a716-446655440000",
    "students": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "fullname": "John Doe",
      "email": "john@example.com"
    },
    "courses": {
      "id": "650e8400-e29b-41d4-a716-446655440000",
      "name": "Web Development",
      "credit": 3
    }
  },
  "message": "Enrollment retrieved successfully"
}
```

---

### 3. Get Student's Courses

Retrieve all courses enrolled by a specific student.

**Request**:
```http
GET /api/enrollments/student/:student_id
```

**Path Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| student_id | UUID | Student's unique identifier |

**Response** (200 OK):
```json
{
  "success": true,
  "data": [
    {
      "id": "650e8400-e29b-41d4-a716-446655440000",
      "name": "Web Development",
      "description": "Learn modern web development",
      "credit": 3,
      "enrollment_date": "2025-11-30T09:00:00.000Z"
    },
    {
      "id": "650e8400-e29b-41d4-a716-446655440001",
      "name": "Database Design",
      "description": "Learn database concepts",
      "credit": 4,
      "enrollment_date": "2025-11-30T09:30:00.000Z"
    }
  ],
  "message": "Student courses retrieved successfully"
}
```

---

### 4. Get Course's Students

Retrieve all students enrolled in a specific course.

**Request**:
```http
GET /api/enrollments/course/:course_id
```

**Path Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| course_id | UUID | Course's unique identifier |

**Response** (200 OK):
```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "fullname": "John Doe",
      "email": "john@example.com",
      "major": "Computer Science",
      "enrollment_date": "2025-11-30T09:00:00.000Z"
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "fullname": "Jane Smith",
      "email": "jane@example.com",
      "major": "IT",
      "enrollment_date": "2025-11-30T09:15:00.000Z"
    }
  ],
  "message": "Course students retrieved successfully"
}
```

---

### 5. Create Enrollment

Enroll a student in a course.

**Request**:
```http
POST /api/enrollments
Content-Type: application/json

{
  "student_id": "550e8400-e29b-41d4-a716-446655440000",
  "course_id": "650e8400-e29b-41d4-a716-446655440000"
}
```

**Request Body**:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| student_id | UUID | Yes | Valid student ID |
| course_id | UUID | Yes | Valid course ID |

**Response** (201 Created):
```json
{
  "success": true,
  "data": {
    "id": "750e8400-e29b-41d4-a716-446655440000",
    "enrollment_date": "2025-11-30T10:30:00.000Z",
    "student_id": "550e8400-e29b-41d4-a716-446655440000",
    "course_id": "650e8400-e29b-41d4-a716-446655440000",
    "students": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "fullname": "John Doe",
      "email": "john@example.com"
    },
    "courses": {
      "id": "650e8400-e29b-41d4-a716-446655440000",
      "name": "Web Development",
      "credit": 3
    }
  },
  "message": "Enrollment created successfully"
}
```

**Error** (404 Not Found):
```json
{
  "success": false,
  "message": "Student not found"
}
```

**Error** (400 Conflict):
```json
{
  "success": false,
  "message": "Student is already enrolled in this course"
}
```

---

### 6. Delete Enrollment

Remove a student from a course.

**Request**:
```http
DELETE /api/enrollments/:id
```

**Path Parameters**:
| Parameter | Type | Description |
|-----------|------|-------------|
| id | UUID | Enrollment's unique identifier |

**Response** (200 OK):
```json
{
  "success": true,
  "message": "Enrollment deleted successfully"
}
```

---

## Error Handling

### Error Response Format

All error responses follow this format:

```json
{
  "success": false,
  "message": "Human-readable error message"
}
```

### HTTP Status Codes

| Code | Name | Common Reasons |
|------|------|-----------------|
| 200 | OK | Successful GET, PUT, DELETE |
| 201 | Created | Successful POST |
| 400 | Bad Request | Validation error, missing fields |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Duplicate enrollment |
| 500 | Server Error | Database error |

### Common Error Messages

| Message | Cause | Solution |
|---------|-------|----------|
| "Missing required fields" | Incomplete request body | Include all required fields |
| "Student not found" | Invalid student_id | Use valid student UUID |
| "Course not found" | Invalid course_id | Use valid course UUID |
| "Student is already enrolled" | Duplicate enrollment | Student already in course |
| "No fields to update" | Empty PUT body | Provide at least one field |

---

## Response Formats

### Success Response Structure

```json
{
  "success": true,
  "data": {},           // Resource data or array
  "message": "..."      // Human-readable message
}
```

### Error Response Structure

```json
{
  "success": false,
  "message": "..."      // Error description
}
```

### Timestamp Format

All timestamps use ISO 8601 format:
```
2025-11-30T10:30:45.123Z
```

### UUID Format

All IDs use UUID v4 format:
```
550e8400-e29b-41d4-a716-446655440000
```

---

## Rate Limiting

Currently **no rate limiting** is enforced. For production deployment, consider implementing:
- Requests per second per IP
- Requests per minute per API key
- Throttling for large result sets

---

## Pagination (Future Enhancement)

Currently all GET requests return all records. Future versions will implement:
```
GET /api/students?page=1&limit=10&sort=created_at
```

---

## Authentication (Future Enhancement)

Currently API is open. Future versions will use:
- JWT tokens
- API keys
- OAuth 2.0

---

## CORS Policy

CORS is enabled for all origins in development. In production, restrict to:
```
Access-Control-Allow-Origin: https://your-frontend-domain.com
```

---

## Versioning

Current API version: **1.0.0**

Future versions may use path versioning:
```
/api/v1/students
/api/v2/students
```

---

**Last Updated**: 2025-11-30  
**API Version**: 1.0.0
