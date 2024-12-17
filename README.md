# 学生成绩管理系统 student-achievement

[项目介绍地址](https://blogweb.cn/article/6064300710) 项目包括论文三篇  
**如果你有对成功物有什么问题，或者在毕业设计上有什么问题（需要代做）可以联系 QQ：1974109227**

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

## 项目在 2024/12/25 后会开始重构

会添加多个功能以及优化页面和代码结构，可以添加我的联系方式提前获取代码和建议我添加某些功能，代码免费开源，完成后上传至该仓库。

## 项目启动

**前端使用 Vite 开发，要求 Node.js 版本不得低于 18**
**MySQL 版本要求使用 8**

推荐使用 yarn 作为包管理  
使用 **npm i yarn -g** 来安装 yarn

**快捷文件启动**

1. 先双击打开 install.bat 文件，依赖安装结束后 cmd 会自动关闭
2. 双击 dev 文件启动前端和后端

**命令行启动:**

0.引入 SQL 文件  
1.cd api  
2.yarn  
3.yarn dev  
4.cd admin  
5.yarn  
6.yarn dev

### 初始密码

管理员:账号:1 密码:1

学生:账号:1 密码:1

教师:账号:123456 密码:1

## 介绍

项目是之前接的一个毕业设计的程序成功物，毕业设计基本水平  
技术为 Vue3.0+Node.js(Express)+Mysql，组件库使用 Element-plus 组件库

## 功能

### 学生

1. 验证个人信息，登录系统
2. 查询/修改个人基本信息，查看成绩
3. 查询所有成绩，并得到平均分，总分等指标
4. 下载成绩
5. 学生反馈

### 教师

1. 验证个人信息，登录系统
2. 查询/修改个人基本信息，能修改登录密码
3. 查看成绩
4. 录入成绩
5. 修改或更新某一个成绩
6. 查询某一科的平均成绩，以及改科目的最高分最低分。并以 echarts 对成绩进行统计分析
7. 打印和下载某一科目的成绩
8. 通过上传 Excel 修改成绩
9. 申请开放成绩管理
10. 批阅学生反馈

### 管理员

1. 验证信息，登录系统
2. 添加和修改.删除学生.教师信息
3. 录入某一个科的成绩
4. 修改/更新某一科的成绩
5. 添加公告
6. 对教师的申请成绩管理进行处理
