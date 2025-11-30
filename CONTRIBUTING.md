# 🤝 Contributing Guide - วิธีการมีส่วนร่วม

## 📌 บทนำ

ยินดีต้อนรับสู่โปรเจกต์ Student Course Management System! ไฟล์นี้อธิบายวิธีการมีส่วนร่วมในการพัฒนาระบบ

---

## 🎯 วัตถุประสงค์

- 🤝 ให้สมาชิกทีมสามารถมีส่วนร่วมได้อย่างมีประสิทธิภาพ
- 🏗️ รักษาคุณภาพของโค้ด
- 📚 เก็บประวัติของการเปลี่ยนแปลง
- 🔄 ลดความขัดแย้งในการทำงาน

---

## ✅ Prerequisites

ก่อนเริ่มพัฒนา ตรวจสอบว่าคุณมี:

- [ ] Git installed
- [ ] Node.js v16+
- [ ] Supabase account
- [ ] GitHub account
- [ ] Postman (สำหรับ testing)
- [ ] VS Code หรือ code editor
- [ ] Terminal/Command line

**ติดตั้ง:**
```bash
# Check Node.js
node --version  # v16+ required

# Check Git
git --version
```

---

## 🚀 การเริ่มต้นแรก

### 1️⃣ Fork Repository

1. ไปที่ GitHub repository
2. คลิก "Fork" (มุมบนขวา)
3. เลือก account ของคุณ
4. รอให้ fork เสร็จ

---

### 2️⃣ Clone Your Fork

```bash
# Clone your fork
git clone https://github.com/YOUR-USERNAME/StudentCourse.git
cd StudentCourse

# Add upstream remote
git remote add upstream https://github.com/ORIGINAL-REPO/StudentCourse.git

# Verify remotes
git remote -v
```

**ผลลัพธ์:**
```
origin    https://github.com/YOUR-USERNAME/StudentCourse.git (fetch)
origin    https://github.com/YOUR-USERNAME/StudentCourse.git (push)
upstream  https://github.com/ORIGINAL-REPO/StudentCourse.git (fetch)
upstream  https://github.com/ORIGINAL-REPO/StudentCourse.git (nofetch)
```

---

### 3️⃣ Setup Development Environment

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Fill in Supabase credentials
# SUPABASE_URL=your_url
# SUPABASE_API_KEY=your_key

# Start server
npm start
```

---

## 🌳 Branching Strategy

### Branch Naming Convention

| Type | Pattern | Example |
|------|---------|---------|
| Feature | `feature/<feature-name>` | `feature/student-search` |
| Bug Fix | `fix/<bug-name>` | `fix/validation-error` |
| Documentation | `docs/<doc-name>` | `docs/api-guide` |
| Hotfix | `hotfix/<critical-bug>` | `hotfix/database-connection` |
| Testing | `test/<test-name>` | `test/unit-tests` |
| Chore | `chore/<task>` | `chore/update-dependencies` |

---

### Create Feature Branch

```bash
# Update develop branch
git checkout develop
git pull upstream develop

# Create feature branch
git checkout -b feature/your-feature-name

# Verify you're on the right branch
git branch
```

---

## ✍️ Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type

- **feat** - เพิ่มฟีเจอร์ใหม่
- **fix** - แก้ไข bug
- **docs** - เปลี่ยน documentation
- **style** - เปลี่ยน code style (formatting, semicolons, etc)
- **refactor** - ปรับโครงสร้าง code (ไม่มี feature/bug fix)
- **test** - เพิ่ม/แก้ไข tests
- **chore** - อื่นๆ (dependencies, build scripts)

### Scope

Component ที่ได้รับผลกระทบ:
- `student`
- `course`
- `enrollment`
- `database`
- `routes`
- `config`

### Subject

- ใช้ Imperative mood ("add" ไม่ใช่ "added")
- ไม่เริ่มด้วยตัวอักษรใหญ่
- ไม่มี period (.) ท้าย

### Examples

```bash
# Good
git commit -m "feat(student): add search functionality"
git commit -m "fix(course): correct validation logic"
git commit -m "docs: update API documentation"

# Bad
git commit -m "Added new features"
git commit -m "fixed bugs"
git commit -m "Updated everything"
```

---

## 📝 Writing Code

### Code Style Guidelines

#### 1️⃣ JavaScript Style

```javascript
// ✅ Good
const getAllStudents = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('students')
      .select('*');
    
    if (error) throw error;
    
    return res.status(200).json({
      success: true,
      message: 'ดึงข้อมูลนักเรียนเสร็จสมบูรณ์',
      data,
      count: data.length
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// ❌ Bad
const getAllStudents = async (req, res) => {
  let students = await supabase.from('students').select('*');
  res.json(students);
};
```

#### 2️⃣ Naming Conventions

```javascript
// Functions - camelCase
const getAllStudents = () => {};
const createNewStudent = () => {};

// Variables - camelCase
const studentId = '';
const totalEnrollments = 0;

// Constants - UPPER_SNAKE_CASE
const MAX_STUDENTS_PER_COURSE = 50;
const DB_TIMEOUT = 5000;

// Classes - PascalCase
class StudentController {}
class DatabaseConnection {}
```

#### 3️⃣ Comments & Documentation

```javascript
/**
 * ดึงนักเรียนทั้งหมด
 * @route GET /api/students
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with students array
 * @throws {Error} Database error
 */
const getAllStudents = async (req, res) => {
  // Implementation...
};
```

#### 4️⃣ Error Handling

```javascript
// ✅ Good - Consistent error response
try {
  // Code...
} catch (error) {
  console.error('Error message:', error);
  return res.status(500).json({
    success: false,
    message: 'ข้อผิดพลาด: ' + error.message,
    error: 'INTERNAL_SERVER_ERROR'
  });
}

// ❌ Bad - Inconsistent error handling
if (!data) {
  res.send('Error');
}
```

---

### File Structure

```
src/
├── server.js                      # Main entry point
├── config/
│   └── supabase.js               # Database config
├── controllers/
│   ├── studentController.js      # Student logic
│   ├── courseController.js       # Course logic
│   └── enrollmentController.js   # Enrollment logic
└── routes/
    ├── studentRoutes.js          # Student routes
    ├── courseRoutes.js           # Course routes
    └── enrollmentRoutes.js       # Enrollment routes
```

**Rules:**
- 1 controller per file
- 1 route file per resource
- Keep functions focused (Single Responsibility)
- Maximum 300 lines per file

---

## 🧪 Testing

### Before Pushing Code

#### 1️⃣ Syntax Check

```bash
# Check for syntax errors
node -c src/controllers/studentController.js
```

#### 2️⃣ Run Server

```bash
npm start
# ✅ Server should start without errors
```

#### 3️⃣ Manual Testing with Postman

1. Open Postman
2. Run test collection
3. Verify all tests pass

#### 4️⃣ Test Checklist

- [ ] All endpoints return correct status codes
- [ ] Response format is consistent
- [ ] Error messages are meaningful
- [ ] Database operations work correctly
- [ ] No console.log left in code
- [ ] No hardcoded values
- [ ] Validation works correctly

---

## 🚀 Pushing Changes

### Step 1: Update with Latest Changes

```bash
# Fetch latest changes from upstream
git fetch upstream

# Rebase your branch
git rebase upstream/develop

# If conflicts occur
# 1. Resolve conflicts
# 2. git add .
# 3. git rebase --continue
```

---

### Step 2: Commit & Push

```bash
# Stage changes
git add .

# Commit with message
git commit -m "feat(student): add search functionality"

# Push to your fork
git push -u origin feature/your-feature-name
```

---

### Step 3: Create Pull Request

**On GitHub:**

1. Go to your forked repository
2. Click "Compare & pull request"
3. Fill in PR details:
   - **Title:** Clear and concise
   - **Description:** What changed and why
   - **Fixes:** Link to related issues

### PR Template

```markdown
## Description
อธิบายสิ่งที่เปลี่ยนแปลง

## Type of Change
- [ ] ✨ Feature
- [ ] 🐛 Bug fix
- [ ] 📚 Documentation
- [ ] 🔄 Refactoring

## Related Issues
Closes #123

## Screenshots (if applicable)

## Testing Done
- [ ] Manual testing
- [ ] Postman tests
- [ ] Error scenarios

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-reviewed code
- [ ] Commented complex areas
- [ ] Updated documentation
- [ ] No breaking changes
- [ ] Tests pass

## Reviewer Notes
สิ่งที่ต้องให้ reviewer ให้ความสำคัญ
```

---

## 👀 Code Review Process

### As an Author

1. **Respond to feedback promptly**
   - ตอบคำถามที่ชัดเจน
   - อธิบายการเลือก design

2. **Make requested changes**
   - ทำ commits ใหม่
   - Push ขึ้น branch เดิม
   - Don't force push (unless asked)

3. **Request re-review**
   - คลิก "Re-request review" หลังแก้ไข

### As a Reviewer

1. **Check code quality**
   - Follows conventions?
   - Well documented?
   - Error handling?

2. **Test the changes**
   - Clone feature branch
   - Run locally
   - Test with Postman

3. **Give feedback**
   - "Request changes" - must fix
   - "Comment" - suggestion
   - "Approve" - ready to merge

---

## ✅ Merging

### Requirements Before Merge

- [ ] All checks passed
- [ ] At least 1 approval
- [ ] No merge conflicts
- [ ] Code review complete
- [ ] Tests passing

### Merge Strategy

```
main (production)
  ↑
develop (staging)
  ↑
feature branch
```

**Process:**
1. Feature branch → develop (via PR)
2. develop → main (version release)

---

## 🆘 Troubleshooting

### Merge Conflicts

```bash
# See conflicts
git status

# Open conflicting file
# Look for <<<<< HEAD === >>>>>

# Fix conflicts manually
# Then:
git add .
git commit -m "Resolve merge conflicts"
```

---

### Accidentally Committed to Wrong Branch

```bash
# Undo last commit (keep changes)
git reset --soft HEAD~1

# Switch to correct branch
git checkout -b correct-branch

# Commit again
git commit -m "message"
```

---

### Need to Update Branch

```bash
# Fetch latest
git fetch upstream

# Rebase onto latest develop
git rebase upstream/develop

# Push (may need force if already pushed)
git push origin feature/your-feature --force-with-lease
```

---

## 📚 Documentation

### When to Document

- [ ] New endpoints added
- [ ] Database schema changes
- [ ] New configuration options
- [ ] Breaking changes
- [ ] Complex algorithms

### What to Document

```markdown
## Feature Name

### Description
อธิบาย feature ที่เพิ่ม

### API Changes
Endpoint ใหม่/เปลี่ยน:
```
GET /api/endpoint
```

### Database Changes
Schema ใหม่/เปลี่ยน

### Usage Example
```javascript
const result = await function();
```

### Testing
วิธีทดสอบ
```

---

## 🎓 Best Practices

| Practice | ✅ Do | ❌ Don't |
|----------|------|---------|
| Commits | Small, focused | Large, mixed |
| Branches | Feature-specific | Long-lived |
| Messages | Clear, descriptive | Vague, abbreviated |
| Code | DRY, tested | Duplicated, untested |
| Pushes | Frequent | Infrequent, massive |
| Reviews | Collaborative | Competitive |

---

## 🚨 Code of Conduct

### Be Respectful
- Treat all contributors with respect
- Welcome newcomers
- Provide constructive feedback

### Be Professional
- Use clear, professional language
- Avoid personal attacks
- Focus on code, not coder

### Be Helpful
- Answer questions patiently
- Help others learn
- Share knowledge

### Report Issues
- Use GitHub Issues
- Describe problem clearly
- Provide steps to reproduce

---

## 📞 Getting Help

| Question | Resource |
|----------|----------|
| Git help | GIT_COMMANDS_TH.md |
| API docs | API_RESPONSE_REFERENCE_TH.md |
| Workflow | GIT_WORKFLOW_TH.md |
| Errors | ERROR_HANDLING_GUIDE_TH.md |
| Setup | QUICK_START_GUIDE_TH.md |

---

## 🎯 Summary Checklist

### Before Creating PR

- [ ] Branch created from develop
- [ ] Branch name follows convention
- [ ] Code follows style guide
- [ ] Commits have good messages
- [ ] All tests pass
- [ ] Documentation updated
- [ ] No console.log statements
- [ ] No hardcoded values
- [ ] Changes are tested
- [ ] PR description is clear

### After Submitting PR

- [ ] Respond to feedback
- [ ] Make requested changes
- [ ] Request re-review
- [ ] Wait for approval
- [ ] Merge when ready
- [ ] Delete branch
- [ ] Celebrate! 🎉

---

**Thank you for contributing! 🙏**

---

**สร้างเมื่อ:** 2025-11-30  
**อัปเดตล่าสุด:** 2025-11-30  
**Version:** 1.0  
**Status:** Active
