@echo off
chcp 65001 >nul
echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║          🌊 海洋星座鎖匙扣網店 - 一鍵部署腳本                 ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

REM 檢查 Node.js
echo 📦 檢查 Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ 錯誤：未安裝 Node.js
    echo.
    echo 請先安裝 Node.js：
    echo 1. 打開 https://nodejs.org
    echo 2. 下載並安裝 "LTS" 版本
    echo 3. 重新執行此腳本
    pause
    exit /b 1
)
echo ✅ Node.js 已安裝

REM 檢查是否已安裝 Netlify CLI
echo.
echo 🌐 檢查 Netlify CLI...
npm list -g netlify-cli >nul 2>&1
if %errorlevel% neq 0 (
    echo 📥 正在安裝 Netlify CLI...
    npm install -g netlify-cli
    echo ✅ Netlify CLI 已安裝
) else (
    echo ✅ Netlify CLI 已安裝
)

REM 部署到 Netlify
echo.
echo 🚀 部署到 Netlify...
echo.
echo 📝 請選擇：
echo   1. 登入 Netlify（首次需要）
echo   2. 使用現有帳戶
echo.
set /p choice="請輸入選項 (1-2): "

if "%choice%"=="1" (
    echo.
    echo 🔗 正在打開 Netlify 登入頁面...
    echo 請在瀏覽器中完成登入，然後回來此視窗
    start https://app.netlify.com
    echo.
    echo ✅ 登入完成後，執行：netlify deploy --prod --dir=.
    echo.
    pause
) else if "%choice%"=="2" (
    echo.
    echo 🚀 開始部署...
    netlify deploy --prod --dir=.
    echo.
    echo ✅ 部署完成！
    echo.
    echo 🎉 恭喜！你的網店已經上線！
) else (
    echo ❌ 無效選項
    exit /b 1
)

echo.
pause
