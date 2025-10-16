@echo off
REM Vietnam Exchange Rate Simulation - Startup Script
REM Clears problematic HOST variable and starts the development server

echo.
echo ==========================================
echo  Vietnam Exchange Rate Simulation
echo  Mo Phong Ty Gia Hoi Doai Viet Nam
echo ==========================================
echo.

REM Clear the HOST environment variable to avoid binding errors
set HOST=
set BROWSER=none

REM Check if node_modules exists
if not exist "node_modules\" (
    echo [INFO] Dependencies not found. Installing...
    call npm install
    if errorlevel 1 (
        echo [ERROR] Failed to install dependencies
        pause
        exit /b 1
    )
)

echo [INFO] Starting development server...
echo [INFO] Open your browser and go to http://localhost:3000
echo [INFO] Press Ctrl+C to stop the server
echo.

REM Start the React development server
start http://localhost:3000
call npm start

REM If npm start fails, pause to see the error
if errorlevel 1 (
    echo.
    echo [ERROR] Failed to start the server
    pause
)

