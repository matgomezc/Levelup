@echo off
echo ========================================
echo    Gaming Store - React Setup Script
echo ========================================
echo.

echo Verificando Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js no esta instalado
    echo Por favor instala Node.js desde https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo Node.js encontrado!
echo.

echo Instalando dependencias...
npm install

if %errorlevel% neq 0 (
    echo ERROR: Fallo al instalar dependencias
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo    Instalacion completada exitosamente!
echo ========================================
echo.
echo Para ejecutar el proyecto:
echo   npm start
echo.
echo El proyecto se abrira en http://localhost:3000
echo.
pause
