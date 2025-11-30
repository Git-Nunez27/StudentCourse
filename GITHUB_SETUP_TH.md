# 🐙 GitHub Setup Guide - วิธีตั้งค่า GitHub Repository

## 📌 บทนำ

ไฟล์นี้อธิบายวิธีการตั้งค่า GitHub repository สำหรับโปรเจกต์ Student Course Management System

---

## ✅ ขั้นตอนที่ 1: สร้าง GitHub Account

### 1️⃣ ไปที่ GitHub

- เข้า https://github.com
- คลิก "Sign up"
- ใส่ email และ password
- ยืนยัน email

---

## 📚 ขั้นตอนที่ 2: สร้าง Repository

### 1️⃣ สร้าง Repository ใหม่

1. คลิก "+" มุมบนขวา
2. เลือก "New repository"
3. ตั้งค่า:
   - **Repository name:** `StudentCourse`
   - **Description:** `Student Course Management System API`
   - **Public/Private:** Public (แนะนำ)
   - **Initialize with:** ไม่ต้อง
4. คลิก "Create repository"

---

### 2️⃣ Copy Repository URL

```
https://github.com/YOUR-USERNAME/StudentCourse.git
```

---

## 🔧 ขั้นตอนที่ 3: Setup Local Git

### 1️⃣ Configure Git

```bash
# ตั้ง username (ใช้ครั้งแรกเท่านั้น)
git config --global user.name "Your Name"

# ตั้ง email (ใช้ครั้งแรกเท่านั้น)
git config --global user.email "your.email@example.com"

# ตรวจสอบ config
git config --global --list
```

---

### 2️⃣ Initialize Local Repository

```bash
# ไปที่ StudentCourse folder
cd D:\StudentCourse

# Initialize git
git init

# ตรวจสอบ
ls -la | grep .git
```

---

## 🔗 ขั้นตอนที่ 4: Connect to GitHub

### 1️⃣ Add Remote Origin

```bash
# Add remote
git remote add origin https://github.com/YOUR-USERNAME/StudentCourse.git

# Verify
git remote -v
```

**ผลลัพธ์:**
```
origin  https://github.com/YOUR-USERNAME/StudentCourse.git (fetch)
origin  https://github.com/YOUR-USERNAME/StudentCourse.git (push)
```

---

## 📤 ขั้นตอนที่ 5: First Commit & Push

### 1️⃣ Stage Files

```bash
# Add all files
git add .

# Check status
git status
```

---

### 2️⃣ Create First Commit

```bash
# Commit
git commit -m "Initial commit: Student Course Management System"
```

---

### 3️⃣ Push to GitHub

```bash
# Push to GitHub (first time - set upstream)
git branch -M main
git push -u origin main

# Subsequent pushes
git push
```

---

## 🌳 ขั้นตอนที่ 6: Setup Branching

### 1️⃣ Create Develop Branch

```bash
# Create develop branch
git checkout -b develop

# Push to GitHub
git push -u origin develop
```

---

### 2️⃣ Set Default Branch (Optional)

On GitHub:
1. Go to Settings → Branches
2. Set default branch to `develop`

---

## 🔐 ขั้นตอนที่ 7: Setup GitHub Settings

### 1️⃣ Repository Settings

**On GitHub → Settings:**

- [ ] Add description
- [ ] Add topics
- [ ] Add README
- [ ] Add license (MIT)

---

### 2️⃣ Branch Protection Rules

**On GitHub → Settings → Branches:**

**Protect main branch:**
- Require pull request reviews before merging
- Require status checks to pass
- Require branches to be up to date

---

### 3️⃣ Collaborators

**On GitHub → Settings → Collaborators:**

- Add team members
- Set permissions (maintain/push/pull)

---

## 🔄 ขั้นตอนที่ 8: Daily Workflow

### คำสั่งทั่วไป

```bash
# Pull latest changes
git pull origin develop

# Create feature branch
git checkout -b feature/your-feature

# Make changes...
# Edit files...

# Stage changes
git add .

# Commit
git commit -m "feat: description"

# Push
git push -u origin feature/your-feature

# On GitHub: Create Pull Request
# After review: Merge
```

---

## 👥 Collaboration Workflow

### สำหรับผู้ร่วมงาน

```bash
# 1. Clone repository
git clone https://github.com/YOUR-USERNAME/StudentCourse.git
cd StudentCourse

# 2. Switch to develop
git checkout develop

# 3. Create feature branch
git checkout -b feature/your-feature

# 4. Make changes and commit
git add .
git commit -m "feat: your changes"

# 5. Push to GitHub
git push -u origin feature/your-feature

# 6. Create Pull Request on GitHub

# 7. After approval & merge
git checkout develop
git pull origin develop
git branch -d feature/your-feature
```

---

## 🚨 Troubleshooting

### Authentication Errors

```bash
# Error: authentication failed

# Solution 1: Use SSH key
# Generate SSH key
ssh-keygen -t rsa -b 4096 -C "your.email@example.com"

# Add to GitHub → Settings → SSH keys

# Solution 2: Use Personal Access Token
# On GitHub → Settings → Developer settings → Personal access tokens
# Generate token
# Use token as password when prompted
```

---

### Merge Conflicts

```bash
# Pull changes
git pull origin develop

# Resolve conflicts in files

# Stage resolved files
git add .

# Commit
git commit -m "Resolve merge conflicts"

# Push
git push
```

---

### Accidentally Pushed to Wrong Branch

```bash
# Undo recent push (only if not merged)
git reset --hard HEAD~1
git push -f origin feature/your-feature
```

---

## 📋 Checklist - GitHub Setup

- [ ] GitHub account created
- [ ] Repository created
- [ ] Repository cloned locally
- [ ] Git configured (name, email)
- [ ] First commit pushed
- [ ] develop branch created
- [ ] Branch protection enabled
- [ ] .gitignore configured
- [ ] README.md present
- [ ] Contributing guide added

---

## 🔍 Verify Setup

```bash
# Check remote
git remote -v

# Check branches
git branch -a

# Check status
git status

# Check logs
git log --oneline
```

---

## 📚 Additional Resources

| Resource | Link |
|----------|------|
| GitHub Docs | https://docs.github.com |
| Git Workflow | GIT_WORKFLOW_TH.md |
| Git Commands | GIT_COMMANDS_TH.md |
| Contributing | CONTRIBUTING.md |

---

## ✅ Next Steps

1. ✅ สร้าง GitHub Account
2. ✅ สร้าง Repository
3. ✅ Setup Local Git
4. ✅ Push to GitHub
5. ⏳ Invite collaborators
6. ⏳ Setup branch protection
7. ⏳ Start contributing!

---

**สร้างเมื่อ:** 2025-11-30  
**อัปเดตล่าสุด:** 2025-11-30  
**ระดับ:** ⭐ ง่าย  
**เวลาศึกษา:** 15-20 นาที
