# 💻 Git Commands Reference - คำสั่ง Git ทั้งหมด

## 📌 บทนำ

ไฟล์นี้เป็น Quick Reference สำหรับคำสั่ง Git ที่ใช้บ่อย

---

## 🔧 พื้นฐาน Setup

### สำรุป Config ครั้งแรก

```bash
# ตั้ง username
git config --global user.name "Your Name"

# ตั้ง email
git config --global user.email "your.email@example.com"

# ตรวจสอบ config
git config --list
```

---

### สร้าง Repository ใหม่

```bash
# สร้างโฟลเดอร์และเข้าไป
mkdir StudentCourse
cd StudentCourse

# Initialize git repository
git init

# ตรวจสอบ status
git status
```

---

### Clone Repository

```bash
# Clone จาก GitHub
git clone https://github.com/your-username/StudentCourse.git

# Clone ไปยังโฟลเดอร์ specific
git clone https://github.com/your-username/StudentCourse.git my-folder

# Clone แค่ branch specific
git clone -b develop https://github.com/your-username/StudentCourse.git
```

---

## 📝 Daily Workflow

### ตรวจสอบสถานะ

```bash
# ดู status โดยรวม
git status

# ดู status แบบสั้น
git status -s

# ดู untracked files เท่านั้น
git status -u
```

---

### เพิ่มไฟล์ (Stage)

```bash
# เพิ่มไฟล์ specific
git add src/controllers/studentController.js

# เพิ่มไฟล์หลายตัว
git add src/controllers/*.js

# เพิ่มทั้งหมด
git add .

# เพิ่มแบบ interactive (เลือก chunks)
git add -p
```

---

### ยกเลิก Add (Unstage)

```bash
# ยกเลิก specific file
git reset src/controllers/studentController.js

# ยกเลิกทั้งหมด
git reset

# ยกเลิกและลบ changes
git reset --hard HEAD
```

---

### Commit

```bash
# Commit พื้นฐาน
git commit -m "feat: add student controller"

# Commit กับ message ยาว (เปิด editor)
git commit

# Commit ทั้ง tracked files (ไม่ต้อง add ก่อน)
git commit -am "fix: correct validation logic"

# แก้ไข commit ที่ผิด (ไม่ได้ push)
git commit --amend -m "feat: corrected message"

# Commit โดยไม่มี message (ใช้ default)
git commit -m ""
```

---

### ยกเลิก Commit

```bash
# ยกเลิก last commit (keep changes)
git reset --soft HEAD~1

# ยกเลิก last commit (keep changes in staging)
git reset --mixed HEAD~1

# ยกเลิก last commit (delete changes) ⚠️ อันตราย
git reset --hard HEAD~1

# ยกเลิก specific commit
git revert <commit-hash>

# ยกเลิก N commits ล่าสุด
git reset --hard HEAD~3
```

---

## 🌳 Branch Management

### สร้าง Branch

```bash
# สร้าง branch ใหม่
git branch feature/student-crud

# สร้างและ checkout
git checkout -b feature/student-crud

# สร้างและ checkout (Git 2.23+)
git switch -c feature/student-crud

# สร้างจาก remote branch
git checkout -b develop origin/develop
```

---

### ตรวจสอบ Branch

```bash
# ดู local branches
git branch

# ดู remote branches
git branch -r

# ดูทั้ง local และ remote
git branch -a

# ดู branches ที่ merged
git branch --merged

# ดู branches ที่ยังไม่ merged
git branch --no-merged
```

---

### สลับ Branch

```bash
# Checkout branch
git checkout develop

# Switch branch (Git 2.23+)
git switch develop

# สลับไป previous branch
git checkout -

# สลับไป previous branch (Git 2.23+)
git switch -
```

---

### ลบ Branch

```bash
# ลบ local branch
git branch -d feature/student-crud

# Force delete
git branch -D feature/student-crud

# ลบ remote branch
git push origin --delete feature/student-crud

# ลบ local tracking of remote branch
git branch -dr origin/feature/student-crud
```

---

### Rename Branch

```bash
# Rename current branch
git branch -m new-name

# Rename specific branch
git branch -m old-name new-name

# Rename remote branch (delete + push)
git branch -m old-name new-name
git push origin --delete old-name
git push -u origin new-name
```

---

## 📤 Push & Pull

### Push

```bash
# Push current branch
git push

# Push กับ set upstream
git push -u origin feature/student-crud

# Push ไปยัง specific remote
git push origin feature/student-crud

# Push ทั้ง branches
git push -all

# Push ทั้ง tags
git push --tags

# Force push (อันตราย!) ⚠️
git push -f origin feature/student-crud

# Push แค่ commits ไม่มี history
git push --follow-tags
```

---

### Pull

```bash
# Pull จาก current branch
git pull

# Pull จาก specific branch
git pull origin develop

# Pull เฉพาะ fetch
git pull --no-commit

# Pull แล้ว rebase (ไม่ merge)
git pull --rebase

# Pull แล้ว autostash changes
git pull --autostash
```

---

### Fetch

```bash
# Fetch ทั้งหมด
git fetch

# Fetch จาก specific remote
git fetch origin

# Fetch specific branch
git fetch origin feature/student-crud
```

---

## 🔀 Merge & Rebase

### Merge

```bash
# Merge branch เข้า current branch
git merge feature/student-crud

# Merge โดยไม่ fast-forward
git merge --no-ff feature/student-crud

# Merge กับ squash
git merge --squash feature/student-crud

# ยกเลิก merge ที่อยู่ระหว่างดำเนิน
git merge --abort
```

---

### Rebase

```bash
# Rebase current branch
git rebase develop

# Rebase interactive
git rebase -i develop

# Continue after conflict
git rebase --continue

# ยกเลิก rebase
git rebase --abort

# Skip commit ในระหว่าง rebase
git rebase --skip
```

---

## 📊 History & Logs

### ดู Commits

```bash
# ดู commits ทั้งหมด
git log

# ดู commits แบบสั้น
git log --oneline

# ดู commits กับ graph
git log --oneline --graph --all

# ดู commits จำนวน N ล่าสุด
git log -n 5

# ดู commits ตั้งแต่วันที่ specific
git log --since="2025-01-15"
git log --until="2025-01-20"

# ดู commits โดย author
git log --author="John"

# ดู commits ตามคำค้นหา message
git log --grep="feat"

# ดู commits ที่เปลี่ยน specific file
git log -- src/controllers/studentController.js

# ดู commits ตามฟังก์ชัน
git log -L :functionName:src/controllers/studentController.js
```

---

### ดู Differences

```bash
# ดู changes ยังไม่ staged
git diff

# ดู changes ที่ staged
git diff --cached

# ดู differences ระหว่าง branches
git diff develop feature/student-crud

# ดู differences ระหว่าง commits
git diff <commit1> <commit2>

# ดู differences file specific
git diff -- src/controllers/studentController.js
```

---

### ดู Commit Details

```bash
# ดู specific commit
git show <commit-hash>

# ดู files ใน commit
git show <commit-hash> --name-only

# ดู changes ใน commit
git show <commit-hash> --patch
```

---

## 🏷️ Tags

### สร้าง Tags

```bash
# สร้าง lightweight tag
git tag v1.0.0

# สร้าง annotated tag
git tag -a v1.0.0 -m "Release version 1.0.0"

# สร้าง tag สำหรับ commit specific
git tag v1.0.0 <commit-hash>
```

---

### Push Tags

```bash
# Push specific tag
git push origin v1.0.0

# Push ทั้ง tags
git push origin --tags

# ลบ tag
git tag -d v1.0.0
git push origin --delete v1.0.0
```

---

## ⚠️ Undoing Changes

### Discard Changes

```bash
# ยกเลิก changes ใน working directory
git checkout -- src/controllers/studentController.js

# ยกเลิก changes ทั้งหมด (git 2.23+)
git restore src/controllers/studentController.js

# ยกเลิก staged changes (git 2.23+)
git restore --staged src/controllers/studentController.js
```

---

### Clean Untracked Files

```bash
# ดู untracked files ที่จะลบ
git clean -n

# ลบ untracked files
git clean -f

# ลบ untracked files และ directories
git clean -fd

# ลบ untracked files รวม ignored
git clean -fX
```

---

### Stash

```bash
# Stash changes
git stash

# Stash กับ message
git stash save "description"

# ดู stash list
git stash list

# Apply last stash
git stash apply

# Apply specific stash
git stash apply stash@{0}

# Pop last stash (apply + delete)
git stash pop

# ลบ stash
git stash drop stash@{0}

# ลบทั้ง stash
git stash clear
```

---

## 🔍 Search & Blame

### Blame (Find who changed what)

```bash
# ดู blame สำหรับ file
git blame src/controllers/studentController.js

# ดู blame สำหรับ lines specific
git blame -L 10,20 src/controllers/studentController.js

# ดู blame แบบ short
git blame --line-porcelain src/controllers/studentController.js
```

---

### Search Content

```bash
# หา string ใน commits
git log -S "functionName"

# หา regex ใน commits
git log -G "pattern"

# หา string ในไฟล์ specific
git log -S "functionName" -- src/controllers/studentController.js
```

---

## 🤝 Remote Management

### ตรวจสอบ Remote

```bash
# ดู remote repositories
git remote

# ดู remote URLs
git remote -v

# ดู info remote specific
git remote show origin
```

---

### เพิ่ม/ลบ Remote

```bash
# เพิ่ม remote
git remote add origin https://github.com/your-username/StudentCourse.git

# เปลี่ยน remote URL
git remote set-url origin https://github.com/new-url/StudentCourse.git

# ลบ remote
git remote remove origin

# Rename remote
git remote rename origin upstream
```

---

## 🚨 Emergency Commands

### Recover Deleted Branch

```bash
# ดู deleted branches
git reflog

# Checkout deleted branch
git checkout -b recovered-branch <reflog-hash>
```

---

### Undo Push

```bash
# ยกเลิก recent push (อยังไม่ได้ merge)
git push -f origin HEAD~1:branch-name

# หรือใช้ revert แทน
git revert <commit-hash>
git push origin develop
```

---

### Force Push (อันตราย!)

```bash
# ⚠️ ใช้เฉพาะกรณีจำเป็น
git push -f origin feature/student-crud

# Safe force with lease
git push --force-with-lease origin feature/student-crud
```

---

## 📋 Useful Aliases

เพิ่มใน `.gitconfig`:

```bash
# Setup aliases
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.visual 'log --graph --oneline --all'
```

**ใช้ shortcuts:**
```bash
git st              # แทน git status
git co develop      # แทน git checkout develop
git visual          # แทน git log --graph --oneline --all
```

---

## 📊 Common Workflows

### Feature Branch Workflow

```bash
# 1. สร้าง feature branch
git checkout -b feature/student-crud

# 2. ทำงาน
# Edit files...

# 3. Commit
git add .
git commit -m "feat: add student controller"

# 4. Push
git push -u origin feature/student-crud

# 5. Create PR บน GitHub

# 6. หลังจาก approve
git checkout develop
git pull origin develop
git merge feature/student-crud
git push origin develop

# 7. ลบ branch
git branch -d feature/student-crud
git push origin --delete feature/student-crud
```

---

### Hotfix Workflow

```bash
# 1. สร้าง hotfix branch จาก main
git checkout main
git pull origin main
git checkout -b hotfix/critical-bug

# 2. ทำ fix
# Edit files...

# 3. Commit
git commit -m "fix: critical bug"

# 4. Merge ไป main
git checkout main
git merge hotfix/critical-bug
git push origin main

# 5. Merge ไป develop
git checkout develop
git merge hotfix/critical-bug
git push origin develop

# 6. ลบ branch
git branch -d hotfix/critical-bug
```

---

## 🎓 สรุป Tips

| Tip | คำสั่ง |
|-----|--------|
| ดู status | `git status` |
| Add files | `git add .` |
| Commit | `git commit -m "message"` |
| Push | `git push` |
| Pull | `git pull` |
| Create branch | `git checkout -b branch-name` |
| Switch branch | `git checkout branch-name` |
| Merge | `git merge branch-name` |
| Delete branch | `git branch -d branch-name` |
| Undo changes | `git checkout -- file` |
| Stash | `git stash` |
| Log | `git log --oneline` |

---

**สร้างเมื่อ:** 2025-11-30  
**อัปเดตล่าสุด:** 2025-11-30  
**ระดับ:** ⭐⭐ ปานกลาง  
**เวลาศึกษา:** 30-45 นาที
