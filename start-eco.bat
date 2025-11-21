@echo off
cd /d C:\Lydie\10-PROJET 10\Eco-Bliss-Bath-V2
docker-compose up -d
timeout /t 5
cd frontend
npx ng serve --port 4201
pause
