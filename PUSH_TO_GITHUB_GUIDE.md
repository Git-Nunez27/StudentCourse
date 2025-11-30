# 📤 Push to GitHub Repository Guide

## วิธีการ Push งานขึ้น GitHub

---

## ✅ Requirements ที่ต้องเตรียม

### 1. Install Git
- Download จาก: https://git-scm.com/download/win
- วิธี Install:
  1. Run installer
  2. ใช้ default settings ตลอด (แนะนำ)
  3. Restart computer

### 2. Configure Git User
หลังจากติดตั้ง Git เสร็จ ให้รัน PowerShell และ Configure:

```powershell
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### 3. GitHub Account
- สร้าง GitHub Account ที่: https://github.com/signup
- Generate Personal Access Token:
  1. ไป: https://github.com/settings/tokens
  2. Click "Generate new token"
  3. ให้ permissions: repo, workflow
  4. Copy token (ใช้แทน password)

---

## 🚀 Push to GitHub - Step by Step

### Step 1: Initialize Git Repository (ถ้ายังไม่มี)
```powershell
cd D:\StudentCourse
git init
git add .
git commit -m "Initial commit: Student Course Management System"
```

### Step 2: Create Repository on GitHub
1. ไป https://github.com/new
2. กรอก:
   - Repository name: `StudentCourseManagement`
   - Description: `Student Course Management System with Express.js and Supabase`
   - Public or Private (แนะนำ: Public)
3. Click "Create repository"

### Step 3: Connect Local to Remote
```powershell
git remote add origin https://github.com/YOUR_USERNAME/StudentCourseManagement.git
git branch -M main
```

### Step 4: Push to GitHub
```powershell
git push -u origin main
```
- ถ้าถาม username → ใส่ GitHub username
- ถ้าถาม password → ใส่ Personal Access Token (ไม่ใช่ password)

---

## ✅ Verify Upload Success
```powershell
git remote -v
git log --oneline
```

ถ้าเห็น commits ที่เพิ่งสร้าง แสดงว่า Push สำเร็จ! ✅

---

## 📋 Full Commands (Copy-Paste Ready)

### สำหรับคนครั้งแรก:
```powershell
# ตำแหน่ง: D:\StudentCourse
cd D:\StudentCourse

# 1. Initialize
git init
git add .
git commit -m "Initial commit: Student Course Management System"

# 2. Set remote (เปลี่ยน YOUR_USERNAME เป็นของจริง)
git remote add origin https://github.com/YOUR_USERNAME/StudentCourseManagement.git
git branch -M main

# 3. Push
git push -u origin main
```

### สำหรับครั้งต่อไป (update code):
```powershell
cd D:\StudentCourse

# Check status
git status

# Add changes
git add .

# Commit
git commit -m "Your commit message here"

# Push
git push
```

---

## 🆘 Troubleshooting

### ❌ Error: "fatal: not a git repository"
**Solution:** Run `git init` ก่อน

### ❌ Error: "Permission denied"
**Solution:** 
- ตรวจสอบ Personal Access Token
- ใช้ token แทน password ถ้าถาม

### ❌ Error: "fatal: 'origin' does not appear to be a 'git' repository"
**Solution:** Run `git remote add origin https://...`

### ❌ Error: "Git is not recognized"
**Solution:** Install Git และ restart PowerShell

---

## 📚 Additional Resources

- **GIT_WORKFLOW_TH.md** - Branching strategy (feature, hotfix, release, etc.)
- **GIT_COMMANDS_TH.md** - 50+ Git commands reference
- **GITHUB_SETUP_TH.md** - GitHub setup steps
- **COMPLETE_DOCUMENTATION.md** - All guides in one file

---

## ✨ Next Steps

1. ✅ Install Git
2. ✅ Configure user info
3. ✅ Create GitHub account
4. ✅ Run push commands
5. ✅ Invite collaborators (Settings → Collaborators)
6. ✅ Enable GitHub Actions (for CI/CD)
7. ✅ Deploy to Render (optional)

