
const express = require('express');
const app = express();
// 资源跨域
const cors = require('cors');
app.use(cors())
// 接收post请求
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// 文件上传包
const fileUpload = require('express-fileupload');
app.use(fileUpload());

// npm install express mysql cors body-parser node-xlsx


app.use('/', require('./route/api')); //复用接口
app.use('/', require('./route/logn')); //登录
app.use('/', require('./route/delete-user')); //删除用户（复用）
app.use('/', require('./route/read-user')); //查询用户（复用）


app.use('/', require('./student/create-student'));//创建学生
app.use('/', require('./teacher/create-teacher')); //创建教师
app.use('/', require('./teacher/teacher-print')); //教师打印


app.use('/', require('./route/updata-score')); //修改成绩
app.use('/', require('./teacher/teacher-excel')); //读取excel成绩





















app.listen(6789, () => console.log(`Example app listening on port port!`))