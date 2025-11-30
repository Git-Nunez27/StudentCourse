# 📤 Automated Git Push Script
# วิธีใช้: ./push-to-github.ps1

Write-Host "`n🚀 Git Push to GitHub - Automated Setup`n" -ForegroundColor Cyan

# Check if Git is installed
Write-Host "✓ Checking Git installation..." -ForegroundColor Yellow
git --version | Out-Null
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Git is not installed!" -ForegroundColor Red
    Write-Host "   Download from: https://git-scm.com/download/win`n" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Git is installed`n" -ForegroundColor Green

# Check if repository exists
$gitDir = "D:\StudentCourse\.git"
if (-not (Test-Path $gitDir)) {
    Write-Host "📝 Initializing Git repository..." -ForegroundColor Yellow
    git init
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Repository initialized`n" -ForegroundColor Green
    }
}

# Configure Git if needed
Write-Host "🔧 Configuring Git user..." -ForegroundColor Yellow
$userName = git config --global user.name
$userEmail = git config --global user.email

if ([string]::IsNullOrEmpty($userName)) {
    Write-Host "   Enter your name: " -NoNewline
    $name = Read-Host
    git config --global user.name "$name"
    Write-Host "✅ Name configured: $name`n" -ForegroundColor Green
} else {
    Write-Host "✅ User already configured: $userName ($userEmail)`n" -ForegroundColor Green
}

# Check current status
Write-Host "📊 Current repository status:" -ForegroundColor Yellow
git status
Write-Host ""

# Ask for action
Write-Host "Choose action:" -ForegroundColor Cyan
Write-Host "1. Add all files and commit"
Write-Host "2. Add remote origin (first time)"
Write-Host "3. Push to GitHub"
Write-Host "4. View commit history"
Write-Host "5. Exit"
Write-Host ""

$choice = Read-Host "Enter choice (1-5)"

switch ($choice) {
    "1" {
        Write-Host "`n📝 Adding files..." -ForegroundColor Yellow
        git add .
        
        Write-Host "Enter commit message: " -NoNewline
        $message = Read-Host
        
        git commit -m "$message"
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Commit created`n" -ForegroundColor Green
        }
    }
    "2" {
        Write-Host "`n🔗 Adding remote origin..." -ForegroundColor Yellow
        Write-Host "Enter GitHub repository URL: " -NoNewline
        $repoUrl = Read-Host
        
        git remote add origin "$repoUrl"
        git branch -M main
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Remote origin added`n" -ForegroundColor Green
        }
    }
    "3" {
        Write-Host "`n📤 Pushing to GitHub..." -ForegroundColor Yellow
        git push -u origin main
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "`n✅ Successfully pushed to GitHub!`n" -ForegroundColor Green
            git remote -v
        }
    }
    "4" {
        Write-Host "`n📜 Commit history:" -ForegroundColor Yellow
        git log --oneline -10
        Write-Host ""
    }
    "5" {
        Write-Host "`nExiting...`n" -ForegroundColor Yellow
        exit 0
    }
    default {
        Write-Host "❌ Invalid choice`n" -ForegroundColor Red
    }
}

Write-Host "✨ Done!`n" -ForegroundColor Green
