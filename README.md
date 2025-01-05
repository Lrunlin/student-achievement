# 学生成绩管理系统 student-achievement

**[项目在线体验地址](https://score.blogweb.cn/)**

**[项目介绍文章地址](https://blogweb.cn/article/7911372471912)** 项目包括论文(论文收费提供)
**如果你有对成果物有什么问题，或者在毕业设计上有什么问题（需要代做）可以联系 QQ：1974109227**

**不是无偿解决(包括不会启动程序)**

如果这个程序源码对你有帮助请给个 Star 吧

<div style="text-align:center;display:flex;width:100%">
 <span>
  <img src="https://disk.blogweb.cn/me/qq.webp" alt="QQ" style="width:30%;max-width:300px" />
  <div>QQ：1974109227</div>
 </span>
 <span>
  <img src="https://disk.blogweb.cn/me/wechat.webp" alt="Wechat" style="width:30%;max-width:300px" />
  <div>微信:webzhizuo</div>
 </span>
</div>

## 项目启动

**前端使用 Vite 开发，要求 Node.js 版本不得低于 18**
**MySQL 版本要求使用 8**

推荐使用 yarn 作为包管理  
使用 **npm i yarn -g** 来安装 yarn

先创建数据库 stu_score，后导入 SQL 文件（导入后 admin 表手动添加一个记录），在填写 server 中的.env.dev 文件，填写数据库信息。快捷文件启动和命令行启动二选一。

**快捷文件启动**

1. 先双击打开 install.bat 文件，依赖安装结束后 cmd 会自动关闭
2. 双击 dev 文件启动前端和后端

**命令行启动:**

0.引入 SQL 文件  
1.cd server  
2.yarn  
3.yarn dev  
4.cd admin  
5.yarn  
6.yarn dev

### 初始密码

管理员:账号:1 密码:111111

学生:账号:2 密码:111111

教师:账号:1 密码:111111

## 介绍

项目是之前接的一个毕业设计的程序成功物，毕业设计基本水平  
技术为 Vue3.0+Node.js(Koa)+Mysql，组件库使用 Element-plus 组件库 使用 Tailwind CSS+Vite

## 功能

共数据表 12 张 见介绍文章

### 管理员

1. 验证信息，登录系统
2. 学院增删改查
3. 专业增删改查
4. 课程增删改查
5. 发布通知
6. 教师学生增删改查
7. 学院-专业-教师-课程的联表绑定

### 学生

1. 验证个人信息，登录系统
2. 查询/修改个人基本信息，查看成绩
3. 通知接收

### 教师

1. 验证个人信息，登录系统
2. 查询/修改个人基本信息，能修改登录密码
3. 查看成绩
4. 录入成绩
5. 修改或更新某一个成绩
6. 查询某一科的平均成绩，以及改科目的最高分最低分。并使用 Echarts 图表 对成绩进行统计分析
7. 下载某一科目的 Excel 成绩
8. 通知接收
