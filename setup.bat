@echo off
echo ========================================
echo   E-Commerce MERN + AI Setup Script
echo ========================================
echo.

echo [1/5] Installing Backend Dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Backend installation failed!
    pause
    exit /b 1
)
echo Backend dependencies installed successfully!
echo.

echo [2/5] Installing Frontend Dependencies...
cd ..\frontend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Frontend installation failed!
    pause
    exit /b 1
)
echo Frontend dependencies installed successfully!
echo.

echo [3/5] Checking MongoDB...
where mongod >nul 2>nul
if %errorlevel% neq 0 (
    echo WARNING: MongoDB not found in PATH!
    echo Please install MongoDB from: https://www.mongodb.com/try/download/community
    echo.
) else (
    echo MongoDB found!
)
echo.

echo [4/5] Seeding Database...
cd ..\backend
call node seeder.js
if %errorlevel% neq 0 (
    echo WARNING: Database seeding failed. Make sure MongoDB is running!
    echo You can run 'node seeder.js' manually later.
) else (
    echo Database seeded successfully!
    echo.
    echo Admin Credentials:
    echo Email: admin@ecommerce.com
    echo Password: admin123
)
echo.

echo [5/5] Setup Complete!
echo.
echo ========================================
echo   Next Steps:
echo ========================================
echo.
echo 1. Make sure MongoDB is running
echo 2. Open TWO terminal windows
echo.
echo Terminal 1 - Backend:
echo    cd backend
echo    npm run dev
echo.
echo Terminal 2 - Frontend:
echo    cd frontend
echo    npm run dev
echo.
echo Then open: http://localhost:5173
echo.
echo ========================================
pause
