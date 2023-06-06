# 学生成绩管理系统 student-achievement

[项目介绍地址](https://blogweb.cn/article/6064300710)  
**如果你有对成功物有什么问题，或者在毕业设计上有什么问题（需要代做）可以联系 QQ：1974109227**

**不是无偿解决**

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

**因为使用到 node-sass 的缘故，为了对应 node 版本，node 版本使用 16**
**MySQL 版本建议使用 5，如果版本为 8 请将密码验证设置为 mysql_native_password**

推荐使用 yarn 作为包管理  
使用 **npm i yarn -g** 来安装 yarn

0.引入 SQL 文件  
1.cd api  
2.yarn  
3.yarn dev  
4.cd admin  
5.yar  
6.yarn dev

### 初始密码

管理员:账号:1 密码:1

学生:账号:1 密码:1

教师:账号:123456 密码:1

## 介绍

项目是之前接的一个毕业设计的程序成功物，毕业设计基本水平，文件夹不符合规范（可以不修改）
技术为 Vue3.0+Node.js(Express)+Mysql，组件库使用 Element-plus 组件库

## 功能

### 学生

1. 验证个人信息，登录系统
2. 查询/修改个人基本信息，查看成绩
3. 查询所有成绩，并得到平均分，总分等指标
4. 下载成绩

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

### 管理员

1. 验证信息，登录系统
2. 添加和修改.删除学生.教师信息
3. 录入某一个科的成绩
4. 修改/更新某一科的成绩
5. 添加通告
6. 对教师的申请成绩管理进行处理
