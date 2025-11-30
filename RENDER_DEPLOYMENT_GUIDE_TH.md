# 🚀 Render Deployment Troubleshooting Guide

## ปัญหา: `Error: Cannot find module '/opt/render/project/src/server.js'`

### 🔍 สาเหตุ

1. **`src/` directory ไม่ถูก push ขึ้น GitHub**
   - อาจถูก ignore โดย `.gitignore`
   - หรือ commit ที่ push ขึ้นไม่มี source files

2. **Render configuration ไม่ถูกต้อง**
   - Start command ผิด path
   - Build command ไม่ครอบคลุม

3. **Environment variables ขาดหายไป**
   - SUPABASE_URL หรือ SUPABASE_KEY ไม่ตั้งค่า

---

## ✅ วิธีแก้ไข - Step by Step

### Step 1: ตรวจสอบ GitHub Repository

ดูว่า `src/` folder ถูก push ขึ้นหรือไม่:

```powershell
cd D:\StudentCourse

# Check Git status
git status

# ถ้า src/ ยังไม่ได้ add:
git add src/
git commit -m "Add source files"
git push origin main
```

### Step 2: สร้าง render.yaml (อยู่ใน root directory)

File: `D:\StudentCourse\render.yaml`

```yaml
services:
  - type: web
    name: student-course-api
    env: node
    plan: free
    
    buildCommand: npm install
    startCommand: npm start
    
    envVars:
      - key: SUPABASE_URL
        value: ${SUPABASE_URL}
      - key: SUPABASE_KEY
        value: ${SUPABASE_KEY}
      - key: PORT
        value: 3000
    
    port: 3000
    root: .
```

### Step 3: ตรวจสอบ package.json

ต้องมี `start` script:

```json
{
  "scripts": {
    "start": "node src/server.js",
    "dev": "node src/server.js"
  }
}
```

### Step 4: Commit and Push render.yaml

```powershell
git add render.yaml
git commit -m "Add Render deployment configuration"
git push origin main
```

### Step 5: ตั้งค่า Environment Variables ใน Render

1. ไปที่ Render dashboard: https://render.com/dashboard
2. เลือก web service ของคุณ
3. ไปที่ **Environment** tab
4. เพิ่ม variables:
   - `SUPABASE_URL` = your_supabase_url
   - `SUPABASE_KEY` = your_supabase_key
   - `PORT` = 3000

### Step 6: Trigger Manual Deploy

1. ใน Render dashboard
2. Click **"Deployments"** tab
3. Click **"Deploy latest commit"** button

---

## 🧪 Test Locally ก่อน Deploy

```powershell
cd D:\StudentCourse

# 1. Check if npm start works
npm start

# 2. ในอีก terminal, test API
curl http://localhost:3000/health

# 3. Expected response:
# {"status":"✅ Server is running!"}
```

---

## 📋 Checklist ก่อน Deploy

- [ ] ✅ `src/` directory ถูก commit และ push
- [ ] ✅ `render.yaml` ถูก create และ push
- [ ] ✅ `package.json` มี `start` script
- [ ] ✅ `.env` variables อยู่ใน Render dashboard
- [ ] ✅ `npm start` ทำงานได้บน local machine
- [ ] ✅ GitHub repository มีไฟล์ทั้งหมด

---

## 🔗 File Structure ที่ต้องมี

```
StudentCourse/
├── src/
│   ├── server.js
│   ├── config/
│   │   └── supabase.js
│   ├── controllers/
│   │   ├── studentController.js
│   │   ├── courseController.js
│   │   └── enrollmentController.js
│   └── routes/
│       ├── studentRoutes.js
│       ├── courseRoutes.js
│       └── enrollmentRoutes.js
├── package.json
├── package-lock.json
├── render.yaml
├── .env
└── .gitignore
```

---

## 🆘 Common Issues

### Issue 1: Build succeeds but deploy fails

```
Error: Cannot find module 'src/server.js'
```

**Solution:**
- Verify `src/` is in GitHub repository
- Check `.gitignore` doesn't exclude `src/`
- Run `git add src/` and `git push`

### Issue 2: Environment variables not found

```
Error: Cannot read property 'split' of undefined
```

**Solution:**
- Set `SUPABASE_URL` in Render dashboard
- Set `SUPABASE_KEY` in Render dashboard
- Redeploy after setting variables

### Issue 3: Port binding error

```
Error: listen EADDRINUSE :::3000
```

**Solution:**
- Render automatically assigns ports
- Update `src/server.js` to use `process.env.PORT || 3000`

### Issue 4: npm start not found

```
Error: sh: 1: npm: not found
```

**Solution:**
- Make sure `render.yaml` has correct `buildCommand: npm install`
- Verify Node.js version is correct

---

## 📱 Verify Deployment Success

```bash
# Check if server is running
curl https://your-app.onrender.com/health

# Expected response:
{"status":"✅ Server is running!"}
```

---

## 🔄 GitHub + Render Integration

Render automatically deploys when:
1. Push to main branch on GitHub
2. Render webhook triggered
3. Build succeeds

No manual deployment needed after first setup!

---

## 📚 Resources

- **Render Documentation**: https://render.com/docs
- **Render Node.js Guide**: https://render.com/docs/node
- **Environment Variables**: https://render.com/docs/environment-variables
- **Troubleshooting**: https://render.com/docs/troubleshooting-deploys

