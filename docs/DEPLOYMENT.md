# Deployment Guide

## Table of Contents
1. [Render Deployment](#render-deployment)
2. [GitHub Setup](#github-setup)
3. [Environment Configuration](#environment-configuration)
4. [Testing Deployment](#testing-deployment)
5. [Troubleshooting](#troubleshooting)

---

## Render Deployment

### What is Render?

**Render** is a cloud platform that simplifies deployment of web applications.

**Pros**:
- ✅ Easy to use
- ✅ Free tier available
- ✅ Automatic deployments from GitHub
- ✅ SSL certificate included
- ✅ Custom domain support
- ✅ Environment variables management
- ✅ Logs and monitoring

**Cons**:
- ❌ Free tier may sleep after inactivity
- ❌ Limited computing resources
- ❌ Database not included (use external service)

---

### Step 1: Create GitHub Repository

#### 1.1 Initialize Local Git
```bash
cd d:\StudentCourse
git init
git add .
git commit -m "Initial commit: Student Course Management System"
```

#### 1.2 Create Remote Repository on GitHub

1. Go to https://github.com/new
2. Repository name: `StudentCourseManagementSystem`
3. Description: "Student Course Management System API with Express and Supabase"
4. Visibility: Public (for easy sharing)
5. Click "Create repository"

#### 1.3 Connect Local to Remote
```bash
git remote add origin https://github.com/YOUR_USERNAME/StudentCourseManagementSystem.git
git branch -M main
git push -u origin main
```

---

### Step 2: Create Render Account

1. Visit https://render.com
2. Click "Sign Up"
3. Choose "Sign up with GitHub" for easier integration
4. Authorize Render to access your GitHub account

---

### Step 3: Create Web Service on Render

#### 3.1 New Web Service

1. Dashboard → "New +" → "Web Service"
2. Connect GitHub repository:
   - Select your `StudentCourseManagementSystem` repo
   - Click "Connect"

#### 3.2 Configure Service

1. **Name**: `student-course-api`
2. **Environment**: `Node`
3. **Region**: Choose closest to your location
4. **Branch**: `main`
5. **Build Command**: `npm install`
6. **Start Command**: `npm start`

#### 3.3 Configure Environment Variables

In the "Environment" section, add:

```
SUPABASE_URL=your_supabase_project_url
SUPABASE_API_KEY=your_supabase_api_key
NODE_ENV=production
PORT=3000
```

**How to get values**:
1. Go to Supabase dashboard
2. Project Settings → API
3. Copy Project URL and Anon Key
4. Paste in Render environment variables

#### 3.4 Plan Selection

Choose: **Free** (or Paid if needed)

---

### Step 4: Deploy

1. Click "Create Web Service"
2. Wait for deployment (2-5 minutes)
3. View logs in real-time
4. Once "Live" appears, deployment successful

---

### Step 5: Get Your API URL

After deployment, Render provides URL:

```
https://your-service-name.onrender.com
```

Test it:
```bash
curl https://your-service-name.onrender.com/health
```

Expected response:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2025-11-30T..."
}
```

---

## GitHub Setup

### Repository Structure

```
StudentCourseManagementSystem/
├── .git/                    # Git data
├── src/
│   ├── config/
│   ├── controllers/
│   ├── routes/
│   └── server.js
├── docs/
│   ├── TEST_CASES.md
│   ├── DATABASE_DESIGN.md
│   └── ARCHITECTURE.md
├── .env.example
├── .gitignore
├── package.json
├── README.md
├── postman_collection.json
└── LICENSE (optional)
```

### Git Workflow Best Practices

#### Branch Strategy

**Main Branch**: Production-ready code
```bash
git checkout main
git pull origin main
```

**Development Branch**: Development work
```bash
git checkout -b develop
# make changes
git add .
git commit -m "Feature: Add validation"
git push origin develop
```

**Feature Branch**: Individual features
```bash
git checkout -b feature/student-validation
# make changes
git add .
git commit -m "Add email validation for students"
git push origin feature/student-validation
# Create Pull Request on GitHub
```

#### Commit Message Convention

```
[TYPE] Short description

Optional longer description explaining the why

TYPE:
  feat: New feature
  fix: Bug fix
  docs: Documentation
  style: Code style
  refactor: Code refactoring
  test: Test cases
  chore: Build/dependencies

Example:
  feat: Add search functionality for students
  
  - Implement ilike search in studentController
  - Add query parameter validation
  - Add test cases for search endpoint
```

#### Pull Request Workflow

1. Create feature branch
2. Make changes
3. Commit with descriptive messages
4. Push to GitHub
5. Create Pull Request
6. Code review (if team)
7. Merge to main
8. Deploy

### .gitignore Configuration

Your `.gitignore` should have:
```
node_modules/
.env
.env.local
.DS_Store
*.log
npm-debug.log*
dist/
build/
.vscode/
```

---

## Environment Configuration

### Local Development (.env)

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_API_KEY=your_anon_key_here
PORT=3000
NODE_ENV=development
```

### Render Production (.env)

Same variables through Render dashboard UI (never commit .env!)

### Environment Variables Explanation

| Variable | Purpose | Example |
|----------|---------|---------|
| SUPABASE_URL | Database host | https://xyz.supabase.co |
| SUPABASE_API_KEY | Database auth token | eyJhbGciOiJIUzI1NiIs... |
| NODE_ENV | Environment mode | development/production |
| PORT | Server port | 3000 |

---

## Testing Deployment

### 1. Test Root Endpoint
```bash
GET https://your-service-name.onrender.com/
```

Response should show available endpoints.

### 2. Update Postman Base URL

Change in Postman:
```
Old: http://localhost:3000/api
New: https://your-service-name.onrender.com/api
```

### 3. Run API Tests

1. Create Student
   ```
   POST /api/students
   ```

2. Create Course
   ```
   POST /api/courses
   ```

3. Create Enrollment
   ```
   POST /api/enrollments
   ```

4. Verify Data
   ```
   GET /api/students
   GET /api/courses
   GET /api/enrollments
   ```

### 4. Check Logs

In Render dashboard:
- Logs tab shows all server output
- Errors appear in red
- Check for database connection issues

---

## Monitoring & Maintenance

### Health Checks
```bash
# Every 5 minutes, check if API is alive
curl https://your-service-name.onrender.com/health

# If fails, Render auto-restarts the service
```

### View Logs
1. Render Dashboard → Your Web Service
2. Click "Logs" tab
3. View real-time server output

### Redeploy
```bash
# Push new changes to main branch
git add .
git commit -m "Bug fix"
git push origin main

# Render auto-redeploys within 1 minute
```

### Manual Redeploy
1. Render Dashboard
2. Click "Manual Deploy" → "Deploy latest"

---

## Troubleshooting

### Issue 1: Build Fails

**Symptoms**: "Build failed" in Render dashboard

**Solutions**:
1. Check Build Command output in logs
2. Verify package.json exists
3. Ensure all dependencies listed
4. Try locally: `npm install`

### Issue 2: Application Crashes on Start

**Symptoms**: "Web service is crashed" error

**Solutions**:
1. Check START COMMAND is correct: `npm start`
2. Verify server.js exists at correct path
3. Check environment variables set correctly
4. Look at logs for specific error

### Issue 3: Database Connection Failed

**Symptoms**: API returns 500, logs show "Cannot connect to Supabase"

**Solutions**:
1. Verify SUPABASE_URL in Render environment
2. Verify SUPABASE_API_KEY is correct
3. Check Supabase project is active
4. Test credentials locally first

### Issue 4: CORS Errors

**Symptoms**: Browser shows "CORS policy: blocked request"

**Solutions**:
1. Ensure `cors()` is in server.js
2. Add origin to CORS config if needed
3. Postman doesn't have CORS restrictions

### Issue 5: Service Sleeping (Free Tier)

**Symptoms**: First request is slow (10-30 seconds)

**Solutions**:
1. Render sleeps free services after 15 min inactivity
2. First request wakes it up (takes time)
3. Upgrade to paid plan if needed

---

## Performance Optimization

### Response Time Improvement

**Local (Development)**:
- Typical: 50-100ms

**Deployed (Render)**:
- Cold start: 5-10 seconds (first request)
- Warm: 100-200ms (subsequent requests)

**Optimization Tips**:
1. Add database indexes (already done)
2. Use pagination for large result sets
3. Add caching layer (Redis)
4. Use CDN for static files

### Database Performance

**Current Indexes**:
```sql
CREATE INDEX idx_students_email ON students(email);
CREATE INDEX idx_enrollments_student_id ON enrollments(student_id);
CREATE INDEX idx_enrollments_course_id ON enrollments(course_id);
```

---

## Cost Analysis

### Free Tier (Render)

| Item | Cost |
|------|------|
| Web Service | FREE |
| Bandwidth | 100 GB/month FREE |
| Storage | Limited to project |
| **Total** | **FREE** |

### Paid Tier (if needed)

| Item | Cost |
|------|------|
| Web Service | $7+/month |
| Bandwidth | Included |
| Support | Priority support |

### Supabase

| Item | Cost |
|------|------|
| Database | FREE (up to 500 MB) |
| Storage | FREE (1 GB) |
| Real-time | Included |
| **Total** | **FREE** (for small projects) |

---

## Production Checklist

Before going live:

- [ ] README.md completed
- [ ] .env.example created (no secrets)
- [ ] .gitignore includes node_modules and .env
- [ ] package.json has correct start script
- [ ] Database indexes created
- [ ] API tested locally
- [ ] GitHub repository created
- [ ] Render account created
- [ ] Environment variables configured
- [ ] Deployment successful
- [ ] API endpoints tested on live URL
- [ ] Postman collection imported and tested
- [ ] Logs monitoring setup
- [ ] Backup strategy documented

---

## Future Deployments

### Update Process

1. Make code changes locally
2. Test locally
3. Commit and push to GitHub
   ```bash
   git add .
   git commit -m "Feature: Add new endpoint"
   git push origin main
   ```
4. Render auto-deploys
5. Verify deployment in Render logs

### Rollback

If deployment breaks:

1. Previous version still accessible
2. Render keeps deployment history
3. Click "Deploy" on previous version to rollback
4. Fix issue locally
5. Push corrected code

---

## Deployment Diagram

```
┌──────────────┐
│  Local Dev   │
│ (Your PC)    │
└──────┬───────┘
       │ git push
       ▼
┌──────────────┐
│    GitHub    │
│  Repository  │
└──────┬───────┘
       │ webhook
       ▼
┌──────────────┐
│   Render     │
│  Deploys     │
└──────┬───────┘
       │
       ├─ Install dependencies (npm install)
       ├─ Run start command (npm start)
       ├─ Set environment variables
       └─ Start server on https://url.onrender.com
       
       ▼
┌──────────────┐
│  Production  │
│  Live API    │
└──────────────┘
```

---

## Support Resources

- Render Docs: https://render.com/docs
- GitHub Docs: https://docs.github.com
- Supabase Docs: https://supabase.io/docs
- Express Docs: https://expressjs.com/

---

**Last Updated**: 2025-11-30
