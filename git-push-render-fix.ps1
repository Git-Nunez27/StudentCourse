#!/usr/bin/env pwsh
# 🔧 Git Installation and Push Script for Windows PowerShell
# วิธีใช้: ./git-push-render-fix.ps1

Write-Host "`n╔════════════════════════════════════════════════════════════════╗`n" -ForegroundColor Cyan
Write-Host "    StudentCourse - Git Setup and Push to GitHub`n" -ForegroundColor Cyan
Write-Host "         Fixing Render Deployment Error`n" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════════╝`n" -ForegroundColor Cyan

# ========== STEP 1: Check Git Installation ==========
Write-Host "[1/5] Checking Git installation..." -ForegroundColor Yellow

$gitPath = Get-Command git -ErrorAction SilentlyContinue
if (-not $gitPath) {
    Write-Host "`n❌ Git is NOT installed!`n" -ForegroundColor Red
    Write-Host "Please install Git from: https://git-scm.com/download/win`n" -ForegroundColor Yellow
    Write-Host "After installation, run this script again.`n" -ForegroundColor White
    Read-Host "Press Enter to open Git download page"
    Start-Process "https://git-scm.com/download/win"
    exit 1
}

Write-Host "✅ Git is installed`n" -ForegroundColor Green
git --version
Write-Host ""

# ========== STEP 2: Configure Git User ==========
Write-Host "[2/5] Configuring Git user..." -ForegroundColor Yellow

$userName = git config --global user.name 2>$null
$userEmail = git config --global user.email 2>$null

if ([string]::IsNullOrEmpty($userName)) {
    Write-Host "Git user not configured. Setting up now...`n" -ForegroundColor Yellow
    $userName = Read-Host "Enter your name"
    $userEmail = Read-Host "Enter your email"
    
    git config --global user.name "$userName"
    git config --global user.email "$userEmail"
    
    Write-Host "`n✅ Git user configured:`n" -ForegroundColor Green
    Write-Host "   Name: $userName"
    Write-Host "   Email: $userEmail`n"
} else {
    Write-Host "✅ Git user already configured:`n" -ForegroundColor Green
    Write-Host "   Name: $userName"
    Write-Host "   Email: $userEmail`n"
}

# ========== STEP 3: Check Git Repository ==========
Write-Host "[3/5] Checking Git repository..." -ForegroundColor Yellow

Set-Location -Path "D:\StudentCourse" -ErrorAction Stop

if (-not (Test-Path ".git")) {
    Write-Host "Initializing Git repository..." -ForegroundColor Cyan
    git init
    Write-Host "✅ Git repository initialized`n" -ForegroundColor Green
} else {
    Write-Host "✅ Git repository already exists`n" -ForegroundColor Green
}

# ========== STEP 4: Add Files ==========
Write-Host "[4/5] Adding files to Git..." -ForegroundColor Yellow

Write-Host "   Adding src/ directory..." -ForegroundColor Cyan
git add src/ -f 2>$null

Write-Host "   Adding configuration files..." -ForegroundColor Cyan
@(
    "render.yaml",
    "RENDER_DEPLOYMENT_GUIDE_TH.md",
    "QUICK_FIX_RENDER.md",
    "package.json",
    "package-lock.json",
    ".env.example",
    ".gitignore",
    "src/server.js",
    "src/config/supabase.js",
    "src/controllers/studentController.js",
    "src/controllers/courseController.js",
    "src/controllers/enrollmentController.js",
    "src/routes/studentRoutes.js",
    "src/routes/courseRoutes.js",
    "src/routes/enrollmentRoutes.js"
) | ForEach-Object {
    git add $_ -f 2>$null
}

Write-Host "`n📊 Git Status:`n" -ForegroundColor Cyan
git status --short

Write-Host ""

# ========== STEP 5: Commit and Push ==========
Write-Host "[5/5] Committing and pushing to GitHub..." -ForegroundColor Yellow

$commitMsg = Read-Host "Enter commit message (or press Enter for default)"
if ([string]::IsNullOrEmpty($commitMsg)) {
    $commitMsg = "Add source files and Render configuration - fix deployment"
}

# Check if there are changes to commit
$changes = git status --short | Measure-Object
if ($changes.Count -gt 0) {
    Write-Host "`nCreating commit: '$commitMsg'" -ForegroundColor Cyan
    git commit -m "$commitMsg"
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`n✅ Commit created successfully`n" -ForegroundColor Green
        
        Write-Host "Pushing to GitHub..." -ForegroundColor Cyan
        git push -u origin main -f
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "`n✅ Successfully pushed to GitHub!`n" -ForegroundColor Green
            Write-Host "Remote URL:" -ForegroundColor Cyan
            git remote -v
            
            Write-Host "`n" -ForegroundColor Green
            Write-Host "╔════════════════════════════════════════════════════════════════╗" -ForegroundColor Green
            Write-Host "║                    ✅ PUSH SUCCESSFUL                          ║" -ForegroundColor Green
            Write-Host "╚════════════════════════════════════════════════════════════════╝" -ForegroundColor Green
            Write-Host "`n📋 Next Steps:`n" -ForegroundColor Yellow
            Write-Host "1. Go to Render dashboard: https://render.com/dashboard" -ForegroundColor White
            Write-Host "2. Find 'StudentCourseManagement' web service" -ForegroundColor White
            Write-Host "3. Click 'Deployments' tab" -ForegroundColor White
            Write-Host "4. Click 'Deploy latest commit' button" -ForegroundColor White
            Write-Host "5. Wait for deployment to complete (5-10 minutes)" -ForegroundColor White
            Write-Host "`n💡 Check deployment status at: https://render.com/dashboard`n" -ForegroundColor Cyan
        } else {
            Write-Host "`n❌ Push failed!`n" -ForegroundColor Red
            Write-Host "Possible reasons:" -ForegroundColor Yellow
            Write-Host "• GitHub credentials invalid" -ForegroundColor White
            Write-Host "• Personal Access Token expired" -ForegroundColor White
            Write-Host "• Network connection issue" -ForegroundColor White
            Write-Host "`nTry again with: git push -u origin main`n" -ForegroundColor Cyan
        }
    } else {
        Write-Host "`n❌ Commit failed!`n" -ForegroundColor Red
    }
} else {
    Write-Host "`n✅ No changes to commit - everything is up to date`n" -ForegroundColor Green
    Write-Host "Attempting to push anyway..." -ForegroundColor Cyan
    git push origin main
}

Write-Host "`n✨ Script completed!`n" -ForegroundColor Green
Read-Host "Press Enter to exit"
