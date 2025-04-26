<template>
  <el-card class="mt-8">
    <h1 class="text-center">本程序有偿提供论文和讲解</h1>
    <div class="font-bold text-2xl">
      <div class="flex justify-center">写毕业设计、论文、课设或者其他项目</div>
      <div class="flex justify-center my-4">Vue.js、Node.js、Python、Java、小程序均可</div>
      <div class="flex justify-center">同时提供详解、PPT的服务</div>
      <div class="flex justify-center mt-6">联系方式:</div>
    </div>
    <div class="flex justify-center mt-8">
      <div class="font-bold text-2xl">
        <div>QQ:1974109227</div>
        <div><img class="w-60" src="/qq.webp" alt="" /></div>
      </div>
      <div class="font-bold text-2xl ml-6">
        <div>微信:webzhizuo</div>
        <div><img class="w-60" src="/wechat.webp" alt="" /></div>
      </div>
    </div>
    <el-divider content-position="center">新版本介绍</el-divider>
    <h1>可够买新版本的论文以及程序,新增功能:</h1>
    <h2>1. <strong>管理员端功能</strong></h2>
    <ul>
      <li>
        <strong>信息管理</strong>
        <ul>
          <li>支持通过 Excel 模板批量导入/导出：课程信息、专业班级、学院、教师、学生信息</li>
        </ul>
      </li>
    </ul>
    <h2>2. <strong>教师端功能</strong></h2>
    <ul>
      <li>
        <strong>成绩管理</strong>
        <ul>
          <li>支持成绩批量导入和单独录入</li>
          <li>
            可自定义成绩计算公式（例如:默认公式：总成绩=平时成绩 ×30%+考试成绩
            ×70%）（成绩被分为了补考、平时、期末）
          </li>
          <li>提供 Excel 模板下载/上传功能，方便批量操作</li>
        </ul>
      </li>
      <li>
        <strong>班级管理</strong>
        <ul>
          <li>查看所带班级学生基本信息</li>
          <li>管理补考/重修成绩（标注原始成绩和补考成绩）</li>
        </ul>
      </li>
      <li>
        <strong>教学互动</strong>
        <ul>
          <li>上传教学资料（带标题和简介的文件列表）</li>
          <li>处理学生成绩异议并记录修改原因</li>
          <li>查看课程评价统计结果</li>
        </ul>
      </li>
    </ul>
    <h2>3. <strong>学生端功能</strong></h2>
    <ul>
      <li>
        <strong>学业查询</strong>
        <ul>
          <li>查看各学期成绩及变化趋势图表</li>
          <li>查询个人基本信息和总学分</li>
          <li>下载教师分享的教学资料</li>
        </ul>
      </li>
      <li>
        <strong>互动功能</strong>
        <ul>
          <li>提交成绩异议申请</li>
          <li>对课程和教师进行署名评价</li>
          <li>接收系统邮件通知（成绩发布、重要通知等）</li>
        </ul>
      </li>
    </ul>
    <h2>4. <strong>通用</strong></h2>
    <ul>
      <li>对比数据库存储密码进行加密</li>
    </ul>
  </el-card>
</template>
<script setup>
import { ref } from "vue";
</script>
<style scoped lang="scss"></style>
