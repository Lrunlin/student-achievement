@echo off
start cmd /k "npm config set registry https://registry.npmmirror.com&&npm i yarn nodemon -g&&yarn config set registry https://registry.npmmirror.com&&cd admin&&yarn&&cd ../api&&yarn&&exit"

