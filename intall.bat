@echo off
start cmd /k "npm config set registry https://registry.npmmirror.com/&&npm i yarn vite nodemon cross-env -g&&yarn config set registry https://registry.npmmirror.com/&&cd server&&yarn&&cd ../admin&&yarn&& exit"
