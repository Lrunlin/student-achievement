@echo off
start cmd /k "npm config set registry https://registry.npmmirror.com/&&npm i yarn vite nodemon -g&&yarn config set registry https://registry.npmmirror.com/" 
