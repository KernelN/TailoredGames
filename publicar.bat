@echo off
title Tailored Games - Publicar Cambios a GitHub Pages
color 0B
echo ===================================================
echo     Tailored Games - Publicador GitHub Pages
echo ===================================================
echo.

git status --short
echo.
set /p commit_msg="Mensaje del cambio (Enter para 'Actualizar catalogo'): "
if "%commit_msg%"=="" set commit_msg=Actualizar catalogo

echo.
echo [1/3] Preparando archivos modificados...
git add .

echo [2/3] Guardando cambios locales...
git commit -m "%commit_msg%"

echo [3/3] Subiendo a GitHub Pages (origin main)...
git push origin main

echo.
echo ===================================================
echo   Publicacion completada con exito!
echo   Tu sitio se actualizara en GitHub Pages en breve.
echo ===================================================
echo.
pause
