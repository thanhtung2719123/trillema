@echo off
REM Quick script to push to GitHub
REM Repository: https://github.com/thanhtung2719123/trillema

echo.
echo ==========================================
echo  Push to GitHub: trillema
echo ==========================================
echo.

REM Check if git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Git is not installed!
    echo Please install Git from: https://git-scm.com/
    pause
    exit /b 1
)

REM Initialize git if not already done
if not exist ".git\" (
    echo [STEP 1] Initializing Git repository...
    git init
    git remote add origin https://github.com/thanhtung2719123/trillema.git
) else (
    echo [STEP 1] Git already initialized
)

REM Check git config
git config user.name >nul 2>&1
if errorlevel 1 (
    echo.
    echo [SETUP] Please configure your Git username:
    set /p username="Enter your GitHub username (thanhtung2719123): "
    git config user.name "%username%"
    
    echo.
    set /p email="Enter your email: "
    git config user.email "%email%"
)

echo.
echo [STEP 2] Adding all files...
git add .

echo.
echo [STEP 3] Committing changes...
set /p message="Enter commit message (or press Enter for default): "
if "%message%"=="" (
    git commit -m "Update: Vietnam Exchange Rate Simulation"
) else (
    git commit -m "%message%"
)

echo.
echo [STEP 4] Setting main branch...
git branch -M main

echo.
echo [STEP 5] Pushing to GitHub...
echo Repository: https://github.com/thanhtung2719123/trillema
echo.
echo If this is your first push, you may need to enter your credentials:
echo - Username: thanhtung2719123
echo - Password: Use Personal Access Token (not your GitHub password)
echo   Get token at: https://github.com/settings/tokens
echo.
git push -u origin main

if errorlevel 1 (
    echo.
    echo [ERROR] Push failed!
    echo.
    echo Common issues:
    echo 1. Authentication failed - Need Personal Access Token
    echo 2. Repository not found - Check URL
    echo 3. No changes to commit
    echo.
    echo See GITHUB_SETUP.md for detailed instructions
    pause
    exit /b 1
)

echo.
echo ==========================================
echo  SUCCESS! Code pushed to GitHub
echo ==========================================
echo.
echo View your repository at:
echo https://github.com/thanhtung2719123/trillema
echo.
echo Next steps:
echo 1. Visit the URL above to verify
echo 2. Deploy to Vercel (see DEPLOY.md)
echo.
pause

