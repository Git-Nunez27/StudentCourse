# 🌳 Git Workflow Guide - การจัดการเวอร์ชัน

## 📌 บทนำ

ไฟล์นี้อธิบายวิธีการใช้ Git และ GitHub สำหรับการจัดการโค้ด โดยรวมถึง branching strategy, commit conventions, merge requests

---

## 🎯 วัตถุประสงค์ของ Git Workflow

| วัตถุประสงค์ | อธิบาย |
|------------|---------|
| 📝 **Track Changes** | ติดตามการเปลี่ยนแปลงโค้ด |
| 👥 **Collaboration** | ทำงานร่วมกับสมาชิกทีม |
| 🌳 **Branching** | แยกงานเป็น feature ต่างๆ |
| 🔄 **Code Review** | ตรวจสอบโค้ดก่อน merge |
| 📚 **Version Control** | เก็บเวอร์ชันประวัติ |
| 🚀 **Deployment** | Deploy code ไป Production |

---

## 🌳 Git Branching Strategy

### 📊 แบบแผน Branching

```
main (production)
  ↑
  ├── release/v1.0.0 (release branch)
  │
develop (staging)
  ↑
  ├── feature/auth (feature branch)
  ├── feature/database (feature branch)
  └── hotfix/bug-fix (hotfix branch)
```

---

### 🔑 ประเภท Branch หลัก

#### 1️⃣ main (Production)

**ความหมาย:** Code ที่ готов ไป production

**คุณสมบัติ:**
- ✅ Stable code only
- ✅ ทำ Tag สำหรับ version (v1.0.0, v1.0.1)
- ✅ Protected branch (ต้องผ่าน code review)
- ✅ Deploy ไป live server

**กฎ:**
```
❌ ห้ามแก้ไขตรง main
✅ ต้องผ่าน Pull Request จาก develop
✅ ต้องมี code review อย่างน้อย 1 คน
```

---

#### 2️⃣ develop (Staging/Development)

**ความหมาย:** Code ที่อยู่ระหว่างพัฒนา

**คุณสมบัติ:**
- ✅ Integration branch
- ✅ รวม feature ต่างๆ เข้ามา
- ✅ ทำ CI/CD testing
- ✅ Deploy ไป staging server

**กฎ:**
```
❌ ห้ามแก้ไขตรง develop
✅ ต้องมาจาก feature branch
✅ ต้องผ่าน Pull Request
```

---

#### 3️⃣ feature/* (Feature Branches)

**ความหมาย:** Branch สำหรับแต่ละฟีเจอร์ใหม่

**ตั้งชื่อ:**
```
feature/student-crud
feature/course-management
feature/enrollment-system
feature/authentication
feature/user-dashboard
```

**กฎ:**
```
✅ สร้างจาก: develop
✅ แก้ไขใน: feature branch
✅ Merge กลับ: develop
✅ Delete หลังจาก merge
```

---

#### 4️⃣ hotfix/* (Hotfix Branches)

**ความหมาย:** Branch สำหรับแก้ไขปัญหา urgent

**ตั้งชื่อ:**
```
hotfix/critical-bug
hotfix/security-patch
hotfix/database-error
```

**กฎ:**
```
✅ สร้างจาก: main
✅ Merge กลับ: main และ develop
✅ ใช้ฉุกเฉิน urgent เท่านั้น
```

---

#### 5️⃣ release/* (Release Branches)

**ความหมาย:** Branch สำหรับเตรียม release

**ตั้งชื่อ:**
```
release/v1.0.0
release/v1.1.0
release/v2.0.0
```

**กฎ:**
```
✅ สร้างจาก: develop
✅ แก้ไข: version, changelog
✅ Merge: main (ใช้ tag) + develop
```

---

## 📋 Git Workflow ทีละขั้นตอน

### ✅ ขั้นตอน 1: Clone Repository

```bash
# Clone project จาก GitHub
git clone https://github.com/your-username/StudentCourse.git

# ไปที่ folder project
cd StudentCourse

# ตรวจสอบ branch ปัจจุบัน
git branch -a
```

**ผลลัพธ์:**
```
* main
  develop
  origin/main
  origin/develop
```

---

### ✅ ขั้นตอน 2: สร้าง Feature Branch

```bash
# อัปเดต develop branch ให้ล่าสุด
git checkout develop
git pull origin develop

# สร้าง feature branch ใหม่
git checkout -b feature/student-crud

# หรือใช้คำสั่ง switch (Git 2.23+)
git switch -c feature/student-crud
```

**ผลลัพธ์:**
```
✅ Switched to a new branch 'feature/student-crud'
```

---

### ✅ ขั้นตอน 3: แก้ไข Code

```bash
# สร้างหรือแก้ไขไฟล์
# เช่น src/controllers/studentController.js

# ตรวจสอบ status
git status
```

**ผลลัพธ์:**
```
On branch feature/student-crud

modified:   src/controllers/studentController.js

nothing added to commit but untracked files present
```

---

### ✅ ขั้นตอน 4: Commit Changes

```bash
# เพิ่มไฟล์ที่เปลี่ยนแปลง
git add src/controllers/studentController.js
# หรือเพิ่มทั้งหมด
git add .

# ตรวจสอบ
git status

# Commit กับ message
git commit -m "feat: เพิ่มฟังก์ชัน get all students"
```

**Commit Message Format:**
```
<type>(<scope>): <subject>

<body>

<footer>

# ตัวอย่าง:
feat(student): เพิ่มฟังก์ชัน delete student
fix(course): แก้ไข query ค้นหา course
docs: อัปเดต README
style: ปรับ code format
refactor(router): ปรับปรุง router structure
test: เพิ่ม unit tests
```

**Types:**
- `feat`: ฟีเจอร์ใหม่
- `fix`: แก้ไข bug
- `docs`: documentation
- `style`: code formatting
- `refactor`: ปรับโครงสร้าง
- `test`: tests
- `chore`: อื่นๆ

---

### ✅ ขั้นตอน 5: Push Branch

```bash
# Push ไป GitHub
git push origin feature/student-crud

# หรือตั้ง upstream
git push -u origin feature/student-crud
```

**ผลลัพธ์:**
```
✅ remote: Create a pull request for 'feature/student-crud'
```

---

### ✅ ขั้นตอน 6: สร้าง Pull Request

**ใน GitHub:**
1. ไปที่ Repository หน้าแรก
2. เห็น "Compare & pull request" button
3. คลิก "New pull request"
4. ตั้งค่า:
   - **Base branch:** develop
   - **Compare branch:** feature/student-crud
5. ใส่ PR title และ description
6. คลิก "Create pull request"

**PR Template:**
```markdown
## 📝 Description
อธิบายสิ่งที่ทำ

## 🎯 Type of Change
- [ ] ฟีเจอร์ใหม่
- [ ] แก้ไข bug
- [ ] Breaking change

## ✅ Checklist
- [ ] Code review ด้วยตัวเอง
- [ ] ไม่มี console.log ซ่อน
- [ ] ทดสอบแล้ว
- [ ] อัปเดต documentation

## 📸 Screenshots (ถ้ามี)
```

---

### ✅ ขั้นตอน 7: Code Review

**ผู้ Review ต้องตรวจสอบ:**
- ✅ Code quality
- ✅ Testing coverage
- ✅ Documentation
- ✅ Performance impact
- ✅ Security issues

**Comment ใน PR:**
```
Request changes:
"ต้องแก้ไข error handling ให้ครบ"

Approve:
"ดี ผ่านการตรวจสอบแล้ว"
```

---

### ✅ ขั้นตอน 8: Merge Pull Request

**หลังจากได้ approval:**

1. ตรวจสอบ "All checks passed"
2. คลิก "Merge pull request"
3. เลือก merge type:
   - **Create a merge commit** (รักษา history)
   - **Squash and merge** (ลด commits)
   - **Rebase and merge** (linear history)
4. ลบ branch หลังจาก merge

---

### ✅ ขั้นตอน 9: ลบ Local Branch

```bash
# Switch กลับ develop
git checkout develop

# ลบ feature branch
git branch -d feature/student-crud

# ลบ remote branch
git push origin --delete feature/student-crud

# ตรวจสอบ
git branch -a
```

---

## 🔄 Commit Workflow ที่ดี

### ✅ Commit เล็กและเรียบร้อย

```bash
# ❌ ไม่ดี: Commit ขนาดใหญ่
git add .
git commit -m "update everything"

# ✅ ดี: Commits เล็กแยกตามฟีเจอร์
git add src/controllers/studentController.js
git commit -m "feat(student): เพิ่ม get all students"

git add src/routes/studentRoutes.js
git commit -m "feat(routes): เพิ่ม student routes"

git add docs/README.md
git commit -m "docs: อัปเดต README"
```

---

### ✅ กฎ Commit ที่ดี

| ข้อ | กฎ | ตัวอย่าง |
|----|----|---------|
| 1 | ใช้ Imperative mood | "Add feature" ไม่ใช่ "Added feature" |
| 2 | ขึ้นต้นด้วยตัวอักษรใหญ่ | "Add" ไม่ใช่ "add" |
| 3 | ไม่มี period ท้ายประโยค | "Add feature" ไม่ใช่ "Add feature." |
| 4 | Limit ที่ 50 characters | ชื่อเรื่อง |
| 5 | อธิบาย "what" และ "why" | ไม่ใช่ "how" |
| 6 | Atomic commits | 1 feature = 1 commit |

---

## 📊 การจัดการ Git History

### ✅ ดู Log

```bash
# ดู commits ล่าสุด
git log --oneline

# ดู commits กับ graph
git log --oneline --graph --all

# ดู commits ของ branch specific
git log feature/student-crud --oneline
```

---

### ✅ ยกเลิก Commits

```bash
# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Undo specific commit
git revert <commit-hash>
```

---

### ✅ Rebase vs Merge

#### Merge (รักษา history)
```bash
git checkout develop
git merge feature/student-crud
# ✅ ดู commits ทั้งหมด
# ✅ รักษา feature branch history
```

#### Rebase (linear history)
```bash
git checkout feature/student-crud
git rebase develop
git checkout develop
git merge feature/student-crud
# ✅ History สะอาด
# ❌ เปลี่ยน commit hashes
```

---

## 🔐 Git Best Practices

### ✅ ทำนาย Problems

```bash
# ❌ ไม่ดี
git push -f origin main  # Force push ทำลายประวัติ

# ✅ ดี
git push origin feature/student-crud  # Regular push
```

---

### ✅ ใช้ .gitignore

```bash
# Node.js
node_modules/
npm-debug.log
yarn-error.log

# Environment
.env
.env.local
.env.*.local

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
logs/
*.log
```

---

### ✅ ป้องกัน Secret Leaks

```bash
# ❌ ไม่ดี: Commit .env
git add .env
git commit -m "add env"

# ✅ ดี: ใช้ .env.example
git add .env.example
git commit -m "add env example"

# โดยไม่ add .env จริง
```

---

### ✅ ใช้ Git Hooks

**Pre-commit hook:** ตรวจสอบก่อน commit

```bash
# .git/hooks/pre-commit
#!/bin/bash
npm run lint
if [ $? -ne 0 ]; then
  echo "Linting failed"
  exit 1
fi
```

---

## 📚 Branching Strategy Decision Tree

```
ต้องทำอะไร?
│
├─ ฟีเจอร์ใหม่? → feature/feature-name
├─ แก้ไข bug? → fix/bug-name
├─ Urgent fix? → hotfix/critical-bug
├─ Release? → release/v1.0.0
└─ Docs? → docs/update-readme
```

---

## 🎯 สรุป Git Workflow

### ✅ Workflow ทั่วไป

```bash
# 1. Clone repository
git clone <repo-url>
cd StudentCourse

# 2. Create feature branch
git checkout develop
git pull origin develop
git checkout -b feature/student-crud

# 3. Make changes
# Edit files...

# 4. Commit changes
git add .
git commit -m "feat(student): add new feature"

# 5. Push to GitHub
git push -u origin feature/student-crud

# 6. Create Pull Request
# ใน GitHub UI

# 7. After merge
git checkout develop
git pull origin develop
git branch -d feature/student-crud
```

---

### ✅ Tips สำหรับการทำงานหลายคน

| Tip | อธิบาย |
|-----|---------|
| 🔄 **Pull บ่อย** | `git pull origin develop` ก่อนทำงาน |
| 📝 **Commit บ่อย** | ไม่ต้องรอจนถึงตอนจบ |
| 🌳 **Branch ต่างกัน** | ไม่ให้ชนกับคนอื่น |
| 👀 **Code Review** | ตรวจสอบก่อน merge |
| 🧪 **Test ก่อน** | ไม่ให้ push code ที่ขัดข้อง |

---

**สร้างเมื่อ:** 2025-11-30  
**อัปเดตล่าสุด:** 2025-11-30  
**ระดับ:** ⭐⭐ ปานกลาง (ต้องการความรู้ Git พื้นฐาน)  
**เวลาศึกษา:** ประมาณ 30 นาที
