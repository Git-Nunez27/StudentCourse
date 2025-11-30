#!/usr/bin/env pwsh
# 🎨 Frontend Quick Start Script

Write-Host "`n╔════════════════════════════════════════════════════════════════╗`n" -ForegroundColor Cyan
Write-Host "    Student Course Management - Frontend Setup`n" -ForegroundColor Cyan
Write-Host "         React + Vite + Tailwind CSS`n" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════════╝`n" -ForegroundColor Cyan

# Step 1: Check Node.js
Write-Host "[1/4] Checking Node.js..." -ForegroundColor Yellow
node --version

# Step 2: Navigate to frontend
Write-Host "`n[2/4] Navigating to frontend directory..." -ForegroundColor Yellow
Set-Location -Path "D:\StudentCourse\frontend" -ErrorAction Stop
Write-Host "✅ In: $(Get-Location)" -ForegroundColor Green

# Step 3: Install dependencies
Write-Host "`n[3/4] Installing dependencies..." -ForegroundColor Yellow
Write-Host "This may take 2-3 minutes..." -ForegroundColor Gray

if (Test-Path "node_modules") {
    Write-Host "✅ Dependencies already installed" -ForegroundColor Green
} else {
    npm install
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Dependencies installed successfully" -ForegroundColor Green
    } else {
        Write-Host "❌ Installation failed" -ForegroundColor Red
        exit 1
    }
}

# Step 4: Start dev server
Write-Host "`n[4/4] Starting development server..." -ForegroundColor Yellow
Write-Host "`n📍 Frontend URL: http://localhost:5173" -ForegroundColor Cyan
Write-Host "📍 Backend URL: http://localhost:3000" -ForegroundColor Cyan
Write-Host "`nPress Ctrl+C to stop the server`n" -ForegroundColor Gray

npm run dev
