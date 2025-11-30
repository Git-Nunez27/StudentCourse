# 🔧 Quick Fix for Render Deployment Error

## ⚡ ปัญหา
```
Error: Cannot find module '/opt/render/project/src/server.js'
```

## 🎯 สาเหตุ
`src/` directory ไม่ได้ถูก push ขึ้น GitHub

## ✅ วิธีแก้ไข (3 ขั้นตอน)

### 1️⃣ ตรวจสอบว่า src/ อยู่ใน Git

```powershell
cd D:\StudentCourse

# ดูว่า src/ เป็น untracked files หรือเปล่า
git status
```

### 2️⃣ Add src/ directory ถ้ายังไม่มี

```powershell
# ถ้า src/ ยังไม่ได้ add:
git add src/

# Commit
git commit -m "Add source files and render configuration"

# Push to GitHub
git push origin main
```

### 3️⃣ Add render.yaml configuration

```powershell
# render.yaml ถูก create แล้ว ตอนนี้ push ขึ้น
git add render.yaml
git commit -m "Add Render deployment configuration"
git push origin main
```

---

## 📋 Checklist

- [ ] ✅ Run `git status` - ตรวจสอบว่า src/ ถูก stage แล้ว
- [ ] ✅ Run `git push origin main` - Push ขึ้น GitHub
- [ ] ✅ ไปที่ GitHub repository ตรวจสอบ src/ folder มี
- [ ] ✅ ไป Render dashboard → Deployments → "Deploy latest commit"

---

## 🔍 ตรวจสอบ GitHub Repository

1. ไปที่ https://github.com/Git-Nunez27/StudentCourse
2. ตรวจสอบว่า:
   - ✅ `src/` folder มี
   - ✅ `render.yaml` มี
   - ✅ `package.json` มี `start` script

---

## 🚀 Manual Deploy ใน Render

1. ไป https://render.com/dashboard
2. เลือก "StudentCourseManagement" web service
3. ไปที่ **Deployments** tab
4. Click **"Deploy latest commit"** button
5. รอการ deploy สำเร็จ

---

## ✨ Expected Output

```
==> Build successful 🎉
==> Deploying...
==> Running 'npm start'
node src/server.js
Server running on port 3000 ✅
==> Your service is live 🎉
```

