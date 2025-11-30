@echo off
REM 🔧 Automated Git Installation and Push Script for Windows

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║         StudentCourse - Git Setup and Push Script             ║
echo ║                 Render Deployment Fix                         ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

REM Step 1: Check if Git is installed
echo [1/4] Checking if Git is installed...
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo.
    echo ❌ Git is NOT installed!
    echo.
    echo Installing Git...
    echo Please download and install from: https://git-scm.com/download/win
    echo.
    echo Once installed, run this script again.
    echo.
    pause
    exit /b 1
)

echo ✅ Git is installed
git --version
echo.

REM Step 2: Configure Git user
echo [2/4] Configuring Git user...
git config --global user.name 2>nul >nul
if %errorlevel% neq 0 (
    echo Setting Git user...
    setlocal enabledelayedexpansion
    set /p gitname="Enter your name: "
    set /p gitemail="Enter your email: "
    git config --global user.name "!gitname!"
    git config --global user.email "!gitemail!"
    echo ✅ Git user configured
    endlocal
) else (
    echo ✅ Git user already configured
    for /f "tokens=*" %%a in ('git config --global user.name') do set gitname=%%a
    for /f "tokens=*" %%a in ('git config --global user.email') do set gitemail=%%a
    echo    Name: !gitname!
    echo    Email: !gitemail!
)
echo.

REM Step 3: Initialize Git and add files
echo [3/4] Preparing Git repository...
cd /d D:\StudentCourse

if not exist .git (
    echo Initializing Git repository...
    git init
)

echo Adding src/ directory...
git add src/

echo Adding configuration files...
git add render.yaml
git add RENDER_DEPLOYMENT_GUIDE_TH.md
git add QUICK_FIX_RENDER.md
git add package.json
git add .env.example
git add .gitignore

echo Checking status...
echo.
git status
echo.

REM Step 4: Commit and push
echo [4/4] Committing and pushing...
set /p commit_msg="Enter commit message (default: 'Add source files and Render configuration'): "
if "%commit_msg%"=="" set commit_msg=Add source files and Render configuration

git commit -m "%commit_msg%"
if %errorlevel% equ 0 (
    echo.
    echo Pushing to GitHub...
    git push -u origin main
    if %errorlevel% equ 0 (
        echo.
        echo ✅ Successfully pushed to GitHub!
        echo.
        echo Next steps:
        echo 1. Go to Render dashboard: https://render.com/dashboard
        echo 2. Find "StudentCourseManagement" web service
        echo 3. Click "Deployments" tab
        echo 4. Click "Deploy latest commit" button
        echo 5. Wait for deployment to complete
        echo.
    ) else (
        echo.
        echo ❌ Push failed!
        echo Please check your GitHub credentials and try again.
        echo.
    )
) else (
    echo.
    echo ⓘ No changes to commit (everything up to date)
    echo.
)

echo.
pause
